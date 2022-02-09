import styled from "styled-components/native";
import { Platform } from "react-native";

export const ViewContainer = styled.View.attrs({
  shadowOffset: Platform.OS === 'android' ? { width: 15, height: 10 } : { width: 0, height: 4 },
  shadowOpacity: Platform.OS === 'android' ? 0.5 : 0.2,
  shadowRadius: Platform.OS === 'android' ? 15 : 3,
  elevation: Platform.OS === 'android' ? 3 : 0,
  shadowColor: '#000'
})`
  width: 300px;
  height: 160px;
  border-radius: 6px;
  margin: 0 30px;

  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-color: ${({theme}) => theme.colors.background};
`;

export const TitleSaldo = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: 18px;
  padding: 15px 0 10px 0;
`;

export const DivSaldoText = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 12px;
`;

export const SaldoText = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 14px;
`;

export const DivPadding = styled.View`
  padding-top: 17px;
`;
