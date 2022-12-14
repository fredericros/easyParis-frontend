import { View, StyleSheet, Image, SafeAreaView } from "react-native";
import React from "react";
import { Flex, Box, Text } from "@react-native-material/core";
import { Stack, Button } from "@react-native-material/core";
import { Spacer } from 'react-native-flex-layout';


export default function CardScreen({  }) {
    let Image_Http_URL ={ uri: 'https://res.cloudinary.com/dnvxs5ibr/image/upload/v1671026907/easyParis/tour-eiffel-french-moments_eutbyh.jpg'};

    return (
       
        <Flex fill>
    <Box h={400} style={{ backgroundColor: 'lightgreen' }}>
      <Image 
      source={Image_Http_URL} style = {{height: 500, resizeMode : 'cover', width: '100%', zIndex: 0, }}
      />
    </Box>
    <Box h={590} style={{ backgroundColor: 'white', position: "absolute", top: 370, height: '60%', width: '100%', borderTopLeftRadius: 40, borderTopRightRadius: 40,  }}>
    <Stack m={40} spacing={10} style={{flex: 1}}>
    <Text variant="h4">h1. Heading</Text>
    <Spacer />
    <Text variant="body1" style={{ textAlign: 'left'}}>
      body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
      blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
      neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
      Eum quasi quidem quibusdam.
      body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
      blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
      
    </Text>
    <Spacer />
    <Spacer />
   
    {/* <Button variant="outlined" title="← Reviews" color="black"  style={{width: '40%' }}/>
    <Button variant="outlined" title="← Reviews" color="black"  style={{width: '40%'}}/> */}

<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
<Button variant="outlined" title="← Reviews" color="black" style={{width: '40%', justifyContent: 'flex-start'}}/>
<Button variant="outlined" title="Info →" color="black" style={{width: '40%', justifyContent: 'flex-end'}}/>
</View>

    </Stack>
    <Stack  start  m={40}>
  
    
    
  </Stack>
    </Box>
  </Flex>
  
    );
}