<template>
  <div class="table-padding">
    <div class="table-operators">
      <a-button type="primary" @click="onApprove">支付</a-button>
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
import CostDAO from "../../dao/costDAO";

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
  }
];

export default {
  components: {
    StandardTable
  },
  data() {
    return {
      desc: "支付费用",
      columns: columns,
      dataSource: [],
      selectedRows: []
    };
  },
  mounted() {
    this.dataSource = CostDAO.getCosts();
  },
  methods: {
    onchange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
    },
    onApprove() {
      if (this.selectedRows.length == 0) {
        this.$message.info("至少选择一项");
      }
    }
  }
};
</script>