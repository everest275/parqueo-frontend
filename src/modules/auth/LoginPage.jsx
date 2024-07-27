import { useForm } from "react-hook-form"
import { AppContext } from '../../context/Context'
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const { login, state,usuario } = useContext(AppContext);

    

    const navigate = useNavigate()

    const onSubmit = async (data) => {

       await login(data)
      
    }

    useEffect(() => {
        if (!state) navigate("/")
        if(state){
           
            
            if(usuario){
                if(usuario.rol==="guarda de seguridad") navigate("/guarda")
                    if(usuario.rol==="administrador del sistema") navigate("/administrador")
            }

        }
      }, [usuario,state, navigate])
    

    return (
        <form className="bg-zinc-800 max-w-sm w-full p-10 rounded-md" onSubmit={handleSubmit(onSubmit)}>

            <h1 className="text-2xl font-bold">Inciar Sesion</h1>

            <input type="email" className="w-72 bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Correo Electronico" {...register("correoElectronico", { required: true })} />
            {errors.correoElectronico && <span>This field is required</span>}



            <input type="password" className="w-72 bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Password" {...register("password", { required: true })} />
            {errors.password && <span>This field is required</span>}


            <button className="px-4 py-2 text-base bg-blue-500 text-white rounded" type="submit">Login</button>
        </form>
    )
}