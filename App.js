import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AuthProvider } from "./context/AuthContex";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/login";
import Home from "./screens/home";
import CadastroPacientes from "./screens/pacientes";
import CadastroMedicamentos from "./screens/medicamentos";
import CadastroConsultas from "./screens/consultas";
import AcompanharConsulta from "./screens/acompanhar";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<AuthProvider>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen
						name="CadastroPacientes"
						component={CadastroPacientes}
					/>
					<Stack.Screen
						name="CadastroMedicamentos"
						component={CadastroMedicamentos}
					/>
					<Stack.Screen name="CadastroConsulta" component={CadastroConsultas} />
					<Stack.Screen
						name="AcompanharConsulta"
						component={AcompanharConsulta}
					/>
				</Stack.Navigator>
			</AuthProvider>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
