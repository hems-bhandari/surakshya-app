import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import NepaliDate from "nepali-date-converter";
import { useState } from "react";

const BottomSheetCrimes = ({ district, crimeData, i18n }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{district}</Text>
      <Text style={styles.header2}>Recent Crimes:</Text>

      {crimeData.length > 0 ? (
        crimeData.map((crime, index) => {
          const [expanded, setExpanded] = useState(false);

          return (
            <View style={styles.crime} key={crime["#"]}>
              {/* title */}
              <Text
                style={styles.title}
                lineBreakMode="tail"
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {i18n.locale == "en-US" ? crime.Title : crime["Nepali Title"]}
              </Text>

              {/* date */}
              <Text style={styles.date}>
                {i18n.locale == "en-US"
                  ? crime["Event Date"]
                  : new NepaliDate(new Date(crime["Event Date"])).format(
                      "DD-MM-YYYY",
                      "np"
                    )}
              </Text>
              {/* location */}
              <Text
                style={styles.location}
                lineBreakMode="tail"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {i18n.locale == "en-US"
                  ? crime.Location
                  : crime["Nepali Location"]}
              </Text>

              {/* view full article button */}

              {i18n.locale == "ne-NP" &&
              crime["Nepali Description"] == "" ? null : (
                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                  <Text style={styles.link}>
                    {expanded ? i18n.t("map.viewLess") : i18n.t("map.viewMore")}
                  </Text>
                </TouchableOpacity>
              )}

              {/* full article */}

              {expanded && (
                <Text style={styles.description}>
                  {i18n.locale == "en-US"
                    ? crime.Description || crime["Nepali Description"]
                    : crime["Nepali Description"]}
                </Text>
              )}
            </View>
          );
        })
      ) : (
        <Text>Getting recent crimes...</Text>
      )}
    </View>
  );
};

export default BottomSheetCrimes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  crime: {
    borderBottomColor: "#8F8F8F",
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginVertical: 5,
  },
  date: {
    fontSize: 14,
    color: "#8D64FFdd",
    textDecorationColor: "#8D64FFdd",
    textDecorationLine: "underline",
  },
  description: {
    fontSize: 14,
    color: "#8D64FFee",
    marginTop: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingBottom: 10,
    borderBottomColor: "#8D64FF",
    borderBottomWidth: 1,
    color: "#3C1372",
  },
  header2: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 15,
    marginBottom: 5,
    color: "#3C1372",
  },
  link: {
    fontSize: 14,
    color: "#A6A0B6",
  },
  location: {
    fontSize: 14,
    color: "#8D64FF99",
  },
  title: {
    fontSize: 16,
    color: "#8D64FF",
  },
});
