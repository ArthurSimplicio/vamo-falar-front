import { Link, useNavigate } from "react-router-dom"


const Navbar = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const deslogar = () =>{
        localStorage.removeItem("token")
        navigate("/login")
    }
    return (
        <header className='w-full bg-amber-300 border p-7 flex items-center justify-between'>
            <div className="font-extrabold text-xl text-blue-700">VAMO FALAR</div>
            <ul className="flex gap-9">
                {!token
                    ? (
                        <>
                        <li className=" p-1 w-20 text-center font-bold rounded-2xl bg-blue-700 text-amber-300"><Link to={"/login"}>Login</Link></li>
                        <li className=" p-1 w-24 text-center font-bold rounded-2xl bg-blue-700 text-amber-300"><Link to={"/register"}>Cadastrar</Link></li>
                        </>
                    )
                    : (
                        <>
                        <li className="cursor-pointer p-1 w-24 text-center font-bold rounded-2xl bg-blue-700 text-amber-300"><Link to={"/createroom"}>Criar Sala</Link></li>
                        <li className="cursor-pointer p-1 w-20 text-center font-bold rounded-2xl bg-blue-700 text-amber-300" onClick={deslogar}>Sair</li>
                        </>
                    )}

            </ul>
        </header>
    )
}

export default Navbar