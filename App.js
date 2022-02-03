import React, {useState} from 'react';
import {FlatList} from 'react-native';

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
} from './styles';

import data from './data.json';

export default App = () => {
  const [stateButton, setStateButton] = useState({
    entradas: true,
    saidas: false,
    dividas: false,
  });

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
      for (let index = 0; index < data.entradas.length; index++) {
        const element = data.entradas[index];
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

  return (
    <MainView>
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
          maxHeight: 300,
          paddingHorizontal: 24,
        }}
        data={
          stateButton.entradas
            ? data.entradas
            : stateButton.saidas
            ? data.saidas
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
    </MainView>
  );
};
