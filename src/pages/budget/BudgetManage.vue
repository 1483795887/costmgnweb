<template>
  <div class="table-padding">
    <div class="table-operators">
      <router-link :to="{name:'新增预算'}">
        <a-button type="primary">新增</a-button>
      </router-link>
      <a-button
        :style="{ marginLeft: '24px' }"
        @click="onSumbit"
      >提交</a-button>
    </div>
    <standard-table
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="record => record.work.id"
      :selectedRows="selectedRows"
      @change="onchange"
      ref="table"
    >
      <router-link
        slot="budgetId"
        slot-scope="{text,record}"
        :to="{name:'预算更新',params:{id:record.id}}"
      >{{(Array(8).join('0') + record.id).slice(-8)}}</router-link>
    </standard-table>
  </div>
</template>

<script>
import StandardTable from "../../components/table/StandardTable";
import Const from "../../common/const";
import BudgetData from "../../dao/budgetDAO";

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
    title: "状态",
    dataIndex: "work.status",
    customRender: (text, record) => Const.getStatus(record.work.status)
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
      desc: "维护正在进行的预算",
      columns: columns,
      dataSource: [],
      selectedRows: [],
      selectedRowKeys: []
    };
  },
  mounted() {
    BudgetData.getBudgets(1, this.getBudgetsCallback);
  },
  methods: {
    onchange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
      this.selectedRowKeys = selectedRowKeys;
    },
    onSumbit() {
      if (this.selectedRows.length == 0) {
        this.$message.info("至少选择一项");
      } else {
        var data = {};
        data.idList = this.selectedRowKeys;
        this.$refs.table.clear();
        BudgetData.submitBudgets(data, this.onRefreshData);
      }
    },
    getBudgetsCallback(data) {
      if (data.code == 0) {
        this.dataSource = data.data;
      }
    },
    onRefreshData(data) {
      if (data.code == 0) {
        BudgetData.getBudgets(1, this.getBudgetsCallback);
      }
    }
  }
};
</script>