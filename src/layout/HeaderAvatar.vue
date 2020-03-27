<template>
  <a-dropdown>
    <span style="cursor: pointer">
      <a-avatar size="large" icon="user" />
      <span>{{username}}</span>
    </span>
    <a-menu style="width: 150px" slot="overlay">
      <a-menu-item>
        <router-link :to="{name:'修改密码'}">
          <a-icon type="setting" />
          <span>密码修改</span>
        </router-link>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <router-link :to="{name:'登录页'}">
          <a-icon type="poweroff" />
          <span>退出登录</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: "HeaderAvatar",
  computed: {
    username() {
      return this.$store.state.account.user.name;
    }
  }
};
</script>
