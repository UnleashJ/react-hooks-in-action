import { useEffect, useMemo, useState } from "react"
import { getGrid, transformBookings } from './grid-builder'
import { getBookings } from '../../utils/api'
import Spinner from "../UI/Spinner"

export default function BookingsGrid(props) {
  const { week, bookable, booking, setBooking } = props
  const [bookings, setBookings] = useState(null) // 预订信息
  const [error, setError] = useState(false)

  // 返回记忆化的值
  const {grid, sessions, dates} = useMemo(
    () => bookable ? getGrid(bookable, week.start) : {}, 
    [bookable, week.start]
  )


  useEffect(() => {
    if(bookable) {
      let doUpdate = true
      setBookings(null)
      setError(false)
      setBooking(null)
      // 存在可预订项才发请求，请求相关的预订信息
      async function fetchData() {
        try {
          let res = await getBookings(bookable.id, week.start, week.end)
          if(doUpdate) {
            console.log(res, transformBookings(res))
            setBookings(transformBookings(res))
          } else {
            console.log('doUpdate false')
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
      return () => doUpdate = false // 清楚函数，执行下一个Effect前
    }
  }, [week, bookable, setBooking])

  function cell(session, date) {
    // 返回某一个单元格（可在这个函数中添加样式）
    const cellData = bookings?.[session]?.[date] || grid[session][date];
    const isSelected = booking?.session === session && booking?.date === date;
    return (
      <td
        key={date}
        className={isSelected ? "selected" : null}
        onClick={bookings ? () => setBooking(cellData) : null}
      >
        {cellData.title}
      </td>
    )
  }

  if(!grid) {
    return <p>Loading...</p>
  }

  return (
    <>
      { error && (
        <p className="bookingsError">
          {`There was a problem loading the bookings data ${error}`}
        </p>
      )}

      <table className={bookings ? "bookingsGrid active" : "bookingsGrid"}>
        <thead>
          <tr>
            <th>
              <span className="status">
                <Spinner/>
              </span>
            </th>
            { dates.map(d => (
              <th key={d}>
                {(new Date(d)).toDateString()}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {
            sessions.map(session => (
              <tr key={session}>
                <th key={session}>{session}</th>
                {dates.map(date => (cell(session, date)))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}