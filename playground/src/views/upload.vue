<script setup lang="ts">
import { UploadFile, UploadRawFile } from '@lxd/components/upload';
import { ref } from 'vue';

function beforeUpload(rawFile: UploadRawFile) {
  console.log('before upload');
  console.log(rawFile);
  return true;
}
function handleSuccess(
  response: any,
  uploadFile: UploadFile,
  fileList: UploadFile[],
) {
  console.log('success');
  console.log(response, uploadFile, fileList);
}

function handleError(
  err: Error,
  uploadFile: UploadFile,
  fileList: UploadFile[],
) {
  console.log('error');
  console.log(err, uploadFile, fileList);
}

function beforeRemove(file: UploadFile) {
  console.log('before remove', file);
  return true;
}

function handlePreview(file: UploadFile) {
  console.log('preview', file);
}

function handleRemove(file: UploadFile, fileList: UploadFile[]) {
  console.log('remove');
  console.log(file, fileList);
}

function handleExceed(files: FileList, fileList: UploadFile[]) {
  console.log('exceed');
  console.log(files, fileList);
}

function handleChange(file: UploadFile, fileList: UploadFile[]) {
  console.log('change');
  console.log(file, fileList);
}

const fileList = ref([]);
</script>
<template>
  <xd-upload
    v-model:file-list="fileList"
    action="http://localhost:3000/upload"
    show-file-list
    multiple
    drag
    :limit="6"
    :before-upload="beforeUpload"
    :before-remove="beforeRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-exceed="handleExceed"
    :on-change="handleChange"
    :on-remove="handleRemove"
    :on-preview="handlePreview"
  >
    <xd-button type="primary">上传文件</xd-button>
  </xd-upload>
</template>
<style scoped></style>
