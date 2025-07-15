import { View, Image, Text, TouchableOpacity } from "react-native";
import { ButtonIcon } from "./button-icon";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { createContext, useContext } from "react";
import { CartContext, Product } from "@/contexts/cart";

type Image = {
  id: string
  url: string
}

type CartItem = {
  id: string
  name: string
  price: number
  images: Image []
  categoryId?: string
  quantity: number
  
};

export function CardCart({ item }: { item: CartItem }) {
  
  const router = useRouter();

  const {updateQuantity, removeFromCart} = useContext(CartContext)

  return (
    <View className="flex-row bg-[#6200EE10] p-4 rounded-xl border border-[#6200EE30]">
 
      <TouchableOpacity 
        activeOpacity={0.7}
        className="w-[40%] h-36 mr-4" 
        onPress={() => router.push({ 
          pathname: '/product-details', 
          params: { id: item.id } 
        })}
      >
        <Image 
          source={{ uri: item.images[0]?.url }} 
          className="w-full h-32 rounded-lg" 
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      
      <View className="flex-1 justify-between">
        <View>
          <Text className="text-lg font-semibold text-gray-900 mb-1" numberOfLines={2}>
            {item.name}
          </Text>
          <Text className="text-sm text-gray-500 mb-2">{item.id}</Text>
        </View>
        
        <Text className="text-lg font-bold text-primary mb-3">
          AOA {item.price.toLocaleString()}
        </Text>
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity
              className="bg-gray-100 w-8 h-8 rounded-full items-center justify-center"
              activeOpacity={0.7}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Text className="text-lg">-</Text>
            </TouchableOpacity>
            
            <Text className="mx-4 text-gray-800 font-medium">{item.quantity}</Text>
            
            <TouchableOpacity
              className="bg-gray-100 w-8 h-8 rounded-full items-center justify-center"
              activeOpacity={0.7}
              onPress={()=>updateQuantity(item.id, item.quantity + 1)}
            >
              <Text className="text-lg">+</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity activeOpacity={0.7} onPress={()=>removeFromCart(item.id)}>
            <ButtonIcon 
              iconName="trash-outline" 
              size={20}
              style={{
                backgroundColor: '#fee2e2',
                width: 32,
                height: 32,
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center'
              }} 
              color="#ef4444"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}