import styled from "styled-components/native";

export const ItemContainer = styled.View.attrs({
  shadowOffset: { width: 5, height: 5 },
  shadowOpacity: 0.5,
  shadowRadius: 20,
  elevation: 3,
})`
  width: 98%;
  height: 81px;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.background};
  margin: 0 auto;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 4px;
`;

export const TopContainerItem = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const OrigemItem = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 16px;
  font-weight: bold;
`;

export const TotalItem = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 14px;
`;

export const ValorItem = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 14px;
`;

export const ParcelasItem = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 14px;
`;

export const DataItem = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 14px;
`;