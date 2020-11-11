import { StatusBar } from 'expo-status-bar';
import React, { useState, Component, useEffect } from 'react';
import { StyleSheet, Text, View, Image, BackHandler, Animated, TouchableOpacity, TouchableHighlight, Modal, Box } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Provider as PaperProvider, Title } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, PanGestureHandler } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";


//import { render } from 'react-dom';



import * as Random from 'expo-random'; //랜덤값
import { bounce } from 'react-native/Libraries/Animated/src/Easing';
import { render } from 'react-dom';


const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const Stack = createStackNavigator();

//let Money = 0;







function HomeScreen({ navigation }) { //타이틀 화면

  return (

    <View style={[styles.container, { backgroundColor: "cyan" }]} >
      <StatusBar hidden={true} />
      <Text style={{ fontSize: 80 }} >노아의 방</Text>
      <Text style={{ fontSize: 80 }} >ZOO</Text>
      <Image
        style={{ height: 200, width: 200, resizeMode: 'contain' }}
        source={require('./assets/Title_Image.png')} />
      <Text style={{ fontSize: 80 }} ></Text>
      <Button mode="contained" compact="true" color="brown" contentStyle={{ height: 40, width: 200 }}
        labelStyle={{ color: "white", fontSize: 30 }} onPress={() => navigation.navigate('Main')} >START
        </Button>


    </View>
  );
}

