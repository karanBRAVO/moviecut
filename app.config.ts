import "dotenv/config";

export default {
  expo: {
    name: "MovieCut",
    slug: "dev",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo.png",
    scheme: "movies",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/logo.png",
        backgroundColor: "#ffffff",
      },
      package: "com.karanyadav98.dev",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/logo.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      omdbApiKey: process.env.EXPO_PUBLIC_OMDB_API_KEY,
      router: {
        origin: false,
      },
      eas: {
        projectId: "2700258a-e4eb-40d6-a169-b7a51718b60d",
      },
    },
  },
};
