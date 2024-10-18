import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Switch, Button } from "react-native-paper";
import { useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 0 | 1;
};

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const onToggleSwitch = () => setIsAdmin(!isAdmin);

  const handlePress = async () => {
    const user: User = {
      firstName,
      lastName,
      email,
      password,
      role: isAdmin ? 1 : 0,
    };
    console.log(user);
    try {

      const res = await axios.post("http://10.100.208.53:8080/auth/signup", user);
      // Recuerden cambiar esto "10.100.208.53" por la ip que les aparece cuando
      // corren npx expo start donde dice Metro waiting on exp://"10.100.208.53":8081
      console.log(res.data);
      if (res.data.token) {
        await SecureStore.setItemAsync('userToken', res.data.token);
      }
      alert("user created successfully")
    } catch (error: unknown) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to my app!</Text>
      <TextInput
        style={styles.input}
        label="Nombre"
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        label="Apellido"
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        label="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        label="Contraseña"
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Admin</Text>
        <Switch value={isAdmin} onValueChange={onToggleSwitch} />
      </View>
      <Button
        style={styles.button}
        icon="account"
        mode="contained"
        onPress={handlePress}
      >
        Sign up
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",textAlign: "center",
  },
  input: {
    marginBottom: 15,marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    borderColor: "#ddd",enter",
    borderWidth: 1,marginTop: 20,
  },
  switchContainer: {
    flexDirection: "row",marginRight: 10,
    alignItems: "center",
    marginTop: 20,
  },
  switchLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#6200ee",
  },
});,
});
