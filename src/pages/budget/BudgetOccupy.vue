<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="总费用">{{totalNeed + '元'}}</a-form-item>
    <a-form-item label="选择预算">
      <a-select v-decorator="['budget', { rules: [{ required: true, message: '请选择预算!' }]}]">
        <a-select-option
          v-for="(item,key) in budgets"
          :key="key"
          :value="item"
        >{{item.id+":"+item.type + ' 剩余 ' + (item.money - item.occupied) + '元'}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">保存</a-button>
      <a-button html-type="submit" :style="{ marginLeft: '24px' }">取消</a-button>
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
      costs: [],
      totalNeed: 0
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "occupy-form" });
  },
  mounted() {
    this.budgets = BudgetDAO.getBudgets();
    this.costs = CostDAO.getCostsByIds(this.$route.query.ids);
    var count = 0;
    this.costs.map(obj => (count += obj.money));
    this.totalNeed = count;
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(err => {
        if (!err) {
          err;
        }
      });
    }
  }
};
</script>