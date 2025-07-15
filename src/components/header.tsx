import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

type Props = {
    title?: string
}

export function Header({title}:Props)
{
  const router = useRouter()
  return (
    <View className="flex-row items-center gap-2 mb-4">
      <TouchableOpacity onPress={()=>router.back()}>
        <Ionicons name="arrow-back" color={'#1f2937'} size={28} />
      </TouchableOpacity>
       <Text className="text-3xl font-bold">{title}</Text>
    </View>
  )
}