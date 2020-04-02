import request from './request'

export default function post(url, data, onSuccess) {
  request({
    url: url,
    method: 'post',
    data: JSON.stringify(data)
  }).then(result => {
    if (result.status == 200)
      onSuccess(result.data);
    else
      console.log(result.statusText);

  }).catch(error => {
    console.log(error);
  })
}