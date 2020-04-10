<template>
  <div class="table-padding">
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="record => record.id"
    >
      <router-link
        slot="contractId"
        slot-scope="text,record"
        :to="{name:'合同详情',params:{id:record.id}}"
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
    title: "标题",
    dataIndex: "title"
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

import ContractData from "../../dao/contractDAO";

export default {
  data() {
    return {
      desc: "查看合同列表",
      columns: columns,
      dataSource: []
    };
  },
  mounted() {
    this.dataSource = ContractData.getContracts();
  }
};
</script>