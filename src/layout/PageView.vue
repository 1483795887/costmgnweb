<template>
  <page-layout :desc="desc" :title="title" :needToBack="needToBack">
    <transition name="page-taggle">
      <router-view ref="page" />
    </transition>
  </page-layout>
</template>

<script>
import PageLayout from "./PageLayout";
export default {
  components: {
    PageLayout
  },
  data() {
    return {
      title: "",
      desc: "",
      needToBack: false
    };
  },
  mounted() {
    this.getPageHeaderInfo();
  },
  updated() {
    this.getPageHeaderInfo();
  },
  methods: {
    getPageHeaderInfo() {
      this.title = this.$route.name;
      const page = this.$refs.page;
      if (page) {
        this.desc = page.desc;
        this.needToBack = page.needToBack;
      }
    }
  }
};
</script>