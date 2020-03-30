<template>
  <div class="table-padding">
    <div class="table-operators">
      <router-link :to="{name:'增加员工'}">
        <a-button type="primary">新增</a-button>
      </router-link>
      <a-button :style="{ marginLeft: '24px' }">删除</a-button>
    </div>
    <standard-table
      :columns="columns"
      :dataSource="dataSource"
      :selectedRows="selectedRows"
      @change="onchange"
      :rowKey="record => record.id"
    />
  </div>
</template>

<script>
import UserDAO from "../../dao/userDAO";
import StandardTable from "../../components/table/StandardTable";

const columns = [
  {
    title: "员工编号",
    dataIndex: "id",
    customRender: (text,record) =>(Array(8).join('0') + record.id).slice(-8)
  },
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "部门",
    dataIndex: "department"
  },
  {
    title: "岗位",
    dataIndex: "post"
  }
];
export default {
  components: {
    StandardTable
  },
  data() {
    return {
      desc: "查看、增加、删除员工",
      columns: columns,
      dataSource: [],
      selectedRows: []
    };
  },
  mounted() {
    this.dataSource = UserDAO.getUsers();
  },
  methods: {
    onchange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
    }
  }
};
</script>