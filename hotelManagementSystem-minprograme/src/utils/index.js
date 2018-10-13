function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  // const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1}`
}
export function validName (val) {
  let err = ''
  if (!val) {
    err = '请输入用户名'
  } else if (val < 2 || val > 10) {
    err = '用户名2-10位'
  } else {
    err = ''
  }
  return err
}
export function validPassword (val) {
  let err = ''
  if (!val) {
    err = '请输入密码'
  } else if (val < 6 || val > 12) {
    err = '密码为6-12位字符'
  } else {
    err = ''
  }
  return err
}
export function validMobile (val) {
  let err = ''
  if (!val) {
    err = '请输入电话号码'
  } else if (!(/^1[34578]\d{9}$/.test(val))) {
    err = '请输入合法的电话号码'
  } else {
    err = ''
  }
  return err
}

export function plusXing (str, frontLen, endLen) {
  var len = str.length - frontLen - endLen
  var xing = ''
  for (var i = 0; i < len; i++) {
    xing += '*'
  }
  return str.substr(0, frontLen) + xing + str.substr(str.length - endLen)
}
export default {
  formatNumber,
  formatTime,
  validName,
  validPassword,
  validMobile,
  plusXing
}
