import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import '../App.css'
import BookingsPage from './Bookings/BookingsPage'
import BookablesPage from './Bookables/BookablesPage'
import UsersPage from './Users/UsersPage'
import UserPicker from './Users/UserPicker'
import { FaCalendarAlt, FaDoorOpen, FaUsers} from 'react-icons/fa'
// import Test from './Test'

export default function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/bookings" className='btn btn-header'>
                  <FaCalendarAlt/>
                  <span>Bookings</span>
                </Link>
              </li>
              <li>
                <Link to="/bookables" className='btn btn-header'>
                  <FaDoorOpen/>
                  <span>Bookables</span>
                </Link>
              </li>
              <li>
                <Link to="/users" className='btn btn-header'>
                  <FaUsers/>
                  <span>Users</span>
                </Link>
              </li>
            </ul>
          </nav>
          <UserPicker/>
        </header>
        <Routes>
          <Route path='/bookings' element={<BookingsPage/>}></Route>
          <Route path='/bookables' element={<BookablesPage/>}></Route>
          <Route path='/users' element={<UsersPage/>}></Route>
        </Routes>
      </div>
  </Router>
  // <Test/>
  )
}
