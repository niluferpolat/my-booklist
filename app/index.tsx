import BookList from '@/components/BookingList';
import { Button, FlatList, Image, ScrollView, Text, View,StyleSheet
 } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import {useEffect, useState} from "react"
import FlashMessage from 'react-native-flash-message';
import ModalComponent from '@/components/Modal';
import { Item } from '@/types/FormTypes';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '@/fireBaseConfig';


function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [visible,setVisible] = useState(false);
  const [docs,setDocs]=useState<any>([])
  const [items, setItems] = useState<Item[]>([]); 
  useEffect(()=>{
   getAllRead()
  },[])

  const getAllRead=async()=>{
   
    try {
      const response = await getDocs(collection(FIRESTORE_DB, "readlist"));
      const data = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setDocs(data)
    } catch (error) {
      console.error("Veriler alınırken bir hata oluştu:", error);
    }
  }
  return (
    <ScrollView style={{ flex: 1, paddingTop: insets.top }}>
      <FlashMessage position={'top'}/>
       <Image
       source={require('../assets/images/icon.png')}
        style={{width: 200, height: 200, alignSelf:"center"}}
      />
      <ModalComponent visible={visible} setVisible={setVisible} items={items} setItems={setItems}/>
     
      <Text style={{ fontSize: 28 ,textAlign:"center"}}>
        Okuma Listem
      </Text>
      <View style={{width:500
      ,alignSelf:"center"
      }}>
      <Button onPress={()=>setVisible(true)} color={'#A888B5'} title='Kitap Ekle'></Button>
      </View>
      <FlatList
        data={docs}
        renderItem={({item}) => <BookList item={item} />}
        keyExtractor={item => item.name}
      />
    </ScrollView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}