<template>
  <div class="page-layout">
    <a-page-header class="page-header" :title="title">
      <a-descriptions size="small" :column="3">
        <a-descriptions-item label="部门">{{department}}</a-descriptions-item>
        <a-descriptions-item label="岗位">{{post}}</a-descriptions-item>
      </a-descriptions>
    </a-page-header>
    <div class="page-content">
      <slot />
    </div>
  </div>
</template>

<script>
import UserData from "../common/user";

export default {
  props: ["user", "desc", "count"],
  data() {
    return {
      department: "",
      post: ""
    };
  },
  mounted() {
    this.department = UserData.getDepartment(this.user.department);
    this.post = UserData.getPost(this.user.post);
  },
  computed: {
    title() {
      return (
        "欢迎回来 " + this.user.name + " 您现有" + this.desc + ":" + this.count
      );
    }
  }
};
</script>