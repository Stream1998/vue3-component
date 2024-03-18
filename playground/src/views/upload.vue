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

const fileList = ref([]);
</script>
<template>
  <div>{{ fileList }}</div>
  <xd-upload
    v-model:file-list="fileList"
    action="http://localhost:3000/upload"
    multiple
    drag
    :before-upload="beforeUpload"
    :on-success="handleSuccess"
    :on-error="handleError"
  >
    <xd-button type="primary">上传文件</xd-button>
  </xd-upload>
</template>
<style scoped></style>
