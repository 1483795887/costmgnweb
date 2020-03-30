<template>
  <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="合同编号">{{contract.no}}</a-form-item>
    <a-form-item label="合同方案编号">
      <router-link
        :to="{name:'方案详情',params:{id:contract.planId}}"
      >{{(Array(8).join('0') + contract.planId).slice(-8)}}</router-link>
    </a-form-item>
    <a-form-item label="合同签署日期">{{contract.contractDate}}</a-form-item>
    <a-form-item label="合同金额">{{'￥'+contract.money + '元'}}</a-form-item>
    <a-form-item label="付款方式">{{contract.payMethod}}</a-form-item>
    <a-form-item label="付款条件">{{contract.payRequest}}</a-form-item>
    <a-form-item label="持续月份" v-if="contract.payRequest==='分期付款'">{{contract.lastMonth}}</a-form-item>
    <a-form-item label="公司名">{{contract.companyName}}</a-form-item>
    <a-form-item label="法人">{{contract.legalPerson}}</a-form-item>
    <a-form-item label="描述">{{contract.desc}}</a-form-item>
    <a-form-item label="负责人">{{contract.work.user.name}}</a-form-item>
    <a-form-item label="部门">{{contract.work.user.department}}</a-form-item>
    <a-form-item label="修改时间">{{contract.work.date}}</a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit" @click="goBack">确定</a-button>
      <a-button html-type="submit" :style="{ marginLeft: '24px' }" @click="goBack">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import ContractDAO from "../../dao/contractDAO";

export default {
  data() {
    return {
      needToBack: true,
      desc: "查看合同信息",
      contract: {
        work: {
          user: {}
        },
        planId: 0
      }
    };
  },
  methods: {
    getContract(id) {
      this.contract = ContractDAO.getContract(id);
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.getContract(this.$route.params.id);
  }
};
</script>