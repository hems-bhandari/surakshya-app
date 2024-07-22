import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Pressable,
  Linking,
  Platform,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";
import styles from "../styles/home";
import { fetchData } from "../container/pinContacts";
import { ScrollView } from "react-native";
import Alert from "./Alert";
import QuickAccess from "./QuickAccess";
import EMERGENCY_CONTACTS_EN from "../data/EMERGENCY_CONTACTS";
import EMERGENCY_CONTACTS_NE from "../data/EMERGENCY_CONTACTS_NE";
import { TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } from "@env";
import {
  getLocationPermission,
  getCurrentLocation,
} from "../container/getNearbyHospitals";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ i18n, navigation, state, cameraState }) {
  const PINNED_ORGS =
    i18n.locale === "en-US"
      ? EMERGENCY_CONTACTS_EN.slice(0, 4)
      : EMERGENCY_CONTACTS_NE.slice(0, 4);

  const [isTakingPhoto] = cameraState;

  const [pinnedContacts, setPinnedContacts] = state;
  const [message, setMessage] = useState(null);

  const [firstTime, setFirstTime] = useState(false);

  const call = (phoneNumber) => {
    if (Platform.OS === "android") {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };

  const gettingContactsError = (error) => {
    error &&
      setMessage({
        type: "error",
        message: error,
      });

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  useEffect(() => {
    async function getContacts() {
      await fetchData({
        setPinnedContacts,
        setError: gettingContactsError,
      });

      await checkFirstTime();
    }
    getContacts();
  }, []);

  const showMessage = ({ type, message }) => {
    setMessage({
      type,
      message,
    });

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const sendSMS = async (to, body) => {
    console.log("Sending SMS...");
    try {
      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
        `To=${to}&From=${TWILIO_PHONE_NUMBER}&Body=${body}`,
        {
          auth: {
            username: TWILIO_SID,
            password: TWILIO_AUTH_TOKEN,
          },
        }
      );

      console.log("SMS sent:", response.data);
    } catch (error) {
      console.error("Error sending SMS:", error.response.data);
    }
  };

  const handleEmergencyButtonClick = async () => {
    try {
      console.log("Getting location...");
      await getLocationPermission();
      const { latitude, longitude } = await getCurrentLocation();

      console.log("Sending SMS to pinned contacts...");

      // Send SMS to each pinned contact
      pinnedContacts.forEach((contact) => {
        sendSMS(
          // check if the contact has country code in the number
          contact.phoneNumbers[0].number.includes("+")
            ? contact.phoneNumbers[0].number
            : `+977${contact.phoneNumbers[0].number}`,

          `Emergency: Your Friend needs help!. Location:-  https://maps.google.com/?q=${latitude},${longitude}`
        );
      });

      // success
      setMessage({
        type: "success",
        message: i18n.t("home.emergency_button_success"),
      });
    } catch (e) {
      // error
      setMessage({
        type: "error",
        message: i18n.t("home.emergency_button_failure"),
      });
      console.log("Error sending SMS:", e);
    } finally {
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const checkFirstTime = async () => {
    try {
      const firstTime = await AsyncStorage.getItem("firstTime");
      if (firstTime === null) {
        setFirstTime(true);
        await AsyncStorage.setItem("firstTime", "false");
        setTimeout(() => {
          setFirstTime(false);
        }, 6000);
      } else {
        setFirstTime(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView
          style={[
            styles.container,
            !isTakingPhoto && { paddingBottom: 10, paddingTop: 35 },
          ]}
        >
          {!isTakingPhoto && (
            <>
              {message ? (
                <Alert type={message.type} message={message.message} />
              ) : (
                <View style={styles.header}>
                  <View style={styles.brand}>
                    {/* Logo */}
                    <Image
                      style={styles.logo}
                      source={require("../../assets/icon.png")}
                    />
                    {/* Name */}
                    <Text style={styles.brandName}>
                      {i18n.t("home.brand_first_name")}{" "}
                      <Text
                        style={{
                          color: "#8D64FF",
                        }}
                      >
                        {i18n.t("home.brand_last_name")}
                      </Text>
                      !
                    </Text>
                  </View>

                  {/* Button */}
                  <Pressable
                    onPress={() => navigation.openDrawer()}
                    style={styles.settings}
                  >
                    <Image
                      source={require("../../assets/icons/settings.png")}
                      style={styles.settingsIcon}
                    />
                  </Pressable>
                </View>
              )}

              <View style={styles.emergencyBox}>
                {/* Emergency Button */}
                <View style={styles.container1}>
                  {firstTime && (
                    <Image
                      source={require("../../assets/tooltip.png")}
                      style={styles.tooltip}
                    />
                  )}
                  <TouchableOpacity onLongPress={handleEmergencyButtonClick}>
                    <Image
                      source={require("../../assets/icons/SMS.png")}
                      style={styles.emergencyButton}
                    />
                  </TouchableOpacity>
                </View>
                {pinnedContacts?.length > 0 && (
                  <View style={styles.pinnedContacts}>
                    {/* Pinned contacts */}
                    <View style={styles.pinnedContactsHeader}>
                      <FontAwesome5
                        name="map-pin"
                        size={20}
                        color="#3C1372"
                        style={styles.pinnedContactsHeaderIcon}
                      />
                      <Text style={styles.pinnedContactsHeaderText}>
                        {i18n.t("home.pinned_contacts")}
                      </Text>
                    </View>
                    <View style={styles.pinnedContactsList}>
                      {pinnedContacts.map((contact) => (
                        <View style={styles.pinnedContact} key={contact.id}>
                          <Text style={styles.pinnedContactName}>
                            {contact?.name ??
                              contact?.firstName ??
                              contact?.lastName ??
                              ""}
                          </Text>
                          <Pressable
                            onPress={() => call(contact.phoneNumbers[0].number)}
                          >
                            <FontAwesome5
                              name="phone-alt"
                              size={14}
                              color="#fff"
                              style={styles.pinnedContactIcon}
                            />
                          </Pressable>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
              <View style={styles.emergencyBox}>
                <View
                  style={[
                    styles.pinnedContacts,
                    {
                      marginLeft: 0,
                      paddingLeft: 0,
                      borderLeftWidth: 0,
                    },
                  ]}
                >
                  {/* Pinned contacts */}
                  <View
                    style={[
                      styles.pinnedContactsHeader,
                      {
                        justifyContent: "center",
                        borderBottomColor: "#8D64FF",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.pinnedContactsHeaderText,
                        {
                          fontSize: 20,
                        },
                      ]}
                    >
                      {i18n.t("home.emergency_organizations")}
                    </Text>
                  </View>
                  <View style={styles.pinnedContactsList}>
                    {PINNED_ORGS.map((contact) => (
                      <View style={styles.pinnedContact} key={contact.name}>
                        <Text
                          style={[
                            styles.pinnedContactName,
                            {
                              fontSize: 16,
                              color: "#8D64FF",
                            },
                          ]}
                        >
                          {contact?.name}
                        </Text>
                        <Pressable
                          onPress={() =>
                            call(
                              contact.number.map((number) =>
                                number.provider === "phone"
                                  ? number.number
                                  : null
                              )
                            )
                          }
                        >
                          <FontAwesome5
                            name="phone-alt"
                            size={14}
                            color="#fff"
                            style={[
                              styles.pinnedContactIcon,
                              {
                                paddingHorizontal: 25,
                                paddingVertical: 4,
                              },
                            ]}
                          />
                        </Pressable>
                      </View>
                    ))}
                  </View>
                  {/* All organizations button */}
                  <Pressable
                    onPress={() => navigation.navigate("EmergencyContacts")}
                    style={styles.contactsButton}
                  >
                    <FontAwesome5
                      name="angle-double-right"
                      size={14}
                      color="#8D64FF"
                      style={styles.contactsButtonIcon}
                    />
                    <Text style={styles.contactsButtonText}>
                      {i18n.t("home.all_organizations")}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </>
          )}

          {/* Quick Access */}
          <QuickAccess
            i18n={i18n}
            navigation={navigation}
            cameraState={cameraState}
            showMessage={showMessage}
          />
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

export default HomeScreen;
