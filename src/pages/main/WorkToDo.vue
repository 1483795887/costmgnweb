<template>
  <div class="table-padding">
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="record => record.id"
    />
  </div>
</template>

<script>
import Const from "../../common/const";
import WorkDAO from "../../dao/workDAO";

const columns = [
  {
    title: "事务编号",
    dataIndex: "id"
  },
  {
    title: "类型",
    dataIndex: "type",
    customRender: (text, record) => Const.getType(record.type)
  },
  {
    title: "状态",
    dataIndex: "status",
    customRender: (text, record) => Const.getStatus(record.status)
  },
  {
    title: "部门",
    dataIndex: "user.department",
    customRender: (text, record) => Const.getDepartment(record.department)
  },
  {
    title: "负责人",
    dataIndex: "user.name"
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
      dataSource: [],
      columns: columns,
      desc: "待办工作"
    };
  },
  methods: {
    getToDoWorksCallback(data) {
      if (data.code == 0) {
        this.dataSource = data.data;
      }
    }
  },
  mounted() {
    WorkDAO.getToDoWorks(this.getToDoWorksCallback);
  }
};
</script>