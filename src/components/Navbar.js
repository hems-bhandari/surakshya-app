import { View, Text, Pressable, Image } from "react-native";
import React from "react";

// importing the icons
import Home from "../../assets/icons/home.png";
import Map from "../../assets/icons/map.png";
import Articles from "../../assets/icons/reading.png";
import Visualization from "../../assets/icons/visualization.png";
import Add from "../../assets/icons/add.png";

// styles
import styles from "../styles/navbar.js";

// external libraries
import { useNavigation } from "@react-navigation/native";

const Navbar = ({ active, setScreen }) => {
  const navigation = useNavigation();

  if (
    active === "Home" ||
    active === "Articles" ||
    active === "Add" ||
    active === "Map" ||
    active === "Visualization"
  ) {
    return (
      <View style={styles.shadowContainer}>
        <View style={styles.container}>
          <Pressable
            style={[styles.navItem]}
            onPress={() => {
              setScreen("Home");
              navigation.navigate("Home");
            }}
          >
            <View
              style={
                active === "Home" ? [styles.icon, styles.active] : styles.icon
              }
            >
              <Image
                source={Home}
                style={
                  active === "Home"
                    ? [styles.image, styles.activeImage]
                    : styles.image
                }
              />
            </View>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => {
              setScreen("Articles");
              navigation.navigate("Articles");
            }}
          >
            <View
              style={
                active === "Articles"
                  ? [styles.icon, styles.active]
                  : styles.icon
              }
            >
              <Image
                source={Articles}
                style={
                  active === "Articles"
                    ? [styles.image, styles.activeImage]
                    : styles.image
                }
              />
            </View>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => {
              setScreen("Add");
              navigation.navigate("Add");
            }}
          >
            <View
              style={
                active === "Add" ? [styles.icon, styles.active] : styles.icon
              }
            >
              <Image
                source={Add}
                style={
                  active === "Add"
                    ? [styles.image, styles.activeImage]
                    : styles.image
                }
              />
            </View>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => {
              setScreen("Map");
              navigation.navigate("Map");
            }}
          >
            <View
              style={
                active === "Map" ? [styles.icon, styles.active] : styles.icon
              }
            >
              <Image
                source={Map}
                style={
                  active === "Map"
                    ? [styles.image, styles.activeImage]
                    : styles.image
                }
              />
            </View>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => {
              setScreen("Visualization");
              navigation.navigate("Visualization");
            }}
          >
            <View
              style={
                active === "Visualization"
                  ? [styles.icon, styles.active]
                  : styles.icon
              }
            >
              <Image
                source={Visualization}
                style={
                  active === "Visualization"
                    ? [styles.image, styles.activeImage]
                    : styles.image
                }
              />
            </View>
          </Pressable>
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default Navbar;
