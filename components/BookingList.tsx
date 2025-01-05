import { Item } from '@/types/FormTypes';
import { ScrollView, Text, View,
    StyleSheet
 } from 'react-native';
export default function BookList(props:{item:any}){
 return(
  <View style={style.container}>
   <Text style={style.Textstyle}>
   {props.item.name}
   </Text>
  </View>
 )
}
const style = StyleSheet.create({
   container : {
    borderBottomWidth:1,
    borderBottomColor: 'grey',
    padding:10,
    backgroundColor:'#FFE5E5',
   },
   Textstyle:{
     color:'#756AB6'
   }
})