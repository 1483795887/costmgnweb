<template>
  <div class="table-padding">
    <div class="alert">
      <a-alert
        type="info"
        :show-icon="true"
      >
        <div slot="message">{{budget.year+'年度 '+budget.month+'月预算，共'+budget.money+'元，已用'+budget.occupyMoney+'元'}}</div>
      </a-alert>
    </div>
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="record => record.id"
    />
  </div>
</template>

<script>
const columns = [
  {
    title: "费用编号",
    dataIndex: "id",
    customRender: (text, record) => (Array(8).join("0") + record.id).slice(-8)
  },
  {
    title: "金额",
    dataIndex: "money",
    customRender: text => text + "元"
  },
  {
    title: "用途",
    dataIndex: "type"
  },
  {
    title: "部门",
    dataIndex: "work.user.department",
    customRender: (text, record) => Const.getDepartment(record.work.department)
  },
  {
    title: "负责人",
    dataIndex: "work.user.name"
  },
  {
    title: "提交时间",
    dataIndex: "work.date",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.date > b.date
  }
];
import CostDAO from "../../dao/costDAO";
import BudgetDAO from "../../dao/budgetDAO";
import Const from "../../common/const";

export default {
  data() {
    return {
      desc: "查看预算费用占用情况",
      needToBack: true,
      columns: columns,
      dataSource: [],
      budget: {}
    };
  },
  mounted() {
    CostDAO.getCostsByBudget(this.$route.params.id, this.getCostsCallback);
    BudgetDAO.getBudget(this.$route.params.id, this.getBudgetCallback);
  },
  methods: {
    getCostsCallback(data) {
      if (data.code == 0) {
        this.dataSource = data.data;
      }
    },
    getBudgetCallback(data) {
      if (data.code == 0) {
        this.budget = data.data;
      }
    }
  }
};
</script>

<style scoped>
.alert {
  margin-bottom: 16px;
}
</style>