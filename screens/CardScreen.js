import { View, StyleSheet, Image, SafeAreaView } from "react-native";
import React from "react";
import { Flex, Box, Text } from "@react-native-material/core";
import { Stack, Button } from "@react-native-material/core";
import { Spacer } from "react-native-flex-layout";
import { FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

//
import { Animated } from "react-native";

//

export default function CardScreen({ navigation }) {
  let Image_Http_URL = {
    uri: "https://res.cloudinary.com/dnvxs5ibr/image/upload/v1671026907/easyParis/tour-eiffel-french-moments_eutbyh.jpg",
  };
  // anitmation block
  // const animatedValue = new Animated.Value(0);

  // const animatedEvent = Animated.event(
  //   [{nativeEvent: {tapped: animatedValue}}],
  //   {useNativeDriver: true},
  // );

  // const animatedStyles = {
  //   opacity: animatedValue.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: [1, 0.3],
  //   }),
  // };

  // end of animation block

  return (
    <Flex fill>
      <Box h={400} style={{ backgroundColor: "lightgreen" }}>
        <Image
          source={Image_Http_URL}
          style={{ height: 500, resizeMode: "cover", width: "100%", zIndex: 0 }}
        />
      </Box>
      <Box
        h={590}
        style={{
          backgroundColor: "white",
          position: "absolute",
          top: 370,
          height: "60%",
          width: "100%",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      >
        <Stack m={40} spacing={10} style={{ flex: 1 }}>
          <Text variant="h4">h1. Heading</Text>
          <Text variant="body1" style={{ textAlign: "left" }}>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam. body1. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Quos blanditiis
            tenetur unde suscipit, quam beatae rerum inventore consectetur,
          </Text>

          {/* <Button variant="outlined" title="← Reviews" color="black"  style={{width: '40%' }}/>
    <Button variant="outlined" title="← Reviews" color="black"  style={{width: '40%'}}/> */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Button
              variant="outlined"
              title="← Reviews"
              color="black"
              style={{ width: "40%", justifyContent: "flex-start" }}
            />
            <Button
              variant="outlined"
              title="Info →"
              color="black"
              style={{ width: "40%", justifyContent: "flex-end" }}
              onPress={() => navigation.navigate("CardInfoScreen")}
            />
          </View>
        </Stack>
        {/* <Animated.View style={animatedStyles} onPress={animatedEvent}> */}
        <View
          style={{
            position: "absolute",
            left: 290,
            bottom: 480,
            backgroundColor: "black",
            backgroundColor: "white",
            width: 60,
            height: 60,
            borderRadius: 50,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
            flex: 1,
            alignItems: "center",
            justifyContent: "center,",
          }}
        >
          <FontAwesome
            name="heart"
            size={30}
            color="black"
            style={{ position: "absolute", left: 15, top: 15 }}
          />
        </View>

        <View
          style={{
            position: "absolute",
            left: 220,
            bottom: 480,
            backgroundColor: "black",
            backgroundColor: "white",
            width: 60,
            height: 60,
            borderRadius: 50,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
            flex: 1,
            alignItems: "center",
            justifyContent: "center,",
          }}
        >
          <FontAwesome
            name="location-arrow"
            size={32}
            color="blue"
            style={{ position: "absolute", left: 15, top: 15 }}
          />
        </View>
        {/* </Animated.View> */}
      </Box>
    </Flex>
  );
}
