import { Button } from "@/components/button";
import { CardCart } from "@/components/card-cart";
import { CartContext } from "@/contexts/cart";
import { ordersService } from "@/services/api";
import { colors } from "@/styles/colors";
import { useContext, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal } from "react-native";
import { router } from "expo-router";

export default function Cart() {
  const [cardItems, setCardItems] = useState()
  const [isFinishing, setIsFinishing] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [orderResult, setOrderResult] = useState<{
    message: string
    success: boolean
  }|null>(null)

  const {items, totalItems, totalPrice, clearCart} = useContext(CartContext)
   
 async function handleFinish()
  { 
      if(items.length <= 0)
      {
        setOrderResult({
          message: 'Adicione productos ao carrinho para finalizar a compra',
          success: false
        })
        setModalVisible(true)
        return
      }

      setIsFinishing(true)

      try {
          const productsToOrders = items.map(item =>  
            ({
              productId: item.id, 
              quantity: item.quantity
            }))

          const order = await ordersService.createOrder(productsToOrders)
          console.log(order)
          clearCart()

          setOrderResult({
            message: 'Pedido realizado com sucesso',
            success: true
          })

      } catch (error) {
        setOrderResult({
          success: false,
          message: error instanceof Error ? error.message : 'Falha ao finalizar o pedido'
        })
      }finally {
        setModalVisible(true)
        setIsFinishing(false)
      }

  }

  const handleCloseModal = () => {
    setModalVisible(false)
    if (orderResult?.success) {
      router.push('/(stack)/(tabs)/orders') // Redireciona para a página de pedidos
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-4 flex-1">
        <View className="flex-row gap-2 items-center mb-4">
            <View className="w-2 h-2 rounded-full bg-[#6200EE]"></View>
            <Text className="text-2xl font-bold text-gray-900">Meu Carrinho</Text>
        </View>
        <FlatList 
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <CardCart item={item} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-3" />}
          contentContainerStyle={{paddingBottom: 20}}
          ListEmptyComponent={() => <Text className="flex-1 justify-center items-center">Sem nenhum produto no carrinho</Text>}
        />
      </View>

      {/* Resumo do pedido */}
      <View className="bg-white border-t border-gray-200 p-5">
        <View className="flex-row justify-between mb-4">
          <Text className="text-lg text-gray-600">Subtotal</Text>
          <Text className="text-lg font-semibold">AOA {totalPrice.toLocaleString()}</Text>
        </View>
        
        <View className="flex-row justify-between mb-6">
          <Text className="text-lg text-gray-600">Entrega</Text>
          <Text className="text-lg font-semibold">AOA 500</Text>
        </View>
        
        <View className="flex-row justify-between mb-6">
          <Text className="text-xl font-bold text-gray-900">Total</Text>
          <Text className="text-xl font-bold text-gray-900">AOA {(totalPrice + 500).toLocaleString()}</Text>
        </View>
        
        <Button 
          text={isFinishing ? "Processando" : "Efectuar compra"}
          textColor="#fff"
          background={colors.buttonPrimary} 
          onPress={handleFinish}
          isDisabled={isFinishing}
        />
      </View>

       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg p-6 w-80">
            <Text className={`text-xl font-bold mb-4 ${orderResult?.success ? 'text-green-600' : 'text-red-600'}`}>
              {orderResult?.success ? 'Sucesso!' : 'Erro'}
            </Text>
            <Text className="text-base mb-6">{orderResult?.message}</Text>
            
            <TouchableOpacity
              className={`py-3 px-6 rounded-md ${orderResult?.success ? 'bg-green-600' : 'bg-red-600'}`}
              onPress={handleCloseModal}
            >
              <Text className="text-white text-center">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}