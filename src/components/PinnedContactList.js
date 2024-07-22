import { View } from "react-native";
import PinnedContactItem from "./PinnedContactItem";
import styles from "../styles/pinned_contacts";
import DraggableFlatList from "react-native-draggable-flatlist";

function PinnedContactList({ contacts, onSortEnd, allContacts }) {
  return (
    <>
      <View style={styles.pinnedContactsContainer}>
        <DraggableFlatList
          data={[...contacts, ...allContacts]}
          onDragEnd={({ data }) => onSortEnd(data)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(props) => {
            return <PinnedContactItem {...props} />;
          }}
        />
      </View>
    </>
  );
}

export default PinnedContactList;
