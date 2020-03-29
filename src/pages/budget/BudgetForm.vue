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
      <a-input v-decorator="['companyName', { rules: [{ required: true, message: '请输入公司名!' }] }]" />
    </a-form-item>
    <a-form-item label="法人">
      <a-input v-decorator="['legalPerson', { rules: [{ required: true, message: '请输入法人名!' }] }]" />
    </a-form-item>
    <a-form-item label="描述">
      <a-input v-decorator="['desc']" />
    </a-form-item>
    <a-form-item label="负责人">{{contract.work.user.name}}</a-form-item>
    <a-form-item label="部门">{{contract.work.user.department}}</a-form-item>
    <a-form-item label="修改时间">{{contract.work.date}}</a-form-item>
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
import { formatDate, getToday } from "../../common/Date";

export default {
  data() {
    return {
      needToBack: true,
      installment: false,
      payMethods: contractData.payMethods,
      payRequests: contractData.payRequests,
      contract: {},
      dateFormat: "YYYY-MM-DD"
    };
  },
  mounted() {
    this.desc = this.$route.params.desc;

    this.contract = this.getContract(this.$route.params.id);
    if (this.contract == null) {
      this.contract = {};
      this.contract.payMethod = contractData.payMethods.PAY_METHOD_CASH;
      this.contract.payRequest = contractData.payRequests.PAY_REQUEST_ONCE;
      this.contract.money = 0;
      this.contract.work = {};
      this.contract.work.user = this.getCurrentUser();
      this.contract.work.status = "未提交";
      this.contract.work.date = formatDate(getToday());
    } else {
      this.contract.contractDate = moment(
        this.contract.contractDate,
        this.dateFormat
      );
    }
    this.$nextTick(() => {
      this.form.setFieldsValue(this.contract);
    });
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "plan-form" });
  },
  computed: {
    plans() {
      return PlanDAO.getPlans(this.getCurrentUser());
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(err => {
        if (!err) {
          var date = this.form.getFieldValue("contractDate");
          this.contract.contractDate = date.format(this.dateFormat);
          console.log(this.contract);
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