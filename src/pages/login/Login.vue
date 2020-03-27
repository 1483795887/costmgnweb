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
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  mounted() {
    var user = this.$cookie.get("user");
    if (user == null) {
      //测试使用
      user = {
        id: 10,
        userid: "2020030001",
        password: "123456",
        name: "王五",
        department: "管理",
        post: "系统管理"
      };
    }
    this.$store.commit("account/setuser", user);
    this.$router.push({ name: "主页" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$router.push({ name: "主页" });
          console.log(values);
          //this.$store.commit("account/setuser", getUser(values["userid"]));
        }
      });
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