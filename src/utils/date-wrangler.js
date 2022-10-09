// 将指定日期偏移指定天数
export function addDays(date, daysToAdd) {
  const clone = new Date(date.getTime())
  clone.setDate(clone.getDate() + daysToAdd)
  return clone
}

// 生成指定日期对应的Week对象
export function getWeek(forDate, datsOffset = 0) {
  const date = addDays(forDate, datsOffset) // 先获取偏移（上周或下周）之后的日期
  const day = date.getDay()
  // 从星期日开始，到星期六结束
  return {
    date,
    start: addDays(date, -day),
    end: addDays(date, 6 - day)
  }
}