import post from '../common/post'

export default {
  getPlan(id, callback) {
    post('/api/plan/getPlan', id, callback);
  }, getPlans(type, callback) {
    post('/api/plan/getPlans', type, callback);
  }, addPlan(value, callback) {
    post('/api/plan/addPlan', value, callback);
  }, updatePlan(value, callback) {
    post('/api/plan/updatePlan', value, callback);
  }, submitPlans(value, callback) {
    post('/api/plan/submitPlan', value, callback);
  }, approvePlans(value, callback) {
    post('/api/plan/approvePlan', value, callback);
  }, refusePlans(value, callback) {
    post('/api/plan/refusePlan', value, callback);
  }
}