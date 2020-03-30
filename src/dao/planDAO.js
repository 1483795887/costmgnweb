const plan1 = {
  id: 1,
  title: "方案1",
  description: "方案1啊啊啊",
  work: {
    user: {
      name: "张三",
      department: "生产"
    },
    status: "已通过",
    date: "2020-02-01",
  }
}

const plan2 = {
  id: 2,
  title: "方案2",
  description: "方案2啊啊啊",
  work: {
    user: {
      name: "张三",
      department: "生产"
    },
    status: "已通过",
    date: "2020-02-02",
  }
}

const plan3 = {
  id: 3,
  title: "方案3",
  description: "方案3啊啊啊",
  work: {
    user: {
      name: "张三",
      department: "生产"
    },
    status: "未提交",
    date: "2020-02-03",
  }
}

const plan4 = {
  id: 4,
  title: "方案4",
  description: "方案4啊啊啊",
  work: {
    user: {
      name: "张三",
      department: "生产"
    },
    status: "已通过",
    date: "2020-02-04",
  }
}

const plans = [
  plan1, plan2, plan3, plan4
]

export default {
  getPlan(id) {
    if (id == null)
      return null
    else
      return plan1;
  }, getPlans() {
    return plans;
  }
}