import WeekPicker from "./WeekPicker"

export default function BookingsPage(){
  return (
    <main className="bookings-page">
      {/* <p>BookingsPage</p> */}
      <WeekPicker date={new Date()}/>
    </main>
  )
}