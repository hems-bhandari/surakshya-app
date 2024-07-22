import { useEffect, useState } from "react";
import { TextInput, SafeAreaView, View, Text, ScrollView } from "react-native";
import TextInputCrowdSourcing from "../components/TextInputCrowdSourcing";
import styles from "../styles/form.js";
import Dropdown from "../components/Dropdown";
import CustomTextCaptcha from "../components/CustomTextCaptcha";
import CRIME_TYPES_EN from "../data/CRIME_TYPES_EN";
import CRIME_TYPES_NE from "../data/CRIME_TYPES_NE";
import AskCosent from "../components/AskConsent";
import Alert from "../components/Alert";
import PROVINCES from "../data/provinces.json";
import DISTRICTS from "../data/districts.json";

function Add({ i18n }) {
  // language state
  const [language, setLanguage] = useState(i18n.locale);

  // get the crime types based on language
  const types = (
    language === "ne-NP"
      ? Object.keys(CRIME_TYPES_NE)
      : Object.keys(CRIME_TYPES_EN)
  ).splice(1);

  // get the token from .env
  const token = process.env.REACT_APP_API_TOKEN;

  // data from form
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [crimeType, setCrimeType] = useState(types[0]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [inform, setInform] = useState(false);
  const [message, setMessage] = useState(null);

  // data from api
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    // set the districts based on the selected province
    const filteredDistricts = DISTRICTS.filter(
      (district) => district.province_id === PROVINCES[0].id
    );

    console.log(filteredDistricts);
    console.log(PROVINCES[0].id);
    console.log(PROVINCES[0].Name);

    setDistricts(filteredDistricts);

    if (i18n.locale === "en-US" || i18n.locale === "en-GB") {
      setProvince(PROVINCES[0].Name);
      setDistrict(filteredDistricts[0].Name);
    } else {
      setProvince(PROVINCES[0].Nepali);
      setDistrict(filteredDistricts[0].Nepali);
    }
  }, []);

  const handleProvinceChange = async (province) => {
    setProvince(province);
    setDistrict("");

    // get the province id
    const provinceId =
      i18n.locale === "en-US" || i18n.locale === "en-GB"
        ? PROVINCES.filter((p) => p.Name === province)[0].id
        : PROVINCES.filter((p) => p.Nepali === province)[0].id;

    // set the districts based on the selected province
    const filteredDistricts = DISTRICTS.filter(
      (district) => district.province_id === provinceId
    );

    setDistricts(filteredDistricts);

    if (language === "en-US" || language === "en-GB") {
      setDistrict(filteredDistricts[0].Name);
    } else if (language === "ne-NP") {
      setDistrict(filteredDistricts[0].Nepali);
    }
  };

  const eraseData = () => {
    setAddress("");
    setDetails("");
    setName("");
    setContact("");
    setCrimeType(types[0]);
    setInform(false);

    if (language === "en-US" || language === "en-GB") {
      setProvince(PROVINCES[0].Name);
    } else if (language === "ne-NP") {
      setProvince(PROVINCES[0].Nepali);
    }
    setDistrict("");
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          {message ? (
            <Alert message={message.message} type={message.type} />
          ) : (
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {i18n.t("add.headerTextPart1")}{" "}
                <Text
                  style={{
                    color: "#8D64FF",
                  }}
                >
                  {i18n.t("add.headerTextPart2")}
                </Text>
                !
              </Text>
            </View>
          )}

          <View style={styles.body}>
            <SafeAreaView>
              <Dropdown
                options={types}
                setData={setCrimeType}
                label={i18n.t("add.crimeType")}
                fullWidth={true}
                btnText={i18n.t("add.selectCrimeType")}
                searchPlaceHolder={i18n.t("add.searchHere")}
              />

              <View style={{ display: "flex", flexDirection: "row" }}>
                <Dropdown
                  options={
                    language === "en-US"
                      ? PROVINCES?.map((p) => p.Name)
                      : PROVINCES?.map((p) => p.Nepali)
                  }
                  setData={handleProvinceChange}
                  label={i18n.t("add.province")}
                  btnText={i18n.t("add.selectProvince")}
                  searchPlaceHolder={i18n.t("add.searchHere")}
                />

                <Dropdown
                  options={
                    language === "en-US"
                      ? districts?.map((d) => d.Name)
                      : districts?.map((d) => d.Nepali)
                  }
                  setData={setDistrict}
                  label={i18n.t("add.city")}
                  btnText={i18n.t("add.selectCity")}
                  searchPlaceHolder={i18n.t("add.searchHere")}
                />
              </View>

              <TextInputCrowdSourcing
                label={i18n.t("add.address")}
                setData={setAddress}
                data={address}
              />

              <View
                style={[
                  styles.box,
                  {
                    borderBottomWidth: 0,
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
                  {i18n.t("add.additionalDetails")}
                </Text>
                <TextInput
                  style={[styles.input2]}
                  placeholder={i18n.t("add.detailsPlaceholder")}
                  placeholderStyle={{ fontSize: 10 }}
                  onChangeText={(details) => setDetails(details)}
                  value={details}
                  multiline={true}
                />
              </View>

              <AskCosent i18n={i18n} inform={inform} setInform={setInform} />

              {inform && (
                <>
                  <TextInputCrowdSourcing
                    label={i18n.t("add.yourName")}
                    setData={setName}
                    data={name}
                  />

                  <TextInputCrowdSourcing
                    label={i18n.t("add.contactNumberEmail")}
                    setData={setContact}
                    data={contact}
                  />
                </>
              )}

              {/* Render the custom text-based CAPTCHA component and submit*/}
              <CustomTextCaptcha
                data={{
                  province,
                  city: district,
                  address,
                  details,
                  name,
                  contact,
                  crimeType,
                  reviewed: false,
                }}
                setMessage={setMessage}
                eraseData={eraseData}
                i18n={i18n}
                submit={i18n.t("add.submit")}
              />
            </SafeAreaView>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default Add;
