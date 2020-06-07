import React, { useEffect, useState, ChangeEvent } from 'react';
import { View, ImageBackground, Image , StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

import axios from 'axios';

import api from '../../services/api';

interface IBGEUFResponse {
  sigla: string;
  nome:string;
}
interface IBGECityResponse {
  nome: string;
}

const Home = () =>{
    const navigation = useNavigation();
    const [ufs, setUfs] = useState<any[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [cities, setcityName] = useState<any[]>([]);
    
    function handleNavigatePoints(){
      console.log(selectedCity,selectedUf)
        navigation.navigate('Points',{ city: selectedCity, uf: selectedUf});
    }

    function handleSelectedCity(city: string){
      setSelectedCity(city)
  }

    function handleSelectUf(uf: string) {
      setSelectedUf(uf)
    }

    useEffect(() => {
      axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
          const ufInitials = res.data.map(element=>{
            return {label: element.nome + ` (${element.sigla})`, value: element.sigla}
          }) 
          setUfs(ufInitials)  
      })
  }, [])

  useEffect(() => {
      

      axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(res => {
          const cityNames = res.data.map(element=>{
            return {label: element.nome , value: element.nome }
          }) 
          setcityName(cityNames);
      })
  }, [selectedUf])
    return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding': undefined}>
    <ImageBackground imageStyle={{width:274, height:368 }} source={require('../../assets/home-background.png')} style={styles.container}>
        <View style={styles.main}>
            <Image source={require('../../assets/logo.png')}></Image>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
            <Text style={styles.description}>Ajudamos pessoas a econtrarem pontos de coletas de forma eficiente.</Text>
        </View>

        <View style={styles.footer}>
          
          <RNPickerSelect
            onValueChange={(value) => handleSelectUf(value)}
            style={pickerSelectStyles}
            placeholder={{label: 'Selecione o Estado', value: null}}
            items={ufs}
        />
            <RNPickerSelect
            onValueChange={(value) => handleSelectedCity(value)}
            
            style={pickerSelectStyles}
            placeholder={{label: 'Selecione a Cidade', value: null}}
            items={cities}
        />
            <RectButton style={styles.button} onPress={() => handleNavigatePoints()}>
                <View style={styles.buttonIcon}>
                   <Text>
                       <Icon name="arrow-right" color="#FFF" size={24} />
                   </Text> 
                </View>
                <Text style={styles.buttonText}>
                    Entrar
                </Text>
            </RectButton>
        </View>
    </ImageBackground>
    </KeyboardAvoidingView>
    );

    
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,// to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home;