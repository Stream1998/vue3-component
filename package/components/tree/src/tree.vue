<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { TreeNode, TreeOptions, treeProps, BaseType, treeEmits } from './tree';
import createNamespace from '@lxd/utils/createBEM';
import XdTreeNode from './treeNode.vue';
import XdVirtualList from '@lxd/components/virtualList';

defineOptions({
  name: 'xd-tree',
});

const bem = createNamespace('tree');
const props = defineProps(treeProps);
const tree = ref<TreeNode[]>();

// 建立字段映射
function createTreeOptions(
  labelField: string,
  keyFeild: string,
  childrenField: string
) {
  return {
    getLabel(node: TreeOptions) {
      return node[labelField] as string;
    },
    getKey(node: TreeOptions) {
      return node[keyFeild] as string;
    },
    getChildren(node: TreeOptions) {
      return node[childrenField] as TreeNode[];
    },
  };
}

const treeOptions = createTreeOptions(
  props.labelField,
  props.keyField,
  props.childrenField
);

// 格式化数据，构建树
function createTree(
  data: TreeOptions[],
  parent: TreeNode | null = null
): TreeNode[] {
  function traverse(
    data: TreeOptions[],
    parent: TreeNode | null = null
  ): TreeNode[] {
    return data.map((node: TreeOptions) => {
      const children = treeOptions.getChildren(node) || [];
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [],
        raw: node,
        level: parent ? parent.level + 1 : 0,
        isLeaf: node.isLeaf ?? children?.length == 0,
        disabled: !!node.disabled,
        parentKey: parent?.key,
      };
      if (children.length) {
        treeNode.children = traverse(children, treeNode);
      }
      return treeNode;
    });
  }
  return traverse(data, parent);
}

watch(
  () => props.data,
  (data: TreeOptions[]) => {
    tree.value = createTree(data);
  },
  {
    immediate: true,
  }
);

// 逆序遍历
const reverse = (array, cb) => {
  for (let i = array.length - 1; i >= 0; --i) {
    cb(array[i]);
  }
};

// 根据指定的默认展开key数组，扁平化树
const expandedKeysSet = ref<Set<BaseType>>(new Set(props.defaultExpandedKeys));

const flattenTree = computed(() => {
  const expandedKeys = expandedKeysSet.value;
  const nodes: TreeNode[] = tree.value || [];
  const stack: TreeNode[] = [];
  reverse(nodes, node => stack.push(node));
  const result: TreeNode[] = [];
  while (stack.length) {
    const node: TreeNode = stack.pop()!;
    if (!node) continue;
    result.push(node);
    if (expandedKeys.has(node.key)) {
      const children: TreeNode[] = node.children;
      if (children) {
        reverse(children, node => stack.push(node));
        // 为什么使用 reverse 就会丢失响应式呢？
        // children.reverse().forEach((node: TreeNode) => {
        //   stack.push(node);
        // });
      }
    }
  }
  return result;
});

// 是否展开
function isExpand(node: TreeNode): boolean {
  return expandedKeysSet.value.has(node.key);
}

// 收起
function collapse(node: TreeNode) {
  expandedKeysSet.value.delete(node.key);
}

const loadingKeysSet = ref<Set<BaseType>>(new Set());

// 展开
function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key);

  if (node.children.length && !node.isLeaf) return;

  if (!isLoading(node)) {
    loadingKeysSet.value.add(node.key);
    props.onLoad &&
      props.onLoad(node).then((children: TreeOptions[]) => {
        node.raw.children = children;
        node.children = createTree(children, node);
        loadingKeysSet.value.delete(node.key);
      });
  }
}

// 切换[收起/展开]状态
function toggle(node: TreeNode) {
  isExpand(node) && !isLoading(node) ? collapse(node) : expand(node);
}

// 是否加载
function isLoading(node: TreeNode) {
  return loadingKeysSet.value.has(node.key);
}

const emit = defineEmits(treeEmits);

const selectedKeys = ref<BaseType[]>([]);

