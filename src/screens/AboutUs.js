import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "../styles/about_us";
import { FontAwesome5 } from "@expo/vector-icons";

function AboutUs({ i18n, navigation }) {
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
            {i18n.t("about_us.backButtonText")}
          </Text>
        </TouchableOpacity>

        {/* Content */}
        <ScrollView style={styles.body}>
          <Text style={styles.bodyHeader}>{i18n.t("about_us.bodyHeader")}</Text>

          {/* About us */}
          <Text style={styles.aboutUsText}>
            {i18n.t("about_us.aboutUsFirstParagraph")}
          </Text>

          <Text style={styles.aboutUsText}>
            {i18n.t("about_us.aboutUsSecondParagraph")}
          </Text>

          <Text
            style={[
              styles.bodyHeader,
              {
                marginTop: 20,
              },
            ]}
          >
            {i18n.t("about_us.ourTeam")}
          </Text>

          <Text style={styles.aboutUsText}>
            {i18n.t("about_us.ourTeamFirstParagraph")}
          </Text>

          {/* Members */}
          <View style={styles.memberContainer}>
            <View style={styles.memberSubContainer}>
              <Text style={styles.memberRole}>{i18n.t("about_us.mentor")}</Text>
              <Text style={styles.memberName}>
                {i18n.t("about_us.asmitaGautam")}
              </Text>
            </View>

            <View style={styles.memberSubContainer}>
              <Text style={styles.memberRole}>
                {i18n.t("about_us.peerMentor")}
              </Text>
              <Text style={styles.memberName}>
                {i18n.t("about_us.anuskaAcharya")}
              </Text>
            </View>
          </View>

          <View style={styles.memberSubContainer}>
            <Text style={styles.memberRole}>
              {i18n.t("about_us.teamMembers")}
            </Text>
            <View style={styles.otherMemberContainer}>
              <Text style={styles.memberName}>
                {i18n.t("about_us.aashishPanthi")}
              </Text>
              <Text style={styles.memberName}>
                {i18n.t("about_us.hemantaBhandari")}
              </Text>
            </View>
            <View style={styles.otherMemberContainer}>
              <Text style={styles.memberName}>
                {i18n.t("about_us.pramilaRai")}
              </Text>
              <Text style={styles.memberName}>
                {i18n.t("about_us.sangamSubedi")}
              </Text>
            </View>
            <View style={styles.otherMemberContainer}>
              <Text style={styles.memberName}>
                {i18n.t("about_us.sangyaPandey")}
              </Text>
              <Text style={styles.memberName}>
                {i18n.t("about_us.sreejaySubedi")}
              </Text>
            </View>
          </View>

          <Text
            style={[
              styles.aboutUsText,
              {
                marginBottom: 20,
              },
            ]}
          >
            {i18n.t("about_us.ourTeamSecondParagraph")}
          </Text>
        </ScrollView>
      </View>
    </>
  );
}

export default AboutUs;
