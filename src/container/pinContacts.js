import * as Contacts from "expo-contacts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const savePinnedContacts = async (contacts) => {
  // Save pinned contacts to local storage
  try {
    await AsyncStorage.setItem("pinnedContacts", JSON.stringify(contacts));
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Saved");
  }
};

export const getContacts = async ({ setError }) => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === "granted") {
    setError(null);

    // Get all contacts
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });
    if (data.length > 0) {
      return data;
    }
  }
  if (status === "denied") {
    setError("Contacts permission denied. Please allow contacts permission.");
  }
};

export const getPinnedContacts = async () => {
  // Get pinned contacts from local storage
  try {
    const pinnedContacts = await AsyncStorage.getItem("pinnedContacts");

    if (pinnedContacts !== null) {
      return JSON.parse(pinnedContacts);
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

export async function fetchData({ setError, setContacts, setPinnedContacts }) {
  try {
    let pinnedContacts = await getPinnedContacts();

    const contacts = await getContacts({ setError });

    let newContacts = contacts;

    if (pinnedContacts.length === 0 && contacts.length > 0) {
      // get random 4 contacts from all contacts
      pinnedContacts = newContacts.sort(() => 0.5 - Math.random()).slice(0, 4);
    }

    // remove pinned contacts from all contacts
    newContacts = contacts.filter(
      (c) => !pinnedContacts.some((pc) => pc.id === c.id)
    );

    setPinnedContacts(pinnedContacts);

    await savePinnedContacts(pinnedContacts);

    // Sort all contacts by name
    newContacts.sort((a, b) => a.name.localeCompare(b.name));

    if (setContacts) {
      setContacts(newContacts);
    }
  } catch (error) {
    setError("Something went wrong.");
    console.log(error);
  }
}
