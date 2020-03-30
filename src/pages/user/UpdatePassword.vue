<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="原密码">
      <a-input
        type="password"
        v-decorator="['oriPass', { rules: [{ required: true, message: '请输入原密码!' }] }]"
      />
    </a-form-item>
    <a-form-item label="新密码">
      <a-input
        type="password"
        v-decorator="['newPass', { rules: [{ required: true, message: '请输入新密码!' }] }]"
      />
    </a-form-item>
    <a-form-item label="再输一次">
      <a-input
        type="password"
        v-decorator="['repPass', { rules: [{ required: true, message: '请再输入一次密码!' }] }]"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">确定</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "plan-form" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
        }
      });
    }
  }
};
</script>
