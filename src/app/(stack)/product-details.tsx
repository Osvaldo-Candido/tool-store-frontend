import { ActivityIndicator, Image, Text, View } from "react-native";
import { Button } from "@/components/button";
import { colors } from "@/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/header";
import { useContext, useEffect, useState } from "react";
import { CartContext, Product } from "@/contexts/cart";
import { useLocalSearchParams } from "expo-router";
import { productServices } from "@/services/api";

export default function ProductDetails()
{
  const {id} = useLocalSearchParams()
  const [product, setProduct] = useState<Product | null>()
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const {addToCart} = useContext(CartContext)

  function handleAddToCart()
  {
    if(!product)
    {
      return null
    }

    addToCart(product)
  }
  useEffect(()=> {
      async function findProductById()
      {
        try {
          setLoading(true)

          const response = await productServices.getProductById(id as string)
          setProduct(response)
        } catch (error) {
          setError('Erro ao carregar o produto')
          console.error(error)
        }finally{
          setLoading(false)
        }
      }
      findProductById()
  }, [id])

  if(isLoading)
  {
    return (
      <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={32} color={colors.buttonPrimary} />
      </View>
    )
  }
  return (
    <SafeAreaView className="p-6">
      <Header title="Detalhes" />
      <View>
      <Image source={{uri: product?.images[0].url}} className="w-full h-72 rounded-lg" resizeMode="cover" />
      <View className="mt-4">
        <Text className="text-xl font-bold">{product?.name}</Text>
        <Text className="text-xl font-bold">{product?.price}</Text>
      </View>
      <View className="mt-4 mb-4">
        <Text className="font-bold">Descrição</Text>
        <Text className="text-base leading-6 text-gray-600">{product?.description}</Text>
      </View>
      <Button text="Adicionar ao carrinho" background={colors.buttonPrimary} textColor="#fff" iconName="cart-outline" color="#fff" size={20} onPress={handleAddToCart} />
      </View>
    </SafeAreaView>
  )
}