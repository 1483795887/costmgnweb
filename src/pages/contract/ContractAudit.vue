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
  }
];

const contracts = [
  {
    id: 1,
    no: "20200302001",
    contractDate: "2020-02-01",
    company: "A公司",
    money: 123456,
    work: {
      user: {
        name: "张三",
        department: "生产"
      },
      status: "已完成"
    }
  },
  {
    id: 2,
    no: "20200302002",
    contractDate: "2020-02-02",
    company: "B公司",
    money: 78456156,
    work: {
      user: {
        name: "张三",
        department: "生产"
      },
      status: "已完成"
    }
  }
];

export default {
  components: {
    StandardTable
  },
  data() {
    return {
      desc: "审计正在进行的合同",
      columns: columns,
      dataSource: contracts,
      selectedRows: []
    };
  },
  methods: {
    onchange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
    }
  }
};
</script>