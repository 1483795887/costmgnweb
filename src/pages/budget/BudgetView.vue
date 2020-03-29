<template>
  <div class="table-padding">
    <a-table :columns="columns" :dataSource="dataSource" :rowKey="record => record.id"/>
  </div>
</template>

<script>
const columns = [
  {
    title: "预算编号",
    dataIndex: "id"
  },
  {
    title: "年度",
    dataIndex: "year",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.year > b.year
  },
  {
    title: "月份",
    dataIndex: "month",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.month > b.month
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
    dataIndex: "work.user.department"
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
import BudgetData from '../../dao/budgetDAO'

export default {
  data() {
    return {
      desc: "查看预算列表",
      columns: columns,
      dataSource: []
    };
  },
  mounted(){
    this.dataSource = BudgetData.getBudgets();
  }
};
</script>