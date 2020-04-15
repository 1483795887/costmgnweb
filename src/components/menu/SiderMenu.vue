<template>
  <a-layout-sider
    width="200"
    style="background: #fff"
  >
    <div class="logo">费用控制系统</div>
    <a-menu
      mode="inline"
      theme="dark"
      :defaultOpenKeys="openKeys"
      :defaultSelectedKeys="selectedKeys"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <template v-for="item in menu">
        <a-sub-menu :key="item.name">
          <span slot="title">
            <a-icon :type="item.icon" />{{item.title}}
          </span>
          <template v-for="subItem in item.children">
            <a-menu-item :key="subItem.name">
              <router-link :to="{name:subItem.to}">{{subItem.title}}</router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import Menu from "./Menu";

export default {
  data() {
    return {
      menu: []
    };
  },
  mounted() {
    this.menu = Menu.getMenu(this.$store.state.account.user);
  },
  computed: {
    openKeys() {
      return this.$route.path.split("/").slice(1, -1);
    },
    selectedKeys() {
      return this.$route.path.split("/").slice(-1);
    }
  }
};
</script>

<style>
.logo {
  width: 100%;
  height: 64px;
  background: #001529;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 200%;
}
</style>