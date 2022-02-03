import styled from 'styled-components/native';

import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const MainView = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.View`
  height: ${getStatusBarHeight() + 155}px;
  width: 100%;
  background-color: #23c1e3;
  padding: 24px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DivTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #000;
`;

export const Name = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;

export const DivButtons = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 32px 24px;
`;

export const Button = styled.TouchableOpacity`
  width: 96px;
  height: 55px;
  background-color: ${props =>
    props.active ? props.colorActive : props.color};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
`;

export const TextButton = styled.Text`
  font-size: 16px;
  color: #000;
`;

export const ItemContainer = styled.View`
  width: 100%;
  height: 81px;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  margin-bottom: 12px;
  padding: 12px;
`;

export const TopContainerItem = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const OrigemItem = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const TotalItem = styled.Text`
  font-size: 14px;
`;

export const ValorItem = styled.Text`
  font-size: 14px;
`;

export const ParcelasItem = styled.Text`
  font-size: 14px;
`;

export const DataItem = styled.Text`
  font-size: 14px;
`;

export const DivTotal = styled.View`
  width: 100%;
  padding: 3px 24px;
  flex-direction: row;
  justify-content: space-between;
`;

export const TotalText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
