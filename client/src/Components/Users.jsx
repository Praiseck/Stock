import React, { useEffect, useState } from "react";
import "./Users.css";
import axios from "axios";

const Usuarios = () => {
  const [UsersList, setUsersList] = useState([]);
  const [RolList, setRolList] = useState([]);
  const [NombreU, setNombre] = useState("");
  const [ApellidoU, setApellido] = useState("");
  const [EmailU, setEmail] = useState("");
  const [ContrasenaU, setContrasena] = useState("");
  const [RolIDU, setRolID] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    axios
      .all([
        axios.get("http://localhost:3001/users/get"),
        axios.get("http://localhost:3001/rol/get"),
      ])
      .then(
        axios.spread((usersResponse, rolesResponse) => {
          setUsersList(usersResponse.data);
          setRolList(rolesResponse.data);
        })
      )
      .catch((error) => {
        console.error("Error getting data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      // Si se está editando un usuario existente, no hacemos nada
      return;
    }

    axios
      .get("http://localhost:3001/users/get")
      .then((response) => {
        setUsersList(response.data);
      })
      .catch((error) => {
        console.error("Error getting data:", error);
      });
  }, [selectedUserId]);

  useEffect(() => {
    // Restablecer selectedUserId después de actualizar un usuario
    if (!selectedUserId) {
      axios
        .get("http://localhost:3001/users/get")
        .then((response) => {
          setUsersList(response.data);
        })
        .catch((error) => {
          console.error("Error getting data:", error);
        });
    }
  }, [selectedUserId]);

  const submitUser = () => {
    axios
      .post("http://localhost:3001/users/insert", {
        Nombre: NombreU,
        Apellido: ApellidoU,
        Email: EmailU,
        Contrasena: ContrasenaU,
        RolID: RolIDU,
      })
      .then(() => {
        axios.get("http://localhost:3001/users/get").then((response) => {
          setUsersList(response.data);
          setNombre("");
          setApellido("");
          setEmail("");
          setContrasena("");
          setRolID("");
          setSelectedUserId(null);
        });
      })
      .catch((error) => {
        console.error("Error submitting user:", error);
      });
  };

  const updateUser = () => {
    axios
      .put(`http://localhost:3001/users/update/${selectedUserId}`, {
        Nombre: NombreU,
        Apellido: ApellidoU,
        Email: EmailU,
        Contrasena: ContrasenaU,
        RolID: RolIDU,
      })
      .then(() => {
        axios.get("http://localhost:3001/users/get").then((response) => {
          setUsersList(response.data);
          setNombre("");
          setApellido("");
          setEmail("");
          setContrasena("");
          setRolID("");
          setSelectedUserId(null);
        });
      })
      .catch((error) => {
        console.error("Error submitting user:", error);
      });
  };

  const updateUsers = (id) => {
    console.log("Updating users:", id);

    const selectedUser = UsersList.find((user) => user.UsuarioID === id);
    setNombre(selectedUser.Nombre);
    setApellido(selectedUser.Apellido);
    setEmail(selectedUser.Email);
    setContrasena(selectedUser.Contrasena);
    setRolID(selectedUser.RolID);
    setSelectedUserId(id);
  };

  return (
    <div className="App-Users">
      <div className="Form-Users">
        <label>Nombre</label>
        <input
          type="text"
          id="Name"
          name="Name"
          value={NombreU}
          onChange={({ target }) => setNombre(target.value)}
        />
        <label>Apellido</label>
        <input
          type="text"
          id="Apellido"
          name="Apellido"
          value={ApellidoU}
          onChange={({ target }) => setApellido(target.value)}
        />
        <label>Correo Electronico</label>
        <input
          type="text"
          id="Email"
          name="Correo Electronico"
          value={EmailU}
          onChange={({ target }) => setEmail(target.value)}
        />
        <label>Contraseña</label>
        <input
          type="text"
          id="Password"
          name="Password"
          value={ContrasenaU}
          onChange={({ target }) => setContrasena(target.value)}
        />
        <label>Rol</label>
        <select
          name=""
          id=""
          value={RolIDU}
          onChange={(e) => setRolID(e.target.value)}
        >
          <option value="">Asignar Rol</option>
          {RolList.map((rol) => (
            <option key={rol.RolID} value={rol.RolID}>
              {rol.NombreDelRol}
            </option>
          ))}
        </select>
        <button onClick={selectedUserId ? updateUser : submitUser}>
          {selectedUserId ? "Actualizar" : "Ingresar"}
        </button>
      </div>
      <div className="table-Users">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo Electronico</th>
              <th>Contraseña</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {UsersList.map((user) => {
              const rol = RolList.find((Rol) => Rol.RolID === user.RolID);
              return (
                <tr key={user.UsuarioID}>
                  <td>{user.Nombre}</td>
                  <td>{user.Apellido}</td>
                  <td>{user.Email}</td>
                  <td>{user.Contrasena}</td>
                  <td>{rol ? rol.NombreDelRol : ""}</td>
                  <td>
                    <button onClick={() => updateUsers(user.UsuarioID)}>
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

export default Usuarios;
