import { Text, View } from "react-native";
type OrderItemType = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  unitPrice: number;
};
export function ItemOrder({name, price, quantity}:OrderItemType)
{
  return (
    <View className="bg-[#6200EE10] mb-4 p-2 gap-4 rounded-lg border border-[#6200EE30]">
      <View className="flex-row items-center gap-2">
        <View className="w-2 h-2 rounded-full bg-[#6200EE]"></View>
        <Text className="font-bold text-lg">{name}</Text>
      </View>
      <View className="flex-row gap-2 items-center">
        <View className="w-2 h-2 rounded-full bg-[#6200EE]"></View>
        <Text className="text-lg">Preço:</Text>
        <Text className="text-lg">R$ {price}</Text>
      </View>
      <View className="flex-row gap-2">
        <View className="flex-row gap-2">
          <Text className="text-lg">Quantidade:</Text>
          <Text className="text-lg">{quantity}</Text>  
        </View>
        <View className="flex-row gap-2">
          <Text className="text-lg">Subtotal:</Text>
          <Text className="text-lg">R$ {quantity * price}</Text>
        </View>
      </View>
    </View>
  )
}