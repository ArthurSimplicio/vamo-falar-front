import { useEffect, useState } from 'react'
import bus from '../services/bus'

const Message = () => {
    const [type, setType] = useState("")
    const [message, setMessage] = useState("")
    const [visibility, setVisibility] = useState(false)

    useEffect(() => {
      bus.addListener('flash', ({message, type}) =>{
        setVisibility(true)
        setMessage(message)
        setType(type)

        setTimeout(() => {
          setVisibility(false)
        }, 3000);
      })
    }, [])
    const typeClassMap = {
      success: 'text-[#155724] bg-[#d4edda] border-[#c3e6cb]',
      error: 'text-[#721c24] bg-[#f8d7da] border-[#f5c6cb]'
    }
    const dynamicClasses = typeClassMap[type] || 'bg-gray-500 border-gray-700'

    const baseClasses = 'max-w-[60%] p-[1em] border m-[1.2em_auto_0] text-center rounded'
    const finalClasses = `${baseClasses} ${dynamicClasses}`

  return (
    visibility && (
      <div className={finalClasses}>{message}</div>
    )
  )
}

export default Message