import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import {Fontisto} from '@expo/vector-icons'
import { Product } from "@/contexts/cart";
import { useContext } from "react";
import { CartContext } from "@/contexts/cart";

type CardType = {
  data: Product
}

export function CardProduct({data}:CardType)
{
  
  const {addToCart} = useContext(CartContext)
  const router = useRouter()
  const productImage = data.images[0]?.url
  return (
    <View className="w-[50%] bg-white rounded-lg shadow-sm border border-gray-50 overflow-hidden">
            <TouchableOpacity 
              activeOpacity={0.7}
              className="w-full h-36 mr-4" 
              onPress={() => router.push({ 
                pathname: '/product-details',
                params: {id: data.id}  
              })}
            >
                    <Image 
        source={{uri: productImage}} 
        className="w-full h-36"
        resizeMode="cover"
      />
            </TouchableOpacity>
      
      <View className="p-2.5">
        <View className="flex-row justify-between items-center">
          <View className="flex-1 mr-2">
            <Text 
              className="text-sm font-semibold text-gray-900" 
              numberOfLines={1}
            >
              {data.name}
            </Text>
            <Text className="text-base font-bold text-gray-950 mt-0.5">
              R$ {data.price.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity className="p-2 rounded-full" style={{backgroundColor: colors.buttonPrimary}} onPress={() =>addToCart(data)}>
            <Fontisto 
              name="shopping-bag" 
              size={20} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}