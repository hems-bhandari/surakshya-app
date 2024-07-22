import { useEffect, useState, useMemo, useRef } from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import MapView, { Marker, Polygon } from "react-native-maps";
import { FontAwesome } from "react-native-vector-icons";
import styles from "../styles/map.js";
import CRIME_TYPES_EN from "../data/CRIME_TYPES_EN";
import CRIME_TYPES_NE from "../data/CRIME_TYPES_NE";
import getNearbyHospitals from "../container/getNearbyHospitals.js";
import districtPolygons from "../data/district-polygon.json";
import RetrieveCrimeCountByDistrict from "../container/RetrieveCrimeCountByDistrict";
import RetrieveTotalCrimeCount from "../container/RetrieveTotalCrimeCount.js";
import RetrieveCrimesByDistrict from "../container/RetrieveCrimesByDistrict.js";
import RetrieveTotalCountByCrimeType from "../container/RetrieveTotalCountByCrimeType.js";
import RetrieveCrimeCountByCause from "../container/RetrieveCrimeCountByCause.js";
import CrimeCatButtons from "../components/CrimeCatButtons.js";
import policeStationsData from "../data/police-stations.json";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import BottomSheetCrimes from "../components/BottomSheetCrimes.js";
// import { renderers } from 'react-native-popup-menu';
// const { SlideInMenu } = renderers;

// import {
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from "react-native-popup-menu";

async function processDistrictData(districtData, crimeType, types) {
  const districtName = districtData.properties.Name;

  if (crimeType === "All Categories") {
    const crimeCount = await RetrieveCrimeCountByDistrict(districtName);
    return { districtName, crimeCount: crimeCount[0] };
  } else {
    const crimeCount = await RetrieveCrimeCountByCause(
      districtName,
      types[crimeType]
    );
    return { districtName, crimeCount: crimeCount[0] };
  }
}

