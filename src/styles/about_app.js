import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  aboutAppText: {
    fontSize: 16,
    color: "#8D64FF",
    textAlign: "justify",
    marginBottom: 10,
    paddingHorizontal: 6,
  },
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
    marginBottom: 10,
  },
  bodySubHeader: {
    fontSize: 16,
    marginVertical: 0,
    fontWeight: "bold",
    color: "#3C3137",
  },
  featuresHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3C3137",
    textAlign: "left",
    marginTop: 15,
    marginBottom: 10,
  },
});

export default styles;
