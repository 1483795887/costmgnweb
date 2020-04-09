<template>
  <div class="login-container">
    <a-card class="login-card" title="登录">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            v-decorator="[
          'userid',
          { rules: [{ required: true, message: '请输入账号!' }] },
        ]"
            placeholder="账号"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] },
        ]"
            type="password"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import UserDAO from "../../dao/userDAO";

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          UserDAO.login(values.userid, values.password, this.loginCallBack);
        }
      });
    },
    loginCallBack(data) {
      console.log(data);
      if (data.code == 0) {
        var user = data.data;
        this.$store.commit("account/setuser", user);
        sessionStorage.setItem("user", user);
        this.$router.push({ name: "主页" });
      } else {
        console.log("密码错误");
      }
    }
  }
};
</script>
<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10% 0;
  background: #f0f2f5
    url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg")
    no-repeat center 110px;
}
.login-card {
  min-width: 50%;
  min-height: 50%;
}
.login-form-button {
  width: 100%;
}
</style>