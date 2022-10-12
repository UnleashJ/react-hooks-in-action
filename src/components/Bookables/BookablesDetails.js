import { useState } from "react"
import data from '../../static.json'

export default function BookablesDetails({bookable}) {
  const {days, sessions} = data
  const [hasDetails, setHasDetails] = useState(true)

  const toggleDetails = () => {
    setHasDetails(state => !state)
  }

  return (
    <div>
      {bookable && (
        <div className='bookable-details'>
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>
              <span className="controls">
                <label>
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    onChange={toggleDetails} 
                  />
                  Show Deatils
                </label>
              </span>
            </div>
            <p>{bookable.notes}</p>
            {hasDetails && (
              <div className="item-details">
                <h3>Availablility</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days.sort().map(d => <li key={d}>{days[d]}</li>)}
                  </ul>
                  <ul>
                    {bookable.sessions.sort().map(s => <li key={s}>{sessions[s]}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}