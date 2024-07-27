import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { post, put, get, remove } from '../services/ParqueoService';  // Asegúrate de ajustar la ruta según sea necesario
import Cookies from 'js-cookie'

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState();
  const [usuario, setUsuario] = useState();


  const login = async (credentials) => {
    try {
      const result = await post("/login", credentials);
     setState(true)
      setUsuario(result.data)
     
     
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = async() => {
    await post("/logout");
    setState(false);
    setUsuario(null)
  };

  const fetchData = async (url) => {
    try {
      const result = await get(url);
      const transformedResult = result.data.map(item => ({
        ...item,
        id: item._id
    }));
      return transformedResult;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const updateData = async (url, data) => {
    try {
      const result = await put(url, data);
      return result.data;
    } catch (error) {
      console.error('Error updating data:', error);
      return null;
    }
  };
  const createData = async (url, data) => {
    try {
      const result = await post(url, data);
      return result.data;
    } catch (error) {
      console.error('Error updating data:', error);
      return null;
    }
  };

  const deleteData = async (url, id) => {
    try {
      const result = await remove(url, id);
      return result.data;
    } catch (error) {
      console.error('Error deleting data:', error);
      return null;
    }
  };
  useEffect(() => {
    async function checklogin() {
      const cookies = Cookies.get()
     console.log(cookies)
      if (!cookies.token) {
        setState(false)
        setUsuario(null)
       
      }

      try {
        const res = await get("/verify");
        if (!res) {
          setState(false)
          setUsuario(null)
        
          return;
        }
        setState(true)
        setUsuario(res.data)
        
        

      } catch (error) {
        setState(false)
       
      }

    }
    checklogin()
  }, [setUsuario,setState])



  return (
    <AppContext.Provider value={{ state,usuario, login, logout,createData, fetchData, updateData, deleteData }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
