import { createContext, ReactNode, useCallback, useMemo, useState } from "react";
type Image = {
  id: string
  url: string
}
export type Product = {
  id: string
  name: string
  price: number
  description?: string 
  images: Image []
  categoryId?: string
}

type ReactChildrem = {
  children: ReactNode
}

type CartData = Product & {
  quantity: number
}

type CartContextData = {
  items: CartData []
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, newQuantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

export const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({children}:ReactChildrem)
{
  const [items, setItems] = useState<CartData []>([])

  const {totalItems, totalPrice} = useMemo(() => {
    return items.reduce((acc, item) => {
     acc.totalItems += item.quantity
     acc.totalPrice += item.price * item.quantity
     return acc
    }, {totalItems: 0, totalPrice: 0} )
  }, [items])

  const addToCart = useCallback((product: Product) => {
    
    setItems((prevItems) => {
      const existingItems = prevItems.find(item => item.id === product.id)

      if(existingItems)
      {
          return prevItems.map(item => 
            item.id === product.id ? {...item, quantity: item.quantity + 1} : item
          )
      }

      return [...prevItems, {...product, quantity: 1}]
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    return setItems(prev => prev.filter(item => item.id !== productId))
  },[])

  const clearCart = useCallback(()=>{
    setItems([])
  },[])

  const updateQuantity = useCallback((productId: string, newQuantity: number)=>{
    
      if(newQuantity <= 0)
      {
        removeFromCart(productId)
        return
      }

      setItems(prevItems => prevItems.map(item => item.id === productId ? {...item, quantity: newQuantity} : item  ))
  },[removeFromCart])

  const contextValues = useMemo(() => ({
    items,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    totalItems,
    totalPrice,
  }),[items, addToCart, removeFromCart, clearCart, updateQuantity,  totalItems,
  totalPrice])

    return (
      <CartContext.Provider value={contextValues} >
          {children}
      </CartContext.Provider>
    )
}