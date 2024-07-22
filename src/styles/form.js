import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#fff",
    borderColor: "#9747FF",
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginHorizontal: 10,
    marginVertical: 8,
    position: "relative",
  },
  body: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    marginBottom: 25,
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  headerText: {
    fontSize: 25,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    paddingTop: 2,
    paddingHorizontal: 3,
    borderColor: "#9747FF",
    fontSize: 16,
    width: Dimensions.get("window").width - 20,
  },
  input2: {
    paddingTop: 2,
    paddingHorizontal: 10,
    borderColor: "#9747FF77",
    fontSize: 16,
    width: Dimensions.get("window").width - 20,
    height: 50,
    borderWidth: 2,
  },
  dropdownBtnStyle: {
    height: 40,
    width: Dimensions.get("window").width - 20,
    backgroundColor: "#FFF",
    paddingHorizontal: 0,
  },
  dropdownBtn2Style: {
    width: Dimensions.get("window").width / 2 - 20,
  },
  dropdownBtnTxtStyle: {
    color: "#444",
    textAlign: "left",
    fontSize: 15,
  },
  dropdownDropdownStyle: {
    backgroundColor: "#fff",
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").width,
    borderColor: "#9747FF55",
    borderWidth: 1,
    borderRadius: 10,
    position: "absolute",
    left: 10,
  },
  dropdownRowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdownRowTxtStyle: { color: "#444", textAlign: "left" },
  dropdownSelectedRowStyle: {
    backgroundColor: "#fff",
  },
  dropdownsearchInputStyleStyle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#9747FF55",
    width: Dimensions.get("window").width - 20,
  },
  label: {
    color: "#8F8F8F",
    fontSize: 13,
    marginVertical: 0,
  },
});

export default styles;
