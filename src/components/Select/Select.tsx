import React from "react";
import styles from './Select.module.scss'

type Select = {
  label:string,
  id:number
}

interface ISelect {
  options:Select[]
  setCurrent?: (data: Select | undefined)=>void
}
/// Переделать на ref


const Select=React.memo(({options,setCurrent}:ISelect)=>{
  const [search,setSearch] = React.useState("")
  const [showDropdown,setShowDropdown] = React.useState<boolean>(false)
  const wrapperRef = React.useRef<any>(null)

  const onChange=React.useCallback((event:React.ChangeEvent<HTMLInputElement>)=>{
    setSearch(event.target.value)
    if (setCurrent) {
      setCurrent(options.find(item=>item.label === event.target.value));
    }
  },[options,showDropdown])


  const onFocus=()=>{
    setShowDropdown(true)
  }

  const handleMouseDown=(event:any)=>{
    const {current} = wrapperRef
    if(current && !current.contains(event.target)){
      setShowDropdown(false)
    }
  }

  React.useEffect(()=>{
    document.addEventListener("mousedown",handleMouseDown)

    return ()=>{
      document.removeEventListener("mousedown",handleMouseDown)
    }
  },[])

  const onSelectCurrent=React.useCallback((data:any)=>{
    console.log(data)
    const find = options.find(item=>item.label === data)
      if (setCurrent) {
        setCurrent(find);
        setSearch(data)
        setShowDropdown(false)
      }
  },[options])


  const opt = options.filter(i=>i.label.includes(search.toLowerCase()))
  return (
    <div
      className={styles.select}
      ref={wrapperRef}
    >
      <input
        type="text"
        value={search}
        onFocus={onFocus}
        onChange={onChange}
      />
      <div
        // onBlur={onBlur}
        // tabIndex={0}
      >
        <ul
          className={showDropdown ? styles.dropdown: `${styles.dropdown} ${styles.hide}`}
        >
          {opt.length ? (
            opt.map(o=>(
              <li
                tabIndex={o.id}
                key={o.id}
                onClick={()=>onSelectCurrent(o.label)}
                className={o.label === search ? styles.active : ""}>
                {o.label}
              </li>
            ))
          ) : (
            <li>
              Нет данных
            </li>
          ) }
        </ul>
      </div>
    </div>
  )
})

export {
  Select
}