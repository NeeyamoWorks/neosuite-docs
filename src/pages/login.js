import React, { useState } from 'react';
import Layout from '@theme/Layout';
import arrowIcon from './../../static/img/arrow.png'; // Import your arrow icon image

const Login = () => {
	const [inputValue, setInputValue] = useState('');
	const [responseData, setResponseData] = useState('');

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = () => {
		try {
			if (inputValue == null || inputValue.trim() === "") {
				alert("Client code cannot be empty");
				return; // Exit the function to prevent further execution
			  }			
			  fetch(`https://nws-uat.neeyamo.works/neosuite/publicApi/client-domains?clientCode=${inputValue}`)
				.then((response) => response.json())
				.then((data) => {
					const url = 'https://' + data.payload.clientUrl;
					window.open(url, "_blank");
				});
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<Layout title="login" >
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '300px', alignItems: 'center' }}>

				<div>
					<h1 style={{ textAlign: 'center' }} >Client Login</h1>
					<input style={{ height: '46px', width: '183px', padding: '12px', textAlign: 'center' }}
						type="text"
						value={inputValue}
						onChange={handleInputChange}
						placeholder="Enter client code"
					/>
					<button onClick={handleSubmit} style={{
						height: '46px',
						display: 'inline-flex', // Add this style to align elements in the same line
						alignItems: 'center',
						justifyContent: 'center',
					}}>
						<span>Go</span>
						<img
							src={arrowIcon}
							alt="Arrow Icon"
							style={{ marginLeft: '8px', height: '16px' }}
						/>
					</button>
				</div></div></Layout>
	);
};

export default Login;
