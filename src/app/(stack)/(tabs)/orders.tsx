import { Button } from "@/components/button";
import { ButtonIcon } from "@/components/button-icon";
import { CardOrder } from "@/components/card-order";
import { AuthContext } from "@/contexts/auth";
import { ordersService } from "@/services/api";
import { colors } from "@/styles/colors";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useContext, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type OrderStatus = 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export type OrderType = {
  id: string
  status: OrderStatus
  createdAt: string
  totalAmonut: number
}

export default function Favorite()
{
    const {user, logout} = useContext(AuthContext)
  const [orders, setOrder] = useState<OrderType []>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = useCallback( async () => {
    try {
      setIsLoading(true)
     const response = await ordersService.findOrdersByUserId()
     
     setOrder(response || [])  
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Falha ao carregar as compras!')
    }finally{
      setIsLoading(false)
      setError(null)
    }
  }, []) 

  useFocusEffect(useCallback(()=>{
    fetchOrders()
  },[fetchOrders]))

  if(!user)
  {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <View className="justify-center items-center mb-4">
        <ButtonIcon iconName="information-circle" size={32} color={colors.buttonPrimary} />
        </View>
         <Text className="mb-6 text-2xl">Precisa estar autenticado para ter acesso ao registo de compras.</Text>
        <Button iconName="log-in-outline" size={24} text="Fazer login" background={colors.buttonPrimary} color="#fff" textColor="#fff" onPress={() => router.push('/(stack)/login')} />
      </View>
    )
  }
  if(isLoading)
  {
    return(
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={32} color={colors.buttonPrimary} />
      </View>
    )
  }

  if(error)
  {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-xl ">{error}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView className="bg-gray-50 p-6 flex-1">
      <View className="mb-4 flex-row gap-2 items-center">
          <View className="w-2 h-2 rounded-full bg-[#6200EE]"></View>
           <Text className="text-2xl font-bold">Compras feitas</Text>
      </View>
      <FlatList 
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <CardOrder date={item.createdAt} id={item.id} total={item.totalAmonut} key={item.id} status={item.status}  />}
        showsVerticalScrollIndicator={false}
      /> 
    </SafeAreaView>
  )
}