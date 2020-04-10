<template>
  <a-form
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
    @submit="handleSubmit"
  >
    <a-form-item label="金额">
      <a-input
        prefix="￥"
        suffix="RMB"
        v-decorator="['money', { rules: [{ required: true, message: '请输入金额!' }]}]"
      />
    </a-form-item>
    <a-form-item label="用途">
      <a-input v-decorator="['type', { rules: [{ required: true, message: '请输入用途!' },{validator:typeValidator}] }]" />
    </a-form-item>
    <a-form-item label="负责人">{{user.name}}</a-form-item>
    <a-form-item label="部门">{{user.department}}</a-form-item>
    <a-form-item label="修改时间">{{date}}</a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button
        type="primary"
        html-type="submit"
      >保存</a-button>
      <a-button
        html-type="submit"
        :style="{ marginLeft: '24px' }"
      >取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      desc: "报销",
      needToBack: true,
      dateFormat: "YYYY-MM-DD",
      money: 0,
      type: "",
      date: "",
      user: {}
    };
  },
  mounted() {
    this.user = this.getCurrentUser();
    this.date = moment().format(this.dateFormat);
    this.$nextTick(() => {
      this.form.setFieldsValue({
        money: this.money,
        type: this.type
      });
    });
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "cost-form" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(err => {
        if (!err) {
          err;
        }
      });
    },
    getCurrentUser() {
      return this.$store.state.account.user;
    },
    typeValidator(rule, value, callback) {
      if (value && value.length > 20) {
        callback("长度过长");
      } else callback();
    }
  }
};
</script>