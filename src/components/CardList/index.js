import React from "react";
import { TouchableOpacity } from 'react-native';

import Cenario1Svg from '../../assets/svg/cenario-1.svg';
import Cenario2Svg from '../../assets/svg/cenario-2.svg';
import Cenario3Svg from '../../assets/svg/cenario-3.svg';

import { 
  ItemContainer,
  TopContainerItem,
  OrigemItem,
  TotalItem,
  ValorItem,
  ParcelasItem,
  DataItem,
} from './styles';

export function CardList({data, stateButton, onLongPress}) {

  function FormattedCurrency(value){
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <TouchableOpacity activeOpacity={0.6} onLongPress={onLongPress}>
      <ItemContainer>
        <TopContainerItem>
          <OrigemItem>{data?.origem}</OrigemItem>

          {data.parcelaAtual && (
            <ParcelasItem>
              {`${data?.parcelaAtual}/${data?.parcelaTotal}`}
            </ParcelasItem>
          )}

          {stateButton.dividas && (
            <TotalItem>
              {FormattedCurrency(data.valor * (data.parcelaTotal - (data.parcelaAtual - 1)))}
            </TotalItem>
          )}
        </TopContainerItem>

        <TopContainerItem>
          <ValorItem> {FormattedCurrency(data.valor)}</ValorItem>

          {data.cenario === '1' && <Cenario1Svg width={20} height={20}/> }
          {data.cenario === '2' && <Cenario2Svg width={20} height={20}/> }
          {data.cenario === '3' && <Cenario3Svg width={20} height={20}/> }

          <DataItem>{data.data}</DataItem>
        </TopContainerItem>
      </ItemContainer>
    </TouchableOpacity>
  )
}