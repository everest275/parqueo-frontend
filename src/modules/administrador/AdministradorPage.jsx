
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/Context'
import { useNavigate } from 'react-router-dom';
import UsuariosPage from '../administrador/UsuariosPage'
import ParqueosPage from '../administrador/ParqueosPage'

const AdministradorPage = () => {

    const navigate = useNavigate()
    const { state, usuario } = useContext(AppContext);

    useEffect(() => {
        if (!state) navigate("/")
        if (state) {
            if (usuario) {
                if (usuario.tipo === "guarda") navigate("/guarda")
            }
        }
    }, [usuario, state, navigate])

    return <section className='flex flex-col gap-8'>
        <UsuariosPage />
        <ParqueosPage />
    </section>
};

export default AdministradorPage