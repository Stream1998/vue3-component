<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { UploadFile, UploadRawFile, uploadEmits, uploadProps } from './upload';
import createNamespace from '@lxd/utils/createBEM';
import httpRequest, { UploadOptions } from './httpRequest';

defineOptions({
  name: 'xd-upload',
});
const props = defineProps(uploadProps);
const emit = defineEmits(uploadEmits);
const bem = createNamespace('upload');
const inputRef = ref<HTMLInputElement>();

const fileList = ref<UploadFile[]>(props.fileList);

watch(
  fileList,
  value => {
    emit('update:file-list', value);
  },
  {
    deep: true,
  },
);

function handleUpload() {
  inputRef.value?.click();
}

function findFile(uid: string) {
  return fileList.value.findIndex(file => file.uid === uid);
}

async function handleRemove(uid: string) {
  const index = findFile(uid);
  const isRemove = await props.beforeRemove(
    fileList.value[index],
    fileList.value,
  );
  isRemove && fileList.value.splice(index, 1);
}

defineExpose({
  remove: handleRemove,
});

async function upload(rawFile: UploadRawFile) {
  const result = await props.beforeUpload(rawFile);
  if (result) {
    const uploadFile = {
      uid: rawFile.uid,
      name: rawFile.name,
      percentage: 0,
      size: rawFile.size,
    };
    fileList.value.push(uploadFile);
    props.onChange(uploadFile, fileList.value);
    const options: UploadOptions = {
      url: props.action,
      file: rawFile,
      filename: props.name,
      method: props.method,
      onProgress(e) {
        const index = findFile(uploadFile.uid);
        fileList.value[index].percentage = e.percentage;
        props.onProgress(e, uploadFile);
      },
      onError(e) {
        handleRemove(uploadFile.uid);
        props.onError(e, uploadFile, fileList.value);
        props.onChange(uploadFile, fileList.value);
      },
      onSuccess(response) {
        props.onSuccess(response, uploadFile, fileList.value);
        props.onChange(uploadFile, fileList.value);
      },
    };
    httpRequest(options);
  }
}

function batchUpload(files: FileList) {
  if (files.length + fileList.value.length > props.limit) {
    props.onExceed(files, fileList.value);
    return;
  }
  for (let i = 0; i < files.length; i++) {
    const rawFile = files[i] as UploadRawFile;
    rawFile.uid = crypto.randomUUID();
    upload(rawFile);
  }
}

function handleChange(e: Event) {
  const files = (e.target as HTMLInputElement).files!;
  batchUpload(files);
}

const dragging = ref(false);

function handleDragover(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
  dragging.value = true;
}
function handleDrop(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
  dragging.value && batchUpload(e.dataTransfer?.files || new FileList());
}

function handleDragLeave(e: DragEvent) {
  e.stopPropagation();
  dragging.value = false;
}

const dragEvent = computed(() =>
  props.drag
    ? {
        dragover: handleDragover,
        drop: handleDrop,
        dragleave: handleDragLeave,
      }
    : {},
);
</script>
<template>
  <div :class="bem.b()">
    <div @click="handleUpload" v-on="dragEvent">
      <slot></slot>
      <input
        ref="inputRef"
        :class="bem.e('inner')"
        type="file"
        :accept="accept"
        :multiple="multiple"
        @change="handleChange"
      />
    </div>
  </div>
</template>
<style scoped></style>
