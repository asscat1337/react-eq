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

  const onInput=()=>{
    setShowDropdown(!showDropdown)
  }
  const onChange=React.useCallback((event:React.ChangeEvent<HTMLInputElement>)=>{
    setSearch(event.target.value)
    if (setCurrent) {
      setCurrent(options.find(item=>item.label === event.target.value));
    }
  },[options])

  const onSelectCurrent=React.useCallback((data:any)=>{
    const find = options.find(item=>item.label === data)
      if (setCurrent) {
        setCurrent(find);
        setSearch(data)
        setShowDropdown(false)
      }
  },[options])


  const opt = showDropdown ? options : options.filter(i=>i.label.includes(search.toLowerCase()))
  return (
    <div className={styles.select}>
      <input
        type="text"
        value={search}
        onClick={onInput}
        onChange={onChange}
      />
      <ul className={showDropdown ? styles.dropdown: `${styles.dropdown} ${styles.hide}`}>
        {opt.map(o=>(
          <li
            key={o.id}
            onClick={()=>onSelectCurrent(o.label)}
            className={o.label === search ? styles.active : ""}>
            {o.label}
          </li>
        ))}
      </ul>
    </div>
  )
})

export {
  Select
}