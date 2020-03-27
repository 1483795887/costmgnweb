<template>
  <div class="standard-table">
    <div class="alert">
      <a-alert type="info" :show-icon="true">
        <div slot="message">已选择&nbsp;{{selectedRows.length}}&nbsp;项&nbsp;&nbsp;</div>
      </a-alert>
    </div>
    <a-table
      :bordered="bordered"
      :loading="loading"
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="rowKey"
      :pagination="pagination"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: updateSelect}"
    >
      <template v-for="column in columnsCustom" :slot="column.customRender" slot-scope="text,record">
        <slot :name="column.customRender" :text="text" :record="record"/>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: "StandardTable",
  props: [
    "bordered",
    "loading",
    "columns",
    "dataSource",
    "rowKey",
    "pagination",
    "selectedRows"
  ],
  data() {
    return {
      needTotalList: [],
      selectedRowKeys: []
    };
  },
  methods: {
    updateSelect(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      let list = this.needTotalList;
      this.needTotalList = list.map(item => {
        return {
          ...item,
          total: selectedRows.reduce((sum, val) => {
            return sum + val[item.dataIndex];
          }, 0)
        };
      });
      this.$emit("change", selectedRowKeys, selectedRows);
    },
    initTotalList(columns) {
      const totalList = [];
      columns.forEach(column => {
        if (column.needTotal) {
          totalList.push({ ...column, total: 0 });
        }
      });
      return totalList;
    }
  },
  created() {
    this.needTotalList = this.initTotalList(this.columns);
  },
  computed:{
    columnsCustom(){
      return this.columns.filter(item=>{
        return item.scopedSlots
      }).map(item=>item.scopedSlots)
    }
  },
  watch: {
    selectedRows: function(selectedRows) {
      this.needTotalList = this.needTotalList.map(item => {
        return {
          ...item,
          total: selectedRows.reduce((sum, val) => {
            return sum + val[item.dataIndex];
          }, 0)
        };
      });
    }
  }
};
</script>

<style scoped>
.alert {
  margin-bottom: 16px;
}
</style>
