import React, { useState } from 'react'
import { Modal, View, Text, Button } from 'react-native'
import Swiper from 'react-native-swiper'

const App = () => {
  const [modalVisible1, setModalVisible1] = useState(false)
  const [modalVisible2, setModalVisible2] = useState(false)
  const [modalVisible3, setModalVisible3] = useState(false)

  return (
    <Swiper style={{ width: "100%", height: "100%" }}>
      <Modal visible={modalVisible1} animationType="slide">
        <View style={{ margin: 22 }}>
          <Text>Modal 1</Text>
          <Button
            title="Close"
            onPress={() => setModalVisible1(!modalVisible1)}
          />
        </View>
      </Modal>
      <Modal visible={modalVisible2} animationType="slide">
        <View style={{ margin: 22 }}>
          <Text>Modal 2</Text>
          <Button
            title="Close"
            onPress={() => setModalVisible2(!modalVisible2)}
          />
        </View>
      </Modal>
      <Modal visible={modalVisible3} animationType="slide">
        <View style={{ margin: 22 }}>
          <Text>Modal 3</Text>
          <Button
            title="Close"
            onPress={() => setModalVisible3(!modalVisible3)}
          />
        </View>
      </Modal>
    </Swiper>
  )
}

export default App