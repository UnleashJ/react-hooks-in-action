## useState

### 初始值为对象

在useState中使用对象，在设置新值时，需复制旧值所有属性，因为setState函数将完全替换旧对象。

```js
export default function BookablesList() {
	const [state, setState] = useState({
        a:1,
        b:2
    })
    
    function handleClick(){
        setState(state => ({
            ...state,
            b:3
        }))
    }
}
```

### 初始值需要经过函数计算（惰性初始 state）

useState可以接受一个函数参数，该参数是一个惰性的初始状态，此函数只在初始渲染时被调用。如果直接将函数执行结果作为useState的参数，那么在组件重新渲染时，该函数每次都会进行不必要的执行，比较费时。

## uesReducer

当组件中的状态变得复杂且状态相互关联时，可以使用useReducer hook进行状态的统一管理与更新。useReducer hook接收一个reducer函数和initialState对象作为参数，返回state对象和用于触发action的dispatch函数。

reducer函数接收一个状态对象state和action对象，reducer根据action的type和payload更新状态，并返回更新后的状态。

### 通过函数生成初始状态initialState

useReducer hook接收三个参数时，第三个参数时生成初始状态的函数，第二个参数是该函数的参数……

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

## [useEffect](https://zh-hans.reactjs.org/docs/hooks-reference.html#useeffect)

## useRef

useRef有两种常见的使用场景，一种是使用ref保存一些可变的状态，但是这些状态的变化不需要触发组件的重新渲染。另一种是保存DOM元素的引用。