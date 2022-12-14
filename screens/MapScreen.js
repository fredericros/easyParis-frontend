import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, Text, TouchableOpacity, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView, { Polygon, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useEffect } from 'react';

const points = [
    { latitude: 48.834113, longitude: 2.272863 },
    { latitude: 48.816533, longitude: 2.335649 },
    { latitude: 48.817008, longitude: 2.352248 },
    { latitude: 48.815709, longitude: 2.360645 },
    { latitude: 48.834621, longitude: 2.412387 },
    { latitude: 48.879761, longitude: 2.411992 },
    { latitude: 48.902327, longitude: 2.389639 },
    { latitude: 48.901250, longitude: 2.320262 },
    { latitude: 48.878158, longitude: 2.277284 },
    { latitude: 48.880519, longitude: 2.258463 },
    { latitude: 48.873947, longitude: 2.255067 },
    { latitude: 48.876563, longitude: 2.245657 },
    { latitude: 48.866353, longitude: 2.230134 },
    { latitude: 48.848800, longitude: 2.225283 },
    { latitude: 48.845288, longitude: 2.251963 },
    { latitude: 48.834753, longitude: 2.255067 },
    { latitude: 48.834113, longitude: 2.272863 },
    /*
      { latitude: 48.851223, longitude: 2.278727 },
      { latitude: 48.862143, longitude: 2.292968 },
      { latitude: 48.864611, longitude: 2.310069},
      { latitude: 48.857014, longitude: 2.309773 },
      { latitude: 48.843701, longitude: 2.292996 },
      { latitude: 48.851223, longitude: 2.278727 },
      */
];
const points1 = [
    { latitude: 48.864611, longitude: 2.310069 },
    { latitude: 48.857014, longitude: 2.309773 },
    { latitude: 48.843701, longitude: 2.292996 },
    { latitude: 48.845137, longitude: 2.310914 },
    { latitude: 48.851666, longitude: 2.327382 },
    { latitude: 48.860363, longitude: 2.333381 },
    { latitude: 48.864611, longitude: 2.310069 }
];
const montmartre = [
    { latitude: 48.887434, longitude: 2.337277 },
    { latitude: 48.883202, longitude: 2.336204 },
    { latitude: 48.882059, longitude: 2.340602 },
    { latitude: 48.883344, longitude: 2.347104 },
    { latitude: 48.889100, longitude: 2.344851 },
    { latitude: 48.887435, longitude: 2.337255 },
    { latitude: 48.887434, longitude: 2.337277 }
];

const leMarais = [
    { latitude: 48.855833, longitude: 2.351638 },
    { latitude: 48.863028, longitude: 2.361682 },
    { latitude: 48.861023, longitude: 2.366703 },
    { latitude: 48.852948, longitude: 2.363699 },
    { latitude: 48.855800, longitude: 2.351640 },
    { latitude: 48.855833, longitude: 2.351638 },
];

const latin = [
    { latitude: 48.8558209, longitude: 2.3404383 },
    { latitude: 48.8527712, longitude: 2.3375200 },
    { latitude: 48.8502297, longitude: 2.3422836 },
    { latitude: 48.8481117, longitude: 2.3418974 },
    { latitude: 48.8462760, longitude: 2.3430990 },
    { latitude: 48.8432541, longitude: 2.3463177 },
    { latitude: 48.8414747, longitude: 2.3482488 },
    { latitude: 48.8411358, longitude: 2.3520254 },
    { latitude: 48.8457677, longitude: 2.3530983 },
    { latitude: 48.8485353, longitude: 2.3505663 },
    { latitude: 48.8505686, longitude: 2.3494076 },
    { latitude: 48.8522912, longitude: 2.3485922 },
    { latitude: 48.8559338, longitude: 2.3405241 },
    { latitude: 48.8558209, longitude: 2.3404383 },
];

