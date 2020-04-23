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
      :rowKey="record => record.work.id"
      ref="table"
    >
      <router-link
        slot="contractId"
        slot-scope="{text,record}"
        :to="{name:'合同更新',params:{id:record.id}}"
      >{{text}}</router-link>
    </standard-table>
  </div>
</template>

<script>
import StandardTable from "../../components/table/StandardTable";
import Const from "../../common/const";

const columns = [
  {
    title: "合同编号",
    dataIndex: "contractNo",
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
      selectedRows: [],
      selectedRowKeys: []
    };
  },
  mounted() {
    ContractData.getContracts(1, this.getContractsCallback);
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
        this.$refs.table.clear();
        ContractData.submitContracts(data, this.submitCallback);
      }
    },
    getContractsCallback(data) {
      if (data.code == 0) {
        this.dataSource = data.data;
      }
    },
    submitCallback(data) {
      if (data.code == 0) {
        ContractData.getContracts(1, this.getContractsCallback);
      }
    }
  }
};
</script>