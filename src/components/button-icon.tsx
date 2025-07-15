import { Pressable, PressableProps } from "react-native"
import { Ionicons } from "@expo/vector-icons"
type IconName = keyof typeof Ionicons.glyphMap

type Props = PressableProps & {
  color?: string
  size?: number
  iconName: IconName
}

export function ButtonIcon({color, size,iconName ,...rest}:Props)
{
  return (
      <Pressable {...rest}>
        <Ionicons name={iconName} color={color ? color : '#6b7280'} size={size ? size : 20} />
      </Pressable>
  )
}