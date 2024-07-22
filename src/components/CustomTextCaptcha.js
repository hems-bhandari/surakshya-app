import React, { useState, useEffect } from "react";
import styles from "../styles/customtextcaptcha";
import SubmitCrowdSource from "../container/SubmitCrowdSource";
import { View, Text, TextInput, Pressable } from "react-native";

const generateCaptchaText = (length) => {
  const possibleChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captchaText = "";
  for (let i = 0; i < length; i++) {
    captchaText += possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    );
  }
  return captchaText;
};

function CustomTextCaptcha({ data, submit, i18n, setMessage, eraseData }) {
  const captchaLength = 6;

  const [captchaText, setCaptchaText] = useState(
    generateCaptchaText(captchaLength)
  );
  const [userAnswer, setUserAnswer] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const generateNewCaptcha = () => {
    setCaptchaText(generateCaptchaText(captchaLength));
    setUserAnswer("");
    setIsCaptchaValid(false);
  };

  useEffect(() => {
    generateNewCaptcha();
  }, []);

  const eraseMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleSubmit = async () => {
    // check if all fields are filled
    if (data.details === "") {
      setMessage({
        type: "error",
        message: i18n.t("add.emptyDetailsFieldError"),
      });
      eraseMessage();
      return;
    } else if (
      data.province === "" ||
      data.city === "" ||
      data.address === ""
    ) {
      setMessage({
        type: "error",
        message: i18n.t("add.emptyLocationFieldError"),
      });
      eraseMessage();
      return;
    }

    if (userAnswer.toLowerCase() === captchaText.toLowerCase()) {
      setIsCaptchaValid(true);
      console.log("CAPTCHA passed!");

      try {
        console.log(data);
        await SubmitCrowdSource(data);
        // erase the data
        setUserAnswer("");
        // show the success message
        setMessage({
          type: "success",
          message: i18n.t("add.successMessage"),
        });

        eraseData();
      } catch (err) {
        setMessage({
          type: "error",
          message: i18n.t("add.failureMessage"),
        });
        console.log(err);
      } finally {
        eraseMessage();
      }
    } else {
      setIsCaptchaValid(false);
      setMessage({
        type: "error",
        message: i18n.t("add.captchaError"),
      });
      console.log("CAPTCHA failed!");
      eraseMessage();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.captchaContainer}>
        <View style={styles.captchaInputContainer}>
          <Text style={styles.captchaLabel}>
            {i18n.t("add.captchaLabel")}:{" "}
          </Text>
          <TextInput
            style={[
              styles.input,
              isCaptchaValid ? styles.inputValid : styles.inputInvalid,
              {
                width: "100%",
                marginTop: 5,
                marginBottom: 0,
                backgroundColor: "#fff",
                height: 30,
              },
            ]}
            value={userAnswer}
            onChangeText={setUserAnswer}
            placeholder={i18n.t("add.captchaPlaceholder")}
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text style={styles.captchaText}>{captchaText}</Text>
        </View>
      </View>
      {/* <Pressable onPress={generateNewCaptcha} style={styles.button}>
        <Text style={styles.buttonText}>New CAPTCHA</Text>
      </Pressable> */}
      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>{submit}</Text>
      </Pressable>
    </View>
  );
}

export default CustomTextCaptcha;
