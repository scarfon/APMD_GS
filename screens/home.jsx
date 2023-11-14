import React, { useContext } from "react";
import { View, Button } from "react-native";
import { styles } from "../style";
import { AuthContext } from "../context/AuthContex";
import { Image, Text, TouchableOpacity } from "react-native-web";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../components/header";

export default function Home({ navigation }) {
	const { username } = useContext(AuthContext);
	return (
		<View style={styles.containerBetween}>
			<Header navigation={navigation} />
			<TouchableOpacity
				style={{ width: "100%" }}
				onPress={() => navigation.navigate("CadastroPacientes")}
			>
				<Image style={styles.imgB} source={require("../assets/paciente.jpg")} />
				<Text style={styles.botaoB}>Cadastro de Pacientes</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={{ width: "100%" }}
				onPress={() => navigation.navigate("CadastroMedicamentos")}
			>
				<Image style={styles.imgB} source={require("../assets/remedio.jpg")} />
				<Text style={styles.botaoB}>Cadastro de Medicamentos</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={{ width: "100%" }}
				onPress={() => navigation.navigate("CadastroConsulta")}
			>
				<Image
					style={styles.imgB}
					source={require("../assets/calendario.jpg")}
				/>
				<Text style={styles.botaoB}>Cadastro de Consultas</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={{ width: "100%" }}
				onPress={() => navigation.navigate("AcompanharConsulta")}
			>
				<Image
					style={styles.imgB}
					source={require("../assets/acompanhar.jpg")}
				/>
				<Text style={styles.botaoB}>Acompanhamento</Text>
			</TouchableOpacity>
		</View>
	);
}