watch(
  () => props.defaultSelectedKeys,
  (data: BaseType[]) => {
    selectedKeys.value = data;
  },
  {
    immediate: true,
  }
);

function handleSelect(node: TreeNode) {
  if (!props.selectable) return;
  let _selectedKeys = Array.from(selectedKeys.value);
  if (props.multiple) {
    const index = _selectedKeys.findIndex(key => node.key === key);
    if (index > -1) {
      _selectedKeys.splice(index, 1);
    } else {
      _selectedKeys.push(node.key);
    }
  } else {
    _selectedKeys = [node.key];
  }
  emit('update:defaultSelectedKeys', _selectedKeys);
}

function isSelected(node: TreeNode): boolean {
  return selectedKeys.value.includes(node.key);
}

const checkedKeysSet = ref<Set<BaseType>>(new Set(props.defaultCheckedKeys));

function toggleCheck(node: TreeNode, state: boolean) {
  if (!node) return;
  state && indeterminateKeys.value.delete(node.key);
  checkedKeysSet.value[state ? 'add' : 'delete'](node.key);
  const children = node.children;
  if (children) {
    children.forEach(child => {
      if (!child.disabled) {
        toggleCheck(child, state);
      }
    });
  }
}

function handleCheck(node: TreeNode, state: boolean) {
  toggleCheck(node, state);
  updateIndeterminate(node);
  emit('update:defaultCheckedKeys', Array.from(checkedKeysSet.value));
}

function isChecked(node: TreeNode) {
  return checkedKeysSet.value.has(node.key);
}

const indeterminateKeys = ref<Set<BaseType>>(new Set());

function findNode(key: BaseType) {
  return flattenTree.value.find((node: TreeNode) => node.key === key);
}
function updateIndeterminate(node: TreeNode) {
  const parent = node.parentKey && findNode(node.parentKey);
  if (!parent) return;
  const children = parent.children;
  if (children) {
    let allChecked = true;
    let hasChecked = false;
    for (const child of children) {
      if (isChecked(child)) {
        // 子节点为选中状态
        hasChecked = true;
      } else if (isIndeterminate(child)) {
        // 子节点为半选状态
        allChecked = false;
        hasChecked = true;
      } else {
        // 子节点未选中
        allChecked = false;
      }
    }
    if (allChecked) {
      // 子节点都为选中状态
      indeterminateKeys.value.delete(parent.key);
      checkedKeysSet.value.add(parent.key);
    } else if (hasChecked) {
      // 存在一个子节点选中
      indeterminateKeys.value.add(parent.key);
      checkedKeysSet.value.delete(parent.key);
    } else {
      // 子节点都为未选状态
      indeterminateKeys.value.delete(parent.key);
      checkedKeysSet.value.delete(parent.key);
    }
  }
  updateIndeterminate(parent);
}

function isIndeterminate(node: TreeNode) {
  // if (isChecked(node)) return false;
  return indeterminateKeys.value.has(node.key);
}

onMounted(() => {
  props.showCheckbox &&
    checkedKeysSet.value.forEach((key: BaseType) => {
      const node = findNode(key);
      node && toggleCheck(node, true);
    });
});
</script>

<template>
  <div :class="bem.b()">
    {{ checkedKeysSet }}
    <xd-virtual-list :items="flattenTree" :count="8" :size="32">
      <template #default="{ node }">
        <xd-tree-node
          :key="node.key"
          :node="node"
          :show-checkbox="showCheckbox"
          :is-expand="isExpand(node)"
          :is-loading="isLoading(node)"
          :is-selected="isSelected(node)"
          :is-checked="isChecked(node)"
          :is-indeterminate="isIndeterminate(node)"
          @toggle="toggle"
          @select="handleSelect"
          @check="handleCheck"
        >
          <template #label="{ node: n }">
            <slot name="label" :node="n"></slot>
          </template>
        </xd-tree-node>
      </template>
    </xd-virtual-list>
  </div>
</template>

<style></style>
