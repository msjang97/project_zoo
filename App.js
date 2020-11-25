import { StatusBar } from 'expo-status-bar';
import React, { useState, Component, useEffect, version } from 'react';
import { StyleSheet, Text, View, Image, BackHandler, TouchableOpacity, TouchableHighlight, ImageBackground, TouchableWithoutFeedback,Modal} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Provider as PaperProvider, Title} from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, PanGestureHandler } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";



//import { render } from 'react-dom';
import Animated, { Easing, useSharedValue, useDerivedValue, interpolateColors, withSpring, useAnimatedStyle, repeat, delay, useAnimatedGestureHandler, withTiming, sequence, EasingNode, cancelAnimation, debug } from 'react-native-reanimated';


import * as Random from 'expo-random'; //랜덤값
import { bounce } from 'react-native/Libraries/Animated/src/Easing';
import { render } from 'react-dom';


const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const Stack = createStackNavigator();

//let Money = 0;



const Box = (props) => {
  console.log('Box', props);
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const color = useSharedValue("blue");
  const scale = useSharedValue(1);
  const [active, setActive] = useState(false);

  useEffect(() => {
    activate(props.active);
  }, [props.active]);

  useEffect(() => {
    switch (props.action) {
      case "jump":
        jump();
        setTimeout(() => {
          props.cleanupAction();
        }, 200);
        break;
    }
  }, [props.action]);

  const aaaaaa = () => {
    scale.value = repeat(withTiming(scale.value + 0.1, { duration: 200, ease: Easing.linear }), -1, true);
    //y.value = repeat(withTiming(y.value - 80, { duration: 100 }), 2, true);
  }
  const bbbbbb = () => {
    scale.value = repeat(withTiming(scale.value - 0.3, { duration: 200, ease: Easing.linear }), 2, true);
    //y.value = repeat(withTiming(y.value - 80, { duration: 100 }), 2, true);
  }

  const setColor = (c) => color.value = c;

  const activate = (newActive = true) => {
    setColor(newActive ? "#FBFFB9" : "#FBFFB9");
    setActive(newActive);
  }

  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
      ctx.dragged = false;
      if(ctx.aa != true)
      {
        ctx.aa = false; //이게 거짓이면 안움직이게 한다
      }
    },
    onActive: (event, ctx) => {
      if (ctx.dragged == false) {

        /* dragging를 처음 시작하게 된다면 */

        console.log("aaaaaaa");

        ctx.dragged = true;
        if(ctx.aa == false)
        {
          aaaaaa();
        }  
      }
      if(ctx.aa == false)
      {
        x.value = ctx.startX + event.translationX;
        y.value = ctx.startY + event.translationY;
        console.log(ctx.aa);   
      }
    },
    onFinish: (_, ctx) => {
      if (ctx.dragged == true) {
        /* dragging을 했다면 */
        console.log("bbbbbbbb");
        if(ctx.aa == false)
        {
          bbbbbb();
        }       
        ctx.aa = true;
        console.log(ctx.aa);
      }
    }
  });

  const onTap = () => {
    //jump();
    //aaaaaa();
    props.activate(!active);
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderRadius: 5,
      elevation: 10,
      backgroundColor: color.value,
      left: props.left,
      top: props.top,
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { scale: scale.value }
      ],
    }
  });

  if(props.name == "ele")
  {
    return (
      <PanGestureHandler onGestureEvent={panHandler} >
        <Animated.View style={[{position: 'absolute'}, animatedStyle]} >
          <TouchableWithoutFeedback
            onPress={onTap} >
            <Image style ={{width: 50, height: 50}} source={require('./assets/elephant.png')}></Image>
          </TouchableWithoutFeedback>
        </Animated.View>
      </PanGestureHandler>
    );
  }
  else if(props.name == "gir")
  {
    return (
      <PanGestureHandler onGestureEvent={panHandler} >
        <Animated.View style={[{position: 'absolute'}, animatedStyle]} >
          <TouchableWithoutFeedback
            onPress={onTap} >
            <Image style ={{width: 50, height: 50}} source={require('./assets/giraffe.png')}></Image>
          </TouchableWithoutFeedback>
        </Animated.View>
      </PanGestureHandler>
    );
  }

  else if(props.name == "mon")
  {
    return (
      <PanGestureHandler onGestureEvent={panHandler} >
        <Animated.View style={[{position: 'absolute'}, animatedStyle]} >
          <TouchableWithoutFeedback
            onPress={onTap} >
            <Image style ={{width: 50, height: 50}} source={require('./assets/monkey.png')}></Image>
          </TouchableWithoutFeedback>
        </Animated.View>
      </PanGestureHandler>
    );
  }
}


