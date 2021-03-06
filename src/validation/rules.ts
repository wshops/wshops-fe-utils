import { RegexRules } from './types'

/**
 * 重复字符串不超过限定次数
 * @param content 指定字符，a|b|\\d
 * @param num 次数
 */
const norepeat = (content: string, num = 1) =>
  new RegExp(`^(?!.*(${ content }).*\\1{${ num },}).+$`, 'i')

const turl = (prefix: string, files = '') => {
  let s = `^(${prefix}):\\/\\/[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-\\@?^=%&/~\\+#])?`

  if (files !== '') s = s + `.(${files})+`
  s = s + '$'
  return new RegExp(s, 'i')
}
/**
 * 文件扩展名
 * @param types 类型，pdf|doc
 */
const ext = (types: string) =>
  new RegExp(`^[^<>/\\\\\\|:\'\'\\*\\?]+\\.(${ types })+$`, 'i')

const RulesSet: RegexRules = {
  required: /.+/,
  english: /^[A-Za-z]+$/,
  alphanum: /^[a-zA-Z0-9]+$/,
  chinese: /^[\u2E80-\uFE4F]+$/,
  upper: /[A-Z]/,
  lower: /[a-z]/,
  hasLetter: /[A-Za-z]/,
  hasDigit: /\d/,
  hasSpec: /[!@#$%^&*?\(\)]/,
  nospace: /^\S+$/,
  nodbc: /^[^\uFF01-\uFF60\uFF0A-\uFF5F\u3000-\u3003]+$/,
  norepeat: norepeat('.'),
  nospec: /^[^><,\[\]\{\}\?\/\+=\|\'\\\':;\~\!\@\#\*\$\%\^\&\(\)`]+$/,
  qq: /^[1-9]\d{4,10}$/,
  age: /^(0|[1-9]\d?|1[0-2]\d)$/,
  zipcode: /^(\d[1-7]|[1-9][0-7])\d{4}$/,
  ip: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  ipv6: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/, // eslint-disable-line max-len
  port: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,
  domain: /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/i,
  bizcode: /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/,
  invoice: /^(((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12]))\d{5}[1-9][1-7][0-4])$/,
  bankcard: /^[1-9]\d{9,29}$/,
  pbcard: /^(10|30|35|37|4\d||5[0-6]|58|60|62|6[8-9]|84|8[7-8]|9[0-2]|9[4-6]|9[8-9])\d{14,17}$/,
  ticker: /^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/,
  passport: /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/,
  score: /^150$|^(\d|[1-9]\d|1[0-4]\d)(.5)?$/,
  currency: /(^-?[1-9]\d{0,2}($|(\,\d{3})*($|(\.\d{1,2}$))))|((^0(\.\d{1,2})?)|(^-0\.\d{1,2}))$/,
  float: /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/,
  positivefloat: /^(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/,
  integer: /^-?\d+$/,
  positiveint: /^\d+$/,
  decimal: /^-?\d+\.\d+$/,
  percent: /^-?\d+(\.\d+)?%$/,
  even: /^[02468]|[1-9]\d*[02468]$/,
  odd: /^[13579]|[1-9]\d*[13579]$/,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  url: turl('https?|ftp|wss?'),
  ftp: turl('ftp'),
  http: turl('https?'),
  ws: turl('wss?'),
  account: /^([a-zA-Z])[a-zA-Z_-]*[\w_-]*[\S]$|^([a-zA-Z])[0-9_-]*[\S]$|^[a-zA-Z]*[\S]$/,
  password: /^(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,}).*$/,
  complexPassword: /^(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*[!@#$%^&*?\(\)]).*$/,
  hex: /^[0-9A-F]+$/i,
  color: /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i,
  ascii: /^[\u0000-\u007F]+$/,
  base64: /^([A-Z0-9+\/]{4})*([A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i,
  md5: /^(([0-9A-F]{16})|([0-9A-F]{32}))$/i,
  uuid: /^[0-9A-F]{8}(-?)[0-9A-F]{4}\1[0-9A-F]{4}\1[0-9A-F]{4}\1[0-9A-F]{12}$/i,
  mobile: /^((\+86)|(86))?(13\d|(14[5-7])|(15([0-3]|[5-9]))|166|17(0|1|8])|18\d|19(8|9))\d{8}$/,
  telphone: /^[+]{0,1}\d{1,3}[ ]?([-]?(\d|[ ]){1,12})+$/,
  phone: /^((\+86)|(86))?((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
  year: /^(19|20)\d{2}$/,
  month: /^(0?[1-9]|1[0-2])$/,
  day: /^(([1-9])|([1-2]\d)|(3[0-1]))$/,
  hour: /^((1?\d)|(2[0-3]))$/,
  minute: /^[1-5]?\d$/,
  hmt: /^(\d|[01]\d|2[0-3]):[0-5]\d$/,
  time: /^(\d|([01]\d|2[0-3])):([0-5]\d):([0-5]\d)$/,
  date: /^((((1[6-9]|[2-9]\d)\d{2})(-|\/)(0?[13578]|1[02])\5(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})(-|\/)(0?[13456789]|1[012])\11(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})(-|\/)0?2\17(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))(-|\/)0?2\25(29)))$/, // eslint-disable-line max-len
  datetime: /^((((1[6-9]|[2-9]\d)\d{2})(-|\/)(0?[13578]|1[02])\5(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})(-|\/)(0?[13456789]|1[012])\11(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})(-|\/)0?2\17(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))(-|\/)0?2\25(29)))\s+(\d|([0-1]\d|2[0-3])):(\d|([0-5]?\d)):(\d|([0-5]?\d))$/, // eslint-disable-line max-len
  idcard: /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}(((19|20)\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((19|20)\d{2}(0[13578]|1[02])31)|((19|20)\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/,
  autocard: /^(([\u4EAC\u6D25\u6CAA\u6E1D\u5180\u8C6B\u4E91\u8FBD\u9ED1\u6E58\u7696\u9C81\u65B0\u82CF\u6D59\u8D63\u9102\u6842\u7518\u664B\u8499\u9655\u5409\u95FD\u8D35\u7CA4\u9752\u85CF\u5DDD\u5B81\u743C\u4F7F\u9886][A-Z](([0-9]{5}[A-HJK])|([A-HJK]([A-HJ-NP-Z0-9])[0-9]{4})))|([\u4EAC\u6D25\u6CAA\u6E1D\u5180\u8C6B\u4E91\u8FBD\u9ED1\u6E58\u7696\u9C81\u65B0\u82CF\u6D59\u8D63\u9102\u6842\u7518\u664B\u8499\u9655\u5409\u95FD\u8D35\u7CA4\u9752\u85CF\u5DDD\u5B81\u743C\u4F7F\u9886][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9\u6302\u5B66\u8B66\u6E2F\u6FB3\u4F7F\u9886]))$/,  // eslint-disable-line max-len
  longitude: /^(\-|\+)?(0?\d{1,2}\.\d{1,15}|1[0-7]?\d{1}\.\d{1,15}|180\.0{1,15})$/,
  latitude: /^(\-|\+)?([0-8]?\d{1}\.\d{1,15}|90\.0{1,15})$/,
  londms: /^(\-|\+)?(0?\d{1,2}\u00B0(\d|[0-5]\d)\u2032(\d|[0-5]\d)(\.\d{1,2})?\u2033|1[0-7]?\d{1}\u00B0(\d|[0-5]\d)\u2032(\d|[0-5]\d)(\.\d{1,2})?\u2033|180\u00B000\u203200\u2033)$/, // eslint-disable-line max-len
  latdms: /^(\-|\+)?([0-8]?\d{1}\u00B0(\d|[0-5]\d)\u2032(\d|[0-5]\d)(\.\d{1,2})?\u2033|90\u00B000\u203200\u2033)$/,
  approval: /^([\u2E80-\uFE4F]+)\u5B57(\u3014|\[)(19|20)\d{2}(\u3015|\])\u7B2C?\d{1,}\u53F7$/,
  citycode: /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12]))\d{4}$/,
  address: /^[\u2E80-\uFE4F]+(\u5E02|\u53BF|\u533A|\u65D7|\u4E61|\u9547|\u8857\u9053|\u5DDE)\S{3,}$/,
  isbn: /^(978\-\d\-\d{3}\-\d{5}\-[a-z0-9]$)|(978\d{9}[a-z0-9])$/i,
  tag: /^<([a-z1-6]+)([^<]+)*(>(.*)<\/\1>| *\/>)$/,
  jwt: /^([A-Za-z0-9\-_~+\/]+[=]{0,2})\.([A-Za-z0-9\-_~+\/]+[=]{0,2})(\.([A-Za-z0-9\-_~+\/]+[=]{0,2}))?$/,
  mac: /^[0-9A-F]{2}(\-|\:)[0-9A-F]{2}\1[0-9A-F]{2}\1[0-9A-F]{2}\1[0-9A-F]{2}\1[0-9A-F]{2}$/i,
  mask: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
  thunder: /^thunder:\/\/[a-zA-Z0-9]+=$/,
  ed2k: /^ed2k:\/\/|file|.+|\/$/,
  magnet: /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/,
  path: /^[a-zA-Z]:\\([^<>/\\\|:''\*\?]+\\?)+$/,
  file: /^[^<>/\\\|:''\*\?]+\.\w+$/,
  linuxfile: /^[^+-./\t\b@#$%*()\[\]][^/\t\b@#$%*()\[\]]{1,254}$/,
  imgurl: turl('https?', 'gif|png|jpg|jpeg|webp|svg'),
  doc: ext('pdf|txt|rtf|wps|doc|docx|xls|xlsx|ppt|pptx')
}

export default RulesSet