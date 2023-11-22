import React, { useEffect, useState } from "react";
import './Users.css'
import axios from "axios";

const Usuarios = () =>{
    const [UsersList, setUsersList] = useState([]);
    const [RolList, setRolList] = useState([]);
    const [Nombre, setNombre] = useState("");
    const [Apellido, setApellido] = useState("");
    const [Email, setEmail] = useState("");
    const [Contrasena, setContrasena] = useState("");
    const [RolID, setRolID] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");

    useEffect(() =>{
       axios.get("http://localhost:3001/users/get").then((response) => {
            setUsersList(response.data);            
        });
        axios.get("http://localhost:3001/rol/get").then((response) => {
      setRolList(response.data);
    });
    }, []);

    const submitUser = () =>{
       axios.post("http://localhost:3001/users/insert", {
            Nombre: Nombre,
            Apellido: Apellido,
            Email: Email,
            Contrasena: Contrasena,
            RolID: RolID
        }).then(() => {
           axios.get("http://localhost:3001/users/get").then((response) =>{
                setUsersList(response.data);
            });
            setNombre("");
            setApellido("");
            setEmail("");
            setContrasena("");
            setRolID("");
        });
    };

    const updateUser = () =>{
       axios.post(`http://localhost:3001/product/update/${selectedUserId}`, {
            Nombre: Nombre,
            Apellido: Apellido,
            Email: Email,
            Contrasena: Contrasena,
            RolID: RolID
        }).then(() =>{
           axios.get("http://localhost:3001/users/get").then((response) =>{
                setUsersList(response.data);
        });
        setNombre("");
        setApellido("");
        setEmail("");
        setContrasena("");
        setRolID("");
        });
    };

    const updateUsers = (id) =>{
        const selectedUserId = UsersList.find((user)=> user.UsuarioID === id);
        setNombre(selectedUserId.Nombre);
        setApellido(selectedUserId.Apellido);
        setEmail(selectedUserId.Email);
        setContrasena(selectedUserId.Contrasena);
        setRolID(selectedUserId.RolID);
        setSelectedUserId(id);
    };

    return(
        <div className="App-Users">
            <div className="Form-Users">
                <label>Nombre</label>
                <input type="text" value={Nombre} onChange={e=>setNombre(e.target.value)}/>
                <label>Apellido</label>
                <input type="text" value={Apellido} onChange={e=>setApellido(e.target.value)}/>
                <label>Correo Electronico</label>
                <input type="text" value={Email} onChange={e=>setEmail(e.target.value)}/>
                <label>Contraseña</label>
                <input type="password" value={Contrasena} onChange={e=>setContrasena(e.target.value)}/>
                <label>Rol</label>
                <select name="" id="" value={RolID} onChange={e=>setRolID(e.target.value)}>
                    <option value="">Asignar Rol</option>
                    {RolList.map((rol) =>(
                        <option key={rol.RolID} value={rol.RolID} onChange={rol.NombreDelRol}
                        ></option>
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
                        {UsersList.map((user)=>{
                            const rol = RolList.find.find((Rol) => Rol.RolID === user.RolID);
                            return(
                                <tr key={user.UsuarioID}>
                                    <td>{user.Nombre}</td>
                                    <td>{user.Apellido}</td>
                                    <td>{user.Email}</td>
                                    <td>{user.Contrasena}</td>
                                    <td>{rol ? rol.NombreDelRol: ""}</td>
                                    <td>
                                        <button onClick={()=> updateUsers(user.UsuarioID)}>Editar</button>
                                    </td>
                                </tr>
                            );
                        })};
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Usuarios;