import React from "react";
import { Linking, Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import PinnedContacts from "./PinnedContacts";
import AboutUs from "./AboutUs";
import AboutApp from "./AboutApp";
import PreferredLanguage from "./PreferredLanguage";
import CustomDrawerContent from "../components/CustomDrawerContent";
import HomeScreen from "../components/HomeScreen";

const Drawer = createDrawerNavigator();

function Home({ i18n, setLocale, cameraState }) {
  const [pinnedContacts, setPinnedContacts] = React.useState([]);

  return (
    <Drawer.Navigator
      drawerPosition="right"
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerStyle: {
          backgroundColor: "#fff",
          width: 250,
        },
        drawerItemStyle: {
          borderBottomWidth: 1,
          borderBottomColor: "#E5E5E5",
          paddingVertical: 0,
          marginVertical: 0,
        },
        drawerActiveBackgroundColor: "#fff",
        drawerActiveTintColor: "#8D64FF",
        drawerInactiveTintColor: "#3C1372",
        drawerLabelStyle: {
          fontSize: i18n.locale === "ne-NP" ? 16 : 14,
          textTransform: "uppercase",
        },
      }}
      // custom header for the drawer
      drawerContent={(props) => <CustomDrawerContent {...props} i18n={i18n} />}
    >
      <Drawer.Screen name={i18n.t("home.homePage")}>
        {(props) => (
          <HomeScreen
            {...props}
            state={[pinnedContacts, setPinnedContacts]}
            i18n={i18n}
            cameraState={cameraState}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen name={i18n.t("home.pinnedContacts")}>
        {(props) => (
          <PinnedContacts
            {...props}
            i18n={i18n}
            state={[pinnedContacts, setPinnedContacts]}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen name={i18n.t("home.preferredLanguage")}>
        {(props) => (
          <PreferredLanguage {...props} i18n={i18n} setLocale={setLocale} />
        )}
      </Drawer.Screen>
      <Drawer.Screen name={i18n.t("home.aboutApp")}>
        {(props) => <AboutApp {...props} i18n={i18n} />}
      </Drawer.Screen>
      <Drawer.Screen name={i18n.t("home.aboutUs")}>
        {(props) => <AboutUs {...props} i18n={i18n} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default Home;