function MainScreen({ navigation, route }) { //메인화면 

  const [Money, setCounter] = useState(0);     //돈 증가 감소
  const increaseCounter = () => {
    setCounter(Money + 100);
  }
  const uuuu = () => {
    setCounter(route.params?.post + Money);
  }

  const [visible, setVisible] = useState(false);  //다이얼로그 창(게임종료 여부)
  const showDialog = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleDelete = () => {
    BackHandler.exitApp();
    setVisible(false);
  };

  const moveToAnimal = () => {
    navigation.navigate("Animal"); //동물탭? (상점)
  }
  const moveToStore = () => {
    navigation.navigate("Store");  //편의시설(건물 상점)
  }
  const moveToZooKeeper = () => {
    navigation.navigate("ZooKeeper");  //직원
  }
  const moveToAnimalBook = () => {
    if (route.params?.postnum) {
      navigation.navigate("AnimalBook", { Animal: true });  //도감
    }
    else if (route.params?.postnum == null) {
      navigation.navigate("AnimalBook", { Animal: false });  //도감
    }

    //console.log(Ani);
  }
  const moveToQuest = () => {
    navigation.navigate("Quest");  //업적
  }
  const moveToRoulette = () => {
    if (route.params?.post == null) {
      //setCounter(route.params?.post + Money);
      navigation.navigate("Roulette", { post: Money })
    }
    else {
      setCounter(route.params?.post + Money);
      navigation.navigate("Roulette", { post: Money + route.params?.post });  //룰렛

    }
  }

  const handleGesture = (evt) => {
    let { nativeEvent } = evt
    console.log(nativeEvent)
  }


  const [modalVisible, setModalVisible] = useState(false);
  const [soundModalVisible, setSoundModalVisible] = useState(false);
  const [explnModalVisible, setExplnModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.post) {
    }
  }, [route.params?.post]);

  useEffect(() => {
    if (route.params?.postnum) {
      hide();
      triger();
      console.log(Ani);
    }
  }, [route.params?.postnum]);

  useEffect(() => {
    if (route.params?.Animal) {

    }
  }, [route.params?.Animal]);

  let Ani = false;

  const triger = () => {
    Ani = true;
  }

  const [image, imageC_M] = useState();
  const hide = () => {
    imageC_M(require('./assets/monkey.png'));
  }


  return (

    <PaperProvider>
      <View style={styles.AppBarStyle}>
        <StatusBar hidden={true} />

        <Modal
          animationType="fade"
          transparent={true}

          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
           
              <Text style={styles.modalText}>환경설정</Text>                         
              <Button contentStyle={{ height: 50, width: 103 }} mode="contained" onPress={() => { setSoundModalVisible(!soundModalVisible); }}> 소리설정 </Button>
              <Text></Text>
              <Button contentStyle={{ height: 50, width: 103 }} mode="contained" onPress={() => { setExplnModalVisible(!explnModalVisible); }}> 게임설명 </Button>
              <Text></Text>
              <Button contentStyle={{ height: 50, width: 103 }} mode="contained" onPress={() => { setModalVisible(!modalVisible); }}> 나가기 </Button>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}

          visible={soundModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>소리설정</Text>
        
              <Button contentStyle={{ height: 50, width: 103 }} mode="contained" onPress={() => {
                setSoundModalVisible(!soundModalVisible);
              }}> 뒤로가기 </Button>

          <Button contentStyle={{ height: 50, width: 103 }} mode="contained" onPress={() => {
                setModalVisible(!modalVisible);
                setSoundModalVisible(!soundModalVisible);
              }}> 나가기 </Button>

            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={explnModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>게임설명</Text>
              <Text>게임 설명 1</Text>
              <Text>게임 설명 2</Text>
              <Text>게임 설명 3</Text>
              <Text>게임 설명 4</Text>
              <Button contentStyle={{ height: 50, width: 103 }} mode="contained" onPress={() => {

                setExplnModalVisible(!explnModalVisible);
              }}> 뒤로가기 </Button>
              
              <Button contentStyle={{ height: 50, width: 103 }} mode="contained" onPress={() => {
                setModalVisible(!modalVisible);
                setExplnModalVisible(!explnModalVisible);
              }}> 나가기 </Button>
            </View>
          </View>
        </Modal>


        <View style={styles.TopStyle}>
          <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} backgroundColor='yellow' source={require('./assets/dollar.png')} />

          <Text style={{ height: 40, width: 250, alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>  {(route.params?.post != null) ? route.params?.post + Money : Money} </Text>

          <Button icon={require('./assets/medal.png')} mode="contained" compact="true" color="red" contentStyle={{ height: 40, width: 40 }}
            labelStyle={{ color: "white", fontSize: 20 }} onPress={moveToQuest} >
          </Button>

          <Button icon={require('./assets/book.png')} mode="contained" compact="true" color="green" contentStyle={{ height: 40, width: 40 }}
            labelStyle={{ color: "white", fontSize: 20 }} onPress={moveToAnimalBook}>
          </Button>
          <Button icon={require('./assets/setting.png')} mode="contained" compact="true" color="blue" contentStyle={{ height: 40, width: 40 }}
            labelStyle={{ color: "white", fontSize: 20 }} onPress={() => {
              setModalVisible(true);
            }}>
          </Button>
        </View>

        <Dialog.Container onBackdropPress={handleCancel} visible={visible}>
          <Dialog.Title>환경설정</Dialog.Title>
          <Dialog.Input>게임종료 하시겠습니까?</Dialog.Input>
          <Dialog.Button label="아니요" onPress={handleCancel} />
          <Dialog.Button label="예" onPress={handleDelete} />

        </Dialog.Container>


        <View style={styles.MainScreenAni}>
          <Image
            style={{ height: 50, width: 50, resizeMode: 'contain' }}
            source={image} />
        </View>


        <View style={styles.MainScreenStyle}>
          <TouchableOpacity
            onPress={increaseCounter}>
            <Image
              style={{ height: 200, width: 200, resizeMode: 'contain' }}
              source={require('./assets/Home.png')} />
          </TouchableOpacity>
        </View>


        <View style={styles.ButtenStyle}>
          <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="red" contentStyle={{ height: 50, width: 103 }}
            labelStyle={{ color: "white", fontSize: 16 }} onPress={moveToAnimal}>
            동물
      </Button>
          <Button icon={require('./assets/building.png')} mode="contained" compact="true" color="green" contentStyle={{ height: 50, width: 103 }}
            labelStyle={{ color: "white", fontSize: 16 }} onPress={moveToStore}>
            편의시설
      </Button>
          <Button icon={require('./assets/zookeeper.png')} mode="contained" compact="true" color="blue" contentStyle={{ height: 50, width: 103 }}
            labelStyle={{ color: "white", fontSize: 16 }} onPress={moveToZooKeeper}>
            직원
      </Button>
          <Button icon={require('./assets/Egg.png')} mode="contained" compact="true" contentStyle={{ height: 50, width: 103 }}
            labelStyle={{ color: "white", fontSize: 16 }} onPress={moveToRoulette}>
            뽑기
      </Button>
        </View>
      </View>
    </PaperProvider>

  );
}

function AnimalScreen({ navigation, route }) { //동물 씬

  useEffect(() => {
    if (route.params?.post) {
      //uuuu( );
    }
  }, [route.params?.post]);

  useEffect(() => {
    if (route.params?.postnum) {
      //uuuu( );
    }
  }, [route.params?.postnum]);

  const [visible, setVisible] = useState(false);  //동물 샀는지 안샀는지
  const ssss = () => {
    setVisible(true);
  }
  //navigation.navigate("Roulette", {post: Money})
  const moveToMain = () => {
    if (route.params?.postnum == null) {
      //setCounter(route.params?.post + Money);
      navigation.navigate("Main", { postnum: visible })
    }
    else {
      //setCounter(route.params?.post + Money);
      navigation.navigate("Main", { postnum: visible });  //룰렛
    }
  }

  return (
    <View>
    <View style={styles.quest}>
        <View style={{flex : 1}}>
          <Text>동물</Text>
        </View>       
        <View>
          <Button mode="contained" compact="true" color="black" contentStyle={{ height: 50, width: 103 }}
            labelStyle={{ color: "white", fontSize: 16 }} onPress={moveToMain}> X
          </Button>
        </View>
      </View>

      <View style={styles.AnimalSceenBackColor} >
        <StatusBar hidden={true} />
        
        <ScrollView>
          <View style={styles.AnimalSceenStyle}>
            <Image  //코끼리
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/elephant.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} > 코끼리 </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="red" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }} onPress={ssss}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image  //기린
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/giraffe.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} >   기린   </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image  //원숭이
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/monkey.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} > 원숭이 </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image  //펭귄
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/penguin.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} >   펭귄   </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image   //호랑이
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/tiger.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} > 호랑이 </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image   //사자
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/lion.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} >   사자   </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 동물
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image   //사자
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/lion.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} >   사자   </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 동물
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image   //사자
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/lion.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} >   사자   </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 동물
             </Button>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function StoreScreen({ navigation }) { //상점 씬
  const moveToMain = () => {
    navigation.navigate("Main");
  }

  return (
    <View style={styles.StoreSceenBackColor} >
      <StatusBar hidden={true} />
      <ScrollView>
        <View>
          <View style={styles.AnimalSceenStyle}>
            <Image
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/drink.png')} backgroundColor='yellow' />
            <Text style={{ fontSize: 30 }} > 음료수가게</Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="red" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/churros.png')} backgroundColor='yellow' />
            <Text style={{ fontSize: 30 }} >츄러스가게</Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/balloon.png')} backgroundColor='yellow' />
            <Text style={{ fontSize: 30 }} > 풍선가게  </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/popcorn.png')} backgroundColor='yellow' />
            <Text style={{ fontSize: 30 }} > 팝콘가게  </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/teddybear.png')} backgroundColor='yellow' />
            <Text style={{ fontSize: 30 }} > 인형가게  </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/restaurant.png')} backgroundColor='yellow' />
            <Text style={{ fontSize: 30 }} > 레스토랑  </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


function ZooKeeperScreen({ navigation }) { //직원 탭
  const moveToMain = () => {
    navigation.navigate("Main");
  }
  return (
    <View style={styles.ZookeeperSceenBackColor} >
      <StatusBar hidden={true} />
      <ScrollView>
        <View>
          <View style={styles.AnimalSceenStyle}>
            <Image
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/elephant.png')} backgroundColor='skyblue' />
            <Text style={{ fontSize: 30 }} >코끼리사육사</Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="red" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/giraffe.png')} backgroundColor='skyblue' />
            <Text style={{ fontSize: 30 }} >기린 사육사</Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/monkey.png')} backgroundColor='skyblue' />
            <Text style={{ fontSize: 30 }} >원숭이사육사</Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/penguin.png')} backgroundColor='skyblue' />
            <Text style={{ fontSize: 30 }} >펭귄 사육사</Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/tiger.png')} backgroundColor='skyblue' />
            <Text style={{ fontSize: 30 }} >호랑이사육사</Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image
              style={{ height: 100, width: 100, resizeMode: 'contain' }}
              source={require('./assets/lion.png')} backgroundColor='skyblue' />
            <Text style={{ fontSize: 30 }} >사자 사육사</Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function RouletteScreen({ navigation, route }) { //뽑기

  const [Money, setCounter] = useState(0);     //돈 증가 감소

  const decreaseCounter = () => {
    setCounter(Money - 100);
    if (Random.getRandomBytes(1) % 100 <= 5) {
      imageC(require('./assets/lion.png'));
      //이미지 바꾸는 코드
    }
    else if (Random.getRandomBytes(1) % 100 > 10 && Random.getRandomBytes(1) % 100 <= 40) {
      imageC(require('./assets/monkey.png'));
      //이미지 바꾸는 코드
    }
    else {
      imageC(require('./assets/tiger.png'));
      //이미지 바꾸는 코드
    }
  }

  const moveToMain = () => {
    navigation.navigate("Main", { post: Money });
  }

  const [AA, setPostText] = useState(1000);


  const probability = () => {
    if (Random.getRandomBytes(1) % 100 <= 5) {
      imageC(require('./assets/lion.png'));
      //이미지 바꾸는 코드
    }
    else if (Random.getRandomBytes(1) % 100 > 10 && Random.getRandomBytes(1) % 100 <= 40) {
      imageC(require('./assets/monkey.png'));
      //이미지 바꾸는 코드
    }
    else {
      imageC(require('./assets/tiger.png'));
      //이미지 바꾸는 코드
    }
  }




  useEffect(() => {
    if (route.params?.post) {

    }
  }, [route.params?.post]);





  const [image, imageC] = useState(require('./assets/Egg.png'));



  //probability

  return (
    <View>
      <StatusBar hidden={true} />
      <View style={styles.questbutton}>
       
      <Button mode="contained" compact="true" color="brown" contentStyle={{ height: 40, width: 80 }}
        labelStyle={{ color: "white", fontSize: 30 }} onPress={moveToMain} >X
        </Button>
      </View>

     <View style={{alignItems: 'center'}}>
      <Text style={{ alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>{route.params?.post + Money} </Text>
      <Text style={{ fontSize: 80 }} >뽑기</Text>

      <Image
        style={{ height: 200, width: 200, resizeMode: 'contain' }}
        source={image} />

      <Text style={{ fontSize: 40 }} ></Text>
      <Button mode="contained" compact="true" color="brown" contentStyle={{ height: 40, width: 200 }}
        labelStyle={{ color: "white", fontSize: 30 }} onPress={decreaseCounter} >뽑기
      </Button>

        </View>
    </View>
  );

}


function QuestScreen({ navigation }) { //업적

  const moveToMain = () => {
    navigation.navigate("Main");
  }
  return (
    <View>
      <View style={styles.quest}>
        <View style={{flex : 1}}>
          <Text>업적</Text>
        </View>       
        <View>
          <Button mode="contained" compact="true" color="black" contentStyle={{ height: 50, width: 103 }}
            labelStyle={{ color: "white", fontSize: 16 }} onPress={moveToMain}> X
          </Button>
        </View>
      </View>
      <View style={styles.AnimalSceenBackColor} >
        <StatusBar hidden={true} />
        <ScrollView>
          <View style={styles.AnimalSceenStyle}>
            <Image  //코끼리
              style={{ height: 80, width: 80, resizeMode: 'contain' }}
              source={require('./assets/medal.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} > 코끼리 </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="red" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image  //기린
              style={{ height: 80, width: 80, resizeMode: 'contain' }}
              source={require('./assets/medal.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} >   기린   </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image  //원숭이
              style={{ height: 80, width: 80, resizeMode: 'contain' }}
              source={require('./assets/medal.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} > 원숭이 </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image  //펭귄
              style={{ height: 80, width: 80, resizeMode: 'contain' }}
              source={require('./assets/medal.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} >   펭귄   </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image   //호랑이
              style={{ height: 80, width: 80, resizeMode: 'contain' }}
              source={require('./assets/medal.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} > 호랑이 </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 구입
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image   //사자
              style={{ height: 80, width: 80, resizeMode: 'contain' }}
              source={require('./assets/medal.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} >   사자   </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 동물
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image   //사자
              style={{ height: 80, width: 80, resizeMode: 'contain' }}
              source={require('./assets/medal.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} >   사자   </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 동물
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image   //사자
              style={{ height: 80, width: 80, resizeMode: 'contain' }}
              source={require('./assets/medal.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} >   사자   </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 동물
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image   //사자
              style={{ height: 80, width: 80, resizeMode: 'contain' }}
              source={require('./assets/medal.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} >   사자   </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 동물
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image   //사자
              style={{ height: 80, width: 80, resizeMode: 'contain' }}
              source={require('./assets/medal.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} >   사자   </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 동물
             </Button>
          </View>
          <View style={styles.AnimalSceenStyle}>
            <Image   //사자
              style={{ height: 80, width: 80, resizeMode: 'contain' }}
              source={require('./assets/medal.png')} backgroundColor='brown' />
            <Text style={{ fontSize: 30 }} >   사자   </Text>
            <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 102.5 }}
              labelStyle={{ color: "white", fontSize: 16 }}> 동물
             </Button>
          </View>

        </ScrollView>
      </View>
    </View>
  );
}

function AnimalBookScreen({ navigation, route }) { //도감

  const moveToMain = () => {
    navigation.navigate("Main");
  }

  useEffect(() => {
    if (route.params?.Animal == true) {
      hide();
    }
  }, [route.params?.Animal]);

  const [image, imageC_M] = useState();
  const hide = () => {
    imageC_M(require('./assets/monkey.png'));
  }

  return (
    <View style={styles.AppBarStyle}>
       <View style={styles.quest}>
        <View style={{flex : 1}}>
          <Text>도감</Text>
        </View>       
        <View>
          <Button mode="contained" compact="true" color="black" contentStyle={{ height: 50, width: 103 }}
            labelStyle={{ color: "white", fontSize: 16 }} onPress={moveToMain}> X
          </Button>
        </View>
      </View>
      <View style={styles.box2}>
        <View style={styles.box}>
          <Image
            style={{ height: 100, width: 100, resizeMode: 'contain' }}
            source={image} backgroundColor='skyblue' />
          <Text style={{ fontSize: 30, color: "white" }}> 1</Text>
        </View>
        <View style={styles.box}>
          <Image
            style={{ height: 100, width: 100, resizeMode: 'contain' }}
            source={require('./assets/lion.png')} backgroundColor='skyblue' />
          <Text style={{ fontSize: 30, color: "white" }}> 1</Text>
        </View>
      </View>
      <View style={styles.box2}>
        <View style={styles.box}>
          <Image
            style={{ height: 100, width: 100, resizeMode: 'contain' }}
            source={require('./assets/lion.png')} backgroundColor='skyblue' />
          <Text style={{ fontSize: 30, color: "white" }}> 1</Text>
        </View>
        <View style={styles.box}>
          <Image
            style={{ height: 100, width: 100, resizeMode: 'contain' }}
            source={require('./assets/lion.png')} backgroundColor='skyblue' />
          <Text style={{ fontSize: 30, color: "white" }}> 1</Text>
        </View>
      </View>
    </View>


  );
}



export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Quest" component={QuestScreen} />
        <Stack.Screen name="AnimalBook" component={AnimalBookScreen} />


        <Stack.Screen name="Animal" component={AnimalScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
        <Stack.Screen name="ZooKeeper" component={ZooKeeperScreen} />
        <Stack.Screen name="Roulette" component={RouletteScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AnimalButton: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
  },
  MainScreenStyle: {
    flex: 6,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  MainScreenAni: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  AppBarStyle: {
    flex: 1,
  },

  ButtenStyle: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  TopStyle:
  {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  AnimalSceenStyle:
  {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },

  AnimalSceenBackColor: {
    backgroundColor: 'brown'
  },

  StoreSceenBackColor: {
    backgroundColor: 'yellow',
  },

  ZookeeperSceenBackColor: {
    backgroundColor: 'skyblue',
  },


  headDelete: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },

  circle: {
    width: 150,
    height: 150,
    backgroundColor: "#c00000",
    borderRadius: 100
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    //창크기
    width: 300,
    height: 500
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  buttona: {
    width: 90,
    height: 113,
    left: 0,
    top: 527,
  },

  box: {
    width: 210,
    height: 300,
    backgroundColor: "blue",
    alignItems: 'center',
  },

  box2: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 3,
  },

  quest: {
    flexDirection: 'row',
  },

  questbutton: {
    alignItems: 'flex-end',
  }


});
