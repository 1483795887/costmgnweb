import contractData from '../common/contract'

const contract = {
  id: 1,
  no: "20200302001",
  contractDate: "2020-02-01",
  companyName: "A公司",
  legalPerson: '张四',
  money: 123456,
  payMethod: contractData.payMethods.PAY_METHOD_CASH,
  payRequest: contractData.payRequests.PAY_REQUEST_ONCE,
  lastMonth: 1,
  planId: 1,
  work: {
    user: {
      name: "张三",
      department: "生产"
    },
    date: '2020-01-01',
    status: "已完成"
  }
}

export default {
  getContract(id) {
    if (id == null)
      return null
    else
      return contract;
  }
}