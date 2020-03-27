export function datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式 
  var dateSpan;
  sDate1 = Date.parse(sDate1);
  sDate2 = Date.parse(sDate2);
  dateSpan = sDate2 - sDate1;
  dateSpan = Math.abs(dateSpan);
  var iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
  return iDays;
}

export function getDateFromString(strDate){
  var dateArr = strDate.split('-');
  var year = parseInt(dateArr[0]);
  var month = parseInt(dateArr[1]);
  var day = parseInt(dateArr[2]);
  return getRealDate(year, month, day);
}

export function formatDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day);
}

export function getRealDate(year, month, day) {
  return new Date(year, month - 1, day);
}


export function getToday() {
  return new Date();
}

export function getLastYearDate(date) {
  return getRealDate(date.getFullYear() - 1, date.getMonth() + 1, date.getDate());
}

export function getThisSunday(date) {
  return getRealDate(date.getFullYear(), date.getMonth() + 1, date.getDate() - date.getDay());
}

export function getThisMonth(date) {
  return getRealDate(date.getFullYear(), date.getMonth() + 1, 1);
}