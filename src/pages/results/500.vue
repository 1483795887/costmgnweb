<template>
  <a-result
    status="500"
    title="500"
    subTitle="抱歉，服务器发生了错误."
  >
    <template v-slot:extra>
      <a-button
        type="primary"
        @click="$routergo(-1)"
      >返回</a-button>
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