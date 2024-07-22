import "react-native-url-polyfill/auto";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";

// for localisation
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import your language files
import en from "./translations/en.json";
import ne from "./translations/ne.json";

// Screens
import Home from "./src/screens/Home.js";
import Visualization from "./src/screens/Visualization.js";
import Add from "./src/screens/Add.js";
import Map from "./src/screens/Map.js";
import Articles from "./src/screens/Articles.js";
import EmergencyContacts from "./src/screens/EmergencyContacts.js";
import DetailedArticle from "./src/screens/DetailtedArticle.js";

// Components
import Navbar from "./src/components/Navbar.js";
import AboutOrganization from "./src/screens/OrganizationDetails.js";

// Menu provider
// import { MenuProvider } from "react-native-popup-menu";

export default function App() {
  const [defaultScreen, setDefaultScreen] = useState("Home");
  const [locale, setLocale] = useState("en-US");
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);

  const i18n = new I18n();
  i18n.fallbacks = true;
  i18n.translations = {
    "en-US": en,
    "ne-NP": ne,
    "en-GB": en,
  };
  i18n.locale = locale;
  i18n.defaultLocale = "ne-NP";

  const Stack = createStackNavigator();

  useEffect(() => {
    async function getLanguage() {
      // get the language preference from the device's storage
      try {
        const language = await AsyncStorage.getItem("language");
        if (language) {
          setLocale(JSON.parse(language));
        } else {
          const locale = Localization.locale === "ne-NP" ? "ne-NP" : "en-US";
          setLocale(locale);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getLanguage();
  }, []);

  return (
    // <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={defaultScreen}>
          <Stack.Screen
            name="Home"
            options={{
              headerShown: false,
              animation: "none",
            }}
          >
            {(props) => (
              <Home
                {...props}
                i18n={i18n}
                cameraState={[isTakingPhoto, setIsTakingPhoto]}
                setLocale={setLocale}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Visualization"
            options={{
              headerShown: false,
              animation: "none",
            }}
          >
            {(props) => <Visualization {...props} i18n={i18n} />}
          </Stack.Screen>
          <Stack.Screen
            name="Add"
            options={{
              headerShown: false,
              animation: "none",
            }}
          >
            {(props) => <Add {...props} i18n={i18n} />}
          </Stack.Screen>
          <Stack.Screen
            name="Map"
            options={{
              headerShown: false,
              animation: "none",
            }}
          >
            {(props) => <Map {...props} i18n={i18n} />}
          </Stack.Screen>
          <Stack.Screen
            name="Articles"
            options={{
              headerShown: false,
              animation: "none",
            }}
          >
            {(props) => <Articles {...props} i18n={i18n} />}
          </Stack.Screen>
          <Stack.Screen
            name="EmergencyContacts"
            options={{
              headerShown: false,
              animation: "none",
            }}
          >
            {(props) => <EmergencyContacts {...props} i18n={i18n} />}
          </Stack.Screen>

          <Stack.Screen
            name="AboutOrganization"
            options={{
              headerShown: false,
              animation: "none",
            }}
          >
            {(props) => <AboutOrganization {...props} i18n={i18n} />}
          </Stack.Screen>

          <Stack.Screen
            name="DetailedArticle"
            options={{
              headerShown: false,
              animation: "none",
            }}
          >
            {(props) => <DetailedArticle {...props} i18n={i18n} />}
          </Stack.Screen>
        </Stack.Navigator>

        {!isTakingPhoto && (
          <Navbar setScreen={setDefaultScreen} active={defaultScreen} />
        )}
      </NavigationContainer>
  );
}
