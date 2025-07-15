import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { colors } from "@/styles/colors";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function SignIn()
{
  return (
    <SafeAreaView className="flex-1 p-6">
      <Header />
      <View className="flex-1 gap-4 justify-center">
      <View className="justify-center items-center mb-6">
        <Text className="text-3xl font-bold">Olá</Text>
        <Text className="text-2xl text-gray-700">Seja bem-vindo</Text>
        <Text className="text-2xl text-gray-700">Cadastrar-se!</Text>
      </View>
      <Input placeholder="insira o seu nome" />
      <Input placeholder="insira o seu email" />
      <Input placeholder="Insira a palavra passe" />
      <View>
        <Button text="Cadastrar" background={colors.buttonPrimary} textColor="#fff" />
        <Link href='/(stack)/login' className="text-[#6200EE] text-center mt-5 text-lg">Já possuo uma conta.</Link>
      </View>
      </View>
    </SafeAreaView>
  )
}