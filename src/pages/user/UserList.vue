<template>
  <div class="table-padding">
    <div class="table-operators">
      <router-link :to="{name:'增加员工'}">
        <a-button type="primary">新增</a-button>
      </router-link>
      <a-button
        :style="{ marginLeft: '24px' }"
        @click="onSelect"
      >删除</a-button>
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
import Const from "../../common/const";
import StandardTable from "../../components/table/StandardTable";

const columns = [
  {
    title: "员工编号",
    dataIndex: "userid"
  },
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "部门",
    dataIndex: "department",
    customRender: (text, record) => Const.getDepartment(record.department)
  },
  {
    title: "岗位",
    dataIndex: "post",
    customRender: (text, record) => Const.getPost(record.post)
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
    UserDAO.getUsers(this.getUserListCallback);
  },
  methods: {
    onchange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
    },
    onSelect() {
      if (this.selectedRows.length == 0) {
        this.$message.info("至少选择一项");
      }
    },
    getUserListCallback(data) {
      if (data.code == 0) {
        this.dataSource = data.data;
      }
    }
  }
};
</script>