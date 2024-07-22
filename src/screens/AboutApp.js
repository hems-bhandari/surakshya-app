import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "../styles/about_app";
import { FontAwesome5 } from "@expo/vector-icons";

function AboutApp({ i18n, navigation }) {
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
            {i18n.t("about_app.backButtonText")}
          </Text>
        </TouchableOpacity>

        {/* Content */}
        <ScrollView style={styles.body}>
          <Text style={styles.bodyHeader}>
            {i18n.t("about_app.bodyHeader")}
          </Text>

          {/* About app */}

          <Text style={styles.bodySubHeader}>
            {i18n.t("about_app.aboutSurakshyaSubHeader")}
          </Text>

          <Text style={styles.aboutAppText}>
            {i18n.t("about_app.first_paragraph")}
          </Text>
          <Text style={styles.aboutAppText}>
            {i18n.t("about_app.second_paragraph")}
          </Text>

          {/* Key Features */}
          <Text style={styles.featuresHeader}>
            {i18n.t("about_app.keyFeatures")}
          </Text>

          <Text style={styles.bodySubHeader}>
            {i18n.t("about_app.feature_one")}
          </Text>
          <Text style={styles.aboutAppText}>
            {i18n.t("about_app.feature_one_text")}
          </Text>

          <Text style={styles.bodySubHeader}>
            {i18n.t("about_app.feature_two")}
          </Text>
          <Text style={styles.aboutAppText}>
            {i18n.t("about_app.feature_two_text")}
          </Text>

          <Text style={styles.bodySubHeader}>
            {i18n.t("about_app.feature_three")}
          </Text>
          <Text style={styles.aboutAppText}>
            {i18n.t("about_app.feature_three_text")}
          </Text>
          <Text style={styles.bodySubHeader}>
            {i18n.t("about_app.feature_four")}
          </Text>
          <Text style={styles.aboutAppText}>
            {i18n.t("about_app.feature_four_text")}
          </Text>
          <Text style={styles.bodySubHeader}>
            {i18n.t("about_app.feature_five")}
          </Text>
          <Text style={styles.aboutAppText}>
            {i18n.t("about_app.feature_five_text")}
          </Text>
        </ScrollView>
      </View>
    </>
  );
}

export default AboutApp;
