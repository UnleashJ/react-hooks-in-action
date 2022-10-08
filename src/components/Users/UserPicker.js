import { useState } from 'react'
import data from '../../static.json'

export default function UserPicker() {
  const {users} = data
  const [selectUser, setSelectUser] = useState(1)
  return (
    <select value={selectUser} onChange={e => setSelectUser(e.target.value)}>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  )
}