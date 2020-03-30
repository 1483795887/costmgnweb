<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="方案名">
      <a-input v-decorator="['title', { rules: [{ required: true, message: '请输入方案名!' }] }]" />
    </a-form-item>
    <a-form-item label="描述">
      <a-input v-decorator="['description', { rules: [{ required: true, message: '请输入方案描述!' }] }]" />
    </a-form-item>
    <a-form-item label="负责人">{{user.name}}</a-form-item>
    <a-form-item label="部门">{{user.department}}</a-form-item>
    <a-form-item label="修改时间">{{date}}</a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">确定</a-button>
      <a-button :style="{ marginLeft: '24px' }">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import moment from "moment";
import PlanDAO from "../../dao/planDAO";

export default {
  data() {
    return {
      needToBack: true,
      title: "",
      description: "",
      user: {},
      dateFormat: "YYYY-MM-DD",
      date:""
    };
  },
  mounted() {
    this.desc = this.$route.params.desc;
    var plan = this.getPlan(this.$route.params.id);
    if (plan != null) {
      this.user = plan.work.user;
      this.title = plan.title;
      this.description = plan.description;
      this.date = plan.work.date;
    } else {
      this.user = this.$store.state.account.user;
      this.date = moment().format(this.dateFormat);
    }
    this.$nextTick(() => {
      this.form.setFieldsValue({
        title: this.title,
        description: this.description
      });
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