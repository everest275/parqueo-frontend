import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function UsuarioForm() {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setValue("tipo", isChecked ? 1 : 2);
    }, [isChecked, setValue]);

    const onSubmit = async (data) => {
        console.log(data);
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>

            <input className="text-black" placeholder="Nombre" {...register("nombre", { required: true })} />
            {errors.nombre && <span>Nombre is required</span>}

            <input className="text-black" placeholder="Correo Electronico" {...register("correoElectronico", { required: true })} />
            {errors.correoElectronico && <span>Correo Electronico is required</span>}

            <select className="text-black" {...register("rol", { required: true })}>
                <option value="administrador">administrador</option>
                <option value="estudiante">estudiante</option>
                <option value="docente">docente</option>
                <option value="seguridad">seguridad</option>
            </select>
            {errors.tipo && <span>Tipo is required</span>}

            <input className="text-black" placeholder="Placa" {...register("placa", { required: true })} />
            {errors.placa && <span>Placa is required</span>}

            <input className="text-black" placeholder="Color" {...register("color", { required: true })} />
            {errors.color && <span>Color is required</span>}

            <input className="text-black" placeholder="Fecha de nacimiento" type="date" {...register("color", { required: true })} />
            {errors.fechaNacimiento && <span>Fecha de nacimiento is required</span>}

            <label>
                <input 
                    type="checkbox" 
                    className="text-black" 
                    placeholder="vehiculo"
                    onChange={() => setIsChecked(!isChecked)} 
                />
                Ley 7600
            </label>
            {errors.ley7600 && <span>Ley 7600 is required</span>}

            <button className="bg-sky-500 px-4 py-2 rounded mt-4 text-white" type="submit">Save</button>
        </form>
    );
}
