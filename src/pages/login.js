import React, { useState } from 'react';

const Login = () => {
	const [inputValue, setInputValue] = useState('');
	const [responseData, setResponseData] = useState('');

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = () => {
		try {
			if (inputValue == null || inputValue.trim == "") { alert("Client code cannot be empty"); return null; }
			fetch(`https://nws-uat.neeyamo.works/neosuite/publicApi/client-domains?clientCode=${inputValue}`)
				.then((response) => response.json())
				.then((data) => {
					const url = 'https://' + data.payload.clientUrl;
					window.location.href = url
				});
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '300px', alignItems: 'center' }}>

			<div>
				<h1 style={{textAlign: 'center'}} >Client Login</h1>
				<input style={{height: '46px', width: '183px', padding: '12px', textAlign: 'center'}}
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					placeholder="Enter client code"
				/>
				<button onClick={handleSubmit} style={{height: '46px', width: '90px'}}>Submit</button>
				<div>
					{responseData && (
						<p>Response from the server: {JSON.stringify(responseData)}</p>
					)}
				</div>
			</div></div>
	);
};

export default Login;
