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
      :rowKey="record => record.id"
    >
      <template
        slot="planId"
        slot-scope="{text,record}"
      >
        <router-link :to="{name:'方案详情',params:{id:record.id}}">{{(Array(8).join('0') + record.id).slice(-8)}}</router-link>
      </template>
    </standard-table>
  </div>
</template>

<script>
import StandardTable from "../../components/table/StandardTable";

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
    title: "提交人姓名",
    dataIndex: "work.user.name"
  },
  {
    title: "部门",
    dataIndex: "work.user.department"
  },
  {
    title: "提交时间",
    dataIndex: "work.date",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.date > b.date
  }
];

import PlanData from "../../dao/planDAO";

export default {
  components: {
    StandardTable
  },
  data() {
    return {
      desc: "审计正在进行的方案",
      columns: columns,
      dataSource: [],
      selectedRows: []
    };
  },
  mounted() {
    PlanData.getPlans(2, this.getPlansCallback);
  },
  methods: {
    onchange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
    },
    onApprove() {
      if (this.selectedRows.length == 0) {
        this.$message.info("至少选择一项");
      }
    },
    onRefuse() {
      if (this.selectedRows.length == 0) {
        this.$message.info("至少选择一项");
      }
    },
    getPlansCallback(data) {
      if (data.code == 0) {
        this.dataSource = data.data;
      }
    }
  }
};
</script>