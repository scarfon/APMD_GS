import { useContext } from "react";
import { AuthContext } from "../context/AuthContex";
import { Text, TouchableOpacity, View } from "react-native-web";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../style";

export default function Header({ navigation }) {
	const { username } = useContext(AuthContext);
	return (
		<View style={styles.header}>
			<TouchableOpacity onPress={() => navigation.pop()}>
				<MaterialIcons name="arrow-back" size={24} color="black" />
			</TouchableOpacity>
			<View
				style={{
					flexDirection: "row",
				}}
			>
				<Text style={styles.titulo}>Ola, </Text>
				<Text style={styles.titulo}>{username}</Text>
			</View>
			<TouchableOpacity onPress={() => navigation.navigate("Login")}>
				<MaterialIcons name="exit-to-app" size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
}
