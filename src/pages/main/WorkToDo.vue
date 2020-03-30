<template>
  <div class="table-padding">
    <a-table :columns="columns" :dataSource="dataSource" :rowKey="record => record.id" />
  </div>
</template>

<script>
const works = [
  {
    id: 1,
    title: "方案-采购原料",
    date: "2020-01-03",
    user: {
      name: "张三",
      department: "生产"
    }
  },
  {
    id: 3,
    title: "费用-报销",
    date: "2020-01-05",
    user: {
      name: "李四",
      department: "营销"
    }
  }
];

const columns = [
  {
    title: "事务编号",
    dataIndex: "id"
  },
  {
    title: "描述",
    dataIndex: "title"
  },
  {
    title: "提交时间",
    dataIndex: "date",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.date > b.date
  }
];

export default {
  data() {
    return {
      dataSource: works,
      columns: columns,
      desc: "待办工作"
    };
  }
};
</script>