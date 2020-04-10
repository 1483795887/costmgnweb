<template>
  <div class="table-padding">
    <div class="table-operators">
      <router-link :to="{name:'方案新增'}">
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
        :to="{name:'方案更新',params:{id:record.id}}"
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

import StandardTable from "../../components/table/StandardTable";
import PlanData from "../../dao/planDAO";
import Const from "../../common/const";

export default {
  components: {
    StandardTable
  },
  data() {
    return {
      desc: "维护正在进行的方案",
      columns: columns,
      dataSource: [],
      selectedRows: [],
      selectedRowKeys: []
    };
  },
  mounted() {
    PlanData.getPlans(1, this.getPlansCallback);
  },
  methods: {
    onchange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
      this.selectedRowKeys = selectedRowKeys;
    },
    onSelect() {
      if (this.selectedRows.length == 0) {
        this.$message.info("至少选择一项");
      } else {
        var data = {};
        data.idList = this.selectedRowKeys;
        PlanData.submitPlans(data, this.submitCallback);
      }
    },
    getPlansCallback(data) {
      if (data.code == 0) {
        this.dataSource = data.data;
      }
    },
    submitCallback(data) {
      if (data.code == 0) {
        PlanData.getPlans(1, this.getPlansCallback);
      }
    }
  }
};
</script>