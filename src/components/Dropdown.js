import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/form.js";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "react-native-vector-icons";

function Dropdown({
  options,
  setData,
  label,
  fullWidth = false,
  btnText,
  searchPlaceHolder = "Search here",
}) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>
      <SelectDropdown
        data={options}
        defaultValueByIndex={0}
        onSelect={(selectedItem, index) => {
          setData(selectedItem);
        }}
        defaultButtonText={btnText}
        buttonTextAfterSelection={(selectedItem) => {
          // text represented after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item) => {
          return item;
        }}
        buttonStyle={[
          styles.dropdownBtnStyle,
          !fullWidth && styles.dropdownBtn2Style,
        ]}
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
        searchPlaceHolder={searchPlaceHolder}
        searchPlaceHolderColor={"darkgrey"}
        renderSearchInputLeftIcon={() => {
          return <FontAwesome name={"search"} color={"#9747FF"} size={18} />;
        }}
      />
    </View>
  );
}

export default Dropdown;
