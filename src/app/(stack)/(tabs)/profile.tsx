import { Button } from "@/components/button";
import { ButtonIcon } from "@/components/button-icon";
import { ButtonsProfile } from "@/components/button-profile";
import { AuthContext } from "@/contexts/auth";
import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile()
{
  const {user, logout} = useContext(AuthContext)
  if(!user)
  {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <View className="justify-center items-center mb-4">
        <ButtonIcon iconName="information-circle" size={32} color={colors.buttonPrimary} />
        </View>
         <Text className="mb-6 text-2xl">Precisa estar autenticado para ter acesso ao perfil.</Text>
        <Button iconName="log-in-outline" size={24} text="Fazer login" background={colors.buttonPrimary} color="#fff" textColor="#fff" onPress={() => router.push('/(stack)/login')} />
      </View>
    )
  }
  return (
    <SafeAreaView className="flex-1 bg-[#fafbfc] p-6">
      <View className="items-center justify-center">
              <Image source={{uri: 'https://i.pinimg.com/1200x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg'}} className="w-40 h-40 border-4 border-[#6200EE] rounded-full " />
          <View className="items-center justify-center mt-4">
          <Text className="text-2xl">{user?.name || 'Name'}</Text>
          <Text className="text-gray-700">{user?.email || 'Email'}</Text>
          </View>
      </View>
      <View className="mt-6">
      <View>
        <ButtonsProfile iconName="person" text="Editar perfil" iconName2="arrow-forward" />
      </View>
      <View>
        <ButtonsProfile iconName="bag" text="Minhas compras" />
      </View>
            <View>
        <ButtonsProfile iconName="log-out" text="Sair" onPress={logout} />
      </View>
      </View>
    </SafeAreaView>
  )
} 