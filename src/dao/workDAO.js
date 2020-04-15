import post from '../common/post'

export default {
  getCurWorks(callback) {
    post('/api/work/getCurWorks', null, callback);
  }, getToDoWorks(callback) {
    post('/api/work/getToDoWorks', null, callback);
  }
}