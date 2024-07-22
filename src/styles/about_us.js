import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  aboutUsText: {
    fontSize: 16,
    color: "#8D64FF",
    textAlign: "justify",
    marginTop: 15,
    paddingHorizontal: 10,
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
  },
  memberContainer: {
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  memberName: {
    fontSize: 16,
    color: "#8D64FF",
  },
  memberRole: {
    fontSize: 19,
    color: "#3C3137",
    textAlign: "center",
    marginBottom: 5,
    textDecorationLine: "underline",
    textDecorationColor: "#3C3137",
  },
  memberSubContainer: {
    paddingVertical: 5,
    marginBottom: 5,
  },
  otherMemberContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 1,
  },
});

export default styles;
