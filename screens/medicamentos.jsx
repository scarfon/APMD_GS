import { Text, TextInput, TouchableOpacity, View } from "react-native-web";
import { styles } from "../style";
import Header from "../components/header";
import { useState } from "react";

export default function CadastroMedicamentos({ navigation }) {
	const [medicamento, setMedicamento] = useState({
		nome: "",
		fabricante: "",
		quantidade: "",
		preco: "",
		descricao: "",
		validade: "",
	});

	const handleChange = (name, value) => {
		setMedicamento({
			...medicamento,
			[name]: value,
		});
	};

	const handleSubmit = () => {
		axios
			.post("http://localhost:3000/medicamentos", medicamento)
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
			<Text style={styles.titulo}>Cadastro de Medicamentos</Text>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					width: "100%",
				}}
			>
				<TextInput
					style={styles.input}
					placeholder="Nome"
					onChangeText={(text) => handleChange("nome", text)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Fabricante"
					onChangeText={(text) => handleChange("fabricante", text)}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					width: "100%",
				}}
			>
				<TextInput
					style={styles.input}
					placeholder="Quantidade"
					onChangeText={(text) => handleChange("quantidade", text)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Preço"
					onChangeText={(text) => handleChange("preco", text)}
				/>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					width: "100%",
				}}
			>
				<TextInput
					style={styles.input}
					placeholder="Descrição"
					onChangeText={(text) => handleChange("descricao", text)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Validade"
					onChangeText={(text) => handleChange("validade", text)}
				/>
			</View>
			<TouchableOpacity onPress={handleSubmit}>
				<Text style={styles.botao}>Cadastrar</Text>
			</TouchableOpacity>
		</View>
	);
}
