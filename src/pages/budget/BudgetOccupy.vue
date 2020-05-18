<template>
  <a-form
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
    @submit="handleSubmit"
  >
    <a-form-item label="总费用">{{totalNeed + '元'}}</a-form-item>
    <a-form-item label="选择预算">
      <a-select v-decorator="['budget', { rules: [{ required: true, message: '请选择预算!' }]}]">
        <a-select-option
          v-for="(item,index) in budgets"
          :key="index"
          :value="index"
        >{{item.id+":"+item.type + ' 剩余 ' + (item.money - item.occupyMoney) + '元'}}</a-select-option>
      </a-select>
    </a-form-item>
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
import BudgetDAO from "../../dao/budgetDAO";
import CostDAO from "../../dao/costDAO";

export default {
  data() {
    return {
      desc: "占用预算",
      needToBack: true,
      budgets: [],
      totalNeed: 0
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "occupy-form" });
  },
  mounted() {
    BudgetDAO.getBudgets(3, this.getBudgetsCallback);
    this.totalNeed = this.$route.query.occupied;
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          var budget = this.budgets[values.budget];
          if (budget.money - budget.occupyMoney < this.totalNeed) {
            this.$message.info("该预算剩余金额不足");
          } else {
            var data = {};
            data.receiptIdList = this.$route.query.ids;
            data.budgetId = budget.id;
            CostDAO.approveCosts(data, this.occupyMoneyCallback);
          }
        }
      });
    },
    getBudgetsCallback(data) {
      if (data.code == 0) {
        this.budgets = data.data;
      }
    },
    occupyMoneyCallback(data) {
      if (data.code == 0) {
        this.$router.go(-1);
      }
    }
  }
};
</script>