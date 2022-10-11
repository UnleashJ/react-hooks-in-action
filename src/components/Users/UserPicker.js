import { useEffect, useState } from 'react'
import Spinner from '../UI/Spinner'

export default function UserPicker() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function getUser() {
      let res = await fetch('http://localhost:3001/users/')
      let data = await res.json()
      setUsers(data)
    }
    getUser()
  }, [])

  if(users === null) return <Spinner/>
  return (
   <select >
    {
      users.map(u => 
        <option key={u.id}>{u.name}</option>
      )
    }
   </select>
  )
}