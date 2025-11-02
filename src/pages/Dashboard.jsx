import { useEffect, useState } from "react"
import { api } from "../services/api"
import { Link } from "react-router-dom"

const Dashboard = () => {
  const [rooms, setRooms] = useState([])
  useEffect(() => {
    api.get('/room/myrooms')
      .then(res => setRooms(res.data.rooms))
      .catch(() => alert("Erro ao carregar usuarios"))
  }, [])
  return (
    <div className="mt-4 flex flex-col items-center">
      <h1 className="m-4 text-green-500 text-2xl font-bold">Suas Conversas</h1>
      <ul className="flex gap-4">
        {rooms.length === 0 && <h2 className="text-2xl font-bold m-2">Você ainda não tem nenhuma conversa!</h2>}
        {rooms.map(room => (
            <Link to={`/chat/${room.name}`}>
          <li className="border p-7 flex-wrap rounded-2xl" key={room._id}>
            {room.name}
          </li>
            </Link>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard