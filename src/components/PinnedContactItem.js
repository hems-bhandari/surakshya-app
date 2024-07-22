import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ShadowDecorator } from "react-native-draggable-flatlist";

function PinnedContactList({ item: contact, isActive, drag }) {
  return (
    <ShadowDecorator>
      <View
        style={[
          styles.box,
          { backgroundColor: isActive ? "#8F64FF11" : "#8F64FF22" },
        ]}
      >
        {/* Sort icon */}
        <TouchableOpacity onPressIn={drag} disabled={isActive}>
          <View style={styles.sortIcon}>
            <FontAwesome5 name="bars" size={18} color="#8F64FF" />
          </View>
        </TouchableOpacity>
        {/*Body */}
        <View style={styles.body}>
          <Text style={styles.contactName}>
            {
              // Display contact name
              contact?.name ?? contact?.firstName ?? contact?.lastName ?? ""
            }
          </Text>
        </View>
      </View>
    </ShadowDecorator>
  );
}

const styles = StyleSheet.create({
  box: {
    width: Dimensions.get("window").width - 20,

    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 1,
    borderColor: "#8F64FF",
    marginVertical: 5,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  contactName: {
    color: "#8F64FF",
    fontSize: 18,
    fontWeight: "bold",
  },
  sortIcon: {
    padding: 5,
  },
});

export default PinnedContactList;
