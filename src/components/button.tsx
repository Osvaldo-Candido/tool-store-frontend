import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type IconName = keyof typeof Ionicons.glyphMap

type Props = TouchableOpacityProps & {
  text: string
  iconName?: IconName
  size?: number
  color?: string
  background?: string 
  textColor?: string
  isDisabled?: boolean
}

export function Button({text,iconName,size, color, background = 'transparent',textColor = '#000000' , isDisabled = false, ...rest}:Props)
{
  return (
    <TouchableOpacity className="flex-row w-full py-4 justify-center items-center rounded-xl" style={{backgroundColor: background }} disabled={isDisabled} {...rest}>
      {
        iconName &&   <Ionicons name={iconName} color={color} size={size} style={{marginRight: 10}} />
      } 
      <Text className="text-lg" style={{color: textColor}} >{text}</Text>
    </TouchableOpacity>
  )
}