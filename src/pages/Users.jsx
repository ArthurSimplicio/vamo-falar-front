import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

const Users = () => {
    const [users, setUsers]= useState([])
  useEffect(() =>{
    const apiUsers = async () => {
      const user = await api.get('/users')
      setUsers(user.data)
    }
    apiUsers()
  },[])

  return (
    <div className='flex flex-col items-center pt-6'>
      <h2 className='font-bold text-4xl'>Usuários Cadastrados</h2>
      <h3 className='p-2 font-black text-2xl'>Use a matricula dos usuários para adicionar membros as suas salas</h3>
         <ul className='flex flex-col flex-wrap gap-1 font-bold'>
          {users.map(user => (
            <li key={user._id}>{user.name} - Matricula: {user.registration}</li>
          ))}
        </ul>
    </div>
  )
}

export default Users