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
    >
      <template
        slot="contractId"
        slot-scope="{text,record}"
      >
        <router-link :to="{name:'合同详情',params:{id:record.id}}">{{text}}</router-link>
      </template>
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
    title: "部门",
    dataIndex: "work.user.department",
    customRender: (text, record) =>
      Const.getDepartment(record.work.user.department)
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
      selectedRows: [],
      selectedRowKeys: []
    };
  },
  mounted() {
    this.fetchData();
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
        ContractData.approveContracts(data, this.onRefreshData);
      }
    },
    onRefuse() {
      if (this.selectedRows.length == 0) {
        this.$message.info("至少选择一项");
      } else {
        var data = {};
        data.idList = this.selectedRowKeys;
        ContractData.refuseContracts(data, this.onRefreshData);
      }
    },
    getContractsCallback(data) {
      if (data.code == 0) {
        this.dataSource = data.data;
      }
    },
    onRefreshData(data) {
      if (data.code == 0) {
        this.fetchData();
      }
    },
    fetchData() {
      ContractData.getContracts(2, this.getContractsCallback);
    }
  }
};
</script>