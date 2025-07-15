import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { CardProduct } from "@/components/card-product";
import { CategoryComponent } from "@/components/category-text";
import { Product } from "@/contexts/cart";
import { productServices } from "@/services/api";
import { colors } from "@/styles/colors";
import { ButtonIcon } from "@/components/button-icon";
import { Input } from "@/components/input";
import { debounce } from 'lodash';
import { Avatar } from "@/components/avatar";
import { router } from "expo-router";
import { AuthContext } from "@/contexts/auth";

type CategoryItem = {
  id: string;
  name: string;
} | {
  id: string;
  name: string;
  description: string;
};

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]); 
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all'); 
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setFilteredData([]); 

        const [allProducts, allCategories] = await Promise.all([
          productServices.getAllProducts(),
          productServices.getCategories()
        ]);

        setProducts(allProducts);
        setFilteredData(allProducts);
        setCategories([{ id: 'all', name: 'Todos' }, ...allCategories]);
      } catch (error) {
        setError('Falha ao carregar produtos e categorias');
        setFilteredData([]); 
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProducts = useCallback(() => {
    let result = [...products];

    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((r) => r.categoryId === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => product.name.toLowerCase().includes(query));
    }

    setFilteredData(result);
  }, [products, selectedCategory, searchQuery]);

  const debounceFiltered = useCallback(
    debounce(filteredProducts, 300),
    [filteredProducts]
  );

  useEffect(() => {
    debounceFiltered();
    return () => debounceFiltered.cancel();
  }, [debounceFiltered]);

  return (
    <SafeAreaView className="flex-1 p-4">
      {/* Barra de pesquisa e ícone */}
      <View className="flex-row mb-4">
        <Input 
          placeholder="Pesquisar produto" 
          className="flex-1 bg-gray-200 p-2 border border-gray-300 rounded-lg" 
          onChangeText={setSearchQuery} 
          value={searchQuery} 
        />
        {user?.avatar ? (
          <Avatar image='https://i.pinimg.com/1200x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg' className="w-12 h-12 rounded-full" />
        ) : (
          <ButtonIcon iconName="log-in" size={38} color={colors.buttonPrimary} onPress={()=>router.navigate({
            pathname: '/(stack)/login'
          })} />
        )}
      </View>

      {/* Seção de Categorias */}
      <View className="mb-4">
        <View className="flex-row gap-2 items-center mb-3">
          <View className="w-2 h-2 rounded-full bg-[#6200EE]"></View>
          <Text className="text-lg font-bold text-gray-600">Categorias</Text>
        </View>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryComponent 
              key={item.id} 
              isActive={item.id === selectedCategory} 
              category={item.name} 
              onPress={() => setSelectedCategory(item.id)} 
            />
          )}
          horizontal
          contentContainerStyle={{ gap: 8 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Seção de Produtos */}
      <View className="flex-1">
        <View className="flex-row gap-2 items-center mb-2">
          <View className="w-2 h-2 rounded-full bg-[#6200EE]"></View>
          <Text className="text-lg font-bold text-gray-600">Produtos</Text>
        </View>

        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={colors.buttonPrimary} />
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-red-500">{error}</Text>
          </View>
        ) : filteredData.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500">Nenhum produto encontrado</Text>
          </View>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardProduct 
                data={item}
              />
            )}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ 
              justifyContent: 'space-between',
              marginBottom: 12
            }}
            contentContainerStyle={{
              paddingBottom: 20
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}