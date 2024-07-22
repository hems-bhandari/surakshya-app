import { StyleSheet } from "react-native";

export default StyleSheet.create({
  otherContactsContainer: {
    paddingTop: 20,
    alignItems: "center",
    backgroundColor: "#8F64FF22",
    marginTop: 20,
    paddingHorizontal: 12,
    marginHorizontal: 2,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 7,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
    paddingBottom: 25,
  },
  bodyHeader: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#3C3137",
    textAlign: "center",
  },
  centerTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  helperText: {
    fontSize: 14,
    color: "#8D64FF",
    textAlign: "left",
    paddingLeft: 4,
    marginTop: 5,
  },
  loadingText: {
    fontSize: 16,
    color: "#8D64FF",
    textAlign: "center",
    marginTop: 20,
  },
  pinnedContactsContainer: {
    paddingVertical: 5,
    alignItems: "center",
  },
});
