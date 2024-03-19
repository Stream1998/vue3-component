import {
  DefineComponent,
  PropType,
  defineComponent,
  onMounted,
  onUpdated,
  ref,
} from 'vue';

export default defineComponent({
  name: 'xd-virtual-item',
  props: {
    data: {
      type: Object,
      required: true,
    },
    item: {
      type: [Object, Function] as PropType<DefineComponent>,
      required: true,
    },
  },
  emits: ['updateSize'],
  setup(props, { emit }) {
    const { item: Component, data } = props;
    const root = ref<HTMLDivElement>();
    const getSize = () => {
      emit('updateSize', data.id, root.value?.offsetHeight);
    };
    onMounted(getSize);
    onUpdated(getSize);
    return () => {
      return (
        Component && (
          <div ref={root}>
            <Component item={data}></Component>
          </div>
        )
      );
    };
  },
});
