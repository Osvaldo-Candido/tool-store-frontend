import { api } from "@/services/api"
import { Children, createContext, ReactNode, useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from "expo-router"

export type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

type AuthContextData = {
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

type Children = {
  children: ReactNode
}

export function AuthProvider({children}:Children)
{
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    async function loadUser()
    {        
      try {
          const userStored = await AsyncStorage.getItem('@user')

          if(userStored)
          {
            setUser(JSON.parse(userStored))

            api.defaults.headers.common['Authorization'] = `Bearer ${await AsyncStorage.getItem('@token')}`
          } 
      } catch (error) {
        console.error('Falha ao fazer login', error)
      }finally{
        setIsLoading(false)
      }
    }
    loadUser()
  },[])

 const login = async (email: string, password: string) =>
 {
  console.log(email, password)
    try {
      const response = await api.post('/login',{email, password})
      const {user, token} = response.data

      await AsyncStorage.setItem('@user', JSON.stringify(user))
      await AsyncStorage.setItem('@token', token)

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser(user)
      router.replace('/(stack)/(tabs)')
    } catch (error) {
      console.error('falha ao fazer login', error)
    }finally{
      setIsLoading(false)
    }
 }
const logout = async () => {
  try {
    await AsyncStorage.removeItem('@user')
    await AsyncStorage.removeItem('@token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    // Substitua a navegação atual por esta:
    router.replace('/(stack)/login')
  } catch (error) {
    console.error('Falha ao sair', error)
  } finally {
    setIsLoading(false)
  }
}

  return (
    <AuthContext.Provider value={{isAuthenticated: !! user, isLoading, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}