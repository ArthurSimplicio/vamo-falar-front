import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { io } from "socket.io-client"

const ChatPage = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const { roomName } = useParams()
    const [messages, setMessages] = useState([])
    const [msg, setMsg] = useState("")
    const [socket, setSocket] = useState(null)


    useEffect(() => {
        const token = localStorage.getItem("token")
        const decoded = jwtDecode(token)
        const { name } = decoded
        const userName = name
        console.log(userName)
        setCurrentUser(userName)
        const newSocket = io("http://localhost:5000", {
            auth: { token }
        })
        setSocket(newSocket)
        newSocket.emit("joinRoom", { roomName, type: "private" })
        newSocket.on("roomHistory", (history) => {
            setMessages(history)
        })
        newSocket.on("newMessage", (data) => {
            setMessages((prev) => [...prev, data])
        })

        return () => newSocket.disconnect()

    }, [roomName])

    const sendMessage = () => {
        if (msg.trim() && socket) {
            socket.emit("sendMessage", { room: roomName, text: msg })
            setMsg("")
        }
    }
    return (
        <div className="h-[85vh] bg-gray-100  flex flex-col items-center">
            <h2 className="text-2xl p-4 font-bold">{roomName} - <Link to={"/dashboard"} className="bg-red-500 p-2 rounded-2xl text-white cursor-pointer">Sair</Link></h2>
            <div className="flex-1 w-full max-w-md bg-white p-4 rounded-lg shadow overflow-y-auto space-y-2 h-[200px]">
                {messages.map((m, i) => {
                    const normalizedMessageUser = String(m.user).trim().toLowerCase();
                    const normalizedCurrentUser = String(currentUser).trim().toLowerCase();

                    const isCurrentUser = normalizedMessageUser === normalizedCurrentUser;
                    return (

                        <div key={i} className={`max-w-[70%] p-3 rounded-2xl break-words ${isCurrentUser
                                ? "bg-blue-500 text-white self-end rounded-br-none ml-auto"
                                : "bg-gray-200 text-black self-start rounded-bl-none mr-auto"
                            }`}>
                            <strong>{m.user}</strong>: {m.text} <em>{m.time}</em>
                            {console.log("Comparando:", {
                                messageUser: m.user,
                                currentUser: currentUser,
                                isMine: m.user === currentUser
                            })}
                        </div>
                    )
                }
                )
                }
            <div className="flex gap-4 pt-2">
                <input className="bg-white p-2 w-80 rounded-2xl border" type="text"
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                    placeholder="Digite sua mensagem..."
                />
                <button className="cursor-pointer bg-[#2B7FFF] w-10 text-2xl pb-1 text-center font-bold rounded-full" onClick={sendMessage}>&gt;</button>
            </div>
            </div>
        </div>
    )
}

export default ChatPage