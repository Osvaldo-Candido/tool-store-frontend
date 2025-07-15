import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { colors } from "@/styles/colors";
import { useContext } from "react";
import { CartContext } from "@/contexts/cart";
import { View, Text, StyleSheet } from "react-native";

export default function LayoutTabs() {
  const { items } = useContext(CartContext);
  
  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          minHeight: 70
        },
        tabBarItemStyle: {
          paddingTop: 14
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.iconActive,
        tabBarInactiveTintColor: colors.icon
      }}>
      <Tabs.Screen 
        name="index" 
        options={{
          tabBarIcon: ({size, color}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          )
        }} 
      />
      <Tabs.Screen 
        name="cart"
        options={{
          tabBarIcon: ({color, size}) => {
            const itemCount = items.length;
            return (
              <View style={styles.iconContainer}>
                <Ionicons name="cart-outline" color={color} size={size} />
                {itemCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {itemCount > 9 ? '9+' : itemCount}
                    </Text>
                  </View>
                )}
              </View>
            );
          }
        }}
      />
      <Tabs.Screen 
        name="orders"
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="bag-outline" color={color} size={size} />
          )
        }}
      /> 
      <Tabs.Screen 
        name="profile"
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          )
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: colors.buttonPrimary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});