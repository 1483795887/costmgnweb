<template>
  <a-form
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
    @submit="handleSubmit"
  >
    <a-form-item label="金额">
      <a-input
        prefix="￥"
        suffix="RMB"
        v-decorator="['money', { rules: [{ required: true, message: '请输入金额!' }]}]"
      />
    </a-form-item>
    <a-form-item label="用途">
      <a-input v-decorator="['type', { rules: [{ required: true, message: '请输入用途!' },{validator:typeValidator}] }]" />
    </a-form-item>
    <a-form-item label="负责人">{{user.name}}</a-form-item>
    <a-form-item label="部门">{{department}}</a-form-item>
    <a-form-item label="修改时间">{{date}}</a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button
        type="primary"
        html-type="submit"
      >保存</a-button>
      <a-button
        html-type="submit"
        :style="{ marginLeft: '24px' }"
      >取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import Const from "../../common/const";
import CostDAO from "../../dao/costDAO";

export default {
  data() {
    return {
      desc: "更新报销单",
      needToBack: true,
      dateFormat: "YYYY-MM-DD",
      money: 0,
      type: "",
      date: "",
      user: {},
      cost: {},
      department: ""
    };
  },
  mounted() {
    CostDAO.getCost(this.$route.params.id, this.getCostCallback);
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "cost-form" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.cost.money = values.money;
          this.cost.type = values.type;

          CostDAO.updateCost(this.cost, this.updateCostCallback);
        }
      });
    },
    getCurrentUser() {
      return this.$store.state.account.user;
    },
    typeValidator(rule, value, callback) {
      if (value && value.length > 20) {
        callback("长度过长");
      } else callback();
    },
    moneyValidator(rule, value, callback) {
      if (value <= 0) {
        callback("金额必须为正");
      } else callback();
    },
    updateCostCallback(data) {
      if (data.code == 0) {
        this.$router.go(-1);
      }
    },
    getCostCallback(data) {
      if (data.code == 0) {
        var cost = data.data;
        this.cost = cost;
        this.user = cost.work.user;
        this.date = cost.work.date;
        this.money = cost.money;
        this.type = cost.type;
        this.department = Const.getDepartment(this.user.department);
        this.form.setFieldsValue({
          money: this.money,
          type: this.type
        });
      }
    }
  }
};
</script>