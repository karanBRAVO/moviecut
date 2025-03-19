import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import { useFetch } from "@/hooks/useFetch";
import { fetchMoviesData } from "@/services/fetchData";
import MovieCard from "@/components/MovieCard";
import { MOVIES } from "@/constants/movies";

function getRandomValue(arr: any) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const Home = () => {
  const router = useRouter();

  const {
    data: movies,
    loading,
    error,
  } = useFetch<IMovieSearch[]>(() =>
    fetchMoviesData({ query: `s=${getRandomValue(MOVIES)}`, random: true })
  );

  const handleSearchPress = () => {
    router.push("/search");
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-5"
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {loading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="self-center mt-10"
          />
        ) : error ? (
          <Text className="text-sm text-red-600">{error?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={handleSearchPress}
              placeholder="Search for movie"
            />
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.imdbID}
                numColumns={3}
                scrollEnabled={false}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
