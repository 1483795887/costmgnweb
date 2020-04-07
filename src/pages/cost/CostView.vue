<template>
  <div class="table-padding">
    <a-table :columns="columns" :dataSource="dataSource" :rowKey="record => record.id" />
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
  },
  {
    title: "状态",
    dataIndex: "work.status"
  }
];
import CostDAO from "../../dao/costDAO";

export default {
  data() {
    return {
      desc: "查看预算列表",
      columns: columns,
      dataSource: []
    };
  },
  mounted() {
    this.dataSource = CostDAO.getCosts();
  }
};
</script>