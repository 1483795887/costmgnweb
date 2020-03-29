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
      status: "未提交"
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
      status: "退回"
    }
  }
];

export default {
  data() {
    return {
      desc: "维护正在进行的方案",
      columns: columns,
      dataSource: plans
    };
  }
};
</script>