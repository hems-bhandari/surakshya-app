import * as Location from "expo-location";
import axios from "axios";

const radius = 7000;
const maxResults = 15;
const apiKey = process.env.GOOGLE_MAP_API_KEY;

async function getNearbyPlaces(latitude, longitude) {
  try {
    const placeName = "hospital";
    const encodedPlaceName = encodeURIComponent(placeName);

    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&name=${encodedPlaceName}&key=${apiKey}`;
    const placesResponse = await axios.get(placesUrl);

    const nearbyHospitals = placesResponse.data.results
      .slice(0, maxResults)
      .map((place) => {
        return {
          name: place.name,
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        };
      });

    return nearbyHospitals;
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    throw error;
  }
}

export const getLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      return;
    } else {
      throw new Error("Location permission not granted");
    }
  } catch (error) {
    throw error;
  }
};

export const getCurrentLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;
      return { latitude, longitude };
    } else {
      const { latitude, longitude } = await getLocationByIPAddress();
      return { latitude, longitude };
    }
  } catch (error) {
    throw error;
  }
};

const getLocationByIPAddress = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://ipinfo.io?token=${process.env.IP_INFO_TOKEN}`) // Hemanta's token
      .then((response) => {
        const { loc } = response.data;
        if (loc) {
          const [latitude, longitude] = loc.split(",").map(parseFloat);
          resolve({ latitude, longitude });
        } else {
          reject("Location data not found from IP address");
        }
      })
      .catch((error) => {
        reject("Failed to fetch location data from IP address");
      });
  });
};

// Usage
const getNearbyHospitals = async () => {
  try {
    console.log("Getting geolocation...");
    await getLocationPermission();

    console.log("Getting current location...");
    const { latitude: UserLatitude, longitude: UserLongitude } =
      await getCurrentLocation();
    console.log("Current location:", UserLatitude, UserLongitude);

    console.log("Getting nearby hospitals...");
    const nearbyHospitals = await getNearbyPlaces(UserLatitude, UserLongitude);
    console.log("Nearby hospitals:", nearbyHospitals);

    return { nearbyHospitals, UserLatitude, UserLongitude };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getNearbyHospitals;
