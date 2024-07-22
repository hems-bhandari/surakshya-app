import { View, Text } from "react-native";
import { RadioButton } from "react-native-paper";
import styles from "../styles/form.js";

function AskConsent({ inform, setInform, i18n }) {
  return (
    <View
      style={[
        styles.box,
        {
          borderBottomWidth: 0,
          paddingHorizontal: 0,
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
        {i18n.t("add.askConsentQuestion")}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginRight: 20,
          }}
        >
          <RadioButton
            value={true}
            status={inform ? "checked" : "unchecked"}
            onPress={() => setInform(true)}
          />
          <Text
            style={{
              fontSize: 14,
              color: "#555",
            }}
          >
            {i18n.t("add.askConsentYes")}
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
            status={!inform ? "checked" : "unchecked"}
            onPress={() => setInform(false)}
          />
          <Text
            style={{
              fontSize: 14,
              color: "#555",
            }}
          >
            {i18n.t("add.askConsentNo")}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default AskConsent;
