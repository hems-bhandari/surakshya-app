import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "../styles/form.js";

function TextInputCrowdSourcing({ label, setData, data }) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(data) => setData(data)}
        value={data}
      />
    </View>
  );
}

export default TextInputCrowdSourcing;
