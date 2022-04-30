

export const playCountAddUnit = (value: number) => {
  if (!value) return
  if (value > 10000 * 10000) {
    return parseInt(String(value / (10000 * 10000))) + '亿'
  }
  if (value > 10000) {
    return parseInt(String(value / 10000)) + '万'
  }
}

/**补 0 */
export const addZero = (n: number | string): string => n.toString()[1] ? n.toString() : '0' + n.toString()

/**格式化时间戳为日期 */
export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(addZero).join('-') + ' ' + [hour, minute, second].map(addZero).join(':')
}
/**
 * 总秒 => min:second
 * @param time 秒
 * @returns 
 */
export const fmtTime = (time?: number) => {
  if (!time) return '00:00'
  let min = 0
  let second = 0
  if (typeof time !== 'number') throw new TypeError('必须是数字类型')
  min = Math.floor(time / 60) >= 0 ? Math.floor(time / 60) : 0;
  second = Math.floor(time % 60) >= 0 ? Math.floor(time % 60) : 0;
  return `${addZero(min)}:${addZero(second)}`
}