<template>
  <a-dropdown>
    <span style="cursor: pointer">
      <a-avatar
        size="large"
        icon="user"
      />
      <span>{{name}}</span>
    </span>
    <a-menu
      style="width: 150px"
      slot="overlay"
    >
      <a-menu-item>
        <router-link :to="{name:'修改密码'}">
          <a-icon type="setting" />
          <span>密码修改</span>
        </router-link>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <div @click="onLogout">
          <a-icon type="poweroff" />
          <span>退出登录</span>
        </div>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: "HeaderAvatar",
  data() {
    return {
      name: ""
    };
  },
  mounted() {
    this.name = this.$store.state.account.user.name;
  },
  methods: {
    onLogout() {
      this.$store.commit("account/setuser", null);
      sessionStorage.removeItem("user");
      this.$router.push({ name: "登录页" });
    }
  }
};
</script>
