<template>
  <div class="page-layout">
    <a-page-header
      class="page-header"
      :title="title"
      :subTitle="desc"
      :backIcon="!needToBack"
      @back="()=>$router.go(-1)"
    />
    <div ref="page" class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["desc", "title", "needToBack"]
};
</script>