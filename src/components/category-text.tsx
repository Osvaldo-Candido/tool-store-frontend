import { colors } from "@/styles/colors"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

type Props = TouchableOpacityProps & {
  category: string
  isActive: boolean
}

export function CategoryComponent({category, isActive = false, ...rest}:Props)
{
  const backGround = isActive ? colors.buttonPrimary : '#e5e7eb'
  const textColor = isActive ? '#fff' : '#000'

  return (
    <TouchableOpacity className="bg-[#6200EE10] p-2 rounded-lg" style={{backgroundColor: backGround}} {...rest}>
      <Text style={{color: textColor}}>{category}</Text>
    </TouchableOpacity>
  )
}