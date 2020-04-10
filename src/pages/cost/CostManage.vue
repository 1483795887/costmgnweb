<template>
  <div class="table-padding">
    <div class="table-operators">
      <router-link :to="{name:'新增费用',params:{desc:'新增费用'}}">
        <a-button type="primary">新增费用</a-button>
      </router-link>
      <a-button
        :style="{ marginLeft: '24px' }"
        @click="onSelect"
      >提交</a-button>
    </div>
    <standard-table
      :selectedRows="selectedRows"
      @change="onchange"
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="record => record.id"
    >
      <router-link
        slot="costId"
        slot-scope="{text,record}"
        :to="{name:'预算表格',params:{desc:'维护预算',id:record.id}}"
      >{{(Array(8).join("0") + record.id).slice(-8)}}</router-link>
    </standard-table>
  </div>
</template>

<script>
import StandardTable from "../../components/table/StandardTable";

const columns = [
  {
    title: "费用编号",
    dataIndex: "id",
    scopedSlots: { customRender: "costId" }
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
  components: {
    StandardTable
  },
  data() {
    return {
      desc: "查看预算列表",
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
    onSelect() {
      if (this.selectedRows.length == 0) {
        this.$message.info("至少选择一项");
      }
    }
  }
};
</script>