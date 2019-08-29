/**
 * 序列化get参数
 *
 * @param {Object}params 参数列表
 */
function stringifyParams(params) {
  // 值为null和undefined时，则过滤掉
  const encodeFn = encodeURIComponent;
  const paramsStr = params && Object.entries(dataCompile(params)).map(([name, value]) => {
    return `${name}=${encodeFn(value)}`;
  }).join('&');
  return paramsStr;
}

/**
 *  判断传入参数的类型，以字符串的形式返回
 *  @obj：数据
 **/
function dataType(obj) {
  if (obj === null) return 'Null';
  if (obj === undefined) return 'Undefined'; // eslint-disable-line
  return Object.prototype.toString.call(obj).slice(8, -1);
}

/**
 * 过滤数据中null和undefined
 * @param {object}data
 */
function dataCompile(data) {
  const validData = {};
  for (const prop in data) {
    if (Object.prototype.hasOwnProperty.call(data, prop)) {
      const value = data[prop];
      if (dataType(value) === 'Object') {
        validData[prop] = dataCompile(value);
      } else if (value !== null && typeof value !== 'undefined' && value !== '') {
        validData[prop] = value;
      }
    }
  }
  return validData;
}
/**
 * 时间戳转时间 yyyy-MM-dd HH:mm:ss
 */
function add0(m) { return m < 10 ? '0' + m : m }
function timestampToTime(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const mm = date.getMinutes();
  const s = date.getSeconds();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}
// 在日期的基础上添加天数
function addDate(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  const m = d.getMonth() + 1;
  return d.getFullYear() + '-' + m + '-' + d.getDate();
}

function getBrowserInfo() {
  const agent = navigator.userAgent.toLowerCase();
  const regStr_ie = /msie [\d.]+;/gi;
  const regStr_ff = /firefox\/[\d.]+/gi;
  const regStr_chrome = /chrome\/[\d.]+/gi;
  const regStr_saf = /safari\/[\d.]+/gi;
  const browerInfo = {};
  let browerStr = '';
  // IE
  if (agent.indexOf('msie') > 0) {
    browerStr = agent.match(regStr_ie);
  }
  // firefox
  if (agent.indexOf('firefox') > 0) {
    browerStr = agent.match(regStr_ff);
  }
  // Chrome
  if (agent.indexOf('chrome') > 0) {
    browerStr = agent.match(regStr_chrome);
  }
  // Safari
  if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
    browerStr = agent.match(regStr_saf);
  }
  const browerArr = browerStr[0].split('/');
  browerInfo.browerName = browerArr[0];
  browerInfo.browerVersion = browerArr[1];
  return browerInfo;
}

function detectOS() {
  const os = navigator.platform;
  const userAgent = navigator.userAgent;
  if (os.indexOf('Win') > -1) {
    if (userAgent.indexOf('Windows NT 5.0') > -1) {
      return 'Win2000';
    } else if (userAgent.indexOf('Windows NT 5.1') > -1) {
      return 'WinXP';
    } else if (userAgent.indexOf('Windows NT 5.2') > -1) {
      return 'Win2003';
    } else if (userAgent.indexOf('Windows NT 6.0') > -1) {
      return 'WindowsVista';
    } else if (userAgent.indexOf('Windows NT 6.1') > -1 || userAgent.indexOf('Windows 7') > -1) {
      return 'Win7';
    } else if (userAgent.indexOf('Windows 8') > -1) {
      return 'Win8';
    } else {
      return 'Other';
    }
  } else if (os.indexOf('Mac') > -1) {
    return 'Mac';
  } else if (os.indexOf('X11') > -1) {
    return 'Unix';
  } else if (os.indexOf('Linux') > -1) {
    return 'Linux';
  } else {
    return 'Other';
  }
}

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

function isUrl(path) {
  return reg.test(path);
}

const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
function isEmail(email) {
  return regEmail.test(email);
}

function dateCompare(d1, d2) {
  if (d1 && d2 && ((new Date(d1.replace(/-/g, '\/'))) > (new Date(d2.replace(/-/g, '\/'))))) {
    return true;
  }
  return false;
}
function trimAndBr(string) {
  let resultStr = trim(ClearBr(string));
  return resultStr;
}
// 去除换行
function ClearBr(key) {
  let tempKey = key;
  tempKey = key.replace(/<\/?.+?>/g, '');
  tempKey = key.replace(/[\r\n]/g, '');
  return tempKey;
}
// 去掉字符串两端的空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}
/**
 * 生成唯一标识
 */
function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8); // eslint-disable-line
    return v.toString(16);
  });
}

function showLevel(value) {
  switch (value) {
    case 1:
      return '一级';
    case 2:
      return '二级';
    case 3:
      return '三级';
    case 4:
      return '四级';
    case 5:
      return '五级';
    case 6:
      return '六级';
    case 7:
      return '七级';
    case 8:
      return '八级';
    case 9:
      return '九级';
    default:
      break;
  }
}

const regPassword = /^[a-zA-Z0-9]{8,20}$/;
function isAvailablePassword(password) {
  return regPassword.test(password);
}

/**
 * 是否纯中文
  * @param r
 * @returns {boolean}
 */
function isChinese(r) {
  const re = /[^\u4e00-\u9fa5]/;
  return re.test(r);
}

/**
 * 是否包含特殊字符
 * @param r
 * @returns {boolean}
 */
function checkIsHasSpecialStr(r) {
  const re = /[~!@#$%^&*()/\|,.<>?"'();:_+-=\[\]{}]/;
  return re.test(r);
}
export {
  stringifyParams,
  dataCompile,
  timestampToTime,
  dateCompare,
  addDate,
  getBrowserInfo,
  detectOS,
  isUrl,
  guid,
  isEmail,
  trimAndBr,
  showLevel,
  isAvailablePassword,
  isChinese,
  checkIsHasSpecialStr
};
