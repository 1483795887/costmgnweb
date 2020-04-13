import post from "../common/post";

export default {
  getBudgets(type, callback) {
    post('/api/budget/getBudgets', type, callback);
  },
  getBudget(id, callback) {
    post('/api/budget/getBudget', id, callback);
  }, addBudget(budget, callback) {
    post('/api/budget/addBudget', budget, callback);
  }, submitBudgets(idList, callback) {
    post('/api/budget/submitBudget', idList, callback);
  }, approveBudgets(value, callback) {
    post('/api/budget/approveBudget', value, callback);
  }, refuseBudgets(value, callback) {
    post('/api/budget/refuseBudget', value, callback);
  }
}