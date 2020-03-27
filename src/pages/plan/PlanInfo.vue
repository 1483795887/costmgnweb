<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="方案名">
      {{plan.title}}
    </a-form-item>
    <a-form-item label="描述">
      {{plan.description}}
    </a-form-item>
    <a-form-item label="负责人">{{plan.work.user.name}}</a-form-item>
    <a-form-item label="部门">{{plan.work.user.department}}</a-form-item>
    <a-form-item label="修改时间">{{plan.work.date}}</a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit" @click="goBack">确定</a-button>
      <a-button :style="{ marginLeft: '24px' }" @click="goBack">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import PlanDAO from '../../dao/planDAO';
export default {
  data() {
    return {
      needToBack: true,
      desc: "查看方案信息",
      plan:{}
    };
  },
  mounted() {
    this.plan = this.getPlan(this.$route.params.id);
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "plan-form" });
  },
  methods: {
    getPlan(id){
      return PlanDAO.getPlan(id);
    },
    goBack(){
      this.$router.go(-1);
    }
  }
};
</script>