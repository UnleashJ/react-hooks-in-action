// 传入一个状态对象和action对象，reducer根据action的type和payload更新状态，并返回更新后的状态。
export default function reducer(state, action) {
  switch(action.type) {
    case "FETCH_BOOKABLES_REQUEST": // 正在发请求
      return {
        ...state,
        bookables: [],
        isLoading: true,
        error: false
      }
    case "FETCH_BOOKABLES_SUCCESS": // 请求成功
      return {
        ...state,
        bookables: action.payload,
        isLoading: false,
        error: false
      }
    case "FETCH_BOOKABLES_ERROR": // 请求失败
      return {
        ...state,
        bookables: [],
        isLoading: false,
        error: action.payload
      }
    case "SET_GROUP":
      return {
        ...state,
        group: action.payload,
        bookableIndex: 0
      };
    case "SET_BOOKABLE":
      return {
        ...state,
        bookableIndex: action.payload
      };
    case "NEXT_BOOKABLE":
      const count = state.bookables.filter(
        bookable => bookable.group === state.group
      ).length
      return {
        ...state,
        bookableIndex: (state.bookableIndex + 1) % count
      }
    default:
      return state
  }
}