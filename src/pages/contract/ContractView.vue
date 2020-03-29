<template>
  <div class="table-padding">
    <a-table :columns="columns" :dataSource="dataSource" :rowKey="record => record.id">
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
  },{
    title:"负责人",
    dataIndex:"work.user.name"
  }
];

const contracts = [
  {
    id: 1,
    no: "20200302001",
    contractDate: "2020-02-01",
    company: "A公司",
    money:123456,
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
    money:78456156,
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
  data() {
    return {
      desc: "查看合同列表",
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