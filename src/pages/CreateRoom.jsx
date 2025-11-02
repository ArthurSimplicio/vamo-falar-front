import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import { api } from '../services/api'
import { jwtDecode } from 'jwt-decode'
import { useFlashMessages } from '../hooks/useFlashMessages'

const CreateRoom = () => {
    const [name, setName] = useState("")
    const [members, setMembers] = useState("")
    const { setFlashMessages } = useFlashMessages()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let msgType
        let msgText
        try {
            const token = localStorage.getItem("token")
            const decoded = jwtDecode(token)
            const { registration } = decoded
            members.split(",").map(m => m.trim()).filter(m => m.length > 0)
            setMembers([...members])
            const res = await api.post("/room/create", { name, members: [registration, members] })
            msgText = `Sala criada: ${res.data.name}`
            msgType = 'success'
            setFlashMessages(msgText, msgType)
        } catch (error) {
            setMembers("")
            msgText = error.response.data.msg
            msgType = 'error'
            setFlashMessages(msgText, msgType)
            return
        }
        navigate("/dashboard")
    }
    return (
        <div className='flex justify-center items-center'>
            <form className='w-80' onSubmit={handleSubmit}>
                <h2 className='p-3 text-3xl font-bold text-center'>Criando Sala</h2>

                <div>
                    <Input
                        text={"Nome da sala"}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Input
                        text={"Membros"}
                        placeholder={"Ex: matricula1, matricula2"}
                        value={members}
                        onChange={e => setMembers(e.target.value)} />
                    <div className='flex justify-between p-4'>
                        <input className='cursor-pointer border p-1 rounded bg-green-500 text-white font-bold' type="submit" value={"Criar sala"} />
                        <Link className='w-20 text-center cursor-pointer border p-1 rounded bg-red-500 text-white font-bold' to={"/dashboard"}>Voltar</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateRoom