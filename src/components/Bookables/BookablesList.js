import { useState, Fragment } from 'react';
import data from '../../static.json'
import { FaArrowRight } from 'react-icons/fa'

export default function BookablesList() {
  const {bookables, days, sessions} = data
  const [group, setGroup] = useState('Kit') // 分组：Rooms, Kit
  const bookablesInGroup = bookables.filter(bookable => bookable.group === group)
  const groups = [...new Set(bookables.map(bookable => bookable.group))]
  const [bookableIndex, setBookableIndex] = useState(1)
  const bookable = bookablesInGroup[bookableIndex] // 选中的可预订项
  const [hasDetails, setHasDetails] = useState(false)
  const nextBookable = () => {
    setBookableIndex(i => (i+1) % bookablesInGroup.length)
  }

  return (
    <Fragment>
      <div>
        <select value={group} onChange={e => setGroup(e.target.value)}>
          {groups.map(g => <option value={g} key={g}>{g}</option>)}
        </select>
        <ul className='bookables items-list-nav'>
          {
            bookablesInGroup.map((b, i) => (
              <li 
                key={b.id} 
                className={i === bookableIndex ? 'selected': null}
              >
                <button 
                  className='btn'
                  onClick={() => setBookableIndex(i)}
                >
                  {b.title}
                </button>
              </li>
            ))
          }
        </ul>
        <div>
          <button
            className='btn'
            onClick={nextBookable}
            autoFocus
          >
            <FaArrowRight/>
            <span>Next</span>
          </button>
        </div>
      </div>

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
                    onChange={() => setHasDetails(has => !has)} 
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
    </Fragment>
  )
}