import { Text, View } from "react-native";
import { SearchComponent } from "./search-component";
import { Avatar } from "./avatar";
import { ButtonIcon } from "./button-icon";
import { useRouter } from "expo-router";

export function HeaderHome() {
  const route = useRouter()
  return (
    <View className="flex-row gap-2 mb-4 items-center">
      <View className="flex-1">
            <SearchComponent />
      </View>
    
      <Avatar 
        image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        className="w-12 h-12 rounded-full border-2 border-blue-100"
      />

      <ButtonIcon iconName="log-out-outline" size={32} onPress={()=> route.push('/(stack)/login')} />
    </View>
  )
}