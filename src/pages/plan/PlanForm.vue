<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="方案名">
      <a-input v-decorator="['title', { rules: [{ required: true, message: '请输入方案名!' }] }]" />
    </a-form-item>
    <a-form-item label="描述">
      <a-input v-decorator="['description']" />
    </a-form-item>
    <a-form-item label="负责人">{{plan.work.user.name}}</a-form-item>
    <a-form-item label="部门">{{plan.work.user.department}}</a-form-item>
    <a-form-item label="修改时间">{{plan.work.date}}</a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">确定</a-button>
      <a-button :style="{ marginLeft: '24px' }">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import PlanDAO from "../../dao/planDAO";
import { formatDate, getToday } from "../../common/Date";

export default {
  data() {
    return {
      needToBack: true,
      plan: {}
    };
  },
  mounted() {
    this.desc = this.$route.params.desc;
    this.plan = this.getPlan(this.$route.params.id);
    if (this.plan == null) {
      this.plan = {};
      this.plan.work = {};
      this.plan.work.user = this.$store.state.account.user;
      this.plan.work.date = formatDate(getToday());
    }
    this.$nextTick(() => {
      this.form.setFieldsValue(this.plan);
    });
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "plan-form" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
        }
      });
    },
    getPlan(id) {
      return PlanDAO.getPlan(id);
    }
  }
};
</script>