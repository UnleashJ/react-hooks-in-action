import BookablesList from "../Bookables/BookablesList"
import Bookings from "./Bookings"
import { useState } from "react"

export default function BookingsPage(){
  const [ bookable, setBookable] = useState(null)
  return (
    <main className="bookings-page">
      <BookablesList bookable={bookable} updateBookable={setBookable}/>
      <Bookings bookable = {bookable}/>
    </main>
  )
}