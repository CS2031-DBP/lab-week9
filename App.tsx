import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Switch, Button } from "react-native-paper";
import { useState } from "react";

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

  const handlePress = () => {
    const user: User = {
      firstName,
      lastName,
      email,
      password,
      role: isAdmin ? 1 : 0,
    };
    console.log(user);
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
        style={{ marginTop: 20 }}
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
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  switchLabel: {
    marginRight: 10,
  },
});
