<template>
  <a-form
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
    @submit="handleSubmit"
  >
    <a-form-item label="预算年月">
      <a-month-picker
        @change="onChangeYearMonth"
        placeholder="选择年月"
        v-decorator="['yearmonth', { rules: [{ required: true, message: '请选择预算年月!' }]}]"
      />
    </a-form-item>
    <a-form-item label="金额">
      <a-input-number
        precision=2
        max=99999999.99
        v-decorator="['money', { rules: [{ required: true, message: '请输入金额!' },{validator:moneyValidator}]}]"
      />元
    </a-form-item>
    <a-form-item label="用途">
      <a-input v-decorator="['type', { rules: [{ required: true, message: '请输入用途!' },{validator:typeValidator}] }]" />
    </a-form-item>
    <a-form-item label="负责人">{{user.name}}</a-form-item>
    <a-form-item label="部门">{{department}}</a-form-item>
    <a-form-item label="修改时间">{{date}}</a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button
        type="primary"
        html-type="submit"
      >保存</a-button>
      <a-button
        html-type="submit"
        :style="{ marginLeft: '24px' }"
        @click = "()=>$router.go(-1)"
      >取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import moment from "moment";
import BudgetDAO from "../../dao/budgetDAO";
import Const from "../../common/const";

export default {
  data() {
    return {
      needToBack: true,
      desc: "新增预算",
      dateFormat: "YYYY-MM-DD",
      yearmonth: null,
      money: 0,
      type: "",
      date: "",
      user: {},
      department: ""
    };
  },
  mounted() {
    this.yearmonth = moment();
    this.user = this.getCurrentUser();
    this.date = moment().format(this.dateFormat);
    this.department = Const.getDepartment(this.user.department);
    this.$nextTick(() => {
      this.form.setFieldsValue({
        yearmonth: this.yearmonth,
        money: this.money,
        type: this.type
      });
    });
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "budget-form" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          var budget = {};
          budget.year = values.yearmonth.year();
          budget.month = values.yearmonth.month() + 1;
          budget.money = values.money;
          budget.type = values.type;
          BudgetDAO.addBudget(budget, this.addBudgetCallback);
        }
      });
    },
    getCurrentUser() {
      return this.$store.state.account.user;
    },
    onChangeYearMonth(date, dateString) {
      console.log(date, dateString);
    },
    typeValidator(rule, value, callback) {
      if (value && value.length > 20) {
        callback("长度过长");
      } else callback();
    },
    moneyValidator(rule, value, callback) {
      if (value <= 0) {
        callback("金额必须为正");
      } else callback();
    },
    addBudgetCallback(data) {
      if (data.code == 0) {
        this.$router.go(-1);
      }
    }
  }
};
</script>