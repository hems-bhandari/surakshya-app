import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "../styles/detailed_article";
import { FontAwesome5 } from "@expo/vector-icons";

function AboutUs({
  i18n,
  navigation,
  route: {
    params: { title, location, date, description },
  },
}) {
  console.log(title, location, date, description);

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
            {i18n.t("detailed_article.backButtonText")}
          </Text>
        </TouchableOpacity>

        <ScrollView style={styles.body}>
          {/* Title */}
          <Text style={styles.bodyHeader}>{title}</Text>

          {/* Date */}
          <Text style={styles.date}>{date}</Text>

          {/* Location */}
          <Text style={styles.location}>{location}</Text>

          {/* Description */}
          <Text style={styles.description}>{description}</Text>
        </ScrollView>
      </View>
    </>
  );
}

export default AboutUs;
