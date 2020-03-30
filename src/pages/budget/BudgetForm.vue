<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="预算年月">
      <a-month-picker
        @change="onChangeYearMonth"
        placeholder="选择年月"
        v-decorator="['yearmonth', { rules: [{ required: true, message: '请选择预算年月!' }]}]"
      />
    </a-form-item>
    <a-form-item label="金额">
      <a-input
        prefix="￥"
        suffix="RMB"
        v-decorator="['money', { rules: [{ required: true, message: '请输入金额!' }]}]"
      />
    </a-form-item>
    <a-form-item label="用途">
      <a-input v-decorator="['type', { rules: [{ required: true, message: '请输入用途!' }] }]" />
    </a-form-item>
    <a-form-item label="负责人">{{name}}</a-form-item>
    <a-form-item label="部门">{{department}}</a-form-item>
    <a-form-item label="修改时间">{{date}}</a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">保存</a-button>
      <a-button html-type="submit" :style="{ marginLeft: '24px' }">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      needToBack: true,
      name: "",
      department: "",
      date: "",
      dateFormat: "YYYY-MM-DD",
      yearmonth: null,
      money: 0,
      type: "",
      user: null
    };
  },
  mounted() {
    this.desc = this.$route.params.desc;
    this.yearmonth = moment();
    this.user = this.getCurrentUser();
    this.name = this.user.name;
    this.department = this.user.department;
    this.date = moment().format(this.dateFormat);
    this.$nextTick(() => {
      this.form.setFieldsValue({
        yearmonth: this.yearmonth,
        money: this.money,
        type: this.type
      });
    });
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "plan-form" });
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
    onChangeYearMonth(date, dateString) {
      console.log(date, dateString);
    }
  }
};
</script>