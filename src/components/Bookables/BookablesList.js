import { useReducer, Fragment } from 'react';
import data from '../../static.json'
import { FaArrowRight } from 'react-icons/fa'
import reducer from './reducer';

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: false,
  bookables: data.bookables
}

export default function BookablesList() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { group, bookableIndex, hasDetails, bookables } = state

  const {days, sessions} = data
  const bookablesInGroup = bookables.filter(bookable => bookable.group === group)
  const groups = [...new Set(bookables.map(bookable => bookable.group))]
  const bookable = bookablesInGroup[bookableIndex] // 选中的可预订项

  const nextBookable = () => {
    dispatch({
      type: "NEXT_BOOKABLE",
    })
  }
  const changeGroup = (e) => {
    dispatch({
      type: "SET_GROUP",
      payload: e.target.value
    })
  }
  const changeBookable = index => {
    dispatch({
      type: 'SET_BOOKABLE',
      payload: index
    })
  }
  const toggleDetails = () => {
    dispatch({
      type: "TOGGLE_HAS_DETAILS",
    })
  }

  return (
    <Fragment>
      <div>
        <select value={group} onChange={changeGroup}>
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
                  onClick={() => changeBookable(i)}
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
    </Fragment>
  )
}