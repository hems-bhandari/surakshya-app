import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import styles from "../styles/preferred_languages";
import ChooseLanguage from "../components/ChooseLanguage";
import AsyncStorage from "@react-native-async-storage/async-storage";

function PreferredLanguage({ i18n, navigation, setLocale }) {
  const handleLanguageChange = async (language) => {
    // Save pinned contacts to local storage
    try {
      setLocale(language);
      await AsyncStorage.setItem("language", JSON.stringify(language));
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Saved");
    }
  };

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
            {i18n.t("preferredLanguage.backButtonText")}
          </Text>
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.body}>
          <Text style={styles.bodyHeader}>
            {i18n.t("preferredLanguage.bodyHeader")}
          </Text>

          {/* Language options */}
          <ChooseLanguage
            language={i18n.locale}
            setLanguage={handleLanguageChange}
            i18n={i18n}
          />
        </View>
      </View>
    </>
  );
}

export default PreferredLanguage;
