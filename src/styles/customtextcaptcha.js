import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  captchaContainer: {
    width: Dimensions.get("window").width - 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#8D64FF",
    flexDirection: "row",
    backgroundColor: "#8D64FF11",
    marginHorizontal: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  captchaInputContainer: {
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: "#8D64FF",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  captchaLabel: {
    fontSize: 14,
    textAlign: "center",
    color: "#3C1372",
  },
  captchaText: {
    fontSize: 26,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputValid: {
    borderColor: "transparent",
  },
  inputInvalid: {
    borderColor: "red",
  },
  button: {
    borderColor: "#9747FF",
    borderWidth: 2,
    width: Dimensions.get("window").width - 20,
    height: 50,
    justifyContent: "center",
    marginHorizontal: 10,
    alignItems: "center",
    backgroundColor: "#9747FF23",
    marginVertical: 10,
  },
  buttonText: {
    color: "#555",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default styles;
