<template>
  <a-layout>
    <sider-menu />
    <a-layout>
      <global-header />
      <a-layout-content :style="{minHeight: minHeight, margin: '24px 24px'}">
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import GlobalHeader from "./GlobalHeader";
import SiderMenu from "../components/menu/SiderMenu";

const minHeight = window.innerHeight - 64 - 24 - 90;

export default {
  components: {
    GlobalHeader,
    SiderMenu
  },
  data() {
    return {
      collapsed: false,
      minHeight: minHeight + "px"
    };
  }
};
</script>

<style>
.header {
  background: white;
}
.header-right {
  float: right;
}
</style>
