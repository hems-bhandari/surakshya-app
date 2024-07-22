import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import ArticleCard from "../components/ArticleCard";
import provinces_en from "../data/provinces_en";
import provinces_ne from "../data/provinces_ne";
import RetrieveLatestNewsArticles from "../container/RetrieveLatestNewsArticles";
import Dropdown from "../components/Dropdown";
import NepaliDate from "nepali-date-converter";
import CRIME_TYPES_EN from "../data/CRIME_TYPES_EN";
import CRIME_TYPES_NE from "../data/CRIME_TYPES_NE";

function Articles({ i18n, navigation }) {
  const provinces_dict = i18n.locale === "ne-NP" ? provinces_ne : provinces_en;
  const provinces = Object.keys(provinces_dict);
  const crime_type = i18n.locale === "ne-NP" ? CRIME_TYPES_NE : CRIME_TYPES_EN;
  const types = Object.keys(crime_type);

  const [province, setProvince] = useState(provinces[0]);
  const [articleType, setArticleType] = useState(types[0]);
  const [provinceArticles, setProvinceArticles] = useState([]); // articles for the selected province

  const [articlesCol1, setArticlesCol1] = useState([]);
  const [articlesCol2, setArticlesCol2] = useState([]);

  const setArticleData = (articles) => {
    if (articles.length === 0) {
      setArticlesCol1([]);
      setArticlesCol2([]);
      return;
    }

    // set the articles in two columns
    const col1 = [];
    const col2 = [];

    console.log("sorting articles: ");

    for (let i = 0; i < articles.length; i++) {
      if (i % 2 == 0) {
        col2.push(articles[i]);
      } else {
        col1.push(articles[i]);
      }
    }

    setArticlesCol1(col1);
    setArticlesCol2(col2);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const search_province = provinces_dict[province];

        // if type is all articles, then don't pass it as a parameter
        if (crime_type[articleType] == "All Articles") {
          console.log("searching for all articles");
          if (provinceArticles.length > 0) {
            setArticleData(provinceArticles);
            return;
          }

          // get all the articles for the selected province
          const articles = await RetrieveLatestNewsArticles(search_province);
          console.log(articles);
          setProvinceArticles(articles);
          setArticleData(articles);
        } else {
          console.log("searching for specific type");

          // filter the articles based on type
          let articles = provinceArticles.filter(
            (article) => article["Cause - Primary"] == crime_type[articleType]
          );

          console.log("filtered articles: ", articles);
          if (articles.length === 0) {
            articles = [{ Title: "No Articles" }];
          }
          setArticleData(articles);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchArticles();
  }, [province, articleType]);

  const handleProvinceChange = (province) => {
    // reset all rendered articles
    setArticleData([]);

    // reset the province articles
    setProvinceArticles([]);

    // reset the province
    setProvince(province);

    // reset the article type to all articles
    setArticleType(types[0]);
  };

  const handleTypeChange = (type) => {
    // setArticleData([]);
    setArticleType(type);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {i18n.t("articles.updatesFor")}{" "}
              <Text
                style={{
                  color: "#8D64FF",
                }}
              >
                {i18n.t("articles.you")}
              </Text>
              !
            </Text>
          </View>
          <SafeAreaView>
            <View
              style={{
                marginTop: 5,
                paddingHorizontal: 15,
              }}
            >
              <Dropdown
                options={provinces}
                setData={handleProvinceChange}
                label={i18n.t("articles.selectProvince")}
                fullWidth={true}
                btnText={i18n.t("articles.province")}
                searchPlaceHolder={i18n.t("articles.searchHere")}
              />
              <Dropdown
                options={types}
                setData={handleTypeChange}
                label={i18n.t("articles.selectType")}
                fullWidth={true}
                btnText={i18n.t("articles.type")}
                searchPlaceHolder={i18n.t("articles.searchHere")}
              />
            </View>
          </SafeAreaView>
          <View style={styles.body}>
            {articlesCol1.length === 0 ? (
              <Text
                style={{
                  marginTop: Dimensions.get("window").height / 5,
                  alignItems: "center",
                  fontSize: 20,
                }}
              >
                {i18n.t("articles.loading")}
              </Text>
            ) : !articlesCol1[0] ? (
              <Text
                style={{
                  marginTop: Dimensions.get("window").height / 5,
                  alignItems: "center",
                  fontSize: 20,
                }}
              >
                {i18n.t("articles.noArticles")}
              </Text>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  flex: 1,
                }}
              >
                <View>
                  {articlesCol1.map((article, index) => (
                    <ArticleCard
                      navigation={navigation}
                      key={article["#"]}
                      title={
                        i18n.locale == "en-US"
                          ? article.Title
                          : article["Nepali Title"]
                      }
                      location={
                        i18n.locale == "en-US"
                          ? article.Location
                          : article["Nepali Location"]
                      }
                      date={
                        i18n.locale == "en-US"
                          ? article["Event Date"]
                          : new NepaliDate(
                              new Date(article["Event Date"])
                            ).format("DD-MM-YYYY", "np")
                      }
                      description={
                        i18n.locale == "en-US"
                          ? article.Description || article["Nepali Description"]
                          : article["Nepali Description"]
                      }
                    />
                  ))}
                </View>
                <View>
                  {articlesCol2.map((article, index) => (
                    <ArticleCard
                      key={article["#"]}
                      navigation={navigation}
                      title={
                        i18n.locale == "en-US"
                          ? article.Title
                          : article["Nepali Title"]
                      }
                      location={
                        i18n.locale == "en-US"
                          ? article.Location
                          : article["Nepali Location"]
                      }
                      date={
                        i18n.locale == "en-US"
                          ? article["Event Date"]
                          : new NepaliDate(
                              new Date(article["Event Date"])
                            ).format("DD-MM-YYYY", "np")
                      }
                      description={
                        i18n.locale == "en-US"
                          ? article.Description || article["Nepali Description"]
                          : article["Nepali Description"]
                      }
                    />
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignContent: "flex-start",
    alignItems: "flex-start",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
    minHeight: Dimensions.get("window").height,
  },
  headerText: {
    fontSize: 25,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Articles;
