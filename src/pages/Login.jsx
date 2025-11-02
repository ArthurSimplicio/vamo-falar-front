import { Link, useNavigate } from "react-router-dom"
import Input from "../components/Input"
import { api } from "../services/api"
import { useState } from "react"
import { useFlashMessages } from "../hooks/useFlashMessages"

const Login = () => {
    const [registration, setRegistration] = useState("")
    const [password, setPassword] = useState("")
    const {setFlashMessages} = useFlashMessages()
    const navigate = useNavigate()

    //const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


  const handleSubmit = async (e)=>{
    e.preventDefault()
    let msgType
    let msgText
    try {
      const res = await api.post("/auth/login", {registration, password})
      localStorage.setItem("token", res.data.token)
      console.log(res.data)
      navigate("/dashboard")
    } catch (error) {
       msgText = error.response.data.msg
      msgType = 'error'
      setFlashMessages(msgText, msgType)
      return
    }
    msgText = "Login realizado com sucesso!"
    msgType = 'success'
    setFlashMessages(msgText, msgType)
  }
  return (
    <section className="mt-9 flex flex-col  items-center justify-center"> 
      <div className="border rounded shadow-2xl p-9 flex flex-col  items-center justify-center">
        <h1 className="text-4xl font-bold">Fazer Login</h1>
        <form className="max-w-72 flex flex-col  items-center justify-center" onSubmit={handleSubmit}>
          <Input
          text={"Matricula"}
          value={registration}
          onChange={e => setRegistration(e.target.value)}
          placeholder={"Digite sua matricula..."} />
          <Input
          type={"password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          text={"Senha"}
          placeholder={"Digite sua senha..."} />
          <button className="cursor-pointer m-3 w-28 p-2 rounded-2xl  bg-amber-300 text-blue-700 font-bold">ENTRAR</button>
        </form>
        <p>Ainda não tem Conta? <Link className="text-purple-700 font-bold" to="/register">Cadastre-se</Link></p>
      </div>
    </section>
  )
}

export default Login