function Map({ i18n, navigation }) {
  const [districtsWithCrimeData, setDistrictsWithCrimeData] = useState({});
  const [totalCrime, setTotalCrime] = useState([]);
  const [crimeType, setCrimeType] = useState("All Categories");
  const [expanded, setExpanded] = useState(false);
  const [language, setLanguage] = useState(i18n.locale);
  const [boxStyle, setBoxStyle] = useState(true);
  const [crimesPoly, setCrimesPoly] = useState(false);
  const [showPoliceStations, setShowPoliceStations] = useState(false);
  const [showHospitals, setShowHospitals] = useState(false);
  const [loadingCrimeData, setLoadingCrimeData] = useState(false);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [districtCrimeData, setDistrictCrimeData] = useState([]);

  //user location
  const [userLocation, setUserLocation] = useState({
    latitude: 27.7172,
    longitude: 84.524,
  });

  const [activeButtons, setActiveButtons] = useState([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheet = useRef(null);
  const snapPoints = useMemo(() => ["30%", "50%", "90%"], []);

  const [openedDistrict, setOpenedDistrict] = useState(null);
  const [crimeData, setCrimeData] = useState([]);

  const crime_type = i18n.locale === "ne-NP" ? CRIME_TYPES_NE : CRIME_TYPES_EN;

  const openBottomSheet = () => {
    bottomSheet.current?.snapToIndex(1);
    setIsBottomSheetOpen(true);
  };

  // --------------------
  const togglePoliceStations = () => {
    setShowPoliceStations(!showPoliceStations);
  };

  const memoizedPoliceMarkers = useMemo(() => {
    return showPoliceStations
      ? policeStationsData.map((station, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: station.Latitude,
              longitude: station.Longitude,
            }}
            title={station["Office Name"]}
            description={station["Telephone number"]}
          />
        ))
      : null;
  }, [showPoliceStations]);
  // --------------------

  function crimeHandler() {
    setBoxStyle(!boxStyle);
    setCrimesPoly(!crimesPoly);
    return;
  }

  function hospitalHandler() {
    if (!crimesPoly) {
      setBoxStyle(true);
    } // setCrimesPoly(false);
    return;
  }

  function policeHandler() {
    if (!crimesPoly) {
      setBoxStyle(true);
    }
    // setCrimesPoly(false);
    return;
  }

  const highlightButton = (title) => {
    if (activeButtons != null) {
      if (activeButtons?.includes(title)) {
        setActiveButtons(activeButtons?.filter((item) => item !== title));
      } else {
        setActiveButtons([...activeButtons, title]);
      }
    } else {
      setActiveButtons([title]);
    }
  };

  const catArray = [
    {
      title: i18n.t("map.policeStations"), // "Police Stations",
      clickFunc: () => {
        highlightButton(i18n.t("map.policeStations"));
        togglePoliceStations();
        policeHandler();
      },
    }, // toggle police stations
    {
      title: i18n.t("map.hospitals"), // "Hospitals
      clickFunc: () => {
        highlightButton(i18n.t("map.hospitals"));
        toggleHospitals();
        hospitalHandler();
      },
    },
    {
      title: i18n.t("map.crimes"), // "Crimes"
      clickFunc: () => {
        highlightButton(i18n.t("map.crimes"));
        crimeHandler();
      },
    },
  ];

  // const timeRanges = ["Last month", "Last year", "Last 5 years"]

  useEffect(() => {
    async function fetchData() {
      const processDistrictDataArray = async (
        districtDataArray,
        crimeType,
        crime_type
      ) => {
        const promises = districtDataArray.map((districtData) =>
          processDistrictData(districtData, crimeType, crime_type)
        );
        return Promise.all(promises);
      };

      processDistrictDataArray(districtPolygons.features, crimeType, crime_type)
        .then((results) => {
          const districtsData = {};
          for (const result of results) {
            districtsData[result.districtName] = result.crimeCount;
          }
          setDistrictsWithCrimeData(districtsData);
        })
        .catch((error) => {
          console.error("Error processing district data:", error);
        });

      if (crimeType === "All Categories") {
        const totalCount = await RetrieveTotalCrimeCount();
        setTotalCrime(totalCount[0]);
      } else {
        const totalCount = await RetrieveTotalCountByCrimeType(
          crime_type[crimeType]
        );
        setTotalCrime(totalCount[0]);
      }
    }

    fetchData();
  }, [crimeType]);

  const calculateOpacity = (districtName) => {
    crimeCount = districtsWithCrimeData[districtName];
    const opacity = crimesPoly ? (crimeCount / totalCrime) * 100 : 0;
    return opacity;
  };

  // get the crime types based on language
  const types = (
    language === "ne-NP"
      ? Object.keys(CRIME_TYPES_NE)
      : Object.keys(CRIME_TYPES_EN)
  ).slice(1);

  useEffect(() => {
    async function fetchData() {
      setLoadingCrimeData(true);

      const { UserLatitude, UserLongitude, nearbyHospitals } =
        await getNearbyHospitals();

      if (UserLatitude && UserLongitude) {
        setUserLocation({ latitude: UserLatitude, longitude: UserLongitude });
      }

      setNearbyHospitals(nearbyHospitals);
      setLoadingCrimeData(false);
    }
    fetchData();
  }, []);

  const toggleHospitals = () => {
    setShowHospitals(!showHospitals);
  };

  const memoizedHospitalMarkers = useMemo(() => {
    return showHospitals && nearbyHospitals.length > 0
      ? nearbyHospitals.map((hospital, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: hospital.latitude,
              longitude: hospital.longitude,
            }}
            title={hospital["name"]}
            // description={hospital["tel"]}
          />
        ))
      : null;
  }, [showHospitals, nearbyHospitals]);

  const handlePolygonPress = async (districtName) => {
    openBottomSheet();

    // check if user has clicked on the same district
    if (openedDistrict === districtName) {
      return;
    }

    setCrimeData([]);

    setOpenedDistrict(districtName);

    const crimeData = await RetrieveCrimesByDistrict(districtName);
    setDistrictCrimeData(crimeData);
    let articles = crimeData;
    if (crimeType != "All Categories") {
      articles = crimeData.filter(
        (article) => article["Cause - Primary"] == crime_type[crimeType]
      );
    }
    setCrimeData(articles);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: "#fff",
          },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
        >
          {!expanded && (
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {i18n.t("map.crimesAround")}{" "}
                <Text
                  style={{
                    color: "#8D64FF",
                  }}
                >
                  {i18n.t("map.yourArea")}
                </Text>
                !
              </Text>
            </View>
          )}
          <View style={styles.catContainer}>
            {catArray.map((cat) => (
              <CrimeCatButtons
                key={cat.title}
                title={cat.title}
                activeButtons={activeButtons}
                clickFunc={cat.clickFunc}
              />
            ))}
          </View>
          {/* Filter the type of crime */}
          {!expanded && (
            <View style={boxStyle ? styles.boxUnclicked : styles.boxClicked}>
              <SelectDropdown
                data={[i18n.t("map.allCategories"), ...types]}
                defaultValueByIndex={0}
                onSelect={(selectedItem, index) => {
                  setCrimeType(selectedItem);

                  // close the bottom sheet if it is open
                  if (isBottomSheetOpen) {
                    bottomSheet.current?.close();
                    setIsBottomSheetOpen(false);
                  }
                }}
                defaultButtonText={"Select crime type"}
                buttonTextAfterSelection={(selectedItem) => {
                  // text represented after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item) => {
                  return item;
                }}
                buttonStyle={styles.dropdownBtnStyle}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      color={"#9747FF"}
                      size={15}
                    />
                  );
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdownDropdownStyle}
                rowStyle={styles.dropdownRowStyle}
                rowTextStyle={styles.dropdownRowTxtStyle}
                selectedRowStyle={styles.dropdownSelectedRowStyle}
                search
                searchInputStyle={styles.dropdownsearchInputStyleStyle}
                searchPlaceHolder={i18n.t("map.searchHere")}
                searchPlaceHolderColor={"darkgrey"}
                renderSearchInputLeftIcon={() => {
                  return (
                    <FontAwesome name={"search"} color={"#9747FF"} size={18} />
                  );
                }}
              />
            </View>
          )}

          <View
            style={[
              expanded ? styles.mapBox : styles.mapContainer,
              {
                justifyContent: loadingCrimeData ? "center" : "flex-start",
              },
            ]}
          >
            {loadingCrimeData ? (
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#8D64FF",
                }}
              >
                Loading...
              </Text>
            ) : (
              <>
                <MapView
                  initialRegion={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                  }}
                  style={styles.map}
                >
                  {districtPolygons.features.map((districtData, index) => {
                    const { coordinates } = districtData.geometry;
                    const opacity = calculateOpacity(
                      districtData.properties.Name
                    );

                    return (
                      <Polygon
                        key={index}
                        coordinates={coordinates[0].map(([lng, lat]) => ({
                          latitude: lat,
                          longitude: lng,
                        }))}
                        fillColor={`rgba(141, 100, 255, ${opacity})`} // Use calculated opacity
                        strokeColor="#555555"
                        strokeWidth={2}
                        onPress={
                          crimesPoly
                            ? () =>
                                handlePolygonPress(districtData.properties.Name)
                            : () => console.log("Polygon inactive")
                        }
                        tappable={true}
                      />
                    );
                  })}
                  {memoizedPoliceMarkers}
                  {memoizedHospitalMarkers}
                </MapView>

                <Pressable onPress={() => setExpanded(!expanded)}>
                  <Image
                    source={
                      expanded
                        ? require("../../assets/icons/Contract.png")
                        : require("../../assets/icons/Expand.png")
                    }
                    style={expanded ? styles.contract : styles.expand}
                  />
                </Pressable>
                {/* <Menu renderer={SlideInMenu}>
                  <MenuTrigger text="All Time" customStyles={styles.triggerStyles}></MenuTrigger>
                  <MenuOptions>
                    {timeRanges.map((time, index) => (
                      <MenuOption key={index} onSelect={() => alert(time)}>
                        <Text style={styles.menuText}>{time}</Text>
                      </MenuOption>
                    ))
                    } 
                      <MenuOption
                          onSelect={() => alert(`Not called`)}
                          disabled={true}>
                            <Text style={styles.menuTextLast}>All Time</Text>
                      </MenuOption>
                    </MenuOptions>
                </Menu> */}
              </>
            )}
          </View>
        </ScrollView>

        <BottomSheet
          ref={bottomSheet}
          // initially close bottom sheet
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => {
            setIsBottomSheetOpen(false);
          }}
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            borderColor: "#8D64FF",
            borderWidth: 2,
            overflow: "hidden",
          }}
        >
          <BottomSheetScrollView>
            {openedDistrict && (
              <BottomSheetCrimes
                navigation={navigation}
                i18n={i18n}
                district={openedDistrict}
                crimeData={crimeData}
              />
            )}
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </>
  );
}

export default Map;
