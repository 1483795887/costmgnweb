<template>
  <div class="table-padding">
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="record => record.work.id"
    />
  </div>
</template>

<script>
const columns = [
  {
    title: "费用编号",
    dataIndex: "id",
    customRender: (text, record) => (Array(8).join("0") + record.id).slice(-8)
  },
  {
    title: "金额",
    dataIndex: "money",
    customRender: text => text + "元"
  },
  {
    title: "用途",
    dataIndex: "type"
  },
  {
    title: "部门",
    dataIndex: "work.user.department",
    customRender: (text, record) => Const.getDepartment(record.work.department)
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
import CostDAO from "../../dao/costDAO";
import Const from "../../common/const";
export default {
  data() {
    return {
      desc: "查看费用列表",
      columns: columns,
      dataSource: []
    };
  },
  mounted() {
    CostDAO.getCosts(3, this.getCostsCallback);
  },
  methods: {
    getCostsCallback(data) {
      if (data.code == 0) {
        this.dataSource = data.data;
      }
    }
  }
};
</script>