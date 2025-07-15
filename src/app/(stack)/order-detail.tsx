import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator, Alert } from "react-native";
import { ItemOrder } from "@/components/item-order";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/header";
import { ordersService } from "@/services/api";
import { useLocalSearchParams } from "expo-router";

type OrderItemType = {
  id: string;
  productId: string;
  quantity: number;
  subtotal: number;
  unitiPrice: number;
  product: {
    id: string;
    name: string;
    price: number;
  };
};

type OrderStatus = 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

type OrderDetailResponse = {
  id: string;
  OrderItems: OrderItemType[];
  createdAt: string;
  status: OrderStatus;
  totalAmonut: number;
  userId: string;
};

export default function OrderDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const [order, setOrder] = useState<OrderDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const statusColors = {
    PENDING: colors.buttonPrimary,

  };

  useEffect(() => {
    async function loadOrderDetails() {
      try {
        setLoading(true);
        if (!id) {
          throw new Error('ID do pedido não encontrado');
        }
        
        const orderData = await ordersService.findById(id);
        setOrder(orderData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Erro ao carregar pedido');
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do pedido');
      } finally {
        setLoading(false);
      }
    }

    loadOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.buttonPrimary} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-red-600">{error}</Text>
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-gray-600">Pedido não encontrado</Text>
      </SafeAreaView>
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString('pt-AO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <SafeAreaView className="flex-1 p-6 bg-gray-50">
      <Header title="Detalhes do Pedido" />
      
      <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-semibold">Pedido #{order.id.slice(0, 8).toUpperCase()}</Text>
          <View 
            className="px-3 py-1 rounded-full" 
            style={{ backgroundColor: `${statusColors[order.status]}20` }}
          >
            <Text style={{ color: statusColors[order.status] }} className="text-xs capitalize">
              {order.status.toLowerCase()}
            </Text>
          </View>
        </View>
        
        <View className="flex-row items-center gap-2">
          <Ionicons name="time" size={16} color={colors.gray} />
          <Text className="text-gray-600 text-sm">{formattedDate}</Text>
        </View>
      </View>

      <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
        <Text className="text-xl font-bold mb-3">Itens do Pedido</Text>
        
        {order.OrderItems.length === 0 ? (
          <Text className="text-gray-500">Nenhum item encontrado</Text>
        ) : (
          <FlatList 
            data={order.OrderItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ItemOrder 
                name={item.product.name}
                price={item.unitiPrice}
                quantity={item.quantity}
                subtotal={item.subtotal}
                productId={item.productId}
                id={item.id}
                unitPrice={item.unitiPrice}
              />
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View className="h-4" />}
          />
        )}
      </View>

      <View className="bg-white p-4 rounded-lg shadow-sm">
        <Text className="text-xl font-bold mb-3">Resumo</Text>
        
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Subtotal:</Text>
          <Text>AOA {order.OrderItems.reduce((sum, item) => sum + item.subtotal, 0).toLocaleString('pt-AO')}</Text>
        </View>
        
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Entrega:</Text>
          <Text>AOA 500</Text>
        </View>
        
        <View className="flex-row justify-between pt-2 border-t border-gray-200 mt-2">
          <Text className="font-bold">Total:</Text>
          <Text className="font-bold">
            AOA {(order.totalAmonut + 500).toLocaleString('pt-AO')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}