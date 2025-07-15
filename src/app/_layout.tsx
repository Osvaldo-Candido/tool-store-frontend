import '@/styles/global.css'
import {Slot} from 'expo-router'
import { StatusBar, View } from 'react-native'
import { CartProvider } from '@/contexts/cart'
import { AuthProvider } from '@/contexts/auth'

export default function Layout()
{
  return  (
    <CartProvider>
      <AuthProvider>
      <View className='flex-1'>
        <StatusBar barStyle='light-content' translucent />
        <Slot />
      </View>
      </AuthProvider>
    </CartProvider>
  )
}