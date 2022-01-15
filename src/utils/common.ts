

export const playCountAddUnit=(value: number)=>{
  if(!value) return
  if(value>10000*10000){
    return parseInt(String(value/(10000*10000)))+'亿'
  }
  if(value>10000){
    return parseInt(String(value/10000))+'万'
  }
}

/**补 0 */
export const formatNumber = (n: number | string): string => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**格式化时间戳为日期 */
export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}