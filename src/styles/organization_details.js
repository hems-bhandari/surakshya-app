import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 15,
  },
  backButtonText: {
    fontSize: 17,
    marginLeft: 6,
    color: "#8D64FF",
  },
  button: {
    borderColor: "#8D64FF",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    position: "relative",
  },
  buttonText: {
    color: "#8D64FF",
    marginLeft: 5,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  contact: {
    marginVertical: 5,
    paddingLeft: 5,
  },
  contactData: {
    color: "#8D64FF",
    fontWeight: "bold",
    fontSize: 15,
    width: Dimensions.get("window").width - 225,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomColor: "#8D64FF",
    borderBottomWidth: 2,
    paddingVertical: 25,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactLogo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  contactText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3C1372",
    marginRight: 5,
  },
  description: {
    marginVertical: 20,
  },
  descriptionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3C1372",
    textTransform: "uppercase",
  },
  descriptionListItem: {
    alignSelf: "stretch",
  },
  descriptionListItemText: {
    fontSize: 16,
    color: "#3C1372",
  },
  descriptionListItemTextDescription: {
    fontSize: 14,
    color: "#3C1372",
    paddingLeft: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: "#3C1372",
    backgroundColor: "#8D64FF11",
    paddingHorizontal: 15,
    borderColor: "#8D64FF",
    borderWidth: 2,
    marginVertical: 10,
    paddingVertical: 20,
  },
  header: {
    marginVertical: 1,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3C1372",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default styles;
