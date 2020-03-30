<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="合同编号">
      <a-input v-decorator="['no', { rules: [{ required: true, message: '请输入合同编号!' }] }]" />
    </a-form-item>
    <a-form-item label="方案编号">
      <a-select v-decorator="['planId', { rules: [{ required: true, message: '请选择方案编号!' }]}]">
        <a-select-option
          v-for="(item,key) in plans"
          :key="key"
          :value="item.id"
        >{{item.id+":"+item.title}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="合同签署日期">
      <a-date-picker
        :format="dateFormat"
        v-decorator="['contractDate', { rules: [{ required: true, message: '请选择合同签署日期!' }] }]"
      />
    </a-form-item>
    <a-form-item label="合同金额">
      <a-input
        prefix="￥"
        suffix="RMB"
        v-decorator="['money', { rules: [{ required: true, message: '请输入合同金额!' }]}]"
      />
    </a-form-item>
    <a-form-item label="付款方式">
      <a-select v-decorator="['payMethod', { rules: [{ required: true, message: '请选择付款方式!' }]}]">
        <a-select-option v-for="(item,key) in payMethods" :key="key" :value="item">{{item}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="付款条件">
      <a-select
        v-decorator="['payRequest', { rules: [{ required: true, message: '请选择付款条件!' }]}]"
        @change="onRequestChange"
      >
        <a-select-option v-for="(item,key) in payRequests" :key="key" :value="item">{{item}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="持续月份" v-show="installment">
      <a-input
        v-decorator="['lastMonth', { rules: [{ required: installment, message: '请输入持续月份!' }] }]"
      />
    </a-form-item>
    <a-form-item label="公司名">
      <a-input v-decorator="['company', { rules: [{ required: true, message: '请输入公司名!' }] }]" />
    </a-form-item>
    <a-form-item label="法人">
      <a-input v-decorator="['legalPerson', { rules: [{ required: true, message: '请输入法人名!' }] }]" />
    </a-form-item>
    <a-form-item label="描述">
      <a-input v-decorator="['description']" />
    </a-form-item>
    <a-form-item label="负责人">{{user.name}}</a-form-item>
    <a-form-item label="部门">{{user.department}}</a-form-item>
    <a-form-item label="修改时间">{{date}}</a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">保存</a-button>
      <a-button html-type="submit" :style="{ marginLeft: '24px' }">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import moment from "moment";
import contractData from "../../common/contract";
import ContractDAO from "../../dao/contractDAO";
import PlanDAO from "../../dao/planDAO";

export default {
  data() {
    return {
      needToBack: true,
      installment: false,
      payMethods: contractData.payMethods,
      payRequests: contractData.payRequests,
      dateFormat: "YYYY-MM-DD",
      no: "",
      planId: undefined,
      contractDate: moment(),
      money: 0,
      payMethod: contractData.payMethods.PAY_METHOD_CASH,
      payRequest: contractData.payRequests.PAY_REQUEST_ONCE,
      lastMonth: 1,
      company: "",
      legalPerson: "",
      description: "",
      user: {},
      date: ""
    };
  },
  mounted() {
    this.desc = this.$route.params.desc;

    var contract = this.getContract(this.$route.params.id);
    if (contract != null) {
      this.user = contract.work.user;
      this.date = contract.work.date;
      this.no = contract.no;
      this.planId = contract.planId;
      this.contractDate = moment(contract.contractDate, this.dateFormat);
      this.money = contract.money;
      this.payMethod = contract.payMethod;
      this.payRequest = contract.payRequest;
      this.lastMonth = contract.lastMonth;
      this.company = contract.company;
      this.legalPerson = contract.legalPerson;
      this.description = contract.description;
    } else {
      this.user = this.getCurrentUser();
      this.date = moment().format(this.dateFormat);
    }
    this.$nextTick(() => {
      this.form.setFieldsValue({
        no: this.no,
        planId: this.planId,
        contractDate: this.contractDate,
        money: this.money,
        payMethod: this.payMethod,
        payRequest: this.payRequest,
        lastMonth: this.lastMonth,
        company: this.company,
        legalPerson: this.legalPerson,
        description: this.description
      });
    });
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "plan-form" });
  },
  computed: {
    plans() {
      return PlanDAO.getPlans();
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(err => {
        if (!err) {
          err;
        }
      });
    },
    getCurrentUser() {
      return this.$store.state.account.user;
    },
    getContract(id) {
      return ContractDAO.getContract(id);
    },
    onRequestChange(value) {
      this.installment = value === contractData.payRequests.PAY_REQUEST_INSTALL;
    }
  }
};
</script>