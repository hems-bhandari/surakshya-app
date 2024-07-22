import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  article: {
    minWidth: Dimensions.get("window").width / 2 - 25,
    maxWidth: Dimensions.get("window").width / 2 - 20,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 5,
    borderColor: "#8D64FF",
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#8D64FF11",
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomColor: "#555",
    paddingVertical: 5,
    borderBottomWidth: 1,
  },
  articleLocation: {
    fontSize: 12,
    marginBottom: 2,
  },
  articleDate: {
    fontSize: 13,
  },
  icon: {
    marginRight: 6,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
});

export default styles;
