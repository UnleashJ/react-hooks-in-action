export default function Booking({booking, bookable}) {
  return (
    <div className="booking-details-fields">
      <label>Title</label>
      <p>{booking.title}</p>

      <label>Bookable</label>
      <p>{bookable.title}</p>

      <label>Booking Date</label>
      <p>{(new Date(booking.date)).toDateString()}</p>

      <label>Session</label>
      <p>{booking.session}</p>

      {
        booking.notes && (
        <>
          <label>Notes</label>
          <p>{booking.notes}</p>
        </>)
      }
    </div>
  )
}