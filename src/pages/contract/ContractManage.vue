<template>
  <div class="table-padding">
    <div class="table-operators">
      <router-link :to="{name:'新增合同',params:{desc:'新增合同'}}">
        <a-button type="primary">新增</a-button>
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
        slot="contractId"
        slot-scope="{text,record}"
        :to="{name:'合同表格',params:{desc:'维护合同',id:record.id}}"
      >{{text}}</router-link>
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
  components: {
    StandardTable
  },
  data() {
    return {
      desc: "维护正在进行的合同",
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
    },
    onSelect() {
      if (this.selectedRows.length == 0) {
        this.$message.info("至少选择一项");
      }
    }
  }
};
</script>