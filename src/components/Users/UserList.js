import {useState, Fragment, useEffect, useContext} from 'react';
import Spinner from '../UI/Spinner'
import UserContext from './UserContext'

export default function UsersList () {
  const [users, setUsers] = useState(null)
  const {user: defaultUser} = useContext(UserContext) // 默认选择当前用户
 
  const [userIndex, setUserIndex] = useState();
  const user = userIndex != null ? users[userIndex]: defaultUser; // 选中的user

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
    <Fragment>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <li
            key={u.id}
            className={user.id === u.id ? "selected" : null}
          >
            <button
              className="btn"
              onClick={() => setUserIndex(i)}
            >
              {u.name}
            </button>
          </li>
        ))}
      </ul>

      {user && (
        <div className="item">
          <div className="item-header">
            <h2>{user.name}</h2>
          </div>
          <div className="user-details">
            <h3>{user.title}</h3>
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
}