<template>
  <div class="table-padding">
    <a-table :columns="columns" :dataSource="dataSource" :rowKey="record => record.id">
      <router-link
        slot="planId"
        slot-scope="text,record"
        :to="{name:'方案详情',params:{id:record.id}}"
      >{{text}}</router-link>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "方案编号",
    dataIndex: "id"
  },
  {
    title: "方案名",
    dataIndex: "title",
    scopedSlots: { customRender: "planId" }
  },
  {
    title: "提交时间",
    dataIndex: "work.date",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.date > b.date
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
    title: "状态",
    dataIndex: "work.status"
  }
];

const plans = [
  {
    id: 1,
    title: "方案1",
    work: {
      user: {
        name: "张三",
        department: "生产"
      },
      date: "2020-02-01",
      status: "已完成"
    }
  },
  {
    id: 2,
    title: "方案2",
    work: {
      user: {
        name: "李四",
        department: "营销"
      },
      date: "2020-02-03",
      status: "已完成"
    }
  }
];

export default {
  data() {
    return {
      desc: "查看已完成的方案",
      columns: columns,
      dataSource: plans,
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