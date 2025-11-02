
const Input = ({text, type, placeholder, value, onChange}) => {
  return (
    <div style={{margin:"5px", display: "flex", flexDirection: "column", gap: "10px"}}>
        <label htmlFor={value}> {text}:</label>
        <input className="p-1.5 border rounded" 
        type={type} 
        placeholder={placeholder} 
        onChange={onChange}
        value={value} />
    </div>
  )
}

export default Input