import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Linking,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/emergency_contacts";
import { FontAwesome5 } from "@expo/vector-icons";
import EMERGENCT_CONTACTS_EN from "../data/EMERGENCY_CONTACTS";
import EMERGENCT_CONTACTS_NE from "../data/EMERGENCY_CONTACTS_NE";
import { Image } from "expo-image";

function EmergencyContacts({ i18n, navigation }) {
  const EMERGENCT_CONTACTS =
    i18n.locale === "en-US" ? EMERGENCT_CONTACTS_EN : EMERGENCT_CONTACTS_NE;

  const call = (phoneNumber, provider) => {
    if (provider === "phone") {
      if (Platform.OS === "android") {
        phoneNumber = `tel:${phoneNumber}`;
      } else {
        phoneNumber = `telprompt:${phoneNumber}`;
      }

      Linking.openURL(phoneNumber);
    } else if (provider === "whatsapp") {
      const message = i18n.t("emergency.helloHelp");
      phoneNumber = `http://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
      Linking.openURL(phoneNumber);
    } else if (provider === "viber") {
      phoneNumber = `viber://chat?number=%2B977-${phoneNumber}`;
      Linking.openURL(phoneNumber);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome5 name="chevron-left" size={16} color="#8D64FF" />
          <Text style={styles.backButtonText}>
            {i18n.t("emergency.homeButtonText")}
          </Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.headerText}>
            {i18n.t("emergency.emergency")}{" "}
            <Text
              style={{
                color: "#8D64FF",
              }}
            >
              {i18n.t("emergency.contacts")}
            </Text>
            !
          </Text>
        </View>

        <View style={styles.body}>
          {EMERGENCT_CONTACTS.map(({ name, number, logo }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("AboutOrganization", {
                  name,
                })
              }
              key={name}
            >
              <View style={styles.contactItem} key={name}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.contactLogo}
                    resizeMode="contain"
                    source={logo}
                  />
                </View>
                <View style={styles.contactInfo}>
                  <Text
                    style={styles.contactText}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {name}
                  </Text>
                  <View style={styles.buttonContainer}>
                    {number?.map(({ provider, number: num }) => (
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => call(num, provider)}
                        key={provider + num}
                      >
                        <FontAwesome5
                          name={provider === "phone" ? "phone-alt" : provider}
                          size={14}
                          color="#fff"
                        />
                        <Text style={styles.buttonText}>
                          {provider === "phone" ? "Call" : provider}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EmergencyContacts;
