import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Modal,
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CurrencyInput from 'react-native-currency-input';
import {format} from 'date-fns';
import DatePicker from 'react-native-modern-datepicker';
import {Picker} from '@react-native-community/picker';

import Cenario1Svg from './src/assets/svg/cenario-1.svg';
import Cenario2Svg from './src/assets/svg/cenario-2.svg';
import Cenario3Svg from './src/assets/svg/cenario-3.svg';

import {
  MainView,
  Header,
  DivTitle,
  Title,
  Name,
  DivButtons,
  Button,
  TextButton,
  ItemContainer,
  TopContainerItem,
  OrigemItem,
  TotalItem,
  ValorItem,
  ParcelasItem,
  DataItem,
  DivTotal,
  TotalText,
  ViewSaldo,
  TitleSaldo,
  DivSaldoText,
  SaldoText,
  ButtonHover,
  ButtonIcon,
  DivActions,
  LinhaAction,
  LinhaActionText,
} from './styles';

import data from './data.json';

export default App = () => {
  const [stateButton, setStateButton] = useState({
    entradas: true,
    saidas: false,
    dividas: false,
  });
  const [showActions, setShowActions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState('');

  const [valueInput, setValueInput] = useState(null);
  const [origem, setOrigem] = useState();
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
    setDadosSaidas(saidas)
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
        origem: origem,
        valor: valueInput,
        data: format(new Date(date), 'dd/MM/yyyy'),
      };

      let dataSaidas = {
        origem: origem,
        valor: valueInput,
        data: format(new Date(date), 'dd/MM/yyyy'),
        cenario: pickerSelect
      };

      if (typeModal === 'entradas') {
        let dataToSave = (await AsyncStorage.getItem('entradas')) || '[]';
        dataToSave = JSON.parse(dataToSave);
        dataToSave.push(dataEntradas);
        AsyncStorage.setItem('entradas', JSON.stringify(dataToSave)).then(
          () => {
            setShowModal(false);
          },
        );
      }

      if (typeModal === 'saidas') {
        let dataToSave = (await AsyncStorage.getItem('saidas')) || '[]';
        dataToSave = JSON.parse(dataToSave);
        dataToSave.push(dataSaidas);
        AsyncStorage.setItem('saidas', JSON.stringify(dataToSave)).then(
          () => {
            setShowModal(false);
          },
        );
      }
    } catch (error) {
      alert(error);
    }
  };
  console.log(dadosSaidas)
  const handleShowModal = type => {
    setTypeModal(type);
    setShowActions(false);
    setShowModal(true);
  };
  
  return (
    <MainView>
      <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
      <Header>
        <DivTitle>
          <Title>Olá, </Title>
          <Name>Fulano!</Name>
        </DivTitle>
        <Name>Icone</Name>
      </Header>
      <DivButtons>
        <Button
          active={stateButton.entradas}
          colorActive="#23E375"
          color={'rgba(35,227,117,0.3)'}
          onPress={() => handleStateButton('entradas')}>
          <TextButton>Entradas</TextButton>
        </Button>
        <Button
          active={stateButton.saidas}
          colorActive="#E3D523"
          color={'rgba(227,213,35,0.3)'}
          onPress={() => handleStateButton('saidas')}>
          <TextButton>Saídas</TextButton>
        </Button>
        <Button
          active={stateButton.dividas}
          colorActive="#E32331"
          color={'rgba(227,35,49,0.3)'}
          onPress={() => handleStateButton('dividas')}>
          <TextButton>Dívidas</TextButton>
        </Button>
      </DivButtons>
      <FlatList
        style={{
          width: '100%',
          maxHeight: Platform.OS === 'ios' ? 300 : 250,
          paddingHorizontal: 24,
        }}
        data={
          stateButton.entradas
            ? dadosEntradas
            : stateButton.saidas
            ? dadosSaidas
            : data.dividas
        }
        renderItem={({item}) => (
          <ItemContainer>
            <TopContainerItem>
              <OrigemItem>{item.origem}</OrigemItem>
              {stateButton.dividas && (
                <TotalItem>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(
                    item.valor * (item.parcelaTotal - (item.parcelaAtual - 1)),
                  )}
                </TotalItem>
              )}
            </TopContainerItem>
            <TopContainerItem>
              <ValorItem>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(item.valor)}
              </ValorItem>
              
              {item.cenario === '1' && <Text>Teste1</Text> }
              {item.cenario === '2' && <Text>Teste2</Text>}
              {item.cenario === '3' && <Text>Teste3</Text>}

              {item.parcelaAtual && (
                <ParcelasItem>
                  {`${item?.parcelaAtual}/${item?.parcelaTotal}`}
                </ParcelasItem>
              )}
              <DataItem>{item.data}</DataItem>
            </TopContainerItem>
          </ItemContainer>
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      <DivTotal>
        <TotalText>Total</TotalText>
        <TotalText>{handleSum()}</TotalText>
      </DivTotal>
      <ViewSaldo>
        <TitleSaldo>Saldo</TitleSaldo>
        <DivSaldoText>
          <SaldoText>Saldo Geral</SaldoText>
          <SaldoText>R$2.300,00</SaldoText>
        </DivSaldoText>
        <DivSaldoText>
          <SaldoText>Saldo Hipotético 1</SaldoText>
          <SaldoText>R$2.300,00</SaldoText>
        </DivSaldoText>
        <DivSaldoText>
          <SaldoText>Saldo Hipotético 2</SaldoText>
          <SaldoText>R$2.300,00</SaldoText>
        </DivSaldoText>
      </ViewSaldo>
      <ButtonHover onPress={() => setShowActions(!showActions)}>
        <ButtonIcon>+</ButtonIcon>
      </ButtonHover>
      {showActions && (
        <DivActions>
          <LinhaAction
            color={'rgba(35,227,117,0.5)'}
            onPress={() => handleShowModal('entradas')}>
            <LinhaActionText>Nova Entrada</LinhaActionText>
          </LinhaAction>
          <LinhaAction
            color={'rgba(227,213,35,0.5)'}
            onPress={() => handleShowModal('saidas')}>
            <LinhaActionText>Nova Saída</LinhaActionText>
          </LinhaAction>
          <LinhaAction
            color={'rgba(227,35,49,0.5)'}
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
                }}
                value={valueInput}
                onChangeValue={setValueInput}
                prefix="R$"
                delimiter="."
                separator=","
                precision={2}
                onChangeText={formattedValue => {
                  console.log(formattedValue); // $2,310.46
                }}
              />
            </View>

            {
              typeModal === 'saidas' && (
                <View>
                  <Text style={{color: '#000'}}>Cenários</Text>
                  <Picker
                    selectedValue={pickerSelect}
                    onValueChange={(item) =>setPickerSelect(item)}
                    style={{
                      borderWidth: 0.5,
                      borderColor: '#84E0FC',
                      height: 40,
                      width: 300,
                      borderRadius: 5,
                      marginBottom: 10,
                      padding: 12,
                    }}
                  >
                    <Picker.Item label="Prioridade baixa" value="1" />
                    <Picker.Item label="Prioridade média" value="2" />
                    <Picker.Item label="Prioridade alta" value="3" />
                  </Picker>
                </View>
              )
            }
            
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
    color: '#000'
  },
  date: {
    fontSize: 20,
    marginLeft: 15,
  },
});
