import { View, Text, ScrollView, ActivityIndicator, Image } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useFetch } from "@/hooks/useFetch";
import { fetchMoviesData } from "@/services/fetchData";
import { icons } from "@/constants/icons";

const Box = ({ text }: { text: string }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5,
        padding: 5,
      }}
    >
      <Text className="text-white text-xs">{text}</Text>
    </View>
  );
};

const Paragraph = ({ text, label }: { text: string; label: string }) => {
  return (
    <Text className="text-gray-500 text-sm">
      {label}: {text}
    </Text>
  );
};

const MovieDetails = () => {
  const { id: movie_imdbID } = useLocalSearchParams();

  const {
    data: moviedetails,
    loading,
    error,
    fetchData,
  } = useFetch<IMovieDetails>(
    () => fetchMoviesData({ query: `i=${movie_imdbID}` }),
    false
  );

  useEffect(() => {
    if (movie_imdbID) {
      fetchData();
    }
  }, []);

  return (
    <View className="bg-primary flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {loading && (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="text-center mt-10"
          />
        )}
        {error && <Text className="text-blue-700">{error.message}</Text>}
        {moviedetails && (
          <>
            <Image
              src={moviedetails.Poster}
              resizeMode="contain"
              className="w-full h-[550px]"
            />
            <Text className="text-gray-200 text-xs ml-5">
              IMDB ID: {moviedetails.imdbID}
            </Text>

            <View className="flex flex-col px-5 mt-5 items-start justify-center">
              <View className="flex flex-row items-center justify-between w-full my-2 p-1">
                <Image source={icons.save} />
                <View className="flex flex-row gap-3">
                  <Box text={moviedetails.Type.toUpperCase()} />
                  <Box text={moviedetails.Language.toUpperCase()} />
                  <Box text={moviedetails.Rated} />
                </View>
              </View>

              <Text className="text-white font-bold text-lg">
                {moviedetails.Title}
              </Text>

              <Paragraph text={moviedetails.Released} label={"Released"} />
              <Paragraph text={moviedetails.Genre} label={"Genre"} />
              <Paragraph text={moviedetails.Runtime} label={"Duration"} />
              <Paragraph text={moviedetails.Country} label={"Country"} />

              <View className="mt-5">
                <Text className="text-white font-bold text-lg">Cast</Text>

                <Paragraph text={moviedetails.Director} label={"Director"} />
                <Paragraph text={moviedetails.Writer} label={"Writer"} />
                <Paragraph text={moviedetails.Actors} label={"Actors"} />
              </View>

              <View className="mt-5">
                <Text className="text-white font-bold">Rating and Cost</Text>

                <Paragraph
                  text={moviedetails.imdbRating}
                  label={"IMDB Rating"}
                />
                <Paragraph text={moviedetails.BoxOffice} label={"Box Office"} />
              </View>

              <View className="mt-5">
                <Text className="text-white font-bold">Plot</Text>

                <Text className="text-gray-500">{moviedetails.Plot}</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
