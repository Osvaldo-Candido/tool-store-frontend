import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"

type IconName = keyof typeof Ionicons.glyphMap

type Props = TouchableOpacityProps & {
  text: string
  iconName: IconName
  iconName2?:IconName
}

export function ButtonsProfile({text, iconName, iconName2, ...rest}:Props)
{
  return (
    <TouchableOpacity className="flex-row items-center gap-4 mt-6" {...rest}>
          <View className="bg-gray-200 p-2 rounded-lg">
            <Ionicons name={iconName} size={24} color="#6b7280" />
          </View>
          <Text className="text-xl flex-1">{text}</Text>
           <Ionicons name={iconName2} size={24} color="#6b7280" />

        </TouchableOpacity>
  )
}