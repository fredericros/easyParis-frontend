import { StyleSheet, Image, View, Text, TouchableOpacity, ImageBackground, Modal, } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Dimensions } from 'react-native';

import { useState } from "react";
import { useSelector } from "react-redux";
import Swiper from "react-native-swiper";


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default function TestScreen() {

  const [modalVisible, setModalVisible] = useState(false);

  const handleMarker = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  let Image_Http_URL = {
    uri: "https://res.cloudinary.com/dnvxs5ibr/image/upload/v1671026907/easyParis/tour-eiffel-french-moments_eutbyh.jpg",
  };

  const places = useSelector((state) => state.places.value);

  const cardInfo = places.map((data, i) => {
    return (
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        style={styles.modal}
      >
        <Swiper
          loop={false}
          style={styles.wrapper}
          paginationStyle={{
            bottom: 0,
            left: 0,
            top: screenHeight * 0.70,
            right: 0,
          }

          }
          containerStyle={{ height: 150, flex: 1 }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ImageBackground
                source={Image_Http_URL}
                style={styles.backgroundImage}
              ></ImageBackground>

              <View style={styles.descriptionCard}>
                <TouchableOpacity></TouchableOpacity>
                <FontAwesome
                  aria-hidden="true"
                  name="times-circle-o"
                  size={40}
                  color="black"
                  onPress={() => handleClose()}
                  style={styles.closeBtn}
                />
                {/* here we will need to add a map to add costom name */}
                <Text style={styles.cardTittle}>{data.name}</Text>
                {/* This is for the text about the place = alsi needs mao */}
                <Text style={styles.cardText}>
                  {data.description}
                </Text>
                <TouchableOpacity style={styles.heartBtn}>
                  <FontAwesome name="heart" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.goBtn}>
                  <FontAwesome name="location-arrow" size={40} color="blue" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.slide2centeredView}>
            <View style={styles.slide2modalView}>
              <View style={styles.cardInfoMaintTitleBLock}>
                <Text style={styles.cardInfoMaintTitle}>INFORMATION</Text>
              </View>
              <View style={styles.cardInfoOpeningHours}>
                <Text style={styles.cardInfoTitle}>⏱ OPENING HOURS</Text>
                <Text style={styles.cardInfoText}>• 9.30am to 10.45pm</Text>
                <Text style={styles.cardInfoText}>• The stairs close at 6pm</Text>
              </View>
              <View style={styles.cardInfoTickets}>
                <Text style={styles.cardInfoTitle}>🎟️ Tickets and Prices</Text>
                <Text style={styles.cardInfoText}>• Lift to 2nd floor: from 4,30€ to 17,10€</Text>
                <Text style={styles.cardInfoText}>• Lift to top: from 6,70€ to 26,80€</Text>
                <Text style={styles.cardInfoText}>• Stairs 2nd floor: from 2,70€ to 10,70€</Text>
                <Text style={styles.cardInfoText}>
                  • Stairs 2nd + Lift to top: from 5,10€ to 20,40€
                </Text>
                <Text style={styles.cardInfoText}>• Ticket to top + Champagne: 45,80€</Text>
              </View>

              <View style={styles.cardInfoTips}>
                <Text style={styles.cardInfoTitle}>✅ Tips</Text>
                <Text style={styles.cardInfoText}>• Buy your tickets in advance</Text>
                <Text style={styles.cardInfoText}>• Be aware of the security checks</Text>
                <Text style={styles.cardInfoText}>• Dress warmly if you go to the top</Text>
              </View>

              <TouchableOpacity style={styles.cardInfoBtn}>
                <Text>GO TO WEBSITE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Swiper>
      </Modal>
    )
  })


  return (
    { cardInfo }
  )


}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  modalView: {
    ...Platform.select({
      android: {
        height: screenHeight * 0.8,
        width: screenWidth * 0.9,
        backgroundColor: "white",
        borderRadius: 20,
        marginTop: -40,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      ios: {
        height: screenHeight * 0.8,
        width: screenWidth * 0.9,
        backgroundColor: "white",
        borderRadius: 20,
        marginTop: -40,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    })
  },
  backgroundImage: {
    width: "100%",
    height: screenHeight * 0.5,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  descriptionCard: {
    ...Platform.select({
      android: {
        top: screenHeight * 0.34,
        height: screenHeight * 0.4,
        backgroundColor: "white",
        position: "absolute",
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: "center",
        alignItems: "center"
      },
      ios: {
        top: screenHeight * 0.34,
        height: screenHeight * 0.4,
        backgroundColor: "white",
        position: "absolute",
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: "center",
        alignItems: "center"
      },
    })
  },
  closeBtn: {
    width: "30%",
    position: "absolute",
    bottom: screenHeight * 0.67,
    left: screenWidth * 0.77,
  },
  modal: {
    height: 10,
  },
  cardTittle: {
    position: "absolute",
    top: screenHeight * 0.01,
    left: 30,
    fontWeight: "600",
    fontSize: 30,
    lineHeight: 54,
    fontFamily: "Poppins_600SemiBold",
    width: "80%",
  },
  cardText: {
    fontWeight: "300",
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
    fontSize: 18,
    width: "80%",
    marginTop: 50,
    textAlign: "left",
  },
  heartBtn: {
    position: "absolute",
    bottom: screenHeight * 0.37,
    left: screenWidth * 0.70,
    backgroundColor: "white",
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,

  },
  goBtn: {
    position: "absolute",
    bottom: screenHeight * 0.37,
    left: screenWidth * 0.52,
    backgroundColor: "white",
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },

  wrapper: {
    height: screenHeight * 1,
  },

  slide2centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide2modalView: {
    height: screenHeight * 0.8,
    width: screenWidth * 0.9,
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: -40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardInfoMaintTitle: {
    marginTop: screenHeight * 0.05,
    textAlign: "center",
    fontSize: 36,
    fontWeight: "600",
    fontFamily: "Poppins_400Regular",

  },

  cardInfoTitle: {
    lineHeight: 33,
    fontSize: 30,
    fontWeight: "600",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    paddingTop: 20,

  },

  cardInfoText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins_400Regular",
    width: 400,
    height: screenHeight * 0.04,
    textAlign: 'center',

  },

  cardInfoMaintTitleBLock: {
    borderBottomColor: 'red',
    borderBottomWidth: 2,
    height: '13%',
  },

  cardInfoOpeningHours: {
    height: screenHeight * 0.13,

  },

  cardInfoTickets: {
    height: screenHeight * 0.26,
  },

  cardInfoTips: {
    height: screenHeight * 0.195,

  },

  cardInfoBtn: {

    borderBottomColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
    width: screenWidth * 0.6,
    height: screenHeight * 0.06,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },

});