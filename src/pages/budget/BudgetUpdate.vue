<template>
  <a-form
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
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
        @click="handleSubmit"
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
      desc: "预算更新",
      needToBack: true,
      dateFormat: "YYYY-MM-DD",
      yearmonth: null,
      money: 0,
      type: "",
      date: "",
      budget: {},
      user: {},
      department: ""
    };
  },
  mounted() {
    BudgetDAO.getBudget(this.$route.params.id, this.getBudgetCallback);
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "budget-form" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.budget.year = values.yearmonth.year();
          this.budget.month = values.yearmonth.month() + 1;
          this.budget.money = values.money;
          this.budget.type = values.type;
          BudgetDAO.updateBudget(this.budget, this.updateCallback);
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
    getBudgetCallback(data) {
      if (data.code == 0) {
        var budget = data.data;
        this.budget = budget;
        this.yearmonth = moment()
          .year(budget.year)
          .month(budget.month - 1);
        this.money = budget.money;
        this.type = budget.type;
        this.user = budget.work.user;
        this.date = budget.work.date;
        this.department = Const.getDepartment(this.user.department);
        this.$nextTick(() => {
          this.form.setFieldsValue({
            yearmonth: this.yearmonth,
            money: this.money,
            type: this.type
          });
        });
      }
    },
    updateCallback(data) {
      if (data.code == 0) {
        this.$router.go(-1);
      }
    }
  }
};
</script>