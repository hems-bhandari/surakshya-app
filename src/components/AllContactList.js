import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/pinned_contacts";
import NotPinnedContactItem from "./NotPinnedContactItem";

function AllContactList({ i18n, contacts, pinContact }) {
  return (
    <>
      <View style={styles.otherContactsContainer}>
        <Text style={styles.bodyHeader}>
          {i18n.t("pinnedContacts.otherContacts")}
        </Text>
        {
          // Display all contacts
          contacts.map((contact) => (
            <NotPinnedContactItem
              key={contact.id}
              contact={contact}
              pinContact={pinContact}
            />
          ))
        }
      </View>
    </>
  );
}

export default AllContactList;
