<template>
  <div class="table-padding">
    <div class="table-operators">
      <div>
        <a-button
          type="primary"
          @click="onOccupy"
        >批准</a-button>
        <a-button
          :style="{ marginLeft: '24px' }"
          @click="onRefuse"
        >退回</a-button>
      </div>
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
    title: "金额",
    dataIndex: "money",
    customRender: text => text + "元"
  },
  {
    title: "用途",
    dataIndex: "type"
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
      desc: "审计本部门的费用",
      columns: columns,
      dataSource: [],
      selectedRows: [],
      selectedIds: []
    };
  },
  mounted() {
    this.dataSource = CostDAO.getCosts();
  },
  methods: {
    onchange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
      this.selectedIds = this.selectedRows.map(obj => obj.id);
    },
    onOccupy() {
      if (this.selectedIds.length == 0) {
        this.$message.info("至少选择一项");
      } else {
        this.$router.push({
          name: "预算占用",
          query: { ids: this.selectedIds }
        });
      }
    },
    onRefuse() {
      if (this.selectedIds.length == 0) {
        this.$message.info("至少选择一项");
      }
    }
  }
};
</script>