const saintGermain = [
    { latitude: 48.8524790, longitude: 2.3392007 },
    { latitude: 48.8555852, longitude: 2.3346517 },
    { latitude: 48.8561499, longitude: 2.3315618 },
    { latitude: 48.8569970, longitude: 2.3280428 },
    { latitude: 48.8558393, longitude: 2.3255966 },
    { latitude: 48.8512083, longitude: 2.3266266 },
    { latitude: 48.8476218, longitude: 2.3276994 },
    { latitude: 48.8453625, longitude: 2.3316476 },
    { latitude: 48.8427359, longitude: 2.3345230 },
    { latitude: 48.8440068, longitude: 2.3388574 },
    { latitude: 48.8469440, longitude: 2.3403595 },
    { latitude: 48.8490903, longitude: 2.3388145 },
    { latitude: 48.8508977, longitude: 2.3375700 },
    { latitude: 48.8524226, longitude: 2.3391149 },
    { latitude: 48.8524790, longitude: 2.3392007 },
];
const champsElysée = [
    { latitude: 48.8730029, longitude: 2.295404 },
    { latitude: 48.86476, longitude: 2.3002105 },
    { latitude: 48.8643083, longitude: 2.3097377 },
    { latitude: 48.8689945, longitude: 2.3102527 },
    { latitude: 48.8737932, longitude: 2.3102527 },
    { latitude: 48.8748658, longitude: 2.309566 },
    { latitude: 48.8786479, longitude: 2.3039012 },
    { latitude: 48.8781399, longitude: 2.2981505 },
    { latitude: 48.8768415, longitude: 2.2920566 },
    { latitude: 48.8753174, longitude: 2.2900825 },
    { latitude: 48.8730029, longitude: 2.2949748 },
    { latitude: 48.8730029, longitude: 2.295404 },
];

const multicultural = [
    { latitude: 48.8837550, longitude: 2.3492929 },
    { latitude: 48.8978069, longitude: 2.3547002 },
    { latitude: 48.8986533, longitude: 2.3817369 },
    { latitude: 48.8919947, longitude: 2.3952123 },
    { latitude: 48.8827390, longitude: 2.3981306 },
    { latitude: 48.8759655, longitude: 2.4078294 },
    { latitude: 48.8650853, longitude: 2.4084514 },
    { latitude: 48.8666662, longitude: 2.3839038 },
    { latitude: 48.8816825, longitude: 2.3712008 },
    { latitude: 48.8841659, longitude: 2.3669093 },
    { latitude: 48.8838273, longitude: 2.3495715 },
    { latitude: 48.8837550, longitude: 2.3492929 },
];

const historic = [
    { latitude: 48.8568921, longitude: 2.2925149 },
    { latitude: 48.8609579, longitude: 2.2875367 },
    { latitude: 48.8633859, longitude: 2.2918282 },
    { latitude: 48.8649104, longitude: 2.3003255 },
    { latitude: 48.8642893, longitude: 2.3068486 },
    { latitude: 48.8646845, longitude: 2.3113118 },
    { latitude: 48.8646281, longitude: 2.3151742 },
    { latitude: 48.8667172, longitude: 2.3160325 },
    { latitude: 48.8663784, longitude: 2.3192941 },
    { latitude: 48.8666607, longitude: 2.3216115 },
    { latitude: 48.8656444, longitude: 2.3261605 },
    { latitude: 48.8640070, longitude: 2.3315679 },
    { latitude: 48.8629342, longitude: 2.3343144 },
    { latitude: 48.8606623, longitude: 2.3406029 },
    { latitude: 48.8587988, longitude: 2.3394871 },
    { latitude: 48.8575565, longitude: 2.3367405 },
    { latitude: 48.8579518, longitude: 2.3330498 },
    { latitude: 48.8585730, longitude: 2.3296165 },
    { latitude: 48.8591376, longitude: 2.3267841 },
    { latitude: 48.8603235, longitude: 2.3231792 },
    { latitude: 48.8617352, longitude: 2.3204327 },
    { latitude: 48.8624127, longitude: 2.3155403 },
    { latitude: 48.8542246, longitude: 2.3153687 },
    { latitude: 48.8530951, longitude: 2.3150253 },
    { latitude: 48.8537728, longitude: 2.3063564 },
    { latitude: 48.8511749, longitude: 2.3019791 },
    { latitude: 48.8565400, longitude: 2.2928810 },
    { latitude: 48.8568921, longitude: 2.2925149 },
];

