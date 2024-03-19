import createNamespace from '@lxd/utils/createBEM';
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import VirtualItem from './virtualItem';

export default defineComponent({
  name: 'xd-virtual-list',
  props: {
    items: {
      type: Array,
      required: true,
    },
    size: {
      type: Number,
      default: 35,
    },
    count: {
      type: Number,
      default: 8,
    },
    component: {
      type: [Object, Function],
      default: () => {},
    },
  },
  setup(props, { slots }) {
    const { component: Component } = props;
    const bem = createNamespace('virtual-list');

    const wrapper = ref<HTMLDivElement>();
    const scrollBar = ref<HTMLDivElement>();

    const range = reactive({
      start: 0,
      end: props.count,
    });

    const MODE = {
      INIT: 'init',
      FIXED: 'fixed',
      DNYMIC: 'dnymic',
    };
    let mode = MODE.INIT;
    let averageSize = 0;
    let fixedSize = props.size;
    function isFixed() {
      return mode === MODE.FIXED;
    }
    function getSize() {
      return isFixed() ? fixedSize : averageSize || props.size;
    }

    // 为了更快地滚动加载, 扩大数据的范围 [start - count, end + count]
    const prev = computed(() => Math.min(range.start, props.count));
    const next = computed(() =>
      Math.min(props.items.length - range.end, props.count),
    );

    // 动态划分需要显示的数据(移动窗口)
    const rangeData = computed(() => {
      return props.items.slice(
        range.start - prev.value,
        range.end + next.value,
      );
    });

    // 更新滚动条高度
    function udpateScrollBar() {
      scrollBar.value!.style.height = props.items.length * getSize() + 'px';
    }

    // 监听数据变化,动态更新滚动条的高度,避免数据过长无法显示
    watch(() => props.items, udpateScrollBar);

    // 初始化虚拟列表与滚动条的高度
    onMounted(() => {
      wrapper.value!.style.height = props.count * props.size + 'px';
      udpateScrollBar();
    });

    const offset = ref(0);

    function getIndexOffset(index: number) {
      if (index == null) return 0;
      let offset = 0;
      for (let i = 0; i < index; i++) {
        offset += sizes.get(i) || getSize();
      }
      return offset;
    }

    function getOffset() {
      return isFixed()
        ? fixedSize * range.start - prev.value
        : getIndexOffset(range.start - prev.value);
    }

    function getOffsetNum() {
      const scrollTop = wrapper.value!.scrollTop;
      if (isFixed()) {
        return Math.floor(scrollTop / getSize());
      }
      let low = 0,
        high = props.items.length,
        mid = 0,
        midOffset = 0;
      while (low < high) {
        mid = low + Math.floor((high - low) / 2);
        midOffset = getIndexOffset(mid);
        if (midOffset === scrollTop) {
          return mid;
        } else if (midOffset < scrollTop) {
          low = mid + 1;
        } else if (midOffset > scrollTop) {
          high = mid - 1;
        }
      }
      return low > 0 ? low - 1 : 0;
    }

    function handleScroll() {
      range.start = getOffsetNum();
      range.end = range.start + props.count;
      // 计算偏移距离
      offset.value = getOffset();
    }

    const sizes = new Map();

    function updateSize(id: number, size: number) {
      sizes.set(id, size);
      if (mode === MODE.INIT) {
        // 初始值为固定值，固定模式
        fixedSize = size;
        mode = MODE.FIXED;
      } else if (mode === MODE.FIXED && fixedSize !== size) {
        // 大小发生改变，说明不是固定大小，改为动态模式
        fixedSize = 0; // 默认使用平均值
        mode = MODE.DNYMIC;
      }
      if (mode === MODE.DNYMIC) {
        // 动态模式，计算平均大小
        averageSize = Math.round(
          [...sizes.values()].reduce((a, c) => a + c) / sizes.size,
        );
      }
    }

    return () => {
      return (
        <div class={bem.b()} ref={wrapper} onScroll={handleScroll}>
          {/* 占位作用,撑开滚动条 */}
          <div class={bem.e('scroll-bar')} ref={scrollBar}></div>
          {/* 除了 translate, 还可以使用 padding 实现 */}
          <div
            class={bem.e('scroll-list')}
            style={{ transform: `translateY(${offset.value}px)` }}
          >
            {rangeData.value.map((node: any) =>
              Component ? (
                <VirtualItem
                  key={node.id}
                  data={node}
                  item={Component}
                  onUpdateSize={updateSize}
                ></VirtualItem>
              ) : (
                slots.default && slots.default({ node })
              ),
            )}
          </div>
        </div>
      );
    };
  },
});
