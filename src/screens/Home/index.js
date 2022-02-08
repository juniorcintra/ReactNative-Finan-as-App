import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CurrencyInput from 'react-native-currency-input';
import DatePicker from 'react-native-modern-datepicker';
import {Picker} from '@react-native-community/picker';
import { useTheme } from 'styled-components';
import {format} from 'date-fns';

import UserSvg from '../../assets/svg/user.svg';
import AddSvg from '../../assets/svg/iconAdd.svg';

import { Button } from '../../components/Button';
import { CardList } from '../../components/CardList';
import { ViewSaldo } from '../../components/ViewSaldo';

import {
  MainView,
  Header,
  DivTitle,
  Title,
  Name,
  DivButtons,
  List,
  DivTotal,
  TotalText,
  ButtonHover,
  ButtonIcon,
  DivActions,
  LinhaAction,
  LinhaActionText,
  ButtonClose,
} from './styles';

import data from '../../database/data.json';

export default App = () => {
  const { colors } = useTheme();

  const [stateButton, setStateButton] = useState({
    entradas: true,
    saidas: false,
    dividas: false,
  });
  const [showActions, setShowActions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState('');

  const [valueInput, setValueInput] = useState(null);
  const [origem, setOrigem] = useState('');
  const [date, setDate] = useState(new Date());
  const [pickerSelect, setPickerSelect] = useState('');

  const [dadosEntradas, setDadosEntradas] = useState([]);
  const [dadosSaidas, setDadosSaidas] = useState([]);

  async function handleGetData() {
    var dataEntradas = await AsyncStorage.getItem('entradas');
    var entradas = JSON.parse(dataEntradas);

    var dataSaidas = await AsyncStorage.getItem('saidas');
    var saidas = JSON.parse(dataSaidas);

    setDadosEntradas(entradas);
    setDadosSaidas(saidas);
  }

  useEffect(() => {
    handleGetData();
  }, [showModal]);

  const handleStateButton = button => {
    switch (button) {
      case 'entradas':
        setStateButton({
          entradas: true,
          saidas: false,
          dividas: false,
        });
        break;
      case 'saidas':
        setStateButton({
          entradas: false,
          saidas: true,
          dividas: false,
        });
        break;
      case 'dividas':
        setStateButton({
          entradas: false,
          saidas: false,
          dividas: true,
        });
        break;
    }
  };

  const handleSum = () => {
    let sum = 0;
    if (stateButton.entradas) {
      for (let index = 0; index < dadosEntradas?.length; index++) {
        const element = dadosEntradas[index];
        sum = sum + parseFloat(element.valor);
      }
    }

    if (stateButton.saidas) {
      for (let index = 0; index < data.saidas.length; index++) {
        const element = data.saidas[index];
        sum = sum + parseFloat(element.valor);
      }
    }

    if (stateButton.dividas) {
      for (let index = 0; index < data.dividas.length; index++) {
        const element = data.dividas[index];
        sum = sum + parseFloat(element.valor);
      }
    }

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(sum);
  };

  saveData = async () => {
    try {
      let dataEntradas = {
        id: Math.floor(Date.now() * Math.random()).toString(36),
        origem: origem,
        valor: valueInput,
        data: format(new Date(date), 'dd/MM/yyyy'),
      };

      let dataSaidas = {
        origem: origem,
        valor: valueInput,
        data: format(new Date(date), 'dd/MM/yyyy'),
        cenario: pickerSelect,
      };

      if (typeModal === 'entradas') {
        let dataToSave = (await AsyncStorage.getItem('entradas')) || '[]';
        dataToSave = JSON.parse(dataToSave);
        dataToSave.push(dataEntradas);
        AsyncStorage.setItem('entradas', JSON.stringify(dataToSave)).then(
          () => {
            handleCloseModal();
            setStateButton({
              entradas: true,
              saidas: false,
              dividas: false,
            });
          },
        );
      }

      if (typeModal === 'saidas') {
        let dataToSave = (await AsyncStorage.getItem('saidas')) || '[]';
        dataToSave = JSON.parse(dataToSave);
        dataToSave.push(dataSaidas);
        AsyncStorage.setItem('saidas', JSON.stringify(dataToSave)).then(() => {
          handleCloseModal();
          setStateButton({
            entradas: false,
            saidas: true,
            dividas: false,
          });
        });
      }

      
    } catch (error) {
      alert(error);
    }
  };

  async function handleRemoveItem(item) {
    if (stateButton.entradas) {
      Alert.alert('Aviso','Deseja realmente excluir?', [
        {
          text: 'Não',
          styles: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            let dataToSave = (await AsyncStorage.getItem('entradas')) || '[]';
            dataToSave = JSON.parse(dataToSave);

      var newDataToSave = dataToSave.filter(element => element.id !== item.id);

      AsyncStorage.setItem('entradas', JSON.stringify(newDataToSave)).then(
        () => {
          handleGetData();
        },
      );
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setValueInput(null);
    setOrigem('');
    setPickerSelect('');
  };

  const handleShowModal = type => {
    setTypeModal(type);
    setShowActions(false);
    setShowModal(true);
  };

  return (
    <MainView>
      <Header>
        <DivTitle>
          <Title>Olá, </Title>
          <Name>Fulano!</Name>
        </DivTitle>
        <UserSvg width={30} height={30}/>
      </Header>

      <DivButtons>
        <Button
          title="Entradas"
          colorActive={colors.entrada}
          active={stateButton.entradas}
          colorInactive={colors.entrada_light}
          onPress={() => handleStateButton('entradas')}
        />

        <Button
          title="Saídas"
          colorActive={colors.saida}
          active={stateButton.saidas}
          colorInactive={colors.saida_light}
          onPress={() => handleStateButton('saidas')}
        />

        <Button
          active={stateButton.dividas}
          colorActive={colors.divida}
          colorInactive={colors.divida_light}
          onPress={() => handleStateButton('dividas')}
          title="Dívidas"
          />
      </DivButtons>

      <List
        keyExtractor={(_, index) => index}
        data={
          stateButton.entradas
            ? dadosEntradas
            : stateButton.saidas
            ? dadosSaidas
            : data.dividas
        }
        renderItem={({item}) => (
          <CardList 
            data={item}
            stateButton={stateButton}
            onLongPress={() => handleRemoveItem(item)} 
          />
        )}
      />

      <DivTotal>
        <TotalText>Total</TotalText>
        <TotalText>{handleSum()}</TotalText>
      </DivTotal>

      <ViewSaldo
        saldoGeral={3500}
        hipotético1={800}
        hipotético2={1200}
      />

      <ButtonHover activeOpacity={0.6} onPress={() => setShowActions(!showActions)}>
        <AddSvg width={20} height={20}/>
      </ButtonHover>

      {showActions && (
        <DivActions>
          <LinhaAction
            activeOpacity={0.6}
            color={colors.entrada_light}
            onPress={() => handleShowModal('entradas')}>
            <LinhaActionText>Nova Entrada</LinhaActionText>
          </LinhaAction>
          <LinhaAction
            activeOpacity={0.6}
            color={colors.saida_light}
            onPress={() => handleShowModal('saidas')}>
            <LinhaActionText>Nova Saída</LinhaActionText>
          </LinhaAction>
          <LinhaAction
            activeOpacity={0.6}
            color={colors.divida_light}
            onPress={() => handleShowModal('dividas')}>
            <LinhaActionText>Nova Dívida</LinhaActionText>
          </LinhaAction>
        </DivActions>
      )}
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ButtonClose onPress={() => handleCloseModal()}>
              <ButtonIcon size="24px">X</ButtonIcon>
            </ButtonClose>
            <Text style={styles.modalText}>
              Nova{' '}
              {typeModal === 'entradas'
                ? 'entrada'
                : typeModal === 'saidas'
                ? 'saída'
                : 'dívida'}
            </Text>
            <View>
              <Text style={{color: '#000'}}>Origem</Text>
              <TextInput
                style={{
                  borderWidth: 0.5,
                  borderColor: '#84E0FC',
                  height: 40,
                  width: 300,
                  borderRadius: 5,
                  marginBottom: 10,
                  padding: 12,
                  color: '#000',
                }}
                onChangeText={setOrigem}
                value={origem}
              />
            </View>
            <View>
              <Text style={{color: '#000'}}>Valor</Text>
              <CurrencyInput
                style={{
                  borderWidth: 0.5,
                  borderColor: '#84E0FC',
                  height: 40,
                  width: 300,
                  borderRadius: 5,
                  marginBottom: 10,
                  padding: 12,
                  color: `#000`,
                }}
                value={valueInput}
                onChangeValue={setValueInput}
                prefix="R$"
                delimiter="."
                separator=","
                precision={2}
              />
            </View>

            {typeModal === 'saidas' && (
              <View>
                <Text style={{color: '#000'}}>Cenários</Text>
                <Picker
                  selectedValue={pickerSelect}
                  onValueChange={item => setPickerSelect(item)}
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#84E0FC',
                    height: 40,
                    width: 300,
                    borderRadius: 5,
                    marginBottom: 10,
                    padding: 12,
                    color: '#000',
                  }}>
                  <Picker.Item label="Prioridade baixa" value="1" />
                  <Picker.Item label="Prioridade média" value="2" />
                  <Picker.Item label="Prioridade alta" value="3" />
                </Picker>
              </View>
            )}

            <DatePicker
              current={format(new Date(), 'yyyy-MM-dd')}
              mode="calendar"
              minuteInterval={30}
              style={{borderRadius: 10, width: 320}}
              onSelectedChange={date => setDate(date)}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => saveData()}>
              <Text style={styles.textStyle}>Cadastrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </MainView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 28,
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
  date: {
    fontSize: 20,
    marginLeft: 15,
  },
});