const vieuxCentre = [
    { latitude: 48.8572177, longitude: 2.3383713 },
    { latitude: 48.8587988, longitude: 2.3400021 },
    { latitude: 48.8573306, longitude: 2.3463535 },
    { latitude: 48.8554670, longitude: 2.3522758 },
    { latitude: 48.8532645, longitude: 2.3578548 },
    { latitude: 48.8514008, longitude: 2.3616314 },
    { latitude: 48.8491981, longitude: 2.3614597 },
    { latitude: 48.8487463, longitude: 2.3581982 },
    { latitude: 48.8501583, longitude: 2.3539066 },
    { latitude: 48.8525303, longitude: 2.3477268 },
    { latitude: 48.8539987, longitude: 2.3442936 },
    { latitude: 48.8557494, longitude: 2.3411179 },
    { latitude: 48.8571047, longitude: 2.3385429 },
    { latitude: 48.8572177, longitude: 2.3383713 },
];

const riche = [
    { latitude: 48.8630096, longitude: 2.2873359 },
    { latitude: 48.8725512, longitude: 2.2943740 },
    { latitude: 48.8758819, longitude: 2.2843318 },
    { latitude: 48.8714221, longitude: 2.2752338 },
    { latitude: 48.8648729, longitude: 2.2719722 },
    { latitude: 48.8628402, longitude: 2.2688823 },
    { latitude: 48.8579275, longitude: 2.2683673 },
    { latitude: 48.8549910, longitude: 2.2696548 },
    { latitude: 48.8524496, longitude: 2.2796111 },
    { latitude: 48.8630096, longitude: 2.2875934 },
    { latitude: 48.8630096, longitude: 2.2873359 },
];
export default function MapScreen({ navigation }) {
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});
                console.log(location);
            }
        })();
    }, []);

    return (
        <View style={styles.container}>
            <MapView initialRegion={{
                latitude: 48.8584685,
                longitude: 2.3375905,
                latitudeDelta: 0,
                longitudeDelta: 0.15,
            }} style={
                styles.map
            }>
                <Polygon coordinates={points}
                    strokeWidth={2}
                    strokeColor="grey"
                    fillColor="rgba(0,255,100,0.1)" />
                <Polygon coordinates={montmartre}
                    strokeWidth={2}
                    strokeColor="grey"
                    fillColor="rgba(0,0,255,0.3)" />
                <Polygon coordinates={leMarais}
                    strokeWidth={2}
                    strokeColor="grey"
                    fillColor="rgba(0,0,255,0.3)" />
                <Polygon coordinates={latin}
                    strokeWidth={2}
                    strokeColor="grey"
                    fillColor="rgba(0,0,255,0.3)" />
                <Polygon coordinates={saintGermain}
                    strokeWidth={2}
                    strokeColor="grey"
                    fillColor="rgba(0,0,255,0.3)" />
                <Polygon coordinates={champsElysée}
                    strokeWidth={2}
                    strokeColor="grey"
                    fillColor="rgba(0,0,255,0.3)" />
                <Polygon coordinates={multicultural}
                    strokeWidth={2}
                    strokeColor="grey"
                    fillColor="rgba(0,0,255,0.3)" />
                <Polygon coordinates={historic}
                    strokeWidth={2}
                    strokeColor="grey"
                    fillColor="rgba(0,0,255,0.3)" />
                <Polygon coordinates={vieuxCentre}
                    strokeWidth={2}
                    strokeColor="grey"
                    fillColor="rgba(0,0,255,0.3)" />
                <Polygon coordinates={riche}
                    strokeWidth={2}
                    strokeColor="grey"
                    fillColor="rgba(0,0,255,0.3)" />
                     <Marker 
                    coordinate={{ latitude: 48.8549298, longitude: 2.3469339 }} 
                    title="old center" 
                    tappable={true} 
                    isPreselected={true}
                    pinColor={"yellow"} />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    text: {
        color: 'white',
        fontSize: 25,
    },
}); 