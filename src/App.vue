<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import { ConfigProvider } from "ant-design-vue";
import Vue from "vue";

Vue.use(ConfigProvider);

export default {
  data() {
    return {
      name: "app",
      locale: zhCN
    };
  }
};
</script>