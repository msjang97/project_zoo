import { StatusBar } from 'expo-status-bar';
import React, { useState, Component, useEffect } from 'react';
import { StyleSheet, Text, View, Image, BackHandler, Animated, TouchableOpacity, TouchableHighlight, Modal, Box , ImageBackground} from 'react-native';
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

    if (route.params?.post == null) {
      //setCounter(route.params?.post + Money);
      navigation.navigate("Animal", { post: Money, ele : eleMoney })
    }
    else {
      setCounter(route.params?.post + Money);
      navigation.navigate("Animal", { post: Money + route.params?.post, ele : eleMoney});  //룰렛
    }


    //navigation.navigate("Animal"); //동물탭? (상점)
  }
  const moveToStore = () => {
    navigation.navigate("Store");  //편의시설(건물 상점)
  }
  const moveToZooKeeper = () => {
    navigation.navigate("ZooKeeper");  //직원
  }
  const moveToAnimalBook = () => {
    if (route.params?.postnum == 'ele') {
      navigation.navigate("AnimalBook", { Animal: 'ele'});  //도감
    }
    else if (route.params?.postnum == 'gir') {
      navigation.navigate("AnimalBook", { Animal: 'gir'});  //도감
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
    if (route.params?.aaaa) {
      setCounter(route.params?.aaaa);
      
    }
  }, [route.params?.aaaa]);

  const [eleMoney, setEleMoney] = useState(0);     //돈 증가 감소
  //eleMoney값 받아오기
  useEffect(() => {
    if (route.params?.ele) {
      setEleMoney(route.params?.ele); 
    }
  }, [route.params?.aaaa]);


  useEffect(() => {
    if (route.params?.postnum == 'ele') {
      Ele();
      //triger();
      //console.log(Ani);
    }

    else if(route.params?.postnum == 'gir')
    {
      Gir();
      //triger();
    }
  }, [route.params?.postnum]);

  useEffect(() => {
    if (route.params?.Animal) {

    }
  }, [route.params?.Animal]);



  const [image, imageC_M] = useState();
  const Ele = () => {
    imageC_M(require('./assets/elephant.png'));
  }
  const Gir = () => {
    imageC_M(require('./assets/giraffe.png'));
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
              <View style={styles.SettingScreen}>
                <Image style={{ height: 40, width: 40, resizeMode: 'contain', flex: 1 }} backgroundColor='white' source={require('./assets/setting.png')} />
                <View style={{ flex: 2 }}>
                  <Text style={{ textAlign: 'center', fontSize: 30 }}>환경설정</Text>
                </View>

                <View style={{ width: 40, height: 40, flex: 1, alignItems: 'center', }}>
                  <TouchableOpacity onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                    <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} backgroundColor='white' source={require('./assets/cancel.png')} />
                  </TouchableOpacity>
                </View>

              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View>
                  <Button Style={{ height: 50, width: 130 }} mode="contained" onPress={() => { setSoundModalVisible(!soundModalVisible); }}> 소리설정 </Button>
                </View>
              </View>

              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View>
                  <Button Style={{ height: 50, width: 130 }} mode="contained" onPress={() => { setExplnModalVisible(!explnModalVisible); }}> 게임설명 </Button>
                </View>
              </View>

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
              <View style={styles.SettingScreen}>
                <Image style={{ height: 40, width: 40, resizeMode: 'contain', flex: 1 }} backgroundColor='white' source={require('./assets/setting.png')} />
                <View style={{ flex: 2 }}>
                  <Text style={{ textAlign: 'center', fontSize: 30 }}>소리설정</Text>
                </View>

                <View style={{ width: 40, height: 40, flex: 1, alignItems: 'center', }}>
                  <TouchableOpacity onPress={() => {
                    setModalVisible(!modalVisible);
                    setSoundModalVisible(!soundModalVisible);
                  }}>
                    <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} backgroundColor='white' source={require('./assets/cancel.png')} />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <View>
                  <Button Style={{ height: 50, width: 130 }} mode="contained" onPress={() => {
                    setSoundModalVisible(!soundModalVisible);
                  }}> 뒤로가기 </Button>
                </View>

              </View>
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
              <View style={styles.SettingScreen}>
                <Image style={{ height: 40, width: 40, resizeMode: 'contain', flex: 1 }} backgroundColor='white' source={require('./assets/setting.png')} />
                <View style={{ flex: 2 }}>
                  <Text style={{ textAlign: 'center', fontSize: 30 }}>게임설명</Text>
                </View>
                <View style={{ width: 40, height: 40, flex: 1, alignItems: 'center', }}>
                  <TouchableOpacity onPress={() => {
                    setModalVisible(!modalVisible);
                    setExplnModalVisible(!explnModalVisible);
                  }}>
                    <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} backgroundColor='white' source={require('./assets/cancel.png')} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 3, flexDirection: 'row' }}>
                <View>
                  <Button Style={{ height: 50, width: 130 }} mode="contained" onPress={() => {
                    setExplnModalVisible(!explnModalVisible);
                  }}> 뒤로가기 </Button>
                </View>

              </View>
            </View>
          </View>
        </Modal>
        
        <Dialog.Container onBackdropPress={handleCancel} visible={visible}>
          <Dialog.Title>환경설정</Dialog.Title>
          <Dialog.Input>게임종료 하시겠습니까?</Dialog.Input>
          <Dialog.Button label="아니요" onPress={handleCancel} />
          <Dialog.Button label="예" onPress={handleDelete} />

        </Dialog.Container>


        <View style={styles.TopStyle}>
          <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} backgroundColor='yellow' source={require('./assets/dollar.png')} />

          <Text style={{ height: 40, width: 250, alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>  {(route.params?.post != null) ? route.params?.post + Money : Money} </Text>

          <Button icon={require('./assets/medal.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 40 }}
            labelStyle={{ color: "white", fontSize: 20 }} onPress={moveToQuest} >
          </Button>
          <Button icon={require('./assets/book.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 40 }}
            labelStyle={{ color: "white", fontSize: 20 }} onPress={moveToAnimalBook}>
          </Button>
          <Button icon={require('./assets/setting.png')} mode="contained" compact="true" color="black" contentStyle={{ height: 40, width: 40 }}
            labelStyle={{ color: "white", fontSize: 20 }} onPress={() => {
              setModalVisible(true);
            }}>
          </Button>
        </View>



        <View style={{ flex: 6, }}>

          

          <ImageBackground source={require('./assets/Background.jpg')} style={{ resizeMode: 'cover', justifyContent: 'center', flex: 1}}>

          

            <View style={styles.MainScreenStyle}>
              <TouchableOpacity
                onPress={increaseCounter}>
                <Image
                  style={{ height: 200, width: 200, resizeMode: 'contain' }}
                  source={require('./assets/Home.png')} />
              </TouchableOpacity>
            </View>

            <View style={styles.MainScreenAni}>
              <Image
                style={{ height: 50, width: 50, resizeMode: 'contain' }}
                source={image} />
            </View>

          </ImageBackground>
        </View>
       

        <View style={styles.ButtenStyle}>
          <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color="gray" contentStyle={{ height: 45, width: 103.5 }}
            labelStyle={{ color: "white", fontSize: 18 }} onPress={moveToAnimal}>
            동물
      </Button>
          <Button icon={require('./assets/building.png')} mode="contained" compact="true" color="gray" contentStyle={{ height: 45, width: 103.5 }}
            labelStyle={{ color: "white", fontSize: 18 }} onPress={moveToStore}>
            편의시설
      </Button>
          <Button icon={require('./assets/zookeeper.png')} mode="contained" compact="true" color="gray" contentStyle={{ height: 45, width: 103.5 }}
            labelStyle={{ color: "white", fontSize: 18 }} onPress={moveToZooKeeper}>
            직원
      </Button>
          <Button icon={require('./assets/Egg.png')} mode="contained" compact="true" color ="gray" contentStyle={{ height: 45, width: 103.5 }}
            labelStyle={{ color: "white", fontSize: 18 }} onPress={moveToRoulette}>
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
      setCounter(route.params?.post);
    }
  }, [route.params?.post]);

  useEffect(() => {
    if (route.params?.postnum) {
      //uuuu( );
    }
  }, [route.params?.postnum]);

  useEffect(() => {
    if (route.params?.ele) {
      setEleMoney(route.params?.ele);
    }
  }, [route.params?.ele]);


  const [visible, setVisible] = useState('');  //동물 샀는지 안샀는지
  const [Money, setCounter] = useState(0);     //돈 증가 감소
  const [eleMoney, setEleMoney] = useState(100);     //돈 증가 감소




  const aaaaa =(a) => {
    if(a == 'ele')
    {
      if(Money >= 100)
      {
        setVisible('ele');
        setCounter(Money - eleMoney);
      }
    }
    else if(a == 'gir')
    {
      if(Money >= 200)
      {
        setVisible('gir');
        setCounter(Money - 200);
      }
    }
  }
  
  

  const ele = () => {
    if(Money >= eleMoney)
    {
      setVisible('ele');
      setCounter(Money - eleMoney);
      setEleMoney(eleMoney + 20);
    }
  }
  const gir = () => {
    if(Money >= 200)
    {
      setVisible('gir');
      setCounter(Money - 200);
    }
    
  }

  

  //navigation.navigate("Roulette", {post: Money})
  const moveToMain = () => {
    if (route.params?.postnum == null) {
      //setCounter(route.params?.post + Money);
      navigation.navigate("Main", { postnum: visible, aaaa: Money, ele: eleMoney})
    }
    else {
      //setCounter(route.params?.post + Money);
      navigation.navigate("Main", { postnum: visible });  //룰렛
    }
  }

  


  return (
    <View style={{flex : 1}}>
      <StatusBar hidden={true} />
     
      <View style={{ backgroundColor: 'black', flexDirection: 'row' , flex : 0.55}}>
        <View style={{ backgroundColor: '#F3B438', height: 46, flex: 2, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Image 
            style={{ height: 50, width: 50, resizeMode: 'contain' }}
            source={require('./assets/Title_Image.png')} />
        </View>

        <View style={{ backgroundColor: '#F3B438', height: 46, flex: 5, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Text style={{ fontSize: 35 }} >동물</Text>
        </View>
        <View style={{ backgroundColor: '#F3B438', height: 46, flex: 1, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <TouchableOpacity onPress={moveToMain}>
            <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={require('./assets/cancel.png')} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex : 6}}>  
        <ScrollView>
          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //코끼리
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/elephant.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>코끼리</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>{eleMoney}</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }} onPress ={ele}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //코끼리
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/giraffe.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>기린</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }} onPress ={gir}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //코끼리
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/monkey.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>원숭이</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>
          
          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //코끼리
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/penguin.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>펭귄</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //코끼리
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/tiger.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>호랑이</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //코끼리
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/lion.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>사자</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //코끼리
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/elephant.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>코끼리</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //코끼리
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/elephant.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>코끼리</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>
          
          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //코끼리
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/elephant.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>코끼리</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
        
      <View style={{ flex: 0.5, backgroundColor: '#F3B438', flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ backgroundColor: 'black', flex: 1 , justifyContent : 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#F3B438', width : 100, alignItems:'center'}}>
            <Image style={{ height: 40, width: 40, resizeMode: 'contain', }} source={require('./assets/dollar.png')} />
          </View>
        </View>
        <View style={{ alignItems: 'center', backgroundColor: 'black', flex: 3 }}>
          <View style={{backgroundColor: '#F3B438', height : 40,  width : 300, margin : 3, justifyContent : 'center', alignItems : 'flex-end'}}>
            <Text style={{fontSize : 25}}>{Money}</Text>
          </View>
        </View>
      </View>

    </View>
  );
}

function StoreScreen({ navigation }) { //상점 씬
  const moveToMain = () => {
    navigation.navigate("Main");
  }

  return (
    <View style ={{flex : 1}}>
      <View style={{ backgroundColor: 'black', flexDirection: 'row', flex : 0.55 }}>
        <View style={{ backgroundColor: '#F3B438', height: 46, flex: 2, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Image  
            style={{ height: 50, width: 50, resizeMode: 'contain' }}
            source={require('./assets/Title_Image.png')} />
        </View>

        <View style={{ backgroundColor: '#F3B438', height: 46, flex: 5, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Text style={{ fontSize: 35 }} >편의시설</Text>
        </View>
        <View style={{ backgroundColor: '#F3B438', height: 46, flex: 1, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <TouchableOpacity onPress={moveToMain}>
            <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={require('./assets/cancel.png')} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex : 6}}>  
        <StatusBar hidden={true} />
        <ScrollView>
          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //음료수
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/drink.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>음료수가게</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //코끼리
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/churros.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>츄러스가게</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //코끼리
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/balloon.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>풍선가게</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>
          
          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //코끼리
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/popcorn.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>팝콘가게</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/teddybear.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>인형가게</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image 
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/restaurant.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>레스토랑</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image 
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/restaurant.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>레스토랑</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image 
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/restaurant.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>레스토랑</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image 
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/restaurant.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>레스토랑</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image 
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/restaurant.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>레스토랑</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>
         
        </ScrollView>
      </View>
      <View style={{ flex: 0.5, backgroundColor: '#F3B438', flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ backgroundColor: 'black', flex: 1 , justifyContent : 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#F3B438', width : 100, alignItems:'center'}}>
            <Image style={{ height: 40, width: 40, resizeMode: 'contain', }} source={require('./assets/dollar.png')} />
          </View>
        </View>
        <View style={{ alignItems: 'center', backgroundColor: 'black', flex: 3 }}>
          <View style={{backgroundColor: '#F3B438', height : 40,  width : 300, margin : 3, justifyContent : 'center', alignItems : 'flex-end'}}>
            <Text style={{fontSize : 25}}>12345</Text>
          </View>
        </View>
      </View>

    </View>
  );
}


function ZooKeeperScreen({ navigation }) { //직원 탭
  const moveToMain = () => {
    navigation.navigate("Main");
  }
  return (
    <View style={{flex : 1}}>
      <View style={{ backgroundColor: 'black', flexDirection: 'row' , flex : 0.55 }}>
        <View style={{ backgroundColor: '#F3B438', height: 46, flex: 2, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Image  
            style={{ height: 50, width: 50, resizeMode: 'contain' }}
            source={require('./assets/Title_Image.png')} />
        </View>

        <View style={{ backgroundColor: '#F3B438', height: 46, flex: 5, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Text style={{ fontSize: 35 }} >직원</Text>
        </View>
        <View style={{ backgroundColor: '#F3B438', height: 46, flex: 1, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <TouchableOpacity onPress={moveToMain}>
            <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={require('./assets/cancel.png')} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex : 6}}>  
        <StatusBar hidden={true} />
        <ScrollView>
          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/elephant.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>코끼리 사육사</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //코끼리
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/giraffe.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>기린 사육사</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //코끼리
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/monkey.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>원숭이 사육사</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>
          
          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //코끼리
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/penguin.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>펭귄 사육사</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/tiger.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>호랑이 사육사</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image 
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/lion.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>사자 사육사</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>
          
          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image 
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/lion.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>사자 사육사</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image 
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/lion.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>사자 사육사</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image 
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/lion.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>사자 사육사</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 16 }}> 구입
                </Button>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={{ flex: 0.5, backgroundColor: '#F3B438', flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ backgroundColor: 'black', flex: 1 , justifyContent : 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#F3B438', width : 100, alignItems:'center'}}>
            <Image style={{ height: 40, width: 40, resizeMode: 'contain', }} source={require('./assets/dollar.png')} />
          </View>
        </View>
        <View style={{ alignItems: 'center', backgroundColor: 'black', flex: 3 }}>
          <View style={{backgroundColor: '#F3B438', height : 40,  width : 300, margin : 3, justifyContent : 'center', alignItems : 'flex-end'}}>
            <Text style={{fontSize : 25}}>12345</Text>
          </View>
        </View>
      </View>

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

      <View style={{ alignItems: 'center' }}>
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
    <View style={{ backgroundColor: 'black', flexDirection: 'row' }}>
      <View style={{ backgroundColor: '#F3B438', height: 46, flex: 2, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
        <Image  
          style={{ height: 50, width: 50, resizeMode: 'contain' }}
          source={require('./assets/medal.png')} />
      </View>

      <View style={{ backgroundColor: '#F3B438', height: 46, flex: 5, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
        <Text style={{ fontSize: 35 }} >업적</Text>
      </View>
      <View style={{ backgroundColor: '#F3B438', height: 46, flex: 1, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
        <TouchableOpacity onPress={moveToMain}>
          <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={require('./assets/cancel.png')} />
        </TouchableOpacity>
      </View>
    </View>

    <View >  
      <StatusBar hidden={true} />
      <ScrollView>
        <View style={{ backgroundColor: '#CFC810', height: 100 }}>
          <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
            <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
              <Image  
                style={{ height: 80, width: 80, resizeMode: 'contain' }}
                source={require('./assets/medal.png')}/>
            </View>
            <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
              <View style={{ backgroundColor: 'gray', flex: 2, }}>
                <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 20 }}>메인 건물 100번 클릭</Text>
                <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>5.1A</Text>
                </View>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                  labelStyle={{ color: "black", fontSize: 16 }}> 획득
              </Button>
              </View>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#CFC810', height: 100 }}>
          <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
            <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
              <Image  //코끼리
                style={{ height: 80, width: 80, resizeMode: 'contain' }}
                source={require('./assets/medal.png')}/>
            </View>
            <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
              <View style={{ backgroundColor: 'gray', flex: 2, }}>
                <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 20 }}>동물 업그레이드 100번</Text>
                <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>12.2B</Text>
                </View>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                  labelStyle={{ color: "black", fontSize: 16 }}> 획득
              </Button>
              </View>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#CFC810', height: 100 }}>
          <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
            <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
              <Image  //코끼리
                style={{ height: 80, width: 80, resizeMode: 'contain' }}
                source={require('./assets/medal.png')}/>
            </View>
            <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
              <View style={{ backgroundColor: 'gray', flex: 2, }}>
                <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 20 }}>상점 업그레이드 10번</Text>
                <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>16.5B</Text>
                </View>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                  labelStyle={{ color: "black", fontSize: 16 }}> 획득
              </Button>
              </View>
            </View>
          </View>
        </View>
        
        <View style={{ backgroundColor: '#CFC810', height: 100 }}>
          <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
            <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
              <Image  //코끼리
                style={{ height: 80, width: 80, resizeMode: 'contain' }}
                source={require('./assets/medal.png')}/>
            </View>
            <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
              <View style={{ backgroundColor: 'gray', flex: 2, }}>
                <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 20}}>직원 업그레이드 100번</Text>
                <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>18.3B</Text>
                </View>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                  labelStyle={{ color: "black", fontSize: 16 }}> 획득
              </Button>
              </View>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#CFC810', height: 100 }}>
          <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
            <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
              <Image  
                style={{ height: 80, width: 80, resizeMode: 'contain' }}
                source={require('./assets/medal.png')}/>
            </View>
            <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
              <View style={{ backgroundColor: 'gray', flex: 2, }}>
                <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 20 }}>뽑기 10번</Text>
                <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>24.5F</Text>
                </View>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                  labelStyle={{ color: "black", fontSize: 16 }}> 획득
              </Button>
              </View>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#CFC810', height: 100 }}>
          <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
            <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
              <Image 
                style={{ height: 80, width: 80, resizeMode: 'contain' }}
                source={require('./assets/medal.png')}/>
            </View>
            <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
              <View style={{ backgroundColor: 'gray', flex: 2, }}>
                <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 20 }}>업적 내용</Text>
                <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>17.4A</Text>
                </View>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                  labelStyle={{ color: "black", fontSize: 16 }}> 획득
              </Button>
              </View>
            </View>
          </View>
        </View>
        
        <View style={{ backgroundColor: '#CFC810', height: 100 }}>
          <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
            <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
              <Image 
                style={{ height: 80, width: 80, resizeMode: 'contain' }}
                source={require('./assets/medal.png')}/>
            </View>
            <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
              <View style={{ backgroundColor: 'gray', flex: 2, }}>
                <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 20 }}>업적 내용</Text>
                <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>17.4A</Text>
                </View>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                  labelStyle={{ color: "black", fontSize: 16 }}> 획득
              </Button>
              </View>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#CFC810', height: 100 }}>
          <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
            <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
              <Image 
                style={{ height: 80, width: 80, resizeMode: 'contain' }}
                source={require('./assets/medal.png')}/>
            </View>
            <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
              <View style={{ backgroundColor: 'gray', flex: 2, }}>
                <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>업적 내용</Text>
                <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>17.4A</Text>
                </View>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                  labelStyle={{ color: "black", fontSize: 16 }}> 획득
              </Button>
              </View>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#CFC810', height: 100 }}>
          <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
            <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
              <Image 
                style={{ height: 80, width: 80, resizeMode: 'contain' }}
                source={require('./assets/medal.png')}/>
            </View>
            <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
              <View style={{ backgroundColor: 'gray', flex: 2, }}>
                <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>업적 내용</Text>
                <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>돈</Text>
                </View>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                  labelStyle={{ color: "black", fontSize: 16 }}> 획득
              </Button>
              </View>
            </View>
          </View>
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
    if (route.params?.Animal == 'ele') {
      Ele();
    }

    else if(route.params?.Animal == 'gir')
    { 
      Gir();
    }
  }, [route.params?.Animal]);

  const [image_e, imageC_E] = useState();
  const [image_g, imageC_G] = useState();
  const Ele = () => {  
      imageC_E(require('./assets/elephant.png'));   
  }

  const Gir = () => {
    imageC_G(require('./assets/giraffe.png'));
  }


  return (
    <View style={styles.AppBarStyle}>
      <View style={{ backgroundColor: 'black', flexDirection: 'row' }}>
        <View style={{ backgroundColor: '#F3B438', height: 46, flex: 2, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Image
            style={{ height: 50, width: 50, resizeMode: 'contain' }}
            source={require('./assets/book.png')} />
        </View>

        <View style={{ backgroundColor: '#F3B438', height: 46, flex: 5, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Text style={{ fontSize: 35 }} >도감</Text>
        </View>

        <View style={{ backgroundColor: '#F3B438', height: 46, flex: 1, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <TouchableOpacity onPress={moveToMain}>
            <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={require('./assets/cancel.png')} />
          </TouchableOpacity>
        </View>
      </View>




    <ScrollView>
      <View style={{ backgroundColor: '#CFC810', flexDirection: 'row' }}>
        <View style={styles.box}>
          <Image
            style={{ height: 100, width: 100, resizeMode: 'contain' }}
            source={image_e} backgroundColor='skyblue' />
          <Text style={{ fontSize: 20, color: "black", }}>코끼리과 동물. 포유류 기다란 코와 큰 몸이 특징이다. 지상에서 가장 큰 동물. 2t~6t까지 나간다.</Text>
        </View>

        <View style={styles.box}>
          <Image
            style={{ height: 100, width: 100, resizeMode: 'contain' }}
            source={image_g} backgroundColor='skyblue' />
          <Text style={{ fontSize: 30, color: "black" }}> 1</Text>
        </View>
      </View>
      <View style={{ backgroundColor: '#CFC810', flexDirection: 'row' }}>
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
      <View style={{ backgroundColor: '#CFC810', flexDirection: 'row' }}>
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
      <View style={{ backgroundColor: '#CFC810', flexDirection: 'row' }}>
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
      </ScrollView>
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
    
   
    alignItems: 'center',
    justifyContent: 'center',
  },

  MainScreenAni: {
    

    alignItems: 'center',
    justifyContent: 'center',
  },

  AppBarStyle: {
    flex: 1,
  },

  ButtenStyle: {
    flex: 0.4,
    backgroundColor : 'gray',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  TopStyle:
  {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  AnimalSceenStyle:
  {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
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
    backgroundColor: "rgba(0,0,0,0.5)"
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 25,

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
    fontSize: 40,
    marginBottom: 50,
  },

  buttona: {
    width: 90,
    height: 113,
    left: 0,
    top: 527,
  },

  box: {
    width: 200,
    height: 307,
    backgroundColor: '#B46E06',
    alignItems: 'center',
    margin : 5,
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
  },

  SettingScreen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',

  }

});
