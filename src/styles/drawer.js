import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
    marginBottom: 25,
  },
  headerText: {
    fontSize: 24,
    textTransform: "uppercase",
    color: "#3C1372",
    fontWeight: "bold",
  },
  closeButton: {
    padding: 11,
    borderColor: "#8D64FF",
    borderWidth: 1,
    borderRadius: 50,
  },
  closeIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default styles;
