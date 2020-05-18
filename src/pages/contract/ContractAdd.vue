<template>
  <a-form
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
    @submit="handleSubmit"
  >
    <a-form-item label="合同名称">
      <a-input v-decorator="['title', { rules: [{ required: true, message: '请输入合同名称!' },{validator:titleValidator}] }]" />
    </a-form-item>
    <a-form-item label="合同编号">
      <a-input v-decorator="['no', { rules: [{ required: true, message: '请输入合同编号!' },{validator:contractNoValidator}] }]" />
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
      <a-input-number
        precision=2
        max=99999999.99
        v-decorator="['money', { rules: [{ required: true, message: '请输入金额!' },{validator:moneyValidator}]}]"
      />元
    </a-form-item>
    <a-form-item label="付款方式">
      <a-select v-decorator="['payMethod', { rules: [{ required: true, message: '请选择付款方式!' }]}]">
        <a-select-option
          v-for="(item,key) in payMethods"
          :key="key"
          :value="item"
        >{{item}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="付款条件">
      <a-select
        v-decorator="['payRequest', { rules: [{ required: true, message: '请选择付款条件!' }]}]"
        @change="onRequestChange"
      >
        <a-select-option
          v-for="(item,key) in payRequests"
          :key="key"
          :value="item"
        >{{item}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="持续月份"
      v-show="installment"
    >
      <a-input v-decorator="['lastMonth', { rules: [{ required: installment, message: '请输入持续月份!' }] }]" />
    </a-form-item>
    <a-form-item label="公司名">
      <a-input v-decorator="['company', { rules: [{ required: true, message: '请输入公司名!' },{validator:companyValidator}] }]" />
    </a-form-item>
    <a-form-item label="法人">
      <a-input v-decorator="['legalPerson', { rules: [{ required: true, message: '请输入法人名!' },{validator:legalValidator}] }]" />
    </a-form-item>
    <a-form-item label="描述">
      <a-input v-decorator="['description',{rules:[{validator:descriptionValidator}]}]" />
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
        @click = "()=>$router.go(-1)"
      >取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import moment from "moment";
import contractData from "../../common/contract";
import ContractDAO from "../../dao/contractDAO";
import PlanDAO from "../../dao/planDAO";
import Const from "../../common/const";

export default {
  data() {
    return {
      desc: "新增合同",
      needToBack: true,
      installment: false,
      payMethods: contractData.payMethods,
      payRequests: contractData.payRequests,
      dateFormat: "YYYY-MM-DD",
      no: "",
      title: "",
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
      date: "",
      plans: [],
      department: ""
    };
  },
  mounted() {
    this.desc = this.$route.params.desc;
    PlanDAO.getPlans(3, this.getPlansCallback);
    this.user = this.getCurrentUser();
    this.date = moment().format(this.dateFormat);
    this.department = Const.getDepartment(this.user.department);
    this.$nextTick(() => {
      this.form.setFieldsValue({
        no: this.no,
        planId: this.planId,
        contractDate: this.contractDate,
        money: this.money,
        title: this.title,
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
    this.form = this.$form.createForm(this, { name: "contract-form" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          var contract = {};
          contract.contractNo = values.no;
          contract.planId = values.planId;
          contract.contractDate = values.contractDate;
          contract.money = values.money;
          contract.title = values.title;
          contract.payMethod = values.payMethod;
          contract.payRequest = values.payRequest;
          contract.lastMonth = values.lastMonth;
          contract.company = values.company;
          contract.legalPerson = values.legalPerson;
          contract.description = values.description;

          ContractDAO.addContract(contract, this.addContractCallback);
        }
      });
    },
    getCurrentUser() {
      return this.$store.state.account.user;
    },
    getPlansCallback(data) {
      if (data.code == 0) {
        this.plans = data.data;
      }
    },
    addContractCallback(data) {
      if (data.code == 0) {
        this.$router.go(-1);
      }
    },
    onRequestChange(value) {
      this.installment = value === contractData.payRequests.PAY_REQUEST_INSTALL;
    },
    titleValidator(rule, value, callback) {
      if (value && value.length > 20) {
        callback("长度过长");
      } else callback();
    },
    contractNoValidator(rule, value, callback) {
      if (value && value.length > 20) {
        callback("长度过长");
      } else callback();
    },
    companyValidator(rule, value, callback) {
      if (value && value.length > 20) {
        callback("长度过长");
      } else callback();
    },
    legalValidator(rule, value, callback) {
      if (value && value.length > 10) {
        callback("长度过长");
      } else callback();
    },
    descriptionValidator(rule, value, callback) {
      if (value && value.length > 200) {
        callback("长度过长");
      } else callback();
    },
    getBudgetsCallback(data) {
      if (data.code == 0) {
        this.dataSource = data.data;
      }
    },
    moneyValidator(rule, value, callback) {
      if (value <= 0) {
        callback("金额必须为正");
      } else callback();
    }
  }
};
</script>