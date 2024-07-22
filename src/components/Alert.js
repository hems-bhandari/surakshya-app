import { Dimensions } from "react-native";
import { Text, View, StyleSheet, Image } from "react-native";

function Alert({ message, type = "success" }) {
  return (
    <View
      style={[styles.box, type === "success" ? styles.success : styles.error]}
    >
      <Image style={styles.logo} source={require("../../assets/icon.png")} />
      <Text
        style={[
          styles.message,
          type === "success" ? styles.successMessage : styles.errorMessage,
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#8D64FF11",
    paddingLeft: 20,
    paddingVertical: 13,
    paddingRight: 20,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width,
    marginBottom: 20,
  },
  success: {
    borderColor: "#8D64FF",
  },
  error: {
    borderColor: "#FF0000",
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  message: {
    fontSize: 14,
  },
  successMessage: {
    color: "#8D64FF",
  },
  errorMessage: {
    color: "#FF0000",
  },
});

export default Alert;
