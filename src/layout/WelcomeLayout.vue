<template>
  <div class="page-layout">
    <a-page-header class="page-header" :title="title">
      <a-descriptions size="small" :column="3">
        <a-descriptions-item label="部门">{{user.department}}</a-descriptions-item>
        <a-descriptions-item label="岗位">{{user.post}}</a-descriptions-item>
      </a-descriptions>
    </a-page-header>
    <div class="page-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ["user", "desc", "count"],
  computed: {
    title() {
      return (
        "欢迎回来 " + this.user.name + " 您现有" + this.desc + ":" + this.count
      );
    }
  }
};
</script>