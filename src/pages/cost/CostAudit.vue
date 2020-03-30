<template>
  <div class="table-padding">
    <div class="table-operators">
      <a-button type="primary">批准</a-button>
      <a-button :style="{ marginLeft: '24px' }">退回</a-button>
    </div>
    <standard-table
      :columns="columns"
      :dataSource="dataSource"
      :selectedRows="selectedRows"
      @change="onchange"
      :rowKey="record => record.id"
    />
  </div>
</template>

<script>
import StandardTable from "../../components/table/StandardTable";
import BudgetData from '../../dao/budgetDAO'

const columns = [
  {
    title: "预算编号",
    dataIndex: "id",
    customRender: (text,record) =>(Array(8).join('0') + record.id).slice(-8)
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
    title: "状态",
    dataIndex: "work.status"
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

export default {
  components: {
    StandardTable
  },
  data() {
    return {
      desc: "审计正在进行的合同",
      columns: columns,
      dataSource: [],
      selectedRows: []
    };
  },
  mounted(){
    this.dataSource = BudgetData.getBudgets();
  },
  methods: {
    onchange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
    }
  }
};
</script>