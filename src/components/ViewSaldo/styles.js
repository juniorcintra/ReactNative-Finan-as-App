import styled from "styled-components/native";

export const ViewContainer = styled.View`
  width: 335px;
  height: 150px;
  border-radius: 6px;
  background-color: ${({theme}) => theme.colors.primary};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
`;

export const TitleSaldo = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 18px;
  font-weight: bold;
`;

export const DivSaldoText = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SaldoText = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 14px;
`;
