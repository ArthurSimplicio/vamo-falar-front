import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { api } from "../services/api";
import { Link } from "react-router-dom";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState([]); // lista de salas
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  // 🔹 Carregar salas do usuário
  useEffect(() => {
    const loadRooms = async () => {
      try {
        const res = await api.get("/room/myrooms");
        setRooms(res.data);
      } catch (error) {
        console.error("Erro ao carregar rooms:", error);
      }
    };
    loadRooms();
  }, []);

  // 🔹 Conectar socket uma vez
  useEffect(() => {
    const token = localStorage.getItem("token");
    const newSocket = io("http://localhost:5000", {
      auth: { token },
    });

    newSocket.on("newMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    newSocket.on("roomHistory", (history) => {
      setMessages(history);
    });

    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  // 🔹 Entrar em uma sala
  const joinRoom = (roomName) => {
    if (socket) {
      setMessages([]);
      setCurrentRoom(roomName);
      socket.emit("joinRoom", roomName);
    }
  };

  // 🔹 Enviar mensagem
  const sendMessage = () => {
    if (msg.trim() && socket && currentRoom) {
      socket.emit("sendMessage", { room: currentRoom, text: msg.trim() });
      setMsg("");
    }
  };

  return (
    <div>
      <h2>
        Chat em tempo real —{" "}
        <Link to={"/dashboard"}>
          <strong>Voltar</strong>
        </Link>
      </h2>

      {/* 🔹 Lista de rooms */}
      {!currentRoom ? (
        <div>
          <h3>Minhas salas:</h3>
          {rooms.length === 0 ? (
            <p>Você ainda não participa de nenhuma sala.</p>
          ) : (
            <ul>
              {rooms.map((room) => (
                <li key={room._id}>
                  <button onClick={() => joinRoom(room.name)}>
                    {room.type === "private" ? "Chat privado: " : "Grupo: "}
                    {room.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          <h3>Sala: {currentRoom}</h3>
          <div
            style={{
              border: "1px solid #ccc",
              padding: 10,
              height: 200,
              overflowY: "auto",
            }}
          >
            {messages.map((m, i) => (
              <div key={i}>
                <strong>{m.user}</strong>: {m.text} <em>{m.time}</em>
              </div>
            ))}
          </div>

          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Digite sua mensagem..."
          />
          <button onClick={sendMessage}>Enviar</button>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => setCurrentRoom(null)}
          >
            Sair da sala
          </button>
        </>
      )}
    </div>
  );
};

export default Chat;
