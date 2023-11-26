import React, { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";

const Proveedores = () => {
  const [proveedoresList, setProveedoresList] = useState([]);
  const [NombreProv, setNombreProv] = useState("");
  const [Direccion, setDireccion] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Email, setEmail] = useState("");
  const [selectedProvId, setSelectedProvId] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/proveedores/get")
      .then((response) => {
        setProveedoresList(response.data);
      })
      .catch((error) => {
        console.error("Error getting data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedProvId) {
      //Si se esta editando un usuario espera sin hacer nada
      return;
    }

    Axios.get("http://localhost:3001/proveedores/get")
      .then((response) => {
        setProveedoresList(response.data);
      })
      .catch((error) => {
        console.error("Error getting data:", error);
      });
  }, [selectedProvId]);

  useEffect(() => {
    // Restablecer selectedProvId después de actualizar un proveedor
    if (!selectedProvId) {
      Axios.get("http://localhost:3001/proveedores/get")
        .then((response) => {
          setProveedoresList(response.data);
        })
        .catch((error) => {
          console.error("Error getting data:", error);
        });
    }
  }, [selectedProvId]);

  const submitProv = () => {
    Axios.post("http://localhost:3001/proveedores/insert", {
      Nombre: NombreProv,
      Direccion: Direccion,
      Telefono: Telefono,
      Email: Email,
    })
      .then((response) => {
        Axios.get("http://localhost:3001/proveedores/get").then((response) => {
          setProveedoresList(response.data);
          setNombreProv("");
          setDireccion("");
          setTelefono("");
          setEmail("");
          setSelectedProvId(null);
        });
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  const updateProv = () => {
    Axios.put(`http://localhost:3001/proveedores/update/${selectedProvId}`, {
      Nombre: NombreProv,
      Direccion: Direccion,
      Telefono: Telefono,
      Email: Email,
    })
      .then(() => {
        Axios.get("http://localhost:3001/proveedores/get").then((response) => {
          setProveedoresList(response.data);
          setNombreProv("");
          setDireccion("");
          setTelefono("");
          setEmail("");
          setSelectedProvId(null);
        });
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  const updateProvs = (id) => {
    const selectedProveedor = proveedoresList.find(
      (prov) => prov.ProveedorID === id
    );
    setNombreProv(selectedProveedor.NombreProv);
    setDireccion(selectedProveedor.Direccion);
    setTelefono(selectedProveedor.Telefono);
    setEmail(selectedProveedor.Email);
    setSelectedProvId(id);
  };

  return (
    <div className="App-Prov">
      <div className="Form-Prov">
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Nombre del proveedor"
          value={NombreProv}
          onChange={({ target }) => setNombreProv(target.value)}
        />
        <label>Direccion</label>
        <input
          type="text"
          placeholder="Direccion"
          value={Direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        <label>Telefono</label>
        <input
          type="text"
          placeholder="Telefono"
          value={Telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <label>Correo</label>
        <input
          type="text"
          placeholder="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={selectedProvId ? updateProv : submitProv}>
          {selectedProvId ? "Actualizar" : "Ingresar"}
        </button>
      </div>
      <div className="Table-Prov">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedoresList.map((prov) => {
              return (
                <tr key={prov.ProveedorID}>
                  <td>{prov.Nombre}</td>
                  <td>{prov.Direccion}</td>
                  <td>{prov.Telefono}</td>
                  <td>{prov.Email}</td>
                  <td>
                    <button onClick={() => updateProvs(prov.ProveedorID)}>
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Proveedores;
