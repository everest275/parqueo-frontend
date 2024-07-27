import { useForm } from "react-hook-form";
import { AppContext } from '../../context/Context';
import { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

export default function UsuarioForm({ item, closeModal }) {
    const { createData, updateData, fetchData } = useContext(AppContext);
    const [parqueos, setParqueos] = useState([]);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (item) {
            setValue("nombre", item.nombre);
            setValue("correoElectronico", item.correoElectronico);
            setValue("fechaNacimiento", item.fechaNacimiento);
            setValue("identificacion", item.identificacion);
            setValue("numeroCarne", item.numeroCarne);
            setValue("rol", item.rol);
            setValue("parqueo", item.parqueo);
        }
    }, [item, setValue]);

    useEffect(() => {
        const fetchDataFromServer = async () => {
            const result = await fetchData('/parqueos');
            setParqueos(result); // Suponiendo que 'result' es una lista de parqueos
        };
        fetchDataFromServer();
    }, [fetchData]);

    const onSubmit = async (data) => {
        if (item) {
            await updateData(`/usuarios/${item.id}`, data);
        } else {
            await createData("/usuarios", data);
        }
        closeModal();
        window.location.reload();
    };

    const role = watch("rol");

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>

            <input className="text-black" placeholder="Nombre" {...register("nombre", { required: true })} />
            {errors.nombre && <span>Nombre is required</span>}

            <input className="text-black" placeholder="Correo Electronico" {...register("correoElectronico", { required: true })} />
            {errors.correoElectronico && <span>Correo Electronico is required</span>}

            <input className="text-black" {...register("fechaNacimiento", { required: true })} type="date" />
            {errors.fechaNacimiento && <span>Fecha Nacimiento is required</span>}

            <input className="text-black" placeholder="Identificacion" {...register("identificacion", { required: true })} />
            {errors.identificacion && <span>Identificacion is required</span>}

            <input className="text-black" placeholder="Numero de carne" {...register("numeroCarne", { required: true })} />
            {errors.numeroCarne && <span>Numero de carne is required</span>}

            <select className="text-black" {...register("rol", { required: true })}>
                <option value="personal administrativo">Personal Administrativo</option>
                <option value="administrador del sistema">Administrador del sistema</option>
                <option value="docente">Docente</option>
                <option value="guarda de seguridad">Guarda de seguridad</option>
            </select>
            {errors.rol && <span>Rol is required</span>}

            {role === "guarda de seguridad" && (
                <select className="text-black" {...register("parqueo", { required: true })}>
                    {parqueos.map(parqueo => (
                        <option key={parqueo.id} value={parqueo.nombre}>
                            {parqueo.nombre}
                        </option>
                    ))}
                </select>
            )}
            {errors.parqueo && <span>Parqueo is required</span>}

            <button className="bg-sky-500 px-4 py-2 rounded mt-4 text-white" type="submit">Save</button>
        </form>
    );
}

UsuarioForm.propTypes = {
    item: PropTypes.shape({
        nombre: PropTypes.string,
        correoElectronico: PropTypes.string,
        fechaNacimiento: PropTypes.string,
        identificacion: PropTypes.string,
        numeroCarne: PropTypes.string,
        rol: PropTypes.string,
        parqueo: PropTypes.string,
        id: PropTypes.string,
    }),
    closeModal: PropTypes.func.isRequired,
};
