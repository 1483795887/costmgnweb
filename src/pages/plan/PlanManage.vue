<template>
  <div class="table-padding">
    <div class="table-operators">
      <router-link :to="{name:'新增方案',params:{desc:'新增方案'}}">
        <a-button type="primary">新增</a-button>
      </router-link>
      <a-button
        :style="{ marginLeft: '24px' }"
        @click="onSelect"
      >提交</a-button>
    </div>
    <standard-table
      :columns="columns"
      :dataSource="dataSource"
      :selectedRows="selectedRows"
      @change="onchange"
      :rowKey="record => record.id"
    >
      <router-link
        slot="planId"
        slot-scope="{text,record}"
        :to="{name:'方案表格',params:{desc:'维护方案',id:record.id}}"
      >{{(Array(8).join('0') + record.id).slice(-8)}}</router-link>
    </standard-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "方案编号",
    dataIndex: "id",
    scopedSlots: { customRender: "planId" }
  },
  {
    title: "方案名",
    dataIndex: "title"
  },
  {
    title: "状态",
    dataIndex: "work.status"
  },
  {
    title: "提交时间",
    dataIndex: "work.date",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.date > b.date
  }
];

import StandardTable from "../../components/table/StandardTable";
import PlanData from "../../dao/planDAO";

export default {
  components: {
    StandardTable
  },
  data() {
    return {
      desc: "维护正在进行的方案",
      columns: columns,
      dataSource: [],
      selectedRows: []
    };
  },
  mounted() {
    this.dataSource = PlanData.getPlans();
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