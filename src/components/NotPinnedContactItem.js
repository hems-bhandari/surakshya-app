import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

function PinnedContactList({ contact, pinContact }) {
  return (
    <>
      <View style={[styles.box]}>
        {/* Pin icon */}
        {/*Body */}
        <View style={styles.body}>
          <Text style={styles.contactName}>
            {
              // Display contact name
              contact?.name ?? contact?.firstName ?? contact?.lastName ?? ""
            }
          </Text>
        </View>
        <TouchableOpacity
          style={styles.sortIcon}
          onPress={() => {
            pinContact(contact);
          }}
        >
          <FontAwesome5 name="thumbtack" size={18} color="#8F64FF" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#8F64FF",
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
    fontSize: 17,
    fontWeight: "bold",
  },
  sortIcon: {
    padding: 5,
  },
});

export default PinnedContactList;
