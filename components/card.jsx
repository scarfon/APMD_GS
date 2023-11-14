import React, { useEffect, useState } from "react";
import { Modal, View, Text, Button } from "react-native";
import { Picker, TouchableOpacity } from "react-native-web";
import axios from "axios";
import { styles } from "../style";
import { MaterialIcons } from "@expo/vector-icons";

export default function CardConsultas({ navigation, consulta }) {
	const [modalVisible, setModalVisible] = useState(false);
	const [remedios, setRemedios] = useState([]);
	const [paciente, setPaciente] = useState({});
	const [remedio, setRemedio] = useState({});

	const setCompleted = async () => {
		consulta.completa = true;
		await axios.delete(`http://localhost:3000/consultas/${consulta.id}`);
		await axios.post("http://localhost:3000/consultas", consulta);

		setModalVisible(false);
		navigation.navigate("Home");
	};

	const getRemedios = async () => {
		try {
			const response = await axios.get("http://localhost:3000/remedios");
			setRemedios(response.data);
		} catch (error) {
			console.error(error);
			setRemedios([]);
		}
	};

	const getPaciente = async () => {
		try {
			const response = await axios.get("http://localhost:3000/pacientes/");
			const pacientes = await response.data;

			setPaciente(
				pacientes.find((paciente) => paciente.id == consulta.paciente)
			);
		} catch (error) {
			console.error(error);
			return setPaciente({});
		}
	};
	useEffect(async () => {
		await getRemedios();
		await getPaciente();
	}, []);

	return (
		<View>
			<TouchableOpacity
				style={{
					backgroundColor: "white",
					padding: 35,
					alignItems: "center",
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.25,
					shadowRadius: 4,
					borderRadius: 10,
					gap: 10,
				}}
				onPress={() => setModalVisible(true)}
			>
				<Text style={styles.name}>{`Consulta ${consulta.id}`} </Text>
				<Text style={styles.name}>
					{`Paciente: ${paciente.nome} ${paciente.sobrenome}`}{" "}
				</Text>
				<Text style={styles.name}>{`Data: ${consulta.data}`} </Text>
				<Text style={styles.name}>{`Hora: ${consulta.hora}`} </Text>
			</TouchableOpacity>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View
					style={{
						marginTop: 50,
						backgroundColor: "white",
						padding: 35,
						alignItems: "center",
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.25,
						shadowRadius: 4,
						elevation: 5,
						flex: 1,
						gap: 20,
					}}
				>
					<MaterialIcons
						style={{ position: "absolute", top: 10, right: 10 }}
						name="close"
						size={24}
						color="black"
						onPress={() => setModalVisible(false)}
					/>
					<Text style={styles.name}>{`Consulta ${consulta.id}`} </Text>
					<Text style={styles.name}>
						{`Paciente: ${paciente.nome} ${paciente.sobrenome}`}{" "}
					</Text>
					<Picker
						style={styles.inputForm}
						selectedValue={remedio.id}
						onValueChange={(itemValue) => {
							setRemedio(itemValue);
							consulta.remedio = itemValue;
						}}
					>
						<Picker.Item label="Selecione o remédio" value="" />
						{remedios.map((remedio) => (
							<Picker.Item
								key={remedio.id}
								label={`${remedio.nome} - ${remedio.fabricante}`}
								value={remedio.id}
							/>
						))}
					</Picker>

					<TouchableOpacity onPress={setCompleted}>
						<Text style={styles.botao}>Finalizar Consulta</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</View>
	);
}
