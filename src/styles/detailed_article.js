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
    paddingHorizontal: 5,
  },
  bodyHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3C3137",
    textAlign: "left",
  },
  date: {
    marginTop: 5,
    fontSize: 14,
    color: "#8D64FFdd",
    textDecorationColor: "#8D64FFdd",
    textDecorationLine: "underline",
  },
  description: {
    marginTop: 5,
    fontSize: 16,
    color: "#8D64FF",
  },
  location: {
    fontSize: 14,
    color: "#8D64FF99",
  },
});

export default styles;
