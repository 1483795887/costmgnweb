import UserData from './userDAO'

const cost1 = {
  id: 1,
  type: "营销",
  money: 100,
  budgetId: undefined,
  work: {
    user: UserData.getDummyUsers()[0],
    status: '待审核',
    date: "20200302"
  }
}

const cost2 = {
  id: 2,
  type: "营销",
  money: 300,
  budgetId: 1,
  work: {
    user: UserData.getDummyUsers()[1],
    status: '待支付',
    date: "20200304"
  }
}

const cost3 = {
  id: 3,
  type: "营销",
  money: 500,
  budgetId: 2,
  work: {
    user: UserData.getDummyUsers()[2],
    status: '退回',
    date: "20200303"
  }
}

const costs = [cost1, cost2, cost3]

export default {
  getCosts() {
    return costs;
  }, getCost(id) {
    if (id == null)
      return null;
    else
      return cost1;
  }, getCostsByBudget(budgetId) {
    if (budgetId != null)
      return costs;
    else return null;
  }, getCostsByIds(ids) {
    if (ids != null) {
      return costs;
    }
  }
}