import contractData from '../common/contract'

const contract1 = {
  id: 1,
  no: "20200302001",
  contractDate: "2020-02-01",
  company: "A公司",
  legalPerson: '张四',
  title: '采购合同',
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

const contract2 = {
  id: 2,
  no: "20200302002",
  contractDate: "2020-02-02",
  company: "B公司",
  legalPerson: '张四',
  title: '采购合同',
  money: 123456,
  payMethod: contractData.payMethods.PAY_METHOD_CASH,
  payRequest: contractData.payRequests.PAY_REQUEST_INSTALL,
  lastMonth: 1,
  planId: 2,
  work: {
    user: {
      name: "张三",
      department: "生产"
    },
    date: '2020-01-01',
    status: "已完成"
  }
}

const contracts = [contract1, contract2]

export default {
  getContracts() {
    return contracts;
  },
  getContract(id) {
    if (id == null)
      return null
    else
      return contract1;
  }
}