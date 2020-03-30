import UserData from './userDAO'

const budget1 = {
  id: 1,
  year: 2020,
  month: 3,
  money: 1000,
  type: '营销',
  occupied: 100,
  work: {
    user: UserData.getUsers()[0],
    status: '未通过',
    date: '2020-02-04'
  }
}

const budget2 = {
  id: 2,
  year: 2020,
  month: 3,
  money: 2000,
  type: '工资',
  occupied: 0,
  work: {
    user: UserData.getUsers()[1],
    status: '已通过',
    date: '2020-02-04'
  }
}

const budget3 = {
  id: 3,
  year: 2020,
  month: 3,
  money: 2300,
  type: '销售',
  occupied: 300,
  work: {
    user: UserData.getUsers()[2],
    status: '未通过',
    date: '2020-02-04'
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