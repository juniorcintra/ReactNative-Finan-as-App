import React from 'react';

import {
  ViewContainer,
  TitleSaldo,
  DivSaldoText,
  SaldoText,
  DivPadding,
  DivSaldoTextEntradas,
} from './styles';

export function ViewSaldo({
  title,
  saldoGeral,
  hipotetico1,
  hipotetico2,
  saldo = false,
}) {

  function handleFormat(valor){
   return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }
  return (
    <ViewContainer>
      <TitleSaldo>{title}</TitleSaldo>
      {saldo ? (
        <>
          <DivSaldoTextEntradas saldoGeral={saldoGeral}>
            <SaldoText>Saldo Geral</SaldoText>
            <SaldoText>{handleFormat(saldoGeral)}</SaldoText>
          </DivSaldoTextEntradas>
          <DivSaldoTextEntradas saldoGeral={hipotetico1}>
            <SaldoText>Saldo Hipotético 1</SaldoText>
            <SaldoText>{handleFormat(hipotetico1)}</SaldoText>
          </DivSaldoTextEntradas>
          <DivSaldoTextEntradas saldoGeral={hipotetico2}>
            <SaldoText>Saldo Hipotético 2</SaldoText>
            <SaldoText>{handleFormat(hipotetico2)}</SaldoText>
          </DivSaldoTextEntradas>
        </>
      ) : (
        <>
          <DivSaldoText saldo saldoGeral>
            <SaldoText>Saldo Geral</SaldoText>
            <SaldoText>{handleFormat(saldoGeral)}</SaldoText>
          </DivSaldoText>
          <DivSaldoText>
            <SaldoText>Saldo Hipotético 1</SaldoText>
            <SaldoText>{handleFormat(hipotetico1)}</SaldoText>
          </DivSaldoText>
          <DivSaldoText>
            <SaldoText>Saldo Hipotético 2</SaldoText>
            <SaldoText>{handleFormat(hipotetico2)}</SaldoText>
          </DivSaldoText>
          <DivPadding />
        </>
      )}
    </ViewContainer>
  );
}
