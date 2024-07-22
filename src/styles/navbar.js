import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  active: {
    borderWidth: 10,
    borderRadius: 35,
    backgroundColor: "#8D64FF",
    borderBottomColor: "#fff",
    borderEndColor: "#fff",
    marginTop: -55,
  },
  activeImage: {
    width: 22,
    height: 22,
  },
  container: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    backgroundColor: "#8D64FF",
    height: 75,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  shadowContainer: {
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#fff",
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  icon: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 50,
    padding: 12,
    marginTop: -12,
  },
  image: {
    width: 20,
    height: 20,
  },
  navItem: {
    alignItems: "center",
    width: 75,
    height: 20,
  },
});
