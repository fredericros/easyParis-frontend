import {
  TextInput,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { login, logout} from "../reducers/user";

//Import SignIn
import { useDispatch, useSelector } from "react-redux";

export default function SigninScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const signinSubmit = () => {
    fetch("http://192.168.10.153:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
       if(data.result) {
           dispatch(login({ token: data.token, username: data.username }));
        } else {
            dispatch(login({ signinError: data.error }))
        } 
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/logoeiffel1.jpg")}
        resizeMode="contain"
      />

      <TouchableOpacity
        onPress={() => {
            navigation.navigate("SignUp")
            dispatch(logout())
        }}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.text}>Sign up</Text>
      </TouchableOpacity>
      <Text style={styles.barre}></Text>

      <TextInput
        onChangeText={(value) => setUsername(value)}
        value={username}
        style={styles.buttonsignin}
        placeholder=" Username"
        activeOpacity={0.8}
      />

      <TextInput
        onChangeText={(value) => setPassword(value)}
        value={password}
        style={styles.buttonsignin}
        placeholder=" Password"
        activeOpacity={0.8}
      />

      <TouchableOpacity
        onPress={() => signinSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.text}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.error}>{user.signinError}</Text>


    </View>
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

  logo: {
    width: "60%",
    height: "40%",
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
    padding: 10,
    margin: 8,
    backgroundColor: "rgb(158, 202, 241)",
    opacity: 0.7,
    width: 260,
    height: 40,
    borderRadius: 15,
  },
  barre: {
    margin: 5,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  error: {
    margin: 10,
    color: 'red',
},
});
