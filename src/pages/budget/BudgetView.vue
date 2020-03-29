<template>
  <div class="table-padding">
    <a-table :columns="columns" :dataSource="dataSource" :rowKey="record => record.id">
      <router-link
        slot="budgetId"
        slot-scope="text,record"
        :to="{name:'预算详情',params:{id:record.id}}"
      >{{text}}</router-link>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "预算编号",
    dataIndex: "id",
    scopedSlots: { customRender: "budgetId" }
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