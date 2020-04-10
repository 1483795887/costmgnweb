<template>
  <a-tooltip
    class="header-item"
    title="待办事务"
    placement="bottom"
  >
    <span>
      <a-badge
        count="12"
        class="header-notice"
      >
        <router-link :to="{name:'待办事务'}">
          <a-icon
            type="bell"
            class="header-notice-icon"
          />
        </router-link>
      </a-badge>
    </span>
  </a-tooltip>
</template>

<script>
export default {
  name: "HeaderNotice",
  data() {
    return {
      loadding: false
    };
  }
};
</script>

<style scoped>
.header-notice {
  display: inline-block;
  transition: all 0.3s;
}
.header-notice-icon {
  font-size: 25px;
  padding: 4px;
}
</style>>