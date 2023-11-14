import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
	Picker,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native-web";
import Header from "../components/header";
import { styles } from "../style";
import { AuthContext } from "../context/AuthContex";

export default function CadastroConsultas({ navigation }) {
	const { username } = useContext(AuthContext);
	const [pacientes, setPacientes] = useState([]);
	const [paciente, setPaciente] = useState({});
	const [consulta, setConsulta] = useState({
		paciente: "",
		data: "",
		hora: "",
		completa: false,
		medico: username,
	});

	const handleChange = (name, value) => {
		setConsulta({
			...consulta,
			[name]: value,
		});
	};

	const getPacientes = async () => {
		try {
			const response = await axios.get("http://localhost:3000/pacientes");
			setPacientes(response.data);
		} catch (error) {
			console.error(error);
			setPacientes([]);
		}
	};

	useEffect(() => {
		getPacientes();
	}, []);

	const handleSubmit = () => {
		axios
			.post("http://localhost:3000/consultas", consulta)
			.then((response) => {
				console.log(response);
				// Handle your response here
			})
			.catch((error) => {
				console.error(error);
				// Handle your error here
			});
	};

	return (
		<View style={styles.containerBetween}>
			<Header navigation={navigation} />
			<Text style={styles.titulo}>Cadastro de Consultas</Text>

			<View
				style={{
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Picker
					style={styles.inputForm}
					selectedValue={paciente.id}
					onValueChange={(itemValue) => {
						setPaciente(pacientes.find((p) => p.id == itemValue));
						handleChange("paciente", itemValue);
					}}
				>
					<Picker.Item label="Selecione o paciente" value="" />
					{pacientes.map((paciente) => (
						<Picker.Item
							key={paciente.id}
							label={
								paciente.nome +
								" " +
								paciente.sobrenome +
								" " +
								paciente.idade +
								" anos"
							}
							value={paciente.id}
						/>
					))}
				</Picker>

				<TextInput
					style={styles.inputForm}
					placeholder="Data"
					onChangeText={(text) => handleChange("data", text)}
				/>
				<TextInput
					style={styles.inputForm}
					placeholder="Hora"
					onChangeText={(text) => handleChange("hora", text)}
				/>
				<TextInput
					style={[styles.inputForm, { height: 100 }]}
					placeholder="Notas sobre a Consulta"
					onChangeText={(value) => handleChange("notas", value)}
					multiline={true}
				/>
			</View>
			<TouchableOpacity onPress={handleSubmit}>
				<Text style={styles.botao}>Cadastrar</Text>
			</TouchableOpacity>
		</View>
	);
}
