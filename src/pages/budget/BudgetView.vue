<template>
  <div class="table-padding">
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="record => record.id"
    >
      <router-link
        slot="budgetId"
        slot-scope="text,record"
        :to="{name:'预算费用',params:{id:record.id}}"
      >{{(Array(8).join('0') + record.id).slice(-8)}}</router-link>
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
    title: "占用金额",
    dataIndex: "occupyMoney",
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
import BudgetData from "../../dao/budgetDAO";
import Const from "../../common/const";

export default {
  data() {
    return {
      desc: "查看预算列表",
      columns: columns,
      dataSource: []
    };
  },
  mounted() {
    BudgetData.getBudgets(3, this.fetchDataCallback);
  },
  methods: {
    fetchDataCallback(data) {
      if (data.code == 0) {
        this.dataSource = data.data;
      }
    }
  }
};
</script>