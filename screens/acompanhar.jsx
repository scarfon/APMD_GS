import { Text, View } from "react-native-web";
import CardConsultas from "../components/card";
import { useEffect, useState } from "react";
import Header from "../components/header";
import { styles } from "../style";
import axios from "axios";

export default function AcompanharConsulta({ navigation }) {
	const [consultas, setConsultas] = useState([]);

	const getConsultas = async () => {
		try {
			const response = await axios.get("http://localhost:3000/consultas");
			const consultas = await response.data.filter(
				(consulta) => consulta.completa == false
			);
			setConsultas(consultas);
		} catch (error) {
			console.error(error);
			setConsultas([]);
		}
	};
	useEffect(() => {
		getConsultas();
	}, []);

	return (
		<View style={styles.containerBetween}>
			<Header navigation={navigation} />
			<Text style={styles.titulo}>Acompanhar Consultas</Text>
			{consultas.map((consulta) => (
				<CardConsultas
					key={consulta.id}
					consulta={consulta}
					navigation={navigation}
				/>
			))}
		</View>
	);
}
