<template>
  <a-layout-sider width="200" style="background: #fff">
    <div class="logo">费用控制系统</div>
    <a-menu
      mode="inline"
      theme="dark"
      :defaultOpenKeys="['sub1']"
      :defaultSelectedKeys="['1']"
      :style="{ height: '100%', borderRight: 0 }"
      :selectedKeys="[current]"
      @click="handleClick"
    >
      <a-sub-menu key="sub1">
        <span slot="title">
          <a-icon type="home" />工作
        </span>
        <a-menu-item key="1">
          <router-link :to="{name:'当前事务'}">事务状态</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link :to="{name:'待办事务'}">待办事务</router-link>
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub2">
        <span slot="title">
          <a-icon type="bulb" />方案
        </span>
        <a-menu-item key="3">
          <router-link :to="{name:'方案维护'}">方案维护</router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link :to="{name:'方案审计'}">方案审计</router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <router-link :to="{name:'查看历史方案'}">查看历史方案</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <span slot="title">
          <a-icon type="solution" />合同
        </span>
        <a-menu-item key="6">
          <router-link :to="{name:'合同维护'}">合同维护</router-link>
        </a-menu-item>
        <a-menu-item key="7">
          <router-link :to="{name:'合同审计'}">合同审计</router-link>
        </a-menu-item>
        <a-menu-item key="8">
          <router-link :to="{name:'查看历史合同'}">查看历史合同</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu>
         <span slot="title">
          <a-icon type="pay-circle" />费用
        </span>
      </a-sub-menu>

    </a-menu>
  </a-layout-sider>
</template>

<script>//之后弄个vuex保存一下菜单选择，刷新时保存
export default {
  data() {
    return {
      current: "1"
    };
  },
  methods: {
    handleClick(e) {
      this.current = e.key;
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