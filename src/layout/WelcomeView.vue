<template>
  <welcome-layout
    :user="user"
    :desc="desc"
  >
    <transition name="page-taggle">
      <router-view ref="workpage" />
    </transition>
  </welcome-layout>
</template>

<script>
import WelcomeLayout from "./WelcomeLayout";
export default {
  data() {
    return {
      desc: ""
    };
  },
  components: { WelcomeLayout },
  computed: {
    user() {
      return this.$store.state.account.user;
    }
  },
  mounted() {
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
      }
    }
  }
};
</script>

