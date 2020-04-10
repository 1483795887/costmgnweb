<template>
  <a-form
    :form="form"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
    @submit="handleSubmit"
  >
    <a-form-item label="方案名">
      <a-input v-decorator="['title', { rules: [{ required: true, message: '请输入方案名!' },{validator:titleValidator}] }]" />
    </a-form-item>
    <a-form-item label="描述">
      <a-input v-decorator="['description', { rules: [{ required: true, message: '请输入方案描述!' },{validator:descriptionValidator}] }]" />
    </a-form-item>
    <a-form-item label="负责人">{{user.name}}</a-form-item>
    <a-form-item label="部门">{{department}}</a-form-item>
    <a-form-item label="修改时间">{{date}}</a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button
        type="primary"
        html-type="submit"
      >确定</a-button>
      <a-button :style="{ marginLeft: '24px' }">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import moment from "moment";
import PlanDAO from "../../dao/planDAO";
import Const from "../../common/const";

export default {
  data() {
    return {
      needToBack: true,
      title: "",
      description: "",
      user: {},
      dateFormat: "YYYY-MM-DD",
      date: "",
      department:""
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
    this.department = Const.getDepartment(this.user.department);
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
      this.form.validateFields((err,values) => {
        if (!err) {
          var plan = {};
          plan.title = values.title;
          plan.description = values.description;
          PlanDAO.addPlan(plan,this.addPlanCallback);
        }
      });
    },
    addPlanCallback(data){
      if(data.code == 0){
        this.$router.go(-1);
      }
    },
    getPlan(id) {
      return PlanDAO.getPlan(id);
    },
    titleValidator(rule, value, callback) {
      if (value && value.length > 20) {
        callback("长度过长");
      } else callback();
    },
    descriptionValidator(rule, value, callback) {
      if (value && value.length > 200) {
        callback("长度过长");
      } else callback();
    }
  }
};
</script>