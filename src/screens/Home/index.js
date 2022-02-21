import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  Pressable,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CurrencyInput from 'react-native-currency-input';
import DatePicker from 'react-native-modern-datepicker';
import { Picker } from '@react-native-community/picker';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';

import UserSvg from '../../assets/svg/user.svg';
import AddSvg from '../../assets/svg/iconAdd.svg';
import ArrowLeft from '../../assets/svg/arrowLeft.svg';
import ArrowRight from '../../assets/svg/arrowRight.svg';

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
  WrapperViewSaldo,
  TotalText,
  ArrowContainer,
  Label,
  ButtonHover,
  ButtonIcon,
  DivActions,
  LinhaAction,
  LinhaActionText,
  ButtonClose,
} from './styles';

export default App = () => {
  const { colors } = useTheme();

  const [stateButton, setStateButton] = useState({
    entradas: true,
    saidas: false,
    dividas: false,
  });
  const [showActions, setShowActions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalUser, setShowModalUser] = useState(false);
  const [typeModal, setTypeModal] = useState('');

  const [origem, setOrigem] = useState('');
  const [date, setDate] = useState(new Date());
  const [valueInput, setValueInput] = useState(null);
  const [parcelaAtual, setParcelaAtual] = useState(0);
  const [parcelaTotal, setParcelaTotal] = useState(0);
  const [pickerSelect, setPickerSelect] = useState('0');
  const [nameUserToSave, setNameUserToSave] = useState("");

  const [dadosEntradas, setDadosEntradas] = useState([]);
  const [dadosSaidas, setDadosSaidas] = useState([]);
  const [dadosDividas, setDadosDividas] = useState([]);
  const [dadosUser, setDadosUser] = useState([]);

  const [cenarioEntradaUm, setCenarioEntradaUm] = useState(0);
  const [cenarioSaidaUm, setCenarioSaidaUm] = useState(0);
  const [cenarioDividaUm, setCenarioDividaUm] = useState(0);

  const [cenarioDividaDois, setCenarioDividaDois] = useState(0);
  const [cenarioSaidaDois, setCenarioSaidaDois] = useState(0);
  const [cenarioEntradaDois, setCenarioEntradaDois] = useState(0);

  async function handleGetData() {
    var dataEntradas = await AsyncStorage.getItem('entradas');
    var entradas = JSON.parse(dataEntradas);

    var dataSaidas = await AsyncStorage.getItem('saidas');
    var saidas = JSON.parse(dataSaidas);

    var dataDividas = await AsyncStorage.getItem('dividas');
    var dividas = JSON.parse(dataDividas);

    var dataUser = await AsyncStorage.getItem('user');
    var user = JSON.parse(dataUser);

    if (!!user) {
      setDadosUser(user);
    } else {
      setShowModalUser(true);
    }

    setDadosEntradas(entradas);
    setDadosSaidas(saidas);
    setDadosDividas(dividas);

  }

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

    if (stateButton.dividas) {
      for (let index = 0; index < dadosDividas?.length; index++) {
        const element = dadosDividas[index];
        sum = sum + parseFloat(element.valor * (element.parcelaTotal - (element.parcelaAtual - 1)));
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
        id: Math.floor(Date.now() * Math.random()).toString(36),
        origem: origem,
        valor: valueInput,
        data: format(new Date(date), 'dd/MM/yyyy'),
        cenario: pickerSelect,
      };

      let dataDividas = {
        id: Math.floor(Date.now() * Math.random()).toString(36),
        origem: origem,
        valor: valueInput,
        data: format(new Date(date), 'dd/MM/yyyy'),
        parcelaAtual: parcelaAtual,
        parcelaTotal: parcelaTotal,
        cenario: pickerSelect,
      };

      if (typeModal === 'entradas') {
        if (!origem) return;
        if (!valueInput) return;

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
        if (!origem) return;
        if (!valueInput) return;
        if (pickerSelect === '0') return;

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

      if (typeModal === 'dividas') {
        if (!origem) return;
        if (!valueInput) return;
        if (!parcelaAtual) return;
        if (!parcelaTotal) return;
        if (pickerSelect === '0') return;

        let dataToSave = (await AsyncStorage.getItem('dividas')) || '[]';
        dataToSave = JSON.parse(dataToSave);
        dataToSave.push(dataDividas);
        AsyncStorage.setItem('dividas', JSON.stringify(dataToSave)).then(() => {
          handleCloseModal();
          setStateButton({
            entradas: false,
            saidas: false,
            dividas: true,
          });
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  saveDataUser = async () => {
    try {
      let dataUserSave = {
        id: Math.floor(Date.now() * Math.random()).toString(36),
        nome: nameUserToSave,
      };


      let dataToSave = (await AsyncStorage.getItem('user')) || '[]';
      dataToSave = JSON.parse(dataToSave);
      dataToSave.push(dataUserSave);
      AsyncStorage.setItem('user', JSON.stringify(dataToSave)).then(
        () => {
          setShowModalUser(false);
          setNameUserToSave("");
        },
      );



    } catch (error) {
      alert(error);
    }
  };

  async function handleRemoveItem(item) {
    //remover o card de entrada
    if (stateButton.entradas) {
      Alert.alert('Aviso', 'Deseja realmente excluir?', [
        {
          text: 'Não',
          styles: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            let dataToSave = (await AsyncStorage.getItem('entradas')) || '[]';
            dataToSave = JSON.parse(dataToSave);

            var newDataToSave = dataToSave.filter(
              element => element.id !== item.id,
            );

            AsyncStorage.setItem(
              'entradas',
              JSON.stringify(newDataToSave),
            ).then(() => {
              handleGetData();
            });
          },
        },
      ]);
    }
    //remover o card de saida
    if (stateButton.saidas) {
      Alert.alert('Aviso', 'Deseja realmente excluir?', [
        {
          text: 'Não',
          styles: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            let dataToSave = (await AsyncStorage.getItem('saidas')) || '[]';
            dataToSave = JSON.parse(dataToSave);

            var newDataToSave = dataToSave.filter(
              element => element.id !== item.id,
            );

            AsyncStorage.setItem(
              'saidas',
              JSON.stringify(newDataToSave),
            ).then(() => {
              handleGetData();
            });
          },
        },
      ]);
    }
    //remover o card de divida
    if (stateButton.dividas) {
      Alert.alert('Aviso', 'Deseja realmente excluir?', [
        {
          text: 'Não',
          styles: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            let dataToSave = (await AsyncStorage.getItem('dividas')) || '[]';
            dataToSave = JSON.parse(dataToSave);

            var newDataToSave = dataToSave.filter(
              element => element.id !== item.id,
            );

            AsyncStorage.setItem(
              'dividas',
              JSON.stringify(newDataToSave),
            ).then(() => {
              handleGetData();
            });
          },
        },
      ]);
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setValueInput(null);
    setOrigem('');
    setPickerSelect('0');
    setParcelaAtual(0)
    setParcelaTotal(0)
  };

  const handleShowModal = type => {
    setTypeModal(type);
    setShowActions(false);
    setShowModal(true);
  };

  useEffect(() => {
    handleGetData();
  }, [showModal]);

  return (
    <MainView>
      <Header>
        <DivTitle>
          <Title>Olá, </Title>
          <Name>{dadosUser[0]?.nome}!</Name>
        </DivTitle>
        <UserSvg width={30} height={30} />
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
              : dadosDividas
        }
        renderItem={({ item }) => (
          <CardList
            data={item}
            stateButton={stateButton}
            onLongPress={() => handleRemoveItem(item)}
          />
        )}
      />

      <DivTotal>
        {!stateButton.saidas ? (
          <>
            <TotalText>Total</TotalText>
            <TotalText>{handleSum()}</TotalText>
          </>
        ) : <TotalText />}
      </DivTotal>

      <WrapperViewSaldo>
        <ViewSaldo
          title="Saldo geral"
          saldoGeral={3500}
          hipotético1={800}
          hipotético2={1200}
        />
        <ViewSaldo
          title="Total de saídas"
          saldoGeral={3500}
          hipotético1={800}
          hipotético2={1200}
        />
        <ViewSaldo
          title="Total de dividas"
          saldoGeral={3500}
          hipotético1={800}
          hipotético2={1200}
        />
      </WrapperViewSaldo>

      <ArrowContainer>
        <ArrowLeft width={20} height={20} />
        <Label>Arraste para o lado</Label>
        <ArrowRight width={20} height={20} />
      </ArrowContainer>

      <ButtonHover
        activeOpacity={0.6}
        onPress={() => setShowActions(!showActions)}>
        <AddSvg width={20} height={20} />
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

            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <Text style={{ color: '#000' }}>Origem</Text>
                <TextInput
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#84E0FC',
                    height: 40,
                    width: 300,
                    borderRadius: 4,
                    marginBottom: 10,
                    padding: 12,
                    color: '#000',
                  }}
                  onChangeText={setOrigem}
                  value={origem}
                />
              </View>

              {typeModal === 'dividas' && (
                <View style={{ flexDirection: 'row', width: 300, justifyContent: 'space-between' }}>
                  <View style={{ width: '45%' }}>
                    <Text style={{ color: '#000' }}>Parcela Atual</Text>
                    <TextInput
                      style={{
                        borderWidth: 0.5,
                        borderColor: '#84E0FC',
                        height: 40,
                        borderRadius: 4,
                        marginBottom: 10,
                        padding: 12,
                        color: '#000',
                      }}
                      onChangeText={setParcelaAtual}
                      value={parcelaAtual}
                    />
                  </View >
                  <View style={{ width: '45%' }}>
                    <Text style={{ color: '#000' }}>Total de Parcela</Text>
                    <TextInput
                      style={{
                        borderWidth: 0.5,
                        borderColor: '#84E0FC',
                        height: 40,
                        borderRadius: 4,
                        marginBottom: 10,
                        padding: 12,
                        color: '#000',
                      }}
                      onChangeText={setParcelaTotal}
                      value={parcelaTotal}
                    />
                  </View>
                </View>
              )}

              <View>
                <Text style={{ color: '#000' }}>Valor</Text>
                <CurrencyInput
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#84E0FC',
                    height: 40,
                    width: 300,
                    borderRadius: 4,
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

              {typeModal !== 'entradas' && (
                <View>
                  <Text style={{ color: '#000' }}>Cenários</Text>
                  <Picker
                    selectedValue={pickerSelect}
                    onValueChange={item => setPickerSelect(item)}
                    style={{
                      borderWidth: 0.5,
                      borderColor: '#84E0FC',
                      height: 40,
                      width: 300,
                      borderRadius: 4,
                      marginBottom: 10,
                      padding: 12,
                      color: '#000',
                    }}>
                    <Picker.Item label="Selecionar..." value="0" />
                    <Picker.Item label="Prioridade baixa" value="1" />
                    <Picker.Item label="Prioridade média" value="2" />
                    <Picker.Item label="Prioridade alta" value="3" />
                  </Picker>
                </View>
              )}

              <DatePicker
                mode="calendar"
                minuteInterval={30}
                style={{ borderRadius: 10, width: 320 }}
                onSelectedChange={date => setDate(date)}
                current={format(new Date(), 'yyyy-MM-dd')}
              />
            </ScrollView>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => saveData()}>
              <Text style={styles.textStyle}>Cadastrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalUser}
        onRequestClose={() => {
          setShowModalUser(!showModalUser);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ButtonClose onPress={() => handleCloseModal()}>
              <ButtonIcon size="24px">X</ButtonIcon>
            </ButtonClose>

            <Text style={styles.modalText}>
              Cadastre seu nome
            </Text>

            <View>
              <Text style={{ color: '#000' }}>Nome</Text>
              <TextInput
                style={{
                  borderWidth: 0.5,
                  borderColor: '#84E0FC',
                  height: 40,
                  width: 300,
                  borderRadius: 4,
                  marginBottom: 10,
                  padding: 12,
                  color: '#000',
                }}
                onChangeText={setNameUserToSave}
                value={nameUserToSave}
              />
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => saveDataUser()}>
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
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    margin: 25,
    paddingLeft: 32,
    backgroundColor: 'white',
    borderRadius: 20,
    maxHeight: 650,
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
    width: 300,
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
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
