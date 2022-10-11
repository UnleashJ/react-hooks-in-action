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