import styled from "styled-components/native";
import { Platform } from "react-native";

export const ItemContainer = styled.View.attrs({
  shadowOffset: Platform.OS === 'android' ? { width: 5, height: 5 } : { width: 0, height: 4 },
  shadowOpacity: Platform.OS === 'android' ? 0.5 : 0.2,
  shadowRadius: Platform.OS === 'android' ? 15 : 3,
  elevation: Platform.OS === 'android' ? 3 : 0,
  shadowColor: '#000'
})`
  width: 98%;
  height: 82px;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.background};
  margin: 0 auto;
  margin-bottom: 12px;
  padding: 11px 12px;
  border-radius: 4px;
`;

export const TopContainerItem = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const OrigemItem = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: 16px;
  text-transform: capitalize;
  width: ${({ tipo }) => !tipo  ? 100 : 32}%;
`;

export const TotalItem = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 14px;
  width: ${({ tipo }) => !tipo  ? 100 : 30}%;
  text-align: right;
`;

export const ValorItem = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 14px;
  width: 25%;
`;

export const ParcelasItem = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 14px;
  text-align: center;
  width: ${({ tipo }) => !tipo  ? 100 : 20}%;
`;

export const DataItem = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 14px;
`;