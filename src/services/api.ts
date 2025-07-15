import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.191.161:3333',
  timeout: 10000
})

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@token')
  if(token)
  {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const productServices = {
  async getAllProducts () {
      try {
        const response = await api.get('/product')
        return response.data
      } catch (error) {
        console.error('Falha ao buscar produtos', error)
      }
  },

  async getProductById(id: string) {
    try {
      const response = await api.get(`/product/${id}`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar produto', error)
    }
  },

  async getCategories() {
      try {
        const response = await api.get('/category')
        return response.data
      } catch (error) {
        console.error('Falha ao carregar as categorias', error)
        return ['todos']
      }
  }
}

export const ordersService = {
  async createOrder(items: Array<{productId: string, quantity: number }>)
  {
    const token = await AsyncStorage.getItem('@token')
      if(!token)
      {
        throw new Error('Precisa fazer login ou criar uma conta para efectuar uma compra!')
      }
      try { 
        const response = await api.post('/order/create', {items},{
          headers: {
          Authorization:`Bearer ${token}`
          }
        })

        return response
      } catch (error) {
        console.log(error)
      }
  },
  async findOrdersByUserId()
  {
    try {
      const token = await AsyncStorage.getItem("@token")
      if(!token)
      {
      //    throw new Error('Erro ao carregar compras!')
      return
      }

      const response = await api.get('/order/show',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  },
  async findById(id: string)
  {
    const token = await AsyncStorage.getItem('@token')
    if(!token)
    {
      throw new Error('Precisa estar autenticado')
    }
    try {
      const response = await api.get(`/order/showorders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}