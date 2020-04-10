<template>
  <a-form
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
  >
    <a-form-item label="方案名">{{plan.title}}</a-form-item>
    <a-form-item label="描述">{{plan.description}}</a-form-item>
    <a-form-item label="负责人">{{plan.work.user.name}}</a-form-item>
    <a-form-item label="部门">{{department}}</a-form-item>
    <a-form-item label="修改时间">{{plan.work.date}}</a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button
        type="primary"
        html-type="submit"
        @click="goBack"
      >确定</a-button>
      <a-button
        :style="{ marginLeft: '24px' }"
        @click="goBack"
      >取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import PlanDAO from "../../dao/planDAO";
import Const from "../../common/const";

export default {
  data() {
    return {
      needToBack: true,
      desc: "查看方案信息",
      plan: {
        work: {
          user: {}
        }
      },
      department: ""
    };
  },
  mounted() {
    PlanDAO.getPlan(this.$route.params.id, this.getPlanCallback);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getPlanCallback(data) {
      if (data.code == 0) {
        this.plan = data.data;
        this.department = Const.getDepartment(this.plan.work.user.department);
      }
    }
  }
};
</script>