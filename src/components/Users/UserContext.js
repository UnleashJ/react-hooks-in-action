import { createContext, useState } from "react";

const UserContext = createContext("Mark") // Mark是没有provider是的默认值
export default UserContext

export function UserProvider({children}) {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

// 调用setUser更新状态时，UserProvider组件会重新渲染，
// 但是children prop并没有改变，因此，children中涉及的子组件不会重新渲染。
// 而使用了useContext的子组件，即任何消费该context的子组件，会因provider值的改变而重新渲染。
// 这样，就避免了不必要的渲染。