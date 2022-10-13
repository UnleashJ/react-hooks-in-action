import { addDays, shortISO } from "../../utils/date-wrangler"
import data from '../../static.json'

// 网格生成器，根据可预订项和开始日期，生成一个日期与时间段的网格
export function getGrid(bookable, startDate) {
  const dates = bookable.days.map(
    d => shortISO(addDays(startDate, d))
  )
  const sessions = bookable.sessions.map(s => data.sessions[s])

  const grid = {} // 最终返回的grid对象

  sessions.forEach(session => {
    grid[session] = {}
    dates.forEach(date => {
      grid[session][date] = {
        session,
        date,
        bookableId: bookable.id,
        title: ''
      }
    })
  });

  return {
    grid,
    dates,
    sessions
  }
}

// 将服务端返回的预订信息数组，转换成可在页面展示的预订信息对象，该对象可通过bookings.session.date来访问某一条预订信息
export function transformBookings(bookingsArray) {
  return bookingsArray.reduce((bookings, booking) => {
    const s = bookings[booking.session] = bookings[booking.session] || {}
    s[booking.date] = booking
    return bookings
  }, {})
}