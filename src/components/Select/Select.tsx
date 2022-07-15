import React from "react";
import styles from './Select.module.scss'

type Select = {
  label:string,
  id:number
}

interface ISelect {
  options:Select[]
  setCurrent?:(data:string)=>void
}
/// Переделать на ref


const Select:React.FC<ISelect>=({options,setCurrent})=>{
 /// const ref = React.useRef(null)
  const [search,setSearch] = React.useState("")
  const [showDropdown,setShowDropdown] = React.useState<boolean>(false)

  const onInput=()=>{
    setShowDropdown(!showDropdown)
  }
  const onChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    //@ts-ignore
    // ref.current.focus()
    setSearch(event.target.value)
    if (setCurrent) {
      setCurrent(event.target.value);
    }
  }

  const onSelectCurrent=(data:string)=>{
    setSearch(data)
    setShowDropdown(false)
    if (setCurrent) {
      setCurrent(data);
    }
  }

  // React.useEffect(()=>{
  //   //@ts-ignore
  //   if(ref.current.blur() && ref.current){
  //     console.log('test')
  //     setShowDropdown(false)
  //   }
  // },[ref])

  const onBlur=()=>{
     if(search !== ""){
      setShowDropdown(false)
     }
  }

  const opt = showDropdown ? options : options.filter(i=>i.label.includes(search.toLowerCase()))


  return (
    <div className={styles.select}>
      <input
        type="text"
        value={search}
        onClick={onInput}
        onChange={onChange}
         onBlur={onBlur}
        // ref={ref}
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
}

export {
  Select
}