import React from "react";
import { View, Text, Pressable } from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";
import styles from "../styles/articlecard";

function ArticleCard({ title, location, date, navigation, description }) {
  console.log(description);

  return (
    <View style={styles.article}>
      <Text style={styles.articleTitle}>{title}</Text>
      <View style={styles.info}>
        <FontAwesome5
          name="map-marker-alt"
          size={15}
          style={styles.icon}
          color="#333"
        />
        <Text
          style={styles.articleLocation}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {location}
        </Text>
      </View>
      <View style={styles.info}>
        <FontAwesome5
          name="calendar-alt"
          size={13}
          style={styles.icon}
          color="#333"
        />
        <Text style={styles.articleDate}>{date}</Text>
      </View>

      <Pressable
        style={[
          styles.info,
          {
            color: "#8D64FF",
          },
        ]}
        onPress={() =>
          navigation.navigate("DetailedArticle", {
            title: title,
            location: location,
            date: date,
            description: description,
          })
        }
      >
        <FontAwesome5
          name="angle-double-right"
          size={15}
          style={styles.icon}
          color="#20202077"
        />
        <Text
          style={{
            color: "#20202077",
            fontSize: 13,
          }}
        >
          View full article
        </Text>
      </Pressable>
    </View>
  );
}

export default ArticleCard;
