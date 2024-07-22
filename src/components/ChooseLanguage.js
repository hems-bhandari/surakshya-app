import { View, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import styles from "../styles/form.js";

function ChooseLanguage({ language, setLanguage, i18n }) {
  return (
    <View
      style={[
        styles.box,
        {
          borderBottomWidth: 0,
          paddingHorizontal: 0,
          marginTop: 20,
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            marginBottom: 5,
          },
        ]}
      >
        {i18n.t("preferredLanguage.chooseLanguageLabel")}
      </Text>
      <View
        style={{
          display: "flex",
        }}
      >
        <View
          style={{
            display: "flex",
            marginRight: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <RadioButton
            value={true}
            status={language == "en-US" || "en-GB" ? "checked" : "unchecked"}
            onPress={() => setLanguage("en-US")}
          />
          <Text
            style={{
              fontSize: 14,
              color: "#555",
            }}
          >
            {i18n.t("preferredLanguage.englishLanguage")}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <RadioButton
            value={false}
            label="No"
            status={language == "ne-NP" ? "checked" : "unchecked"}
            onPress={() => setLanguage("ne-NP")}
          />
          <Text
            style={{
              fontSize: 14,
              color: "#555",
            }}
          >
            {i18n.t("preferredLanguage.nepaliLanguage")}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default ChooseLanguage;
