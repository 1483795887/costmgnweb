<template>
  <div class="table-padding">
    <div class="table-operators">
      <a-button
        type="primary"
        @click="onApprove"
      >批准</a-button>
      <a-button
        :style="{ marginLeft: '24px' }"
        @click="onRefuse"
      >退回</a-button>
    </div>
    <standard-table
      :columns="columns"
      :dataSource="dataSource"
      :selectedRows="selectedRows"
      @change="onchange"
      :rowKey="record => record.work.id"
    />
  </div>
</template>

<script>
import StandardTable from "../../components/table/StandardTable";
import BudgetDAO from "../../dao/budgetDAO";
import Const from "../../common/const";

const columns = [
  {
    title: "预算编号",
    dataIndex: "id",
    customRender: (text, record) => (Array(8).join("0") + record.id).slice(-8)
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
    dataIndex: "work.user.department",
    customRender: (text, record) => Const.getDepartment(record.work.department)
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
      desc: "审计预算",
      columns: columns,
      dataSource: [],
      selectedRows: [],
      selectedRowKeys: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    onchange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
      this.selectedRowKeys = selectedRowKeys;
    },
    onApprove() {
      if (this.selectedRows.length == 0) {
        this.$message.info("至少选择一项");
      } else {
        var data = {};
        data.idList = this.selectedRowKeys;
        BudgetDAO.approveBudgets(data, this.onRefreshData);
      }
    },
    onRefuse() {
      if (this.selectedRows.length == 0) {
        this.$message.info("至少选择一项");
      } else {
        var data = {};
        data.idList = this.selectedRowKeys;
        BudgetDAO.refuseBudgets(data, this.onRefreshData);
      }
    },
    fetchData() {
      BudgetDAO.getBudgets(2, this.fetchDataCallback);
    },
    fetchDataCallback(data) {
      if (data.code == 0) {
        this.dataSource = data.data;
      }
    },
    onRefreshData(data) {
      if (data.code == 0) {
        this.fetchData();
      }
    }
  }
};
</script>