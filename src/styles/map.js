import { StyleSheet, Dimensions } from "react-native";

const MAX_WIDTH = Dimensions.get("window").width - 20;

const styles = StyleSheet.create({
  boxClicked: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 5,
    position: "relative",
    borderBottomColor: "#9747FF",
    borderBottomWidth: 2,
    // display: "none"
  },
  boxUnclicked: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 50,
    position: "relative",
    borderBottomColor: "#9747FF",
    borderBottomWidth: 2,
    display: "none",
  },

  container: {
    flex: 1,

    alignItems: "center",
  },
  contract: {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "35%",
    width: "35%",
  },
  dropdownBtnStyle: {
    height: 40,
    width: MAX_WIDTH,
    backgroundColor: "#fff",
    paddingHorizontal: 0,
  },
  dropdownBtnTxtStyle: {
    color: "#9747FF",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 15,
  },
  dropdownDropdownStyle: {
    backgroundColor: "#fff",
    width: MAX_WIDTH,
    height: Dimensions.get("window").width,
    borderColor: "#9747FF55",
    borderWidth: 1,
    borderRadius: 10,
  },
  dropdownRowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdownRowTxtStyle: { color: "#444", textAlign: "left" },
  dropdownSelectedRowStyle: {
    backgroundColor: "#fff",
  },
  dropdownsearchInputStyleStyle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#9747FF55",
  },
  expand: {
    width: 30,
    height: 30,
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 100,
  },
  headerText: {
    fontSize: 23,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 60,
    textAlign: "center",
  },
  mapBox: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapContainer: {
    marginTop: 20,
    width: MAX_WIDTH,
    height: Dimensions.get("window").height - 280,
    borderColor: "#AD70FD",
    borderWidth: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    // marginBottom: 50,
  },
  catContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderTopColor: "#9747FF",
    borderBottomColor: "#9747FF",
  },
  triggerStyles: {
    triggerText: {
      color: "white",
    },
    triggerWrapper: {
      top: "50%",
      alignItems: "right",
      padding: 10,
      backgroundColor: "#AD70FD",
      borderRadius: 5,
    },
    triggerTouchable: {
      top: "50%",
      // underlayColor: "#AD70FD",
      borderRadius: 5,
      activeOpacity: 70,
    },
  },
  menuText: {
    fontSize: 20,
    padding: 5,
  },
  menuTextLast: {
    fontSize: 20,
    padding: 5,
    marginBottom: 10,
    color: "#999",
  },
});

export default styles;
