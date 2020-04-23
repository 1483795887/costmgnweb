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
      ref="table"
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

import PlanData from "../../dao/planDAO";
import Const from "../../common/const";

export default {
  components: {
    StandardTable
  },
  data() {
    return {
      desc: "审计正在进行的方案",
      columns: columns,
      dataSource: [],
      selectedRows: [],
      selectedRowKeys: []
    };
  },
  mounted() {
    this.getPlans();
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
        this.$refs.table.clear();
        PlanData.approvePlans(data, this.onCallback);
      }
    },
    onRefuse() {
      if (this.selectedRows.length == 0) {
        this.$message.info("至少选择一项");
      } else {
        var data = {};
        data.idList = this.selectedRowKeys;
        this.$refs.table.clear();
        PlanData.refusePlans(data, this.onCallback);
      }
    },
    getPlans() {
      PlanData.getPlans(2, this.getPlansCallback);
    },
    onCallback(data) {
      if (data.code == 0) {
        this.getPlans();
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