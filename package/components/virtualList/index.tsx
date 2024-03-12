import createNamespace from '@lxd/utils/createBEM';
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';

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
  },
  setup(props, { slots }) {
    const bem = createNamespace('virtual-list');

    const wrapper = ref<HTMLDivElement>();
    const scrollBar = ref<HTMLDivElement>();

    const range = reactive({
      start: 0,
      end: props.count,
    });

    // 为了更快地滚动加载, 扩大数据的范围 [start - count, end + count]
    const prev = computed(() => Math.min(range.start, props.count));
    const next = computed(() =>
      Math.min(props.items.length - range.end, props.count)
    );

    // 动态划分需要显示的数据(移动窗口)
    const rangeData = computed(() => {
      return props.items.slice(
        range.start - prev.value,
        range.end + next.value
      );
    });

    // 更新滚动条高度
    function updateScrollBar() {
      scrollBar.value!.style.height = props.items.length * props.size + 'px';
    }

    // 监听数据变化,动态更新滚动条的高度,避免数据过长无法显示
    watch(
      () => props.items,
      () => updateScrollBar()
    );

    // 初始化虚拟列表与滚动条的高度
    onMounted(() => {
      wrapper.value!.style.height = props.count * props.size + 'px';
      updateScrollBar();
    });

    const offset = ref(0);

    function handleScroll() {
      range.start = Math.floor(wrapper.value!.scrollTop / props.size);
      range.end = range.start + props.count;
      // 计算偏移距离
      offset.value = (range.start - prev.value) * props.size;
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
            {rangeData.value.map(
              node => slots.default && slots.default({ node })
            )}
          </div>
        </div>
      );
    };
  },
});
