import { shortISO } from "./date-wrangler";

export default async function getData(url) {
  try {
    let res = await fetch(url);
    if(!res.ok) {
      throw Error('There was a problem fetching data')
    }
    return res.json()
  } catch (error) {
    console.log('error')
    throw Error('There was a problem fetching data')
  }
}

export async function getBookings(bookableId, startDate, endDate){
  const url = "http://localhost:3001/bookings"
  const start = shortISO(startDate)
  const end = shortISO(endDate)
  const queryParams = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`
  return await getData(`${url}?${queryParams}`);
}