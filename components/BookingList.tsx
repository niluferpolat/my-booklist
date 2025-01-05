import { Item } from '@/types/FormTypes';
import { ScrollView, Text, View } from 'react-native';
export default function BookList(props:{item:any}){
 return(
  <View style={{alignSelf:"center",marginTop:15}}>
   <Text>
   {props.item.name}
   </Text>
  </View>
 )
}