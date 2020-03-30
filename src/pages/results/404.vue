<template>
  <a-result status="404" title="404" subTitle="页面不存在.">
    <template v-slot:extra>
      <a-button type="primary" @click="$route.go(-1)">返回</a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>