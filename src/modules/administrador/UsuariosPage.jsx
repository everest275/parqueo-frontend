import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/Context'
import Modal from '../../components/Modal'
import UsuariosForm from '../../modules/administrador/UsuarioForm'




const UsuariosPage = () => {

    const COLUMNS = [
        { label: 'Nombre', renderCell: (item) => item.nombre },
        { label: 'Correo Electronico', renderCell: (item) => item.correoElectronico },
        { label: 'Fecha de nacimiento', renderCell: (item) => item.fechaNacimiento },
        { label: 'Identificaicon', renderCell: (item) => item.identificacion },
        { label: 'Numero de Carne', renderCell: (item) => item.numeroCarne },
        { label: 'Rol de usuario', renderCell: (item) => item.rol },
        {
            label: 'Acciones',
            renderCell: (item) => (
                <div className="flex gap-2">
                    <button
                        className="bg-yellow-500 px-2 py-1 rounded"
                        onClick={() => handleEdit(item)}
                    >
                        Editar
                    </button>
                    <button
                        className="bg-red-500 px-2 py-1 rounded"
                        onClick={() => handleDelete(item.id)}
                    >
                        Eliminar
                    </button>
                </div>
            )
        },
    ];
    const { fetchData, deleteData } = useContext(AppContext);
    const [data, setData] = useState({ nodes: [] });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setEditItem(null);
        setIsModalOpen(false);
    };

    const theme = useTheme([
        getTheme(),
        {
            HeaderRow: `
        background-color: #141414;
        color:white;
      `,
            Row: `
        &:nth-of-type(odd) {
          background-color: #141414;
          color:white;
        }

        &:nth-of-type(even) {
          background-color: #141414;
          color:white;
        }
      `,
        },
    ]);

    const handleEdit = (item) => {
        setEditItem(item);
        openModal();
    };

    const handleDelete = async (id) => {
        await deleteData(`/usuarios/${id}`); // Ajusta la ruta según sea necesario
        setData((prevData) => ({
            nodes: prevData.nodes.filter((node) => node.id !== id),
        }));
    };

    useEffect(() => {
        const fetchDataFromServer = async () => {
            const result = await fetchData('/usuarios'); // Ajusta la ruta según sea necesario
            setData({ nodes: result });
        };
        fetchDataFromServer();
    }, [fetchData, setData]);



    return (
        <section className="flex flex-col gap-6">
            <h1 className='text-2xl font-bold'>Usuarios</h1>
            <div className="flex flex-col gap-2">
                <button className="bg-sky-500 px-4 py-2 rounded-lg" onClick={openModal}>Agregar Usuario</button>
                <CompactTable columns={COLUMNS} data={data} theme={theme} />
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2 className="text-lg font-bold">{editItem ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
                <UsuariosForm item={editItem} closeModal={closeModal} />
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={closeModal}
                >
                    Close
                </button>
            </Modal>
        </section>
    );
};

export default UsuariosPage;
