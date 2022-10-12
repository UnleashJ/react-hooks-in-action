import BookablesList from "./BookablesList"
import BookablesDetails from "./BookablesDetails"
import { useCallback, useState } from "react";

// 将bookable（选中的可预订项）提升至父组件BookablesView，将state和setState传给子组件。

export default function BookablesView() {
  const [bookable, setBookable] = useState(null)
  
  // 自定义更新bookable的函数
  // 使用useCallback包装可以返回记忆化的函数，依赖项不改变，函数就一直是一个值。
  const updateBookable = useCallback(selected => {
    if(selected) {
      selected.lastShown = Date.now() 
      setBookable(selected)
    }
  }, [setBookable])

  return (
    <>
      <BookablesList bookable = {bookable} updateBookable = {updateBookable}/>
      <BookablesDetails bookable = {bookable} />
    </>
  )
}