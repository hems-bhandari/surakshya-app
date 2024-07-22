import React from "react";
import styles from "../styles/organization_details";
import {
  SafeAreaView,
  ScrollView,
  Pressable,
  View,
  Text,
  Linking,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { FontAwesome5 } from "@expo/vector-icons";

import EMERGENCY_CONTACTS_EN from "../data/EMERGENCY_CONTACTS";
import EMERGENCY_CONTACTS_NE from "../data/EMERGENCY_CONTACTS_NE";

function AboutOrganization({
  route: {
    params: { name },
  },
  i18n,
  navigation,
}) {
  const EMERGENCY_CONTACTS =
    i18n.locale === "en-US" ? EMERGENCY_CONTACTS_EN : EMERGENCY_CONTACTS_NE;

  const org = EMERGENCY_CONTACTS.find((contact) => contact.name === name);

  const { number, email, logo } = org;
  const services = org?.services ? org.services : null;
  const contacts = org?.contacts ? org.contacts : null;

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
      phoneNumber = `whatsapp://send?text=${message}&phone=${phoneNumber}`;
      Linking.openURL(phoneNumber);
    } else if (provider === "viber") {
      phoneNumber = `viber://add?number=${phoneNumber}`;
      Linking.openURL(phoneNumber);
    }
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <FontAwesome5 name="chevron-left" size={16} color="#8D64FF" />
              <Text style={styles.backButtonText}>
                {i18n.t("emergency.backButtonText")}
              </Text>
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.headerText}>{name}</Text>
            </View>

            <View style={styles.contactInfo}>
              <View>
                <Image
                  style={styles.contactLogo}
                  resizeMode="contain"
                  width={100}
                  height={100}
                  source={logo}
                />
              </View>

              <View>
                <View style={styles.contact}>
                  <View style={styles.contactItem}>
                    <Text style={styles.contactText}>
                      {i18n.t("emergency.phone")} :
                    </Text>
                    <Pressable
                      onPress={() =>
                        call(
                          number.find((contact) => contact.provider === "phone")
                            .number,
                          "phone"
                        )
                      }
                    >
                      <Text style={styles.contactData}>
                        {
                          number.find((contact) => contact.provider === "phone")
                            .number
                        }
                      </Text>
                    </Pressable>
                  </View>
                  <View style={styles.contactItem}>
                    <Text style={styles.contactText}>
                      {i18n.t("emergency.email")} :
                    </Text>
                    <Pressable
                      onPress={() =>
                        Linking.openURL(
                          `mailto:${email}?subject=${i18n.t(
                            "emergency.helloHelp"
                          )}`
                        )
                      }
                    >
                      <Text
                        style={styles.contactData}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                      >
                        {email}
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.buttons}>
                  {number.map(({ provider, number: num }, i) => (
                    <Pressable
                      style={[
                        styles.button,
                        number.length === 1 && {
                          flex: 1,
                        },
                      ]}
                      onPress={() => call(num, provider)}
                      key={provider + num}
                    >
                      <FontAwesome5
                        name={provider === "phone" ? "phone-alt" : provider}
                        size={14}
                        color="#8D64FF"
                      />
                      <Text style={styles.buttonText}>
                        {provider === "phone" ? "Call" : provider}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.description}>
              {services && (
                <>
                  <Text style={styles.descriptionHeader}>
                    {i18n.t("emergency.servicesOffered")}:
                  </Text>

                  <View style={styles.descriptionText}>
                    {services.map((service, i) => (
                      <View
                        style={styles.descriptionListItem}
                        key={service.name}
                      >
                        <Text style={styles.descriptionListItemText}>
                          {`${i + 1}. ${service.name}:`}
                        </Text>
                        <Text style={styles.descriptionListItemTextDescription}>
                          {service.description}
                        </Text>
                      </View>
                    ))}
                  </View>
                </>
              )}

              {contacts && (
                <>
                  <Text style={styles.descriptionHeader}>
                    {i18n.t("emergency.contactDetails")}:
                  </Text>
                  {/* loop over the contacts object and list the key value pair */}
                  <View style={styles.descriptionText}>
                    {Object.keys(contacts).map((key) => (
                      <View
                        key={key}
                        style={{
                          marginBottom: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: "#3C1372",
                            textTransform: "capitalize",
                          }}
                        >{`${key}: `}</Text>

                        {/* if {contacts[key]} is link, open that link */}
                        {contacts[key].includes("http") ? (
                          <Text
                            style={{
                              color: "#8D64FF",
                            }}
                            onPress={() => Linking.openURL(contacts[key])}
                          >
                            {contacts[key]}
                          </Text>
                        ) : (
                          <Text>{contacts[key]}</Text>
                        )}
                      </View>
                    ))}
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default AboutOrganization;
