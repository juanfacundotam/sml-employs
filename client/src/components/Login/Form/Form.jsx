import React, { useState } from 'react';
import { validate } from './validation';

const Form = (props) => {
	const [userData, setUserData] = useState({
		username: '',
		password: '',
	});

	const [errors, setErrors] = useState({
		username: '',
		password: '',
	});

	const handleInputChange = (event) => {
		setUserData({
			...userData,
			[event.target.name]: event.target.value,
		});

		setErrors(
			validate({
				...userData,
				[event.target.name]: event.target.value,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const propsArray = Object.values(errors);
		if (propsArray.some((error) => error !== '')) {
			alert('Debe llenar todos los campos correctamente');
			return;
		}

		// Si no hay errores, ejecutar la función de autenticación
		if (props.Login) {
			props.Login(userData);
			localStorage.setItem('UserName', userData.username);
    		localStorage.setItem('Password', userData.password);
		}

		setErrors({
			username: '',
			password: '',
		});
		setUserData({
			username: '',
			password: '',
		});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label name='username'>Username:</label>
				<input
					type='text'
					name='username'
					value={userData.username}
					onChange={handleInputChange}
				/>
				{errors.username !== '' && <p>{errors.username}</p>}
				<label name='password'>Password:</label>
				<input
					type='password'
					name='password'
					value={userData.password}
					onChange={handleInputChange}
				/>
				{errors.password !== '' && <p>{errors.password}</p>}
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default Form;
