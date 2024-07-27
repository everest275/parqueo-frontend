import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/Context'
import Modal from '../../components/Modal'
import VehiculoForm from '../../modules/administrador/VehiculosForm'


const COLUMNS = [
    { label: 'Usuario', renderCell: (item) => item.usuario },
    { label: 'Tipo', renderCell: (item) => item.tipo },
    { label: 'Placa', renderCell: (item) => item.placa },
    { label: 'Color', renderCell: (item) => item.color },
    { label: 'Ley 7600', renderCell: (item) => item.ley7600 },
];

const GuardaPage = () => {

    const { fetchData, usuario } = useContext(AppContext);

    const [data, setData] = useState({ nodes: [] })

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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

    // const navigate=useNavigate()
    useEffect(() => {
        const fetchDataFromServer = async () => {
            const result = await fetchData('/vehiculos'); // Ajusta la ruta según sea necesario

            setData({ nodes: result })
        };
        fetchDataFromServer()
    }, [fetchData, setData, usuario]);


    return (
        <section className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Parqueo: {usuario?.parqueo}</h1>
            <div className="flex flex-col gap-2">
                <button className="bg-sky-500 px-4 py-2 rounded-lg" onClick={openModal}>Agregar Ingreso</button>
                <CompactTable columns={COLUMNS} data={data} theme={theme} />
            </div>
            <div className="flex flex-col gap-2">
                <button className="bg-sky-500 px-4 py-2 rounded-lg" onClick={openModal}>Agregar Salida</button>
                <CompactTable columns={COLUMNS} data={data} theme={theme} />
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-lg font-bold">Modal Title</h2>
                <p className="mt-2">This is a generic modal.</p>
                <VehiculoForm/>      
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

export default GuardaPage;
