import { colors } from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

type OrderStatus = 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

type CardOrderProps = {
  id: string;
  total: number;
  date: string;
  status: OrderStatus;
};

export function CardOrder({ id, date, total, status }: CardOrderProps) {
  const router = useRouter();

  const formattedDate = new Date(date).toLocaleDateString('pt-AO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const statusColors = {
    PENDING: colors.info,
    SHIPPED: colors.buttonPrimary,
    DELIVERED: colors.price,
    CANCELLED: colors.error
  };


  const handlePress = () => {
    router.push({
      pathname: '/order-detail',
      params: { 
        id, 
        date: formattedDate, 
        total: total.toString(), 
        status 
      }
    });
  };

  return (
    <TouchableOpacity 
      className="w-full rounded-lg bg-white p-4 mb-3 border border-gray-200"
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View>
          <Text className="text-lg font-bold text-gray-900">
            Pedido #{id.slice(0, 8).toUpperCase()}
          </Text>
          <Text className="text-sm text-gray-500">Registo de compras</Text>
        </View>
        
        <View 
          className="px-2 py-1 rounded-full" 
          style={{ backgroundColor: `${statusColors[status]}20` }}
        >
          <Text 
            style={{ color: statusColors[status] }} 
            className="text-xs font-medium capitalize"
          >
            {status.toLowerCase()}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-2 mb-2">
        <Ionicons name="time" size={16} color={colors.info} />
        <Text className="text-gray-600 text-sm">{formattedDate}</Text>
      </View>

      <View className="flex-row items-center gap-2">
        <Ionicons name="cash" size={16} color={colors.info} />
        <Text className="text-base">
          <Text className="text-gray-600">Total: </Text>
          <Text className="font-semibold text-gray-900">
            AOA {total.toLocaleString('pt-AO')}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}