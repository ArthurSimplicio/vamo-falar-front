import { Link, useNavigate } from "react-router-dom"
import Input from "../components/Input"
import { useState } from "react"
import { api } from "../services/api"
import PasswordStrengthBar from "react-password-strength-bar"
import { useFlashMessages } from "../hooks/useFlashMessages"

const Register = () => {
  const [name, setName] = useState("")
  const [registration, setRegistration] = useState("")
  const [password, setPassword] = useState("")
  const { setFlashMessages } = useFlashMessages()
  const navigate = useNavigate()

  //const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault()
    let msgText
    let msgType 
    try {
      await api.post("/auth/register", { name, registration, password })
    } catch (error) {
      msgText = error.response.data.msg
      msgType = 'error'
      setFlashMessages(msgText, msgType)
      return
    }
    msgText = "Usuario cadastrado com sucesso!"
    msgType = 'success'
    setFlashMessages(msgText, msgType)
  navigate("/dashboard")
  }
  return (
    <section className="mt-7 flex flex-col  items-center justify-center">
      <div className="max-w-80 w-72 border rounded shadow-2xl p-6 flex flex-col  items-center justify-center">
        <h1 className="text-4xl font-bold">Cadastre-se</h1>
        <form className=" flex flex-col  items-center justify-center" onSubmit={handleSubmit} >
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            text={"Nome"}
            placeholder={"Digite seu nome..."} />
          <Input
            value={registration}
            onChange={e => setRegistration(e.target.value)}
            text={"Matricula"}
            placeholder={"Digite sua matricula..."} />
          <Input
            type={"password"}
            onChange={e => setPassword(e.target.value)}
            text={"Senha"}
            placeholder={"Digite sua senha..."} />
          <PasswordStrengthBar
            password={password}
            minLength={6}
            shortScoreWord={"Muito fraca"}
            scoreWords={["Muito fraca", "Fraca", "OK", "Boa", "Muito boa"]} scoreWordStyle={{ width: 200, textAlign: "center" }} />
          <button className="cursor-pointer bg-amber-300 text-blue-700 font-bold m-3 w-28 p-2 rounded-2xl  bg">CADASTRAR</button>
        </form>
        <p>Já possui Conta? <Link className="text-purple-700 font-bold" to={"/login"}>Vamos logar</Link></p>
      </div>
    </section>
  )
}

export default Register