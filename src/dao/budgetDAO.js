import UserData from './userDAO'

const budget1 = {
  id: 1,
  year: 2020,
  month: 3,
  money: 1000,
  type: '营销',
  work: {
    user: UserData.getUsers()[0],
    status: '未通过'
  }
}

const budget2 = {
  id: 2,
  year: 2020,
  month: 3,
  money: 2000,
  type: '工资',
  work: {
    user: UserData.getUsers()[1],
    status: '已通过'
  }
}

const budget3 = {
  id: 3,
  year: 2020,
  month: 3,
  money: 2300,
  type: '销售',
  work: {
    user: UserData.getUsers()[2],
    status: '未通过'
  }
}

const budgets = [budget1, budget2, budget3]

export default {
  getBudgets() {
    return budgets
  },
  getBudget(id) {
    if (id == null)
      return null;
    else
      return budget1;
  }
}