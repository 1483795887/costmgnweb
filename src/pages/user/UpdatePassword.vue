<template>
  <a-form
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
    @submit="handleSubmit"
  >
    <a-form-item label="原密码">
      <a-input
        type="password"
        v-decorator="['oriPass', { rules: [{ required: true, message: '请输入原密码!' }] }]"
      />
    </a-form-item>
    <a-form-item label="新密码">
      <a-input
        type="password"
        v-decorator="['newPass', { rules: [{ required: true, message: '请输入新密码!' },{validator:firstPasswordValidator}] }]"
      />
    </a-form-item>
    <a-form-item label="再输一次">
      <a-input
        type="password"
        v-decorator="['repPass', { rules: [{ required: true, message: '请再输入一次密码!' },{validator:secondPasswordValidator}] }]"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button
        type="primary"
        html-type="submit"
      >确定</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import UserDAO from "../../dao/userDAO";

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "plan-form" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          var data = {};
          data.id = this.$store.state.account.user.id;
          data.password = values.oriPass;
          data.newPassword = values.newPass;
          UserDAO.updatePassword(data, this.updatePasswordCallback);
        }
      });
    },
    firstPasswordValidator(rule, value, callback) {
      if (value && value.length < 6) {
        callback("密码长度至少为6");
      } else if (value && value.length > 20) {
        callback("密码长度过长");
      } else callback();
    },
    secondPasswordValidator(rule, value, callback) {
      if (value && value != this.form.getFieldValue("newPass")) {
        callback("两次密码不一样");
      } else callback();
    },
    updatePasswordCallback(data) {
      if (data.code == 0) {
        this.$store.commit("account/setuser", null);
        sessionStorage.removeItem("user");
        this.$router.push({ name: "登录页" });
      } else {
        this.$message.info(data.error);
      }
    }
  }
};
</script>
