import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Login.css';

function Login({ onLogin }) {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');

 const handleUsernameChange = (event) => {
    setUsername(event.target.value);
 };

 const handlePasswordChange = (event) => {
    setPassword(event.target.value);
 };

 const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });

      if (response.data.success) {
        // Si el estado de success es true, inicia sesión
        console.log('Inicio de sesión exitoso');
        // Aquí puedes redirigir al usuario a la página principal, por ejemplo
        onLogin();
      } else {
        // Si el estado de success es false, muestra un mensaje de error
        console.log('Error al iniciar sesión:', response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.');
    }
 };

 return (
    <div className='Loggin'>
      <h2>Iniciar sesión</h2>
      {error && <p>{error}</p>}
      <form className='form-Loggin' onSubmit={handleSubmit}>
        <label htmlFor="username">Nombre de usuario:</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange} />

        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
 );
}

export default Login;