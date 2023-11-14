import {
	Image,
	Text,
	StatusBar,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { styles } from "../style.js";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContex.js";

export default function Login({ navigation }) {
	const { login } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [erro, setErro] = useState("");

	async function handleLogin() {
		if (await login({ email, senha })) {
			navigation.navigate("Home");
		} else {
			setErro("email ou senha inválido");
		}
	}
	async function handleLogin2() {
		if (await login({ email: "joao@hapvida.com.br", senha: "123456" })) {
			navigation.navigate("Home");
		} else {
			setErro("email ou senha inválido");
		}
	}
	return (
		<View style={styles.container}>
			<Image style={styles.img} source={require("../assets/logo.jpg")} />
			<Text style={styles.titulo}>Hap</Text>
			<Text style={{ fontSize: 18 }}>Para começar a vender</Text>
			<TextInput
				style={styles.input}
				placeholder="e-mail"
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
				placeholder="Senha"
				secureTextEntry
				value={senha}
				onChangeText={setSenha}
			/>
			<TouchableOpacity onPress={handleLogin}>
				<Text style={styles.botao}>Entrar</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={handleLogin2}>
				<Text style={styles.botao}>Entrar</Text>
			</TouchableOpacity>
			<Text style={styles.erro}>{erro}</Text>
			<StatusBar style="auto" />
		</View>
	);
}
