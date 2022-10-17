import { useContext, useEffect, useState } from 'react'
import Spinner from '../UI/Spinner'
import UserContext from './UserContext'

export default function UserPicker() {
  const {user, setUser} = useContext(UserContext)
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function getUser() {
      let res = await fetch('http://localhost:3001/users/')
      let data = await res.json()
      setUsers(data)
      setUser(data[0])
    }
    getUser()
  }, [setUser])

  const handleSelect = (e) => {
    const selectUser = users.find(u => u.id === parseInt(e.target.value))
    setUser(selectUser)
  }

  if(users === null) return <Spinner/>
  return (
   <select onChange={handleSelect} value={user?.id}>
    {
      users.map(u => 
        <option key={u.id} value={u.id}>{u.name}</option>
      )
    }
   </select>
  )
}