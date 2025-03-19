import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import SearchBar from "@/components/SearchBar";
import { useFetch } from "@/hooks/useFetch";
import { fetchMoviesData } from "@/services/fetchData";
import MovieCard from "@/components/MovieCard";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const {
    data: movies,
    loading,
    error,
    fetchData,
    reset,
  } = useFetch(() => fetchMoviesData({ query: `s=${searchValue}` }), false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchValue.length === 0) {
        reset();
      } else {
        fetchData();
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  return (
    <View className="bg-primary flex-1 p-5">
      <Image source={images.bg} className="absolute z-0" resizeMode="cover" />
      <SearchBar
        placeholder="Search movies..."
        value={searchValue}
        setValue={setSearchValue}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-5"
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        {loading && (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="self-center mt-10"
          />
        )}
        {error && (
          <Text className="text-sm text-red-600">{error?.message}</Text>
        )}
        <View className="flex-1 mt-5">
          <FlatList
            scrollEnabled={false}
            data={movies}
            keyExtractor={(item) => item.imdbID}
            renderItem={({ item }) => <MovieCard {...item} />}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "center",
              gap: 20,
              paddingRight: 5,
              marginBottom: 10,
            }}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            className="mt-2 pb-32"
            ListHeaderComponent={
              movies && searchValue.trim() ? (
                <Text className="text-white text-sm font-bold mt-5">
                  Search results for: {searchValue}
                </Text>
              ) : null
            }
            ListEmptyComponent={
              !loading && !error ? (
                <Text className="text-gray-500 text-center mt-10 px-5">
                  {!searchValue.trim()
                    ? "Search for a movie"
                    : "No movies found"}
                </Text>
              ) : null
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;
