import { View, StyleSheet, Image, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { Flex, Box, Text } from "@react-native-material/core";
import { Stack, Button } from "@react-native-material/core";
import { Spacer } from 'react-native-flex-layout';
import { FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useNavigation} from '@react-navigation/native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import CardScreen from "../screens/CardScreen";
//
import {Animated} from 'react-native';

//

export default function CardInfoScreen({navigation}) {

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
      });

      if (!fontsLoaded) {
        return null;
      }

    let Image_Http_URL ={ uri: 'https://res.cloudinary.com/dnvxs5ibr/image/upload/v1671026907/easyParis/tour-eiffel-french-moments_eutbyh.jpg'};
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

    const OpeningHours = () => {
        return (
          <View style={{height: '15%'}}>
            <Text style={{ lineHeight: 33, fontSize: '22px', fontWeight: '600', fontFamily: 'Poppins_400Regular', }}>⏱ OPENING HOURS</Text>
            <Text style={{ lineHeight: 24, fontSize: '16px', fontWeight: '600', fontFamily: 'Poppins_400Regular', }}>• 9.30am to 10.45pm</Text>
            <Text style={{ lineHeight: 24, fontSize: '16px', fontWeight: '600', fontFamily: 'Poppins_400Regular', }}>• The stairs close at 6pm</Text>
          </View>
        );
      };
      
      const TicketsAndPrices = () => {
        return (
          <View style={{height: '40%'}}>
            <Text style={{ lineHeight: 33, fontSize: '22px', fontWeight: '600', fontFamily: 'Poppins_400Regular', }}>🎟️ Tickets and Prices</Text>
            <Text style={{ lineHeight: 24, fontSize: '16px', fontWeight: '600', fontFamily: 'Poppins_400Regular', }}>• Lift to 2nd floor: from 4,30€ to 17,10€</Text>
            <Text style={{ lineHeight: 24, fontSize: '16px', fontWeight: '600', fontFamily: 'Poppins_400Regular', }}>• Lift to top: from 6,70€ to 26,80€</Text>
            <Text style={{ lineHeight: 24, fontSize: '16px', fontWeight: '600', fontFamily: 'Poppins_400Regular', }}>• Stairs to 2nd floor: from 2,70€ to 10,70€</Text>
            <Text style={{ lineHeight: 24, fontSize: '16px', fontWeight: '600', fontFamily: 'Poppins_400Regular', }}>• Stairs to 2nd floor + Lift to top: from 5,10€ to 20,40€</Text>
            <Text style={{ lineHeight: 24, fontSize: '16px', fontWeight: '600', fontFamily: 'Poppins_400Regular', }}>• Ticket to top + Champagne: 45,80€</Text>
          </View>
        );
      };
      
      const Tips = () => {
        return (
          <View style={{height: '15%'}}>
            <Text style={{ lineHeight: 33, fontSize: '22px', fontWeight: '600', fontFamily: 'Poppins_400Regular', }}>✅ Tips</Text>
            <Text style={{ lineHeight: 24, fontSize: '16px', fontWeight: '600', fontFamily: 'Poppins_400Regular', }}>• Buy your tickets in advance</Text>
            <Text style={{ lineHeight: 24, fontSize: '16px', fontWeight: '600', fontFamily: 'Poppins_400Regular', }}>• Be aware of the security checks</Text>
            <Text style={{ lineHeight: 24, fontSize: '16px', fontWeight: '600', fontFamily: 'Poppins_400Regular', }}>• Dress warmly if you go to the top</Text>
          </View>
        );
      };
      


    return (
       
        <Flex fill>
    <Box h={900} style={{ backgroundColor: 'white' }}>
    <Stack m={40} spacing={20} style={{flex: 1}}>
    <Text variant="h4" style={{marginTop: '10%', textAlign: 'center', fontSize: '36px', fontWeight: '600', fontFamily: 'Poppins_400Regular',  }} >Information</Text>
    <View style={{flex: 1, justifyContent: 'space-between'}}>
    <OpeningHours  />
      <TicketsAndPrices />
      <Tips />
      <Box  style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', height: '30%', marginTop: 60}}>
    
    <Button variant="outlined" title="← Back" color="black" style={{width: '40%', justifyContent: 'flex-start'}} 
       onPress={() => navigation.navigate('CardScreen')}
    />
    <Button variant="outlined" title="WEBSITE" color="black" style={{width: '40%', justifyContent: 'flex-end'}}
   />
    </Box>
    
      </View>
   
    {/* <Button variant="outlined" title="← Reviews" color="black"  style={{width: '40%' }}/>
    <Button variant="outlined" title="← Reviews" color="black"  style={{width: '40%'}}/> */}


    </Stack>
    </Box>
  </Flex>
  
    );
}