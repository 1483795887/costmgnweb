<template>
  <a-layout-header class="header">
    <div class="header-right">
      <header-avatar class="header-item" />
    </div>
  </a-layout-header>
</template>

<script>
import HeaderAvatar from "./HeaderAvatar";
export default {
  components: { HeaderAvatar }
};
</script>

<style>
.header {
  background: white;
}
.header-right {
  float: right;
}
.header-item {
  padding: 0 30px;
  display: inline-block;
  height: 100%;
  cursor: pointer;
  vertical-align: middle;
}
</style>