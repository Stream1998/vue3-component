import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  render(props) {
    const { item } = props;
    return (
      <div data-index={item.id}>
        <h3>
          {item.id} - {item.name}
        </h3>
        <p>{item.sentence}</p>
      </div>
    );
  },
});
