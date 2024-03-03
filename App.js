import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import {AsyncStorage, StyleSheet, Text, View,Button, TouchableOpacity,TextInput,KeyboardAvoidingView} from 'react-native';

export default function App() {

   const [estado, setarEstado] = useState('leitura');
   const [anotacao, setarAnotacao] = useState('');
  

   useEffect(()=>{

    //Quando inicializar o app queremos que leia a key anotacao.

    (async () => {
        try{
            const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
            setarAnotacao(anotacaoLeitura);
        }catch(error){}
    })();

},[])


   setData = async() => {
    try {
      await AsyncStorage.setItem('anotacao',anotacao);
    } catch (error) {
      
    }

    alert('Sua anotação foi salva!');
   }


   function atualizarTexto(){
      setarEstado('leitura');
      setData();
   }
   if(estado == 'leitura'){
    return(
      <View style={{flex:1}}>
        <StatusBar style="light"/>
        <View style={styles.header}><Text style={{textAlign:'center',color:'white',fontSize:18}}>App Anotações</Text></View>
        {
        (anotacao != '')?
        <KeyboardAvoidingView  style={{padding:3}}><Text style={styleInpText.caixa}>{anotacao}</Text></KeyboardAvoidingView>
        :
        <KeyboardAvoidingView style={{padding:3}}><Text style={{opacity:0.3}}>Nenhuma anotação encontrada :(</Text></KeyboardAvoidingView>
        }
        <TouchableOpacity onPress={()=> setarEstado('atualizando')} 
        style={styles.btnAnotacao}>
          {
          (anotacao == "")?
          <Text style={styles.btnAnotacaoTexto}>+</Text>
          :
          <Text style={{fontSize:12,color:'white',textAlign:'center',marginTop:16}}>Editar</Text>
          }
          </TouchableOpacity>
      </View>
    );
   }else if(estado == 'atualizando'){
    return(
    <View style={{flex:1}}>
        <StatusBar style="light"/>
        <View style={styles.header}><Text style={{textAlign:'center',color:'white',fontSize:18}}>App Anotações</Text></View>
       
        <KeyboardAvoidingView style={styleInpText.caixa}>
          <TextInput  onChangeText={(text)=>setarAnotacao(text)} style={styleInpText.input} multiline={true} numberOfLines={1} placeholder="Digite aqui..."autoFocus={true} value={anotacao}></TextInput>
        </KeyboardAvoidingView>

        <TouchableOpacity onPress={()=> atualizarTexto()} 
        style={styles.btnSalvar}>
          <Text style={{textAlign:'center',color:'white'}}>
            Salvar
          </Text>
        </TouchableOpacity>
      </View>
    );
   }
}

const styles = StyleSheet.create({
  header:{
    width:'100%',
    padding: 30,
    backgroundColor: '#069'
  },
  anotacao:{
    fontSize: 14,
    color: '#636466',
    fontWeight: 'bold',
    fontStyle: 'italic',
    //textDecorationLine: 'underline',
    
  },
  btnAnotacao:{
    position:'absolute',
    right:0,
    bottom:0,
    width:50,
    height:50,
    backgroundColor:'#069',
    borderRadius:25
  },
  btnAnotacaoTexto:{
    color:'white',
    position:'relative',
    textAlign:'center',
    top: 3,
    fontSize:30
  }
  ,
  btnSalvar:{
    position:'absolute',
    right:20,
    bottom:20,
    width:100,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#069'

  }
})
const styleInpText = StyleSheet.create({
  input: {
    padding: 5,
    textAlignVertical:'top',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  caixa:{
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 3,
    marginLeft:2,
    marginRight:2,
    marginTop:2,
    borderStyle: 'solid',
    backgroundColor: '#e3e8e8'
    }
});