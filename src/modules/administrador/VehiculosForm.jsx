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
        setValue("ley7600", isChecked ? 1 : 2);
    }, [isChecked, setValue]);

    const onSubmit = async (data) => {
        console.log(data);
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>

            <input className="text-black" placeholder="Usuario" {...register("usuario", { required: true })} />
            {errors.usuario && <span>Usuario is required</span>}

            <select className="text-black" {...register("tipo", { required: true })}>
                <option value="automovil">automovil</option>
                <option value="moto">moto</option>
            </select>
            {errors.tipo && <span>Tipo is required</span>}

            <input className="text-black" placeholder="Placa" {...register("placa", { required: true })} />
            {errors.placa && <span>Placa is required</span>}

            <input className="text-black" placeholder="Color" {...register("color", { required: true })} />
            {errors.color && <span>Color is required</span>}

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
