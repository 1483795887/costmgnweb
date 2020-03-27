<template>
  <welcome-layout :user="user" :desc="desc" :count="count">
    <transition name="page-taggle">
      <router-view ref="workpage"/>
    </transition>
  </welcome-layout>
</template>

<script>
import WelcomeLayout from "./WelcomeLayout";
export default {
  data(){
    return {
      desc:"",
      count:0
    }
  },
  components: { WelcomeLayout },
  computed:{
    user(){
      return this.$store.state.account.user;
    }
  },mounted() {
    this.getPageHeaderInfo();
  },
  updated() {
    this.getPageHeaderInfo();
  },
  methods: {
    getPageHeaderInfo() {
      const page = this.$refs.workpage;
      if (page) {
        this.desc = page.desc;
        this.count = page.dataSource.length;
      }
    }
  }
};
</script>

