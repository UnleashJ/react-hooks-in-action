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