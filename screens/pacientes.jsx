import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Button,
	TextInput,
	View,
	Text,
	Picker,
	TouchableOpacity,
} from "react-native-web";
import { styles } from "../style";
import Header from "../components/header";

export default function CadastroPacientes({ navigation }) {
	const [paciente, setPaciente] = useState({
		nome: "",
		sobrenome: "",
		idade: "",
		notas: "",
	});

	const handleChange = (name, value) => {
		setPaciente({
			...paciente,
			[name]: value,
		});
	};

	const handleSubmit = () => {
		axios
			.post("http://localhost:3000/pacientes", paciente)
			.then((response) => {
				console.log(response);
				// Handle your response here
			})
			.catch((error) => {
				console.error(error);
				// Handle your error here
			});
	};

	const getRemedios = () => {
		return axios
			.get("http://localhost:3000/remedios")
			.then((response) => {
				return response.data;
				// Handle your response here
			})
			.catch((error) => {
				console.error(error);
				return [];
			});
	};

	return (
		<View style={styles.containerBetween}>
			<Header navigation={navigation} />
			<Text style={styles.titulo}>Cadastro de Pacientes</Text>

			<View
				style={{
					width: "100%",
					alignItems: "center",
				}}
			>
				<TextInput
					style={styles.inputForm}
					placeholder="Nome"
					onChangeText={(value) => handleChange("nome", value)}
				/>
				<TextInput
					style={styles.inputForm}
					placeholder="Sobrenome"
					onChangeText={(value) => handleChange("sobrenome", value)}
				/>
				<TextInput
					style={styles.inputForm}
					placeholder="Idade"
					onChangeText={(value) => handleChange("idade", value)}
				/>

				<TextInput
					style={[styles.inputForm, { height: 100 }]}
					placeholder="Notas sobre o paciente"
					onChangeText={(value) => handleChange("notas", value)}
					multiline={true}
				/>
				<TouchableOpacity onPress={handleSubmit}>
					<Text style={styles.botao}>Cadastrar</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