function HomeScreen({ navigation }) { //타이틀 화면
  return (

    <View style={[styles.container, { backgroundColor: '#FBFFB9' }]} >
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

const MainScreen = ({ navigation, route }) => { //메인화면 

  const [visible, setVisible] = useState(false);  //다이얼로그 창(게임종료 여부)
  const [visible_2, setVisible_2] = useState(false); 
  const [visible_3, setVisible_3] = useState(false);
  const [visible_4, setVisible_4] = useState(false);

  const showDialogEle = () => {   //코끼리 설치 ui 띄우기
    if (getEle == 1) {
      setVisible(true);
    }
  };
  const showDialogGir = () => {
    if (getGir == 1) {
      setVisible_2(true);
    }
  };
  const showDialogMon = () => {
    if (getMon == 1) {
      setVisible_3(true);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleCancel_2 = () => {
    setVisible_2(false);
  };
  const handleCancel_3 = () => {
    setVisible_3(false);
  };
  




  const showDialog_4 = () => {
    setVisible_4(true);
  };
  const handleCancel_4 = () => {
    setVisible_4(false);
  };


  const handleDelete = () => {
    BackHandler.exitApp();
    setVisible(false);
  };




  const moveToAnimal = () => {

    if (route.params?.post == null) {
      //setCounter(route.params?.post + Money);
      navigation.navigate("Animal", { post: Money, ele : eleMoney, gir : girMoney, mon : monMoney })
    }
    else {
      setCounter(route.params?.post + Money);
      navigation.navigate("Animal", { post: Money + route.params?.post, ele : eleMoney, gir : girMoney, mon : monMoney});  //룰렛
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
    else if (route.params?.postnum == null)
    {
      navigation.navigate("AnimalBook", { Animal: ''});  //도감
    }

    //console.log(Ani);
  }
  const moveToQuest = () => {
    navigation.navigate("Quest", {qusetMaingold : qusetMain, MainNum : countMainNum, mainbutton : BoolButton});  //업적
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




  //모달관련
  const [modalVisible, setModalVisible] = useState(false);
  const [soundModalVisible, setSoundModalVisible] = useState(false);
  const [explnModalVisible, setExplnModalVisible] = useState(false);
  const [In, setIn] = useState(false);


  const offSetonSound = () =>{
    setSoundModalVisible(true);
    setModalVisible(false);
  }

  const offSetonExpln = () =>{
    setExplnModalVisible(true);
    setModalVisible(false);
  }

  const offSoundonSet = () =>{
    setSoundModalVisible(false);
    setModalVisible(true);
  }

  const offExplnonSet = () =>{
    setExplnModalVisible(false);
    setModalVisible(true);
  }



  useEffect(() => {
    if (route.params?.post) {
     
    }
  }, [route.params?.post]);

  useEffect(() => {
    if (route.params?.aaaa) {
      setCounter(route.params?.aaaa);
      
    }
    else if (route.params?.aaaa == 0)
    {
      setCounter(0);
    }
  }, [route.params?.aaaa]);




  const [Money, setCounter] = useState(0);     //돈 증가 감소
  const [addEleMoney, setEleAdd] = useState(0);      //추가되는 돈
  const [addGirMoney, setGirAdd] = useState(0);      //추가되는 돈
  const [addMonMoney, setMonAdd] = useState(0);      //추가되는 돈


  const increaseCounter = () => {
    if (eleMoney > 100) {
      setEleAdd((eleMoney - 20)/10);
    }
    if (girMoney > 200){
      setGirAdd((girMoney - 40)/10);
    }
    if (monMoney > 300){
      setMonAdd((monMoney - 60)/10);
    }
    setCountMainNum(countMainNum + 1);                              //교수님한테 물어봐야함
    setCounter(Money + addEleMoney + addGirMoney + addMonMoney + 100); //교수님한테 물어봐야함

    if(countMainNum >= 9)
    {
      //console.log(countMainNum);
      setBoolButton(true);
    }
    else{
      //setBoolButton(false);
      console.log(countMainNum);
    }
  }

  const [eleMoney, setEleMoney] = useState(100);     //코끼리 돈 증가 감소
  const [girMoney, setGirMoney] = useState(200);     //기린 돈 증가 감소
  const [monMoney, setMonMoney] = useState(300);     //원숭이 돈 증가 감소

  const [getEle, setEle] = useState(0);     //코끼리 구매 했는지 안했는지
  const [getGir, setGir] = useState(0);     //기린 구매 했는지 안했는지
  const [getMon, setMon] = useState(0);     //원숭이 구매 했는지 안했는지

  const [imgEle, setImgEle] = useState(require('./assets/lock.png')); //코끼리 인벤토리 사진 변경
  const [imgGir, setImgGir] = useState(require('./assets/lock.png')); //기린 인벤토리 사진 변경
  const [imgMon, setImgMon] = useState(require('./assets/lock.png')); //원숭이 인벤토리 사진 변경


  //eleMoney값 받아오기
  useEffect(() => {
    if (route.params?.ele) {
      setEleMoney(route.params?.ele);
      if (route.params?.ele == 120) {
        setEle(1);
      }
      if(route.params?.ele != 100)
      {
        setImgEle(require('./assets/elephant.png')); //인벤토리 사진변경
      }
    }
  }, [route.params?.ele]);
  //girMoney값 받아오기
  useEffect(() => {
    if (route.params?.gir) {
      setGirMoney(route.params?.gir);
      if (route.params?.gir == 240) {
        setGir(1);
      }
      if(route.params?.gir != 200)
      {
        setImgGir(require('./assets/giraffe.png'));
      }
    }
  }, [route.params?.gir]);
  //monMoney값 받아오기
  useEffect(() => {
    if (route.params?.mon) {
      setMonMoney(route.params?.mon);
      if (route.params?.mon == 360) {
        setMon(1);
      }
      if(route.params?.mon != 300)
      {
        setImgMon(require('./assets/monkey.png'));
      }
    }
  }, [route.params?.mon]);




  //사진바꾸기
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


  //업적 
  useEffect(() => {
    if (route.params?.mainbutton) {
      setBoolButton(route.params?.mainbutton);
    }
  }, [route.params?.mainbutton]);

  useEffect(() => {
    if (route.params?.MainNum) { 
      setCountMainNum(route.params?.MainNum);
    }
  }, [route.params?.MainNum]);

  useEffect(() => {
    if (route.params?.qusetMaingold) {
      setnumMain(route.params?.qusetMaingold);
      setCounter(Money + route.params?.qusetMaingold);
    }
  }, [route.params?.qusetMaingold]);

  const [qusetMain, setnumMain] = useState(0);  // 돈 얼마줄건지
  const [countMainNum, setCountMainNum] = useState(0); //100 카운트세는애
  const [BoolButton, setBoolButton] = useState(false); //



  // 움직이는거 관련
  const [boxes, setBoxes] = useState([]); // react hook

  const intersect = (x, y, w, h, x1, y1, w1, h1) =>
    y + h >= y1 && y1 + h1 >= y && x + w >= x1 && x1 + w1 >= x;

  const cleanupAction = () => { }

  const add_Ele = () => {
    if(getEle != 0)
    {
      let myBoxes = [...boxes];
      myBoxes.push({
        name: "ele",
        left: 300, top: 0,
        width: 100, height: 100, active: false
      });
      setBoxes(myBoxes);
      setVisible(false);
      setEle(0);
    }
  }
  const add_Gir = () => {
    if(getGir != 0)
    {
      let myBoxes = [...boxes];
      myBoxes.push({
        name: "gir", //이름->생성하는 동물
        left: 300, top: 0, // 위치
        width: 100, height: 100, active: false
      });
      setBoxes(myBoxes);
      setVisible_2(false); //다이얼로그 닫는거
      setGir(0); // 변화
    }
  }
  const add_Mon = () => {
    if(getMon != 0)
    {
      let myBoxes = [...boxes];
      myBoxes.push({
        name: "mon", //이름->생성하는 동물
        left: 300, top: 0, // 위치
        width: 100, height: 100, active: false
      });
      setBoxes(myBoxes);
      setVisible_3(false); //다이얼로그 닫는거
      setMon(0); // 변화
    }
  }
  
  const remove = () => {
    let myBoxes = boxes.filter((box) => box.active === false);
    setBoxes(myBoxes);
    setVisible_3(false);
  }

  const jump = () => {
    console.log("Boxes jump called");
  }
  const blink = () => { }

  const activate = (name, newActive) => {
    let myBoxes = [...boxes]; // spread operator ... 전개 연산자
    myBoxes.forEach((box) => {
      if (box.name == name)
        box.active = newActive;
    });
    setBoxes(myBoxes);
  }

  let boxesRender = [];
  for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    boxesRender.push(<Box name={box.name} key={box.name}
      left={box.left} top={box.top}
      width={box.width} height={box.height}
      active={box.active} action={box.action}
      cleanupAction={cleanupAction}
      activate={(flag) => activate(box.name, flag)}
    />
    );
  }



  
  return (
    
    <PaperProvider>
     
      <View style={{flex : 1, backgroundColor : "#FBFFB9"}}>
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
                <Image style={{ height: 40, width: 40, resizeMode: 'contain', flex: 1 }}  source={require('./assets/setting.png')} />
                <View style={{ flex: 2 }}>
                  <Text style={{ textAlign: 'center', fontSize: 30 }}>환경설정</Text>
                </View>

                <View style={{ width: 40, height: 40, flex: 1, alignItems: 'center', }}>
                  <TouchableOpacity onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                    <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={require('./assets/cancel.png')} />
                  </TouchableOpacity>
                </View>

              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View>
                  <Button contentStyle={{ height: 50, width: 130,}} labelStyle={{ color: "white", fontSize: 20 }} color="#754F44"  mode="contained" onPress={() => offSetonSound() }> 소리설정 </Button>
                </View>
              </View>

              <View style={{ flex: 1, flexDirection: 'row'}}>
                <View>
                  <Button contentStyle={{ height: 50, width: 130,  }} labelStyle={{ color: "white", fontSize: 20 }} color='#754F44' mode="contained" onPress={() =>  offSetonExpln() }> 게임설명 </Button>
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
                <Image style={{ height: 40, width: 40, resizeMode: 'contain', flex: 1 }}source={require('./assets/setting.png')} />
                <View style={{ flex: 2 }}>
                  <Text style={{ textAlign: 'center', fontSize: 30 }}>소리설정</Text>
                </View>

                <View style={{ width: 40, height: 40, flex: 1, alignItems: 'center', }}>
                  <TouchableOpacity onPress={() => {
                    setSoundModalVisible(!soundModalVisible);
                  }}>
                    <Image style={{ height: 40, width: 40, resizeMode: 'contain' }}  source={require('./assets/cancel.png')} />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <View>
                <Button contentStyle={{ height: 50, width: 130,  }} labelStyle={{ color: "white", fontSize: 20 }} color='#754F44' mode="contained" onPress={() =>  offSoundonSet() }> 뒤로가기 </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={explnModalVisible}
          onSwipeComplete={setModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.SettingScreen}>
                <Image style={{ height: 40, width: 40, resizeMode: 'contain', flex: 1 }}  source={require('./assets/setting.png')} />
                <View style={{ flex: 2 }}>
                  <Text style={{ textAlign: 'center', fontSize: 30 }}>게임설명</Text>
                </View>
                <View style={{ width: 40, height: 40, flex: 1, alignItems: 'center', }}>
                  <TouchableOpacity onPress={() => {
                    setExplnModalVisible(!explnModalVisible);
                  }}>
                    <Image style={{ height: 40, width: 40, resizeMode: 'contain' }}  source={require('./assets/cancel.png')} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 3, flexDirection: 'row' }}>
                <View>                 
                  <Button contentStyle={{ height: 50, width: 130,  }} labelStyle={{ color: "white", fontSize: 20 }} color='#754F44' mode="contained" onPress={() => offExplnonSet() }> 뒤로가기 </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>        

        <Modal 
          animationType="fade"
          transparent={true}
          visible={In}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <View style ={styles.centeredView}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.InView}>
                           
              <View style = {{width: 250, height: 40,justifyContent: 'flex-end', flexDirection: 'row' ,marginTop: 5}}>
                  <TouchableOpacity onPress={() => {
                    setIn(!In);
                  }}>
                    <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={require('./assets/cancel.png')} />
                  </TouchableOpacity>

              </View>
              <ScrollView>
                <View style={{ width: 250, height: 500, margin: 10, }}>
                  <View style={{ backgroundColor: 'gray', flexDirection: 'row' }}>
                    <View style={{ width: 70, height: 100, backgroundColor: 'white', margin: 5, flex: 1, alignItems: 'center' }}>
                      <View style={{ flex: 3, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={showDialogEle}>
                          <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={imgEle} />
                        </TouchableOpacity>
                      </View>
                      <Text style={{ flex: 1, justifyContent: 'center', fontSize: 18 }}> {getEle} </Text>
                    </View>
                    <View style={{ width: 70, height: 100, backgroundColor: 'white', margin: 5, flex: 1, alignItems: 'center' }}>
                      <View style={{ flex: 3, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={showDialogGir}>
                          <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={imgGir} />
                        </TouchableOpacity>
                      </View>
                      <Text style={{ flex: 1, justifyContent: 'center', fontSize: 18 }}> {getGir} </Text>
                    </View>
                    <View style={{ width: 70, height: 100, backgroundColor: 'white', margin: 5, flex: 1, alignItems: 'center' }}>
                      <View style={{ flex: 3, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={showDialogMon}>
                          <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={imgMon} />
                        </TouchableOpacity>
                      </View>
                      <Text style={{ flex: 1, justifyContent: 'center', fontSize: 18 }}> {getMon} </Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: 'gray', flexDirection: 'row' }}>
                    <View style={{ width: 70, height: 100, backgroundColor: 'white', margin: 5, flex: 1, alignItems: 'center' }}>
                      <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={require('./assets/lock.png')} />
                      </View>
                      <Text style={{ flex: 1, justifyContent: 'center', fontSize: 18 }}> ABCDE </Text>
                    </View>
                    <View style={{ width: 70, height: 100, backgroundColor: 'white', margin: 5, flex: 1, alignItems: 'center' }}>
                      <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={require('./assets/lock.png')} />
                      </View>
                      <Text style={{ flex: 1, justifyContent: 'center', fontSize: 18 }}> ABCDE </Text>
                    </View>
                    <View style={{ width: 70, height: 100, backgroundColor: 'white', margin: 5, flex: 1, alignItems: 'center' }}>
                      <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={require('./assets/lock.png')} />
                      </View>
                      <Text style={{ flex: 1, justifyContent: 'center', fontSize: 18 }}> ABCDE </Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: 'gray', flexDirection: 'row' }}>
                    <View style={{ width: 70, height: 100, backgroundColor: 'white', margin: 5, flex: 1, alignItems: 'center' }}>
                      <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={require('./assets/lock.png')} />
                      </View>
                      <Text style={{ flex: 1, justifyContent: 'center', fontSize: 18 }}> ABCDE </Text>
                    </View>
                    <View style={{ width: 70, height: 100, backgroundColor: 'white', margin: 5, flex: 1, alignItems: 'center' }}>
                      <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={require('./assets/lock.png')} />
                      </View>
                      <Text style={{ flex: 1, justifyContent: 'center', fontSize: 18 }}> ABCDE </Text>
                    </View>
                    <View style={{ width: 70, height: 100, backgroundColor: 'white', margin: 5, flex: 1, alignItems: 'center' }}>
                      <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={require('./assets/lock.png')} />
                      </View>
                      <Text style={{ flex: 1, justifyContent: 'center', fontSize: 18 }}> ABCDE </Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: 'gray', flexDirection: 'row' }}>
                    <View style={{ width: 70, height: 100, backgroundColor: 'white', margin: 5, flex: 1, alignItems: 'center' }}>
                      <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={require('./assets/lock.png')} />
                      </View>
                      <Text style={{ flex: 1, justifyContent: 'center', fontSize: 18 }}> ABCDE </Text>
                    </View>
                    <View style={{ width: 70, height: 100, backgroundColor: 'white', margin: 5, flex: 1, alignItems: 'center' }}>
                      <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={require('./assets/lock.png')} />
                      </View>
                      <Text style={{ flex: 1, justifyContent: 'center', fontSize: 18 }}> ABCDE </Text>
                    </View>
                    <View style={{ width: 70, height: 100, backgroundColor: 'white', margin: 5, flex: 1, alignItems: 'center' }}>
                      <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={require('./assets/lock.png')} />
                      </View>
                      <Text style={{ flex: 1, justifyContent: 'center', fontSize: 18 }}> ABCDE </Text>
                    </View>
                  </View>
                  
                  
                </View>
              </ScrollView>
              

            </View>
          </View>
          </View>
        </Modal>


        <Dialog.Container onBackdropPress={handleCancel} visible={visible}>
          <Dialog.Title>코끼리 다이얼로그</Dialog.Title>
          <Dialog.Input>소환할거냐 안할거냐!</Dialog.Input>
          <Dialog.Button label="아니요" onPress={handleCancel} />
          <Dialog.Button label="예" onPress={add_Ele} />
        </Dialog.Container>

        <Dialog.Container onBackdropPress={handleCancel_2} visible={visible_2}>
          <Dialog.Title>기린 다이얼로그</Dialog.Title>
          <Dialog.Input>소환할거냐 안할거냐!</Dialog.Input>
          <Dialog.Button label="아니요" onPress={handleCancel_2} />
          <Dialog.Button label="예" onPress={add_Gir} />
        </Dialog.Container>

        <Dialog.Container onBackdropPress={handleCancel_3} visible={visible_3}>
          <Dialog.Title>원숭이 다이얼로그</Dialog.Title>
          <Dialog.Input>소환할거냐 안할거냐!</Dialog.Input>
          <Dialog.Button label="아니요" onPress={handleCancel_3} />
          <Dialog.Button label="예" onPress={add_Mon} />
        </Dialog.Container>

        <Dialog.Container onBackdropPress={handleCancel_4} visible={visible_4}>
          <Dialog.Title>다이얼로그</Dialog.Title>
          <Dialog.Input>제거할거냐 안할거냐!</Dialog.Input>
          <Dialog.Button label="아니요" onPress={handleCancel_4} />
          <Dialog.Button label="예" onPress={remove} />
        </Dialog.Container>


        <View style={styles.TopStyle}>
          <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} backgroundColor="#FBFFB9" source={require('./assets/dollar.png')} />

          <Text style={{ height: 40, width: 250, alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>  {(route.params?.post != null) ? route.params?.post + Money : Money} </Text>

          <Button icon={require('./assets/medal.png')} mode="contained" compact="true" color="#754F44" contentStyle={{ height: 40, width: 40 }}
            labelStyle={{ color: "white", fontSize: 20 }} onPress={moveToQuest} >
          </Button>
          <Button icon={require('./assets/book.png')} mode="contained" compact="true" color="#FFD292" contentStyle={{ height: 40, width: 40 }}
            labelStyle={{ color: "white", fontSize: 20 }} onPress={moveToAnimalBook}>
          </Button>
          <Button icon={require('./assets/setting.png')} mode="contained" compact="true" color="#EC7357" contentStyle={{ height: 40, width: 40 }}
            labelStyle={{ color: "white", fontSize: 20 }} onPress={() => {
              setModalVisible(true);
            }}>
          </Button>
        </View>



        <View style={{ flex: 6}}> 
                
          <ImageBackground  style={{ resizeMode: 'cover', justifyContent: 'center', flex: 1}}>
            <View style={styles.MainScreenStyle}>          
              <TouchableOpacity
                onPress={increaseCounter}>
                <Image
                  style={{ height: 200, width: 200, resizeMode: 'contain' }}
                  source={require('./assets/Home.png')} />
              </TouchableOpacity>
            </View>

            

            <View style={{height: 50, width:50, alignItems:'flex-end', left: 350, top: 100}}>
              <TouchableOpacity onPress ={()=>setIn(true)}>
            <Image source={require('./assets/bag.png')} style={{height : 50, width : 50}}></Image>
            </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      
        {boxesRender}
        

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
          <Button icon={require('./assets/Egg.png')} mode="contained" compact="true" color="gray" contentStyle={{ height: 45, width: 103.5 }}
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
    else if (route.params?.post == 0)
    {
      setCounter(0);
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
  useEffect(() => {
    if (route.params?.gir) {
      setGirMoney(route.params?.gir);
    }
  }, [route.params?.gir]);
  useEffect(() => {
    if (route.params?.mon) {
      setMonMoney(route.params?.mon);
    }
  }, [route.params?.mon]);


  const [visible, setVisible] = useState('');  //동물 샀는지 안샀는지
  const [Money, setCounter] = useState(0);     //돈 증가 감소



  const [eleMoney, setEleMoney] = useState(100);     //코끼리 구매 비용
  const [girMoney, setGirMoney] = useState(200);     //기린 구매 비용
  const [monMoney, setMonMoney] = useState(300);     //원숭이 구매 비용



  const ele = () => {
    if(Money >= eleMoney)
    {
      setVisible('ele'); //도감
      setCounter(Money - eleMoney); //돈측정
      setEleMoney(eleMoney + 20); //구입비용 늘리기 
    }
  }
  const gir = () => {
    if(Money >= girMoney)
    {
      setVisible('gir');
      setCounter(Money - girMoney);
      setGirMoney(girMoney + 40);
    }
  }
  const mon = () => {
    if(Money >= monMoney)
    {
      setVisible('mon');
      setCounter(Money - monMoney);
      setMonMoney(monMoney + 60);
    }
  }

  

  //navigation.navigate("Roulette", {post: Money})
  const moveToMain = () => {
    if (route.params?.postnum == null) {
      //setCounter(route.params?.post + Money);
      navigation.navigate("Main", { postnum: visible, aaaa: Money, ele: eleMoney, gir: girMoney, mon : monMoney});
    }
    else {
      //setCounter(route.params?.post + Money);
      navigation.navigate("Main", { postnum: visible, aaaa: Money, ele: eleMoney, gir: girMoney, mon : monMoney });
    }
  }

  


  return (
    <View style={{flex : 1}}>
      <StatusBar hidden={true} />
     
      <View style={{ backgroundColor: 'black', flexDirection: 'row' , flex : 0.55}}>
        <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 2, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Image 
            style={{ height: 50, width: 50, resizeMode: 'contain' }}
            source={require('./assets/Title_Image.png')} />
        </View>

        <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 5, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Text style={{ fontSize: 35 }} >동물</Text>
        </View>
        <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 1, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
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
                  <Button mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 15 }} onPress ={ele}> {eleMoney == 100 ? '구입' : '업그레이드'}
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //기린
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/giraffe.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>기린</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>{girMoney}</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 15 }} onPress ={gir}> {girMoney == 200 ? '구입' : '업그레이드'}
                </Button>
                </View>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: '#CFC810', height: 100 }}>
            <View style={{ backgroundColor: 'black', margin: 5, flex: 1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#B46E06', flex: 1, right: 2.5, alignItems: 'center', justifyContent: 'center' }}>
                <Image  //원숭이
                  style={{ height: 80, width: 80, resizeMode: 'contain' }}
                  source={require('./assets/monkey.png')}/>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 3, left: 2.5, flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'gray', flex: 2, }}>
                  <Text style={{ backgroundColor: '#B46E06', height: 45, fontSize: 25 }}>원숭이</Text>
                  <View style={{ margin: 5, backgroundColor: 'yellow' }}>
                    <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>{monMoney}</Text>
                  </View>
                </View>
                <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                  <Button mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                    labelStyle={{ color: "black", fontSize: 15 }} onPress = {mon}> {monMoney == 300 ? '구입' : '업그레이드'}
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
        
      <View style={{ flex: 0.5, backgroundColor: '#FBFFB9', flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ backgroundColor: 'black', flex: 1 , justifyContent : 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#FBFFB9', width : 100, alignItems:'center'}}>
            <Image style={{ height: 40, width: 40, resizeMode: 'contain', }} source={require('./assets/dollar.png')} />
          </View>
        </View>
        <View style={{ alignItems: 'center', backgroundColor: 'black', flex: 3 }}>
          <View style={{backgroundColor: '#FBFFB9', height : 40,  width : 300, margin : 3, justifyContent : 'center', alignItems : 'flex-end'}}>
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
        <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 2, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Image  
            style={{ height: 50, width: 50, resizeMode: 'contain' }}
            source={require('./assets/Title_Image.png')} />
        </View>

        <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 5, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Text style={{ fontSize: 35 }} >편의시설</Text>
        </View>
        <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 1, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
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
      <View style={{ flex: 0.5, backgroundColor: '#FBFFB9', flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ backgroundColor: 'black', flex: 1 , justifyContent : 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#FBFFB9', width : 100, alignItems:'center'}}>
            <Image style={{ height: 40, width: 40, resizeMode: 'contain', }} source={require('./assets/dollar.png')} />
          </View>
        </View>
        <View style={{ alignItems: 'center', backgroundColor: 'black', flex: 3 }}>
          <View style={{backgroundColor: '#FBFFB9', height : 40,  width : 300, margin : 3, justifyContent : 'center', alignItems : 'flex-end'}}>
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
        <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 2, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Image  
            style={{ height: 50, width: 50, resizeMode: 'contain' }}
            source={require('./assets/Title_Image.png')} />
        </View>

        <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 5, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Text style={{ fontSize: 35 }} >직원</Text>
        </View>
        <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 1, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
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

      <View style={{ flex: 0.5, backgroundColor: '#FBFFB9', flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ backgroundColor: 'black', flex: 1 , justifyContent : 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#FBFFB9', width : 100, alignItems:'center'}}>
            <Image style={{ height: 40, width: 40, resizeMode: 'contain', }} source={require('./assets/dollar.png')} />
          </View>
        </View>
        <View style={{ alignItems: 'center', backgroundColor: 'black', flex: 3 }}>
          <View style={{backgroundColor: '#FBFFB9', height : 40,  width : 300, margin : 3, justifyContent : 'center', alignItems : 'flex-end'}}>
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
    <View style ={{flex: 1}}>
      <StatusBar hidden={true} />


      
      <View style={{ backgroundColor: 'black', flexDirection: 'row' , flex : 1}}>
        <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 2, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Image 
            style={{ height: 50, width: 50, resizeMode: 'contain' }}
            source={require('./assets/Title_Image.png')} />
        </View>

        <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 5, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Text style={{ fontSize: 35 }} >뽑기</Text>
        </View>
        <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 1, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <TouchableOpacity onPress={moveToMain}>
            <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={require('./assets/cancel.png')} />
          </TouchableOpacity>
        </View>
      </View>

  

      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 12 }}>
        <View style = {{flex: 1}}>
          <Text style={{ alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>{route.params?.post + Money} </Text>
        </View>
        <View style ={{flex : 8, justifyContent : 'center'}}>
          <Image
            style={{ height: 200, width: 200, resizeMode: 'contain' }}
            source={image} />
        </View>
        <View style = {{flex : 1}}>
          <Button mode="contained" compact="true" color="#755744" contentStyle={{ height: 40, width: 200 }}
            labelStyle={{ color: "white", fontSize: 30 }} onPress={decreaseCounter} >뽑기
        </Button>
        </View>
      </View>
    </View>
  );

}

function QuestScreen({ navigation, route }) { //업적

  const moveToMain = () => {
    navigation.navigate("Main", {qusetMaingold : qusetMain, MainNum : countMainNum, mainbutton : BoolButton});
  }

  useEffect(() => {
    if (route.params?.qusetMaingold) {
      setnumMain(route.params?.qusetMaingold);
    }
  }, [route.params?.qusetMaingold]);

  useEffect(() => {
    if (route.params?.MainNum) {
      setCountMainNum(route.params?.MainNum);
    }
  }, [route.params?.MainNum]);

  useEffect(() => {
    if (route.params?.mainbutton) {
      setBoolButton(route.params?.mainbutton)
    }
  }, [route.params?.mainbutton]);


  const [qusetMain, setnumMain] = useState(0);  // 돈 얼마줄건지
  const [countMainNum, setCountMainNum] = useState(0); //100 카운트세는애
  const [BoolButton, setBoolButton] = useState(false);

  const DieButton = () => {
    if (BoolButton == true)
    {
      if (countMainNum >= 10)
      {
        setnumMain(500);
        setBoolButton(false);
      }
    }
  }

 
  

  return (
    <View>
    <View style={{ backgroundColor: 'black', flexDirection: 'row' }}>
      <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 2, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
        <Image  
          style={{ height: 50, width: 50, resizeMode: 'contain' }}
          source={require('./assets/medal.png')} />
      </View>

      <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 5, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
        <Text style={{ fontSize: 35 }} >업적</Text>
      </View>
      <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 1, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
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
                  <Text style={{ backgroundColor: '#B46E06', height: 35, fontSize: 20,}}>500</Text>
                </View>
              </View>
              <View style={{ backgroundColor: '#B46E06', flex: 1, justifyContent: 'center', margin: 5 }}>
                <Button icon={require('./assets/Title_Image.png')} mode="contained" compact="true" color='#FCFF70' Style={{ height: 20, width: 60 }}
                  labelStyle={{ color: "black", fontSize: 16 }} onPress ={DieButton}> 획득
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
        <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 2, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Image
            style={{ height: 50, width: 50, resizeMode: 'contain' }}
            source={require('./assets/book.png')} />
        </View>

        <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 5, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
          <Text style={{ fontSize: 35 }} >도감</Text>
        </View>

        <View style={{ backgroundColor: '#FBFFB9', height: 46, flex: 1, alignItems: 'center', justifyContent: 'center', margin: 2 }}>
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
    backgroundColor: "rgba(0,0,0,0.5)"
  },

  modalView: {
    margin: 20,
    backgroundColor: '#FBFFB9',
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

  InView: {
    margin: 100,
    backgroundColor: '#FBFFB9',
    borderRadius: 20,

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
    height: 400
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


  box123: {
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: "blue",
  },
  commandText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white'
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
