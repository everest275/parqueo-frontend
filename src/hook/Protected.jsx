import { Navigate, Outlet } from 'react-router-dom'
import { AppContext } from '../context/Context'
import { useContext } from 'react';

function ProtectedRoutes() {
    const { state, usuario } = useContext(AppContext);



    if (!state && usuario === null) return <Navigate to='/' replace />

    return <Outlet />
}

export default ProtectedRoutes