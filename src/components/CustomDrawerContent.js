import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Pressable } from "react-native";
import { View, Text, Image } from "react-native";
import styles from "../styles/drawer";

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Add a settings text and next to it add a close button */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{props.i18n.t("home.settings")}</Text>
        <Pressable
          onPress={() => props.navigation.closeDrawer()}
          style={styles.closeButton}
        >
          <Image
            source={require("../../assets/icons/times.png")}
            style={styles.closeIcon}
          />
        </Pressable>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
