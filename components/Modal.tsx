import React, { useState } from 'react';
import { Modal, Text, TextInput, View, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { FormInputs, Item, StatusList } from '@/types/FormTypes';
import * as yup from 'yup';
import { SwipeListView } from 'react-native-swipe-list-view';
import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from '@/fireBaseConfig';
import { showMessage } from 'react-native-flash-message';
function ModalComponent(props: {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>; 
  }) {
    const initialValues = {
      name: '',
    };
  
    const validationSchema = yup.object().shape({
      name: yup.string().required('Kitap adı gereklidir'),
    });
  
    const addTodo = (values: { name: string }) => {
        props.setItems((prevItems) => [
            ...prevItems,
            {
              created_date: new Date(),
              name: values.name,
              status: StatusList.WILL_READ
            
            },
          ]);
        
    };
    const handleDelete = (name: string) => {
        props.setItems((prevTasks) => prevTasks.filter((task) => task.name !== name));
      };
    const renderHiddenItem = ({ item }: { item: { name: string } }) => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.name)}>
          <Text style={{color:"white"}}>Sil</Text>
        </TouchableOpacity>
      );
    
   
      const renderItem = ({ item }: { item: { name: string } }) => (
        <View style={styles.title}>
     <Text >{item.name}</Text>
        </View>
   
      );
      const Book = () => (
        <SwipeListView
       style={{marginTop:10}}
        data={props.items}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem} 
        rightOpenValue={-75}
        disableRightSwipe 
      />
      );

      const save=async()=>{
        try {
           await props.items.map(item=>{
                 addDoc(collection(FIRESTORE_DB, 'readlist'), {
                    created_date: new Date(),
                    name: item.name,
                    status: StatusList.WILL_READ,
                  });   
            })
           
            showMessage({
              message: 'Başarılı!',
              description: 'Kitap başarıyla eklendi.',
              type: 'success',
            });
      
           props.setItems([])
           
            props.setVisible(false);
          } catch (error) {
            console.error('Belge eklenirken bir hata oluştu:', error);
      
     
            showMessage({
              message: 'Hata!',
              description: 'Kitap eklenirken bir hata oluştu.',
              type: 'danger',
            });
          }
      }
      
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => props.setVisible(false)}
      >
        <View style={styles.container}>
          <Text style={{ fontSize: 25, textAlign: 'center', color: '#441752' }}>KİTAP EKLE</Text>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values,{resetForm}) => {
              addTodo(values);
              resetForm()
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  placeholder="Kitap Adı"
                  value={values.name}
                />
                {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                  <View style={{ flex: 1, marginRight: 10}}>
                    <Button color={'#28a745'} title="Ekle"  onPress={handleSubmit as any} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Button color={'#dc3545'} title="İptal" onPress={() => {props.setVisible(false), props.setItems([])}} />
                  </View>
                </View>
                 <Book />
                <View style={styles.button}>
                  <Button color={'#8174A0'} title="Kaydet" onPress={save} />
                </View>
              </>
            )}
          </Formik>
         
        </View>
      </Modal>
    );
  }
  
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#8174A0',
    padding: 10,
    marginBottom: 10,
    width: '80%',
    color: '#8174A0',
    height: 45,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    marginBottom:10,
    width: '100%',
    marginTop: 20,
    height:60
  },
  item: {
   
    marginVertical: 8,
    marginHorizontal: 16,
    width:'100%'
  },
  title: {
    width:"100%",
    fontSize: 15,
    padding:10,
    color: '#8174A0',
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  deleteButton: {
    backgroundColor: '#dc3545',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: 75,
    position: 'absolute',
    right: 0,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  

});

export default ModalComponent;
