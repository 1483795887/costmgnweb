<template>
  <div class="table-padding">
    <div class="table-operators">
      <router-link :to="{name:'新增合同',params:{desc:'新增合同'}}">
        <a-button type="primary">新增</a-button>
      </router-link>
    </div>
    <a-table :columns="columns" :dataSource="dataSource" :rowKey="record => record.id">
      <router-link
        slot="contractId"
        slot-scope="text,record"
        :to="{name:'合同表格',params:{desc:'维护合同',id:record.id}}"
      >{{text}}</router-link>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "合同编号",
    dataIndex: "no",
    scopedSlots: { customRender: "contractId" }
  },
  {
    title: "公司名",
    dataIndex: "company"
  },
  {
    title: "合同签订日期",
    dataIndex: "contractDate",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.date > b.date
  },
  {
    title: "金额",
    dataIndex: "money",
    customRender: text => text + "元"
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

import ContractData from "../../dao/contractDAO";

export default {
  data() {
    return {
      desc: "维护正在进行的合同",
      columns: columns,
      dataSource: []
    };
  },
  mounted() {
    this.dataSource = ContractData.getContracts();
  }
};
</script>