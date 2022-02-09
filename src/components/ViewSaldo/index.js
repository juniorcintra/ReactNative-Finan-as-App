import React from "react";

import { 
  ViewContainer,
  TitleSaldo,
  DivSaldoText,
  SaldoText,
  DivPadding
} from './styles';

export function ViewSaldo({
  title,
  saldoGeral, 
  hipotético1, 
  hipotético2
}) {
  return (
    <ViewContainer>
      <TitleSaldo>{title}</TitleSaldo>
      <DivSaldoText>
        <SaldoText>Saldo Geral</SaldoText>
        <SaldoText>{`R$ ${saldoGeral.toFixed(2)}`}</SaldoText>
      </DivSaldoText>
      <DivSaldoText>
        <SaldoText>Saldo Hipotético 1</SaldoText>
        <SaldoText>{`R$ ${hipotético1.toFixed(2)}`}</SaldoText>
      </DivSaldoText>
      <DivSaldoText>
        <SaldoText>Saldo Hipotético 2</SaldoText>
        <SaldoText>{`R$ ${hipotético2.toFixed(2)}`}</SaldoText>
      </DivSaldoText>
      <DivPadding/>
    </ViewContainer>
  )
}