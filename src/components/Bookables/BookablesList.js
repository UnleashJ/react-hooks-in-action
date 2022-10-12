import { useReducer, Fragment, useEffect, useRef } from 'react';
import data from '../../static.json'
import { FaArrowRight } from 'react-icons/fa'
import Spinner from '../UI/Spinner'
import reducer from './reducer';
import getData from '../../utils/api';

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: false,
  bookables: [],
  isLoading: true,
  error: false
}

export default function BookablesList() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { group, bookableIndex, hasDetails, bookables, isLoading, error } = state

  const {days, sessions} = data
  const bookablesInGroup = bookables.filter(bookable => bookable.group === group)
  const groups = [...new Set(bookables.map(bookable => bookable.group))]
  const bookable = bookablesInGroup[bookableIndex] // 选中的可预订项

  // 每次组件渲染，都会返回同一个ref对象，因此ref.current的值不会变化
  const timerRef = useRef(null)
  const nextRef = useRef(null)

  useEffect(() => {
    async function getBookables() {
      try {
        let data = await getData('http://localhost:3001/bookables')
        dispatch({
          type: "FETCH_BOOKABLES_SUCCESS",
          payload: data
        })
      } catch (error) {
        dispatch({
          type:"FETCH_BOOKABLES_ERROR",
          payload: error
        })
      }
    }
    dispatch({type: "FETCH_BOOKABLES_REQUEST"}) // 开始发送请求
    getBookables()
  }, [])

  useEffect(() => {
    
  },[])

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
    nextRef.current.focus() // 聚焦在next按钮上
  }
  const toggleDetails = () => {
    dispatch({
      type: "TOGGLE_HAS_DETAILS",
    })
  }

  // 停止演讲
  const stopPresentation = () => {
    clearInterval(timerRef.current)
  }
  const startPresentation = () => {
    timerRef.current = setInterval(() => {
      dispatch({
        type: "NEXT_BOOKABLE",
      })
    }, 1000)

    // 返回清除计时器的函数，这样在组件卸载时可以自动清除计时器
    return stopPresentation;
  }

  if(error) return <p>{error.message}</p>

  if(isLoading) return <p><Spinner/> Loading bookables... </p>

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
            ref={nextRef}
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
                <button 
                  className='btn'
                  onClick={stopPresentation}
                >
                  Stop
                </button>
                <button 
                  className='btn'
                  onClick={startPresentation}
                >
                  Start
                </button>
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