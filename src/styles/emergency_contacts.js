import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  backButtonText: {
    fontSize: 17,
    marginLeft: 6,
    color: "#8D64FF",
  },
  body: {
    flex: 1,
    paddingVertical: 20,
    marginTop: 5,
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#8D64FF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    marginTop: 5,
    maxWidth: "100%",
    minWidth: "40%",
    flex: 1,
    marginHorizontal: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    textTransform: "capitalize",
    color: "#fff",
    fontSize: 14,
    color: "#fff",
    marginLeft: 5,
  },
  contactInfo: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: "#8D64FF33",
    borderLeftColor: "#8D64FF",
    borderLeftWidth: 1,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#8D64FF",
    borderWidth: 1,
    borderRadius: 10,
    width: "90%",
    marginBottom: 10,
  },
  contactLogo: {
    width: 55,
    height: 55,
  },
  contactText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3C1372",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  headerText: {
    fontSize: 23,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    textAlign: "center",
  },
  imageContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
});

export default styles;
