import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

type Props = IMovieSearch;

const MovieCard = (props: Props) => {
  return (
    <Link href={`/movies/${props.imdbID}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          src={props.Poster}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white text-sm font-bold mt-2">{props.Title}</Text>
        <View className="items-start mt-1">
          <Text className="text-gray-500 text-xs">{props.Year}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
