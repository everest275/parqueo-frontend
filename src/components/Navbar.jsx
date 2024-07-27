import PropTypes from 'prop-types';
import { AppContext } from '../context/Context'
import { useContext } from 'react';
import { Link } from 'react-router-dom'

Navbar.propTypes = {
    children: PropTypes.node,
};

export default function Navbar({ children }) {
    const { logout } = useContext(AppContext)
    return (
        <section className='relative'>

            <nav className="fixed flex p-2 w-full place-content-between">
                <Link className='text-2xl font-bold tracking-wide' to="/">Parqueo App</Link>

                <div className='flex gap-2'>
                    {/* <button className='bg-sky-500 px-4 py-2 rounded-lg'>Parqueos</button>
                    <button className='bg-sky-500 px-4 py-2 rounded-lg'>Usuarios</button> */}
                    <button className='bg-sky-500 px-4 py-2 rounded-lg' onClick={() => logout()}>Cerrar sesion</button>
                </div>
            </nav>
            <div className='pt-14 flex h-calc(100vh-100px)] items-center justify-center'>
                {children}
            </div>
        </section>
    )
}
