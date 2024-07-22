import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 7,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 17,
    marginLeft: 6,
    color: "#8D64FF",
  },
  body: {
    flex: 1,
    paddingVertical: 5,
  },
  bodyHeader: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#3C3137",
    textAlign: "center",
  },
});

export default styles;
