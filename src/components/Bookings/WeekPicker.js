import { useState } from "react";
import { FaChevronLeft, FaCalendarDay, FaChevronRight, FaCalendarCheck } from 'react-icons/fa'

export default function WeekPicker({dispatch}) {
  const [dateText, setDateText] = useState("2022-10-11")

  const goToDate = () => {
    dispatch({
      type: "SET_DATE",
      payload: dateText
    })
  }

  return (
    <div>
      <p className="date-picker">
        <button
          className="btn"
          onClick={() => dispatch({type: 'PREV_WEEK'})}
        >
          <FaChevronLeft/>
          <span>Prev</span>
        </button>

        <button
          className="btn"
          onClick={() => dispatch({type: 'TODAY'})}
        >
          <FaCalendarDay/>
          <span>Today</span>
        </button>

        <span>
          <input 
            type="text"
            value={dateText}
            onChange={(e) => setDateText(e.target.value)}
            placeholder="e.g. 2022-10-11"
          />
          <button className="go btn" onClick={goToDate}>
            <FaCalendarCheck/>
            <span>Go</span>
          </button>
        </span>
        <button
          className="btn"
          onClick={() => dispatch({type: 'NEXT_WEEK'})}
        >
          <span>Next</span>
          <FaChevronRight/>
        </button>
      </p>
    </div>
  )
}