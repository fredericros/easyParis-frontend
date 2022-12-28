import {
  TextInput,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { useState } from "react";

//Import SignUp
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";

//Constante pour définir la bonne écriture de l'adresse mail
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const signupSubmit = () => {
    fetch("http://192.168.1.113:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ token: data.token, username, email }));
          navigation.navigate("Home", { screen: "Profile" });
        } else {
          dispatch(login({ signupError: data.error }));
        }
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/logoeiffel1.jpg")}
        resizeMode="contain"
      />

      <TextInput
        style={styles.buttonsignin}
        onChangeText={(value) => setUsername(value)}
        value={username}
        placeholder="Username"
        activeOpacity={0.8}
      />

      <TextInput
        style={styles.buttonsignin}
        onChangeText={(value) => setEmail(value)}
        value={email}
        placeholder="Email"
        activeOpacity={0.8}
      />

      <TextInput
        style={styles.buttonsignin}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
        value={password}
        placeholder="Password"
        activeOpacity={0.8}
      />

      <TouchableOpacity
        onPress={() => signupSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.signup}>Sign up</Text>
      </TouchableOpacity>
      <Text style={styles.error}>{user.signupError}</Text>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  back: {
    position: "absolute",
    left: 50,
    top: 50,
  },
  logo: {
    width: "60%",
    height: "40%",
    marginBottom: 20,
  },
  buttonpicture: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    margin: 8,
    opacity: 0.7,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#1E90FF",
    backgroundColor: "#1E90FF",
    marginBottom: 30,
  },
  pic: {
    color: "black",
    fontWeight: "bold",
    fontSize: 19,
    color: "white",
  },
  buttonabout: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    padding: 8,
    margin: 8,
    backgroundColor: "#rgb(158, 202, 241)",
    opacity: 0.7,
    width: 260,
    height: 140,
    borderRadius: 15,
  },
  buttonup: {
    display: "flex",
    justifyContent: "center",
    padding: 8,
    margin: 8,
    backgroundColor: "#1E90FF",
    width: 260,
    height: 40,
    borderRadius: 15,
    marginBottom: 20,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    padding: 5,
    margin: 5,
    backgroundColor: "#1E90FF",
    width: 260,
    height: 40,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonsignin: {
    display: "flex",
    justifyContent: "center",
    padding: 8,
    margin: 8,
    backgroundColor: "#rgb(158, 202, 241)",
    opacity: 0.7,
    width: 260,
    height: 40,
    borderRadius: 15,
  },
  barre: {
    margin: 30,
  },
  buttonforget: {
    marginTop: 20,
    alignItems: "center",
    padding: 8,
    margin: 8,
    width: 260,
    height: 40,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 25,
  },
  textforget: {
    color: "black",
    fontSize: 15,
  },
  signup: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  error: {
    marginTop: 10,
    color: "red",
  },
});
