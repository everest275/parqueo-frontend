import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { AppContext } from '../../context/Context';

export default function ParqueoForm({ item, closeModal }) {
  const { createData, updateData } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (item) {
      setValue("nombre", item.nombre);
      setValue("espaciosRegulares", item.espaciosRegulares);
      setValue("espaciosMotos", item.espaciosMotos);
      setValue("espacios7600", item.espacios7600);
    }
  }, [item, setValue]);

  const onSubmit = async (data) => {
    if (item) {
      await updateData(`/parqueos/${item.id}`, data);
    } else {
      await createData("/parqueos", data);
    }
    closeModal();
    window.location.reload();
  };

  return (
    <form  className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="text-black"
        placeholder="Nombre"
        {...register("nombre", { required: true })}
      />
      {errors.nombre && <span>Nombre is required</span>}

      <input
        className="text-black"
        placeholder="Cantidad de espacios de automoviles"
        type="number"
        {...register("espaciosRegulares", { required: true })}
      />
      {errors.espaciosRegulares && (
        <span>Cantidad de espacios de automoviles is required</span>
      )}

      <input
        className="text-black"
        placeholder="Cantidad de espacios de motos"
        type="number"
        {...register("espaciosMotos", { required: true })}
      />
      {errors.espaciosMotos && (
        <span>Cantidad de espacios de motos is required</span>
      )}

      <input
        className="text-black"
        placeholder="Cantidad de espacios de Ley 7600"
        type="number"
        {...register("espacios7600", { required: true })}
      />
      {errors.espacios7600 && (
        <span>Cantidad de espacios de Ley 7600 is required</span>
      )}

      <button className="bg-sky-500 px-4 py-2 rounded mt-4 text-white" type="submit">Save</button>
    </form>
  );
}

ParqueoForm.propTypes = {
  item: PropTypes.shape({
    nombre: PropTypes.string,
    espaciosRegulares: PropTypes.number,
    espaciosMotos: PropTypes.number,
    espacios7600: PropTypes.number,
    id: PropTypes.string,
  }),
  closeModal: PropTypes.func.isRequired,
};
