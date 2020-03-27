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
      <template slot="planId" slot-scope="{text,record}">
        <router-link :to="{name:'方案详情',params:{id:record.id}}">{{text}}</router-link>
      </template>
    </standard-table>
  </div>
</template>

<script>
import StandardTable from "../../components/table/StandardTable";

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
    dataIndex: "date",
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
  }
];

const plans = [
  {
    id: 1,
    title: "方案1",
    date: "2020-02-01",
    work: {
      user: {
        name: "张三",
        department: "生产"
      },
      status: "已提交"
    }
  },
  {
    id: 2,
    title: "方案2",
    date: "2020-02-03",
    work: {
      user: {
        name: "李四",
        department: "营销"
      },
      status: "已提交"
    }
  }
];

export default {
  components: {
    StandardTable
  },
  data() {
    return {
      desc: "审计正在进行的方案",
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