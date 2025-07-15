import { Stack } from "expo-router";

export default function LayoutStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="(tabs)"
           options={{
          presentation: 'card',
          animation: 'slide_from_right',
          headerShown: false, // Se quiser mostrar header apenas nesta tela
          headerBackTitle: 'Voltar'
        }}
      />
           <Stack.Screen 
          name="order-detail"
           options={{
          presentation: 'card',
          animation: 'slide_from_right',
          headerShown: false, // Se quiser mostrar header apenas nesta tela
          headerBackTitle: 'Voltar'
        }}
      />
      <Stack.Screen 
        name="product-details"
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
          headerShown: false, // Se quiser mostrar header apenas nesta tela
          headerBackTitle: 'Voltar'
        }}
      />
      <Stack.Screen 
        name="login"
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
          headerShown: false, // Se quiser mostrar header apenas nesta tela
          headerBackTitle: 'Voltar'
        }}
      />
      <Stack.Screen 
        name="signin"
        options={{
          presentation: 'card',
          animation: 'slide_from_right',
          headerShown: false, // Se quiser mostrar header apenas nesta tela
          headerBackTitle: 'Voltar'
        }}
      />
 
    </Stack>
  )
}