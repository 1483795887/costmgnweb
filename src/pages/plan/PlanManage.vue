<template>
  <div class="table-padding">
    <div class="table-operators">
      <router-link :to="{name:'新增方案',params:{desc:'新增方案'}}">
        <a-button type="primary">新增</a-button>
      </router-link>
    </div>
    <a-table :columns="columns" :dataSource="dataSource" :rowKey="record => record.id">
      <router-link
        slot="planId"
        slot-scope="text,record"
        :to="{name:'方案表格',params:{desc:'维护方案',id:record.id}}"
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
    dataIndex: "title",
    
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

import PlanData from '../../dao/planDAO'

export default {
  data() {
    return {
      desc: "维护正在进行的方案",
      columns: columns,
      dataSource: []
    };
  },mounted(){
    this.dataSource = PlanData.getPlans();
  }
};
</script>