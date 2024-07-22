import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

const SettingsPanel = ({ isVisible, onClose, onSelectLanguage }) => {
  const panelAnimation = useRef(new Animated.Value(0)).current;
  const [isPanelVisible, setIsPanelVisible] = useState(isVisible);

  useEffect(() => {
    setIsPanelVisible(isVisible);
    Animated.timing(panelAnimation, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (!isVisible) {
        setIsPanelVisible(false);
      }
    });
  }, [isVisible]);

  const changeLanguage = (language) => {
    onSelectLanguage(language);
  };

  const handleOutsideClick = () => {
    onClose();
  };

  const handlePanelClick = () => {
    // Slide out the panel when clicked on close
    Animated.timing(panelAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsPanelVisible(false);
      onClose();
    });
  };

  return (
    isPanelVisible && (
      <TouchableWithoutFeedback onPress={handleOutsideClick}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  translateX: panelAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [200, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handlePanelClick}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <View style={styles.content}>
            {/* Include your language selection components here */}
            <TouchableOpacity onPress={() => changeLanguage("en")}>
              <Text>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguage("ne")}>
              <Text>Nepali</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 200,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    backgroundColor: "lightgray",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SettingsPanel;
