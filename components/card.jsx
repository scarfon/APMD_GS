import { useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	Picker,
	TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { styles } from "../style";

export default function Card({ consulta }) {
	const [remedios, setRemedios] = useState([]);
	const [remedio, setRemedio] = useState({});
	const [remedioQuantidade, setRemedioQuantidade] = useState("");
	const [remedioHorarios, setRemedioHorarios] = useState("");
	const [paciente, setPaciente] = useState({});
	const [modalVisible, setModalVisible] = useState(false);

	const getRemedios = async () => {
		try {
			const response = await axios.get("http://localhost:3000/remedios/");
			const remedios = await response.data;
			setRemedios(remedios);
			setRemedio(remedios.find((remedio) => remedio.id == consulta.remedio));
			setRemedioQuantidade(consulta.remedioQuantidade || "");
			setRemedioHorarios(consulta.remedioHorarios || "");
		} catch (error) {
			console.error(error);
			return setRemedios([]);
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

	const setCompleted = async () => {
		try {
			await axios.put(`http://localhost:3000/consultas/${consulta.id}`, {
				...consulta,
				remedio: remedio.id,
				remedioQuantidade,
				remedioHorarios,
			});
			setModalVisible(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getRemedios();
		getPaciente();
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

				{remedio && (
					<Text style={styles.name}>{`Remedio: ${remedio.nome}`}</Text>
				)}
				{remedioQuantidade && (
					<Text style={styles.name}>{`Quantidade: ${remedioQuantidade}`}</Text>
				)}
				{remedioHorarios && (
					<Text style={styles.name}>{`Horários: ${remedioHorarios}`}</Text>
				)}
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
					<TextInput
						style={styles.inputForm}
						placeholder="Quantidade"
						value={remedioQuantidade}
						onChangeText={(text) => setRemedioQuantidade(text)}
					/>
					<TextInput
						style={styles.inputForm}
						placeholder="Horários (separados por vírgula)"
						value={remedioHorarios}
						onChangeText={(text) => setRemedioHorarios(text)}
					/>
					<TouchableOpacity onPress={setCompleted}>
						<Text style={styles.botao}>Finalizar Consulta</Text>
					</TouchableOpacity>
				</View>
			</Modal>
		</View>
	);
}
