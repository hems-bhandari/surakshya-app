import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import PinnedContactList from "../components/PinnedContactList";
// import AllContactList from "../components/AllContactList";
import styles from "../styles/pinned_contacts";

import {
  savePinnedContacts,
  getContacts,
  fetchData,
} from "../container/pinContacts";

function PinnedContacts({ i18n, navigation, state }) {
  const [contacts, setContacts] = useState(null);
  const [error, setError] = useState(null);
  const [pinnedContacts, setPinnedContacts] = state || useState([]);

  const onSortEnd = async (sortedData) => {
    // get first four contacts from sorted data if exists
    const firstFourContacts = sortedData.slice(0, 4);

    // set the remaining contacts as all contacts
    const remainingContacts = sortedData.slice(4);

    // Set the sorted pinned contacts
    setPinnedContacts(firstFourContacts);

    // Set the remaining contacts as all contacts
    setContacts(remainingContacts);

    // Save the sorted pinned contacts to local storage
    await savePinnedContacts(firstFourContacts);
  };

  useEffect(() => {
    async function loadData() {
      await fetchData({
        setError,
        setPinnedContacts,
        setContacts,
      });
    }
    loadData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        {/* Back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome5 name="chevron-left" size={16} color="#8D64FF" />
          <Text style={styles.backButtonText}>
            {i18n.t("pinnedContacts.backButtonText")}
          </Text>
        </TouchableOpacity>

        {contacts === null ? (
          error === null ? (
            <View style={styles.centerTextContainer}>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            <View style={styles.centerTextContainer}>
              <Text style={styles.loadingText}>{error}</Text>
              <Pressable onPress={getContacts}>
                <Text style={styles.loadingText}>Try again</Text>
              </Pressable>
            </View>
          )
        ) : (
          <View style={styles.body}>
            <Text style={styles.bodyHeader}>
              {i18n.t("pinnedContacts.bodyHeader")}
            </Text>
            {/* Helper text */}
            <Text style={styles.helperText}>
              {i18n.t("pinnedContacts.helperText")}
            </Text>

            {/* Contact list */}
            {pinnedContacts.length > 0 && (
              <PinnedContactList
                contacts={pinnedContacts}
                onSortEnd={onSortEnd}
                allContacts={contacts}
              />
            )}

            {/* All conatcts list
            <AllContactList
              i18n={i18n}
              contacts={contacts}
              pinContact={pinContact}
            /> */}
          </View>
        )}
      </View>
    </>
  );
}

export default PinnedContacts;
