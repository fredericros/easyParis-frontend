import {
    View,
    Text,
  } from "react-native";
  

function CustomMarker(props) {


return (
        <View>
          <View style={styles.bubbleCategory}>
            <Text style={styles.bubbleTitle}>{props.title}</Text>
          </View>
          <View style={styles.bubbleArrowBorder}></View>
        </View>
      );
}

const styles = StyleSheet.create({
    bubbleCategory: {
      opacity: 0.92,
      flexDirection: "row",
      alignSelf: "flex-start",
      justifyContent: "center",
      backgroundColor: "#fff",
      borderRadius: 16,
      borderColor: "#fff",
      borderWidth: 0.5,
      padding: 10,
      width: 110,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    bubbleTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 4,
    },
    bubbleArrowBorder: {
      opacity: 0.92,
      backgroundColor: "transparent",
      borderColor: "transparent",
      borderTopColor: "#fff",
      borderWidth: 16,
      alignSelf: "center",
      marginTop: -0.5,
  
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },  
  });

  export default CustomMarker;
