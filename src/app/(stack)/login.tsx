import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { colors } from "@/styles/colors";
import { Link, router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/auth";

export default function Login() {
  const { login, isLoading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{ message: string }>();

  const handleLogin = async () => {
    try {
      setError(undefined);
      await login(email, password);
    } catch (error) {
      setError({
        message: error instanceof Error ? error.message : 'Email ou senha incorretos!'
      });
    }
  };

  const navigateToHome = () => {
    router.replace('/(stack)/(tabs)'); 
  };

  return (
    <SafeAreaView className="flex-1 p-6">
      <View className="gap-4 justify-center flex-1">
        <View className="justify-center items-center mb-6">
          <Text className="text-3xl font-bold">Olá</Text>
          <Text className="text-2xl text-gray-700">Seja bem-vindo</Text>
          <Text className="text-2xl text-gray-700">Começar!</Text>
        </View>

        {error && (
          <Text className="text-red-500 text-center mb-2">{error.message}</Text>
        )}

        <Input 
          placeholder="Insira o seu email" 
          onChangeText={setEmail} 
          value={email} 
        />
        <Input 
          placeholder="Insira a senha" 
          onChangeText={setPassword} 
          value={password} 
          secureTextEntry
        />

        <View className="gap-3">
          <Button 
            text={isLoading ? 'Processando...' : 'Entrar'} 
            background={colors.buttonPrimary} 
            textColor="#fff" 
            isDisabled={isLoading} 
            onPress={handleLogin} 
          />
          
          <Button 
            text="Acessar como Visitante" 
            background="#6200EE10" 
            textColor="#6200EE" 
            onPress={navigateToHome} 
          />
          
          <Link 
            href='/(stack)/signin' 
            className="text-[#6200EE] text-center mt-2 text-lg"
          >
            Criar conta nova
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}