<template>
  <a-result title="无权访问">
    <template v-slot:extra>
      <a-button
        type="primary"
        @click="$router.go(-1)"
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