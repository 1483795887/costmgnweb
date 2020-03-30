<template>
  <div class="table-padding">
    <div class="table-operators">
      <a-button type="primary">批准</a-button>
      <a-button :style="{ marginLeft: '24px' }">退回</a-button>
    </div>
    <standard-table
      :columns="columns"
      :dataSource="dataSource"
      :selectedRows="selectedRows"
      @change="onchange"
      :rowKey="record => record.id"
    >
      <template slot="contractId" slot-scope="{text,record}">
        <router-link :to="{name:'合同详情',params:{id:record.id}}">{{text}}</router-link>
      </template>
    </standard-table>
  </div>
</template>

<script>
import StandardTable from "../../components/table/StandardTable";

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
  components: {
    StandardTable
  },
  data() {
    return {
      desc: "审计正在进行的合同",
      columns: columns,
      dataSource: [],
      selectedRows: []
    };
  },
  mounted() {
    this.dataSource = ContractData.getContracts();
  },
  methods: {
    onchange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
    }
  }
};
</script>