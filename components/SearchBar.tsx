import { View, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants/icons";

interface Props {
  onPress?: () => void;
  placeholder?: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({
  onPress,
  value,
  setValue,
  placeholder = "Search",
}: Props) => {
  return (
    <View className="flex flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ab8bff"
        className="flex-1 text-white ml-2"
        value={value}
        onPress={onPress}
        onChangeText={(text) => {
          setValue && setValue(text);
        }}
      />
    </View>
  );
};

export default SearchBar;
