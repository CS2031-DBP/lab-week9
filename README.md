```markdown
* The main application component that renders a sign-up form.
* 
* @component
* @returns {JSX.Element} The rendered component.
* 
* @example
* <App />

```jsx
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
```

## This file contains the styles for the App component.

## How to Run the App

1. **Install Dependencies**: Ensure you have Node.js and npm installed. Navigate to your project directory and run:
        ```sh
        npm install
        ```

2. **Start the Development Server**: Run the following command to start the development server:
        ```sh
        npm start
        ```

3. **Open the App**: If you are using Expo, you can scan the QR code generated in your terminal with the Expo Go app on your mobile device. Alternatively, you can run the app on an emulator or simulator.

4. **Build the App**: To create a production build, run:
        ```sh
        npm run build
        ```

## Styles

- `container`: Styles for the main container of the app.
- `title`: Styles for the title text.
- `input`: Styles for the input fields.
- `switchContainer`: Styles for the container holding the switch component.
- `switchLabel`: Styles for the label next to the switch.
- `button`: Styles for the button component.