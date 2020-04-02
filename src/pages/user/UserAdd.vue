<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="员工姓名">
      <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入方案名!' }] }]" />
    </a-form-item>
    <a-form-item label="部门岗位">
      <a-cascader
        :options="options"
        placeholder="请选择部门岗位"
        v-decorator="['post', { rules: [{ required: true, message: '请选择部门岗位!' }] }]"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">确定</a-button>
      <a-button :style="{ marginLeft: '24px' }" @click="$router.go(-1)">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import UserDAO from "../../dao/userDAO";
import userData from "../../common/user";

export default {
  data() {
    return {
      needToBack: true,
      user: {},
      desc: "增加员工",
      options: userData.postDepartmentOption
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "plan-form" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFields(err => {
        if (!err) {
          var post = this.form.getFieldValue("post");
          this.user.department = post[0];
          this.user.post = post[1];
          this.user.name = this.form.getFieldValue("name");
          UserDAO.addUser(this.user, this.addUserResult);
        }
      });
    },
    addUserResult(res) {
      console.log(res);
    }
  }
};
</script>