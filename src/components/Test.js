import { useEffect, useState } from "react";

export default function Test() {
  const [user, setUser] = useState('jiangcm')

  useEffect(() => {
    const storeUser = window.localStorage.getItem('testUser')
    console.log(storeUser)
    if(storeUser) {
      setUser(storeUser)
    }
  },[])

  useEffect(() => {
    window.localStorage.setItem('testUser', user)
  }, [user])

  useEffect(() => {
    console.log('render')
  })

  return (
    <select value={user} onChange={e => setUser(e.target.value)}>
      <option>jiangcm</option>
      <option>liuhuan</option>
      <option>jenghs</option>
      <option>hengsj</option>
    </select>
  )
}