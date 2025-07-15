import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { ButtonIcon } from "./button-icon";
import { Input } from "./input";

export function SearchComponent() {
  return (
    <View className="border border-gray-200 bg-gray-200 rounded-lg px-2">
      <View className="flex-row items-center">
        <ButtonIcon iconName="search"/>
        <TextInput className="flex-1" placeholder="Buscar produtos" />
        <ButtonIcon iconName="options-outline"/>
      </View>
    </View>
  )
}