import { Fragment, useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa'
import Spinner from '../UI/Spinner'
import getData from '../../utils/api';



export default function BookablesList({bookable, updateBookable: setBookable}) {
  const [ bookables, setBookables] = useState([])
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // 初始值默认请求中

  const group = bookable?.group;

  const bookablesInGroup = bookables.filter(bookable => bookable.group === group)
  const groups = [...new Set(bookables.map(bookable => bookable.group))]

  // 每次组件渲染，都会返回同一个ref对象，因此ref.current的值不会变化
  const nextRef = useRef(null)

  useEffect(() => {
    async function getBookables() {
      try {
        let data = await getData('http://localhost:3001/bookables') // 请求所有的可预订项
        setBookables(data)
        setBookable(data[0])
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false) 
      }
    }
    // 开始发送请求
    getBookables()
  }, [setBookable]) 
  // 若setBookable是useState的updater函数，那么它一直不会改变。这个effect只会执行一次
  // 若setBookable是自定义的函数，在BookablesView重新渲染时候，setBookable会被重新定义成新函数，effect会再次执行，如此循环。
  // 使用useCallback包装可以返回记忆化的函数，依赖项不改变，函数就一直是一个值。

  const nextBookable = () => {
    const index = bookablesInGroup.indexOf(bookable)
    const nextIndex = (index + 1) % bookablesInGroup.length
    const nextBookable = bookablesInGroup[nextIndex]
    setBookable(nextBookable)
  }
  const changeGroup = (e) => {
    const bookablesInSelectedGroup = bookables.filter(
      b => b.group === e.target.value
    )
    setBookable(bookablesInSelectedGroup[0])
  }
  const changeBookable = index => {
    setBookable(bookablesInGroup[index])
    nextRef.current.focus() // 聚焦在next按钮上
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
                className={b.id === bookable.id ? 'selected': null}
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
    </Fragment>
  )
}