import post from '../common/post'

export default {
  getContracts(type, callback) {
    post('/api/contract/getContracts', type, callback);
  },
  getContract(id, callback) {
    post('/api/contract/getContract', id, callback);
  }, addContract(contract, callback) {
    post('/api/contract/addContract', contract, callback);
  }, submitContracts(idList, callback) {
    post('/api/contract/submitContract', idList, callback);
  }, approveContracts(value, callback) {
    post('/api/contract/approveContract', value, callback);
  }, refuseContracts(value, callback) {
    post('/api/contract/refuseContract', value, callback);
  }
}