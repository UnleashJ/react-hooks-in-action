import { getWeek } from "../../utils/date-wrangler";

export default function reducer(state, action) {
  switch (action.type) {
    case "NEXT_WEEK":
      return getWeek(state.date, 7); // 下周那一天对应的week对象
    case "PREV_WEEK":
      return getWeek(state.date, -7);
    case "TODAY":
       return getWeek(new Date());
    case "SET_DATE":
      return getWeek(new Date(action.payload));
    default:
      break;
  }
}