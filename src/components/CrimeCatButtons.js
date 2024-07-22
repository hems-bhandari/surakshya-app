import { View, Text, Pressable } from "react-native";
import styles from "../styles/crime_cat_buttons";

function CrimeCatButtons({ title, clickFunc, activeButtons }) {
  return (
    <View style={styles.body}>
      <Pressable onPress={clickFunc}>
        <View style={styles.contactItem}>
          <View
            style={[
              styles.contactInfo,
              {
                backgroundColor:
                  activeButtons?.length > 0 && activeButtons?.includes(title)
                    ? "#8D64FF22"
                    : "#fff",
              },
            ]}
          >
            <Text style={styles.contactText}>{title}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default CrimeCatButtons;
