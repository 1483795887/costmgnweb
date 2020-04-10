<template>
  <div class="table-padding">
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="record => record.id"
    >
      <router-link
        slot="planId"
        slot-scope="text,record"
        :to="{name:'方案详情',params:{id:record.id}}"
      >{{(Array(8).join('0') + record.id).slice(-8)}}</router-link>
    </a-table>
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
  data() {
    return {
      desc: "查看方案列表",
      columns: columns,
      dataSource: []
    };
  },
  mounted() {
    PlanData.getPlans(3, this.getPlansCallback);
  },
  methods: {
    getPlansCallback(data) {
      if (data.code == 0) {
        this.dataSource = data.data;
      }
    }
  }
};
</script>