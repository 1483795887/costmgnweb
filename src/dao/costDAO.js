import post from "../common/post";

export default {
  getCost(id, callback) {
    post('/api/cost/getCost', id, callback);
  }, getCosts(type, callback) {
    post('/api/cost/getCosts', type, callback);
  }, addCost(value, callback) {
    post('/api/cost/addCost', value, callback);
  }, updateCost(value, callback) {
    post('/api/cost/updateCost', value, callback);
  }, submitCosts(value, callback) {
    post('/api/cost/submitCost', value, callback);
  }, approveCosts(value, callback) {
    post('/api/cost/approveCost', value, callback);
  }, refuseCosts(value, callback) {
    post('/api/cost/refuseCost', value, callback);
  }, getCostsByBudget(budgetId, callback) {
    post('/api/cost/getCostsForBudget', budgetId, callback)
  }
}