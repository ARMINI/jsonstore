import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import jsonstore from './jsonstore';

class App extends Component {
	state = {
		msg: '',
		contractAddress: '',
		value: '',
		value2: '',
		message: '',
		metodos: '',
		txHex: '',
		txString:'',
		date: ''
	};

	async componentDidMount() {
		//Recuperar Direccion del Contrato
		const contractAddress = await jsonstore.options.address;
		console.log('Direccion del Contrato ' + contractAddress);
		this.setState({ contractAddress });

		// //Metodos usables en el Contrato
		// const metodos = await jsonstore.methods;
		

		//Recuperar todas las cuentas del Provider
		const accounts = await web3.eth.getAccounts();
		console.log('Cuenta que pagadora ' + accounts[0]);

	}

	onSubmit = async (event) => {
		event.preventDefault();

		let input = '_'+this.state.value;
		console.log(input);
		//Recuperar Direccion del Contrato
		const accounts = await web3.eth.getAccounts();
		
		this.setState({ message: 'Enviando Transaccion...' });

		//Usar metodo Set() del SmartContract y escribir en el Blockchain, Esta operacion puede durar 15 a 30 segundos
		const msg = await jsonstore.methods.set(input.trim()).send({ 
			from: accounts[0],
		});

		
		this.setState({ message: 'Transaccion enviada...' });

		//Recuperar Input de la transaccion a partir del Hash de la misma 
		const transaction = await web3.eth.getTransaction(msg.transactionHash);
		const inputHex = transaction.input;
		const inputString = web3.utils.hexToUtf8(transaction.input);
		
		
		
		//Transformar Datos de Hexadecimal a String
		console.log('Datos en el Blockchain (HEXADECIMAL) ' + inputHex);
		console.log('Datos en el Blockchain (STRING UTF8) ' + inputString);
		this.setState({ txHex:   'Datos en el Blockchain (HEXADECIMAL) ' + inputHex });
		this.setState({txString: 'Datos en el Blockchain (STRING UTF8) ' + inputString.split("_").pop()})

	};

	recuperarTX = async (event) => {
		event.preventDefault();
		let tx = this.state.value
		console.log(tx);

		//Obtener Objeto de la Transaccion a partir del Hash de la transaccion
		const transaction = await web3.eth.getTransaction(tx);
		console.log(transaction);

		//Obtner Numero de bloque de la transaccion
		const bNumber = transaction.blockNumber;
		console.log('Numero de Bloque -> '+bNumber);

		//Obtener Objeto del Bloque a partir del numero de Bloque
		const block = await web3.eth.getBlock(bNumber);
		console.log(block); 

		//Obtener timestamp del bloque 
		const bTimeStamp = block.timestamp;
		console.log('Fecha en Unix -> '+bTimeStamp);

		//transformare timestamp Unix to Date
		var date = new Date(bTimeStamp*1000);
		var dateString = date.toString();
		console.log(date);

		//Recuperar Input en Hexadecimal
		const inputHex = transaction.input;
		console.log(inputHex);

		//Transformar de Hexadecimal a String
		const inputString = web3.utils.hexToUtf8(transaction.input);



		this.setState({ txHex:   'Datos en el Blockchain (HEXADECIMAL) : ' + inputHex });
		this.setState({ txString: 'Datos en el Blockchain (STRING UTF8) : ' + inputString.split("_").pop()});
		this.setState({ date: 'Fecha y Hora de la transaccion : ' +dateString });

	}
	
	render() {
		return (
			<div>
				<h2>JSONStore</h2>
				<p>El numero de contrato es {this.state.contractAddress}</p>
				<hr />
				<form onSubmit={this.onSubmit}>

					<h4>Insertar input / Buscar input en el Blockchain</h4>
					
						<label>Introduce un String / Introduce Hash de la Transaccion  </label>
						<input
							value={this.state.value}
							onChange={(event) => this.setState({ value: event.target.value })}
						/>
					
					<button>ENVIAR</button>
					<button onClick= {this.recuperarTX}>BUSCAR</button>
				</form>

				<hr />
					<h1>{this.state.message}</h1>
					
					<p>{this.state.txString}</p>
					<p>{this.state.date}</p>
				
				
			</div>
		);
	}
}

export default App;
