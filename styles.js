import styled from 'styled-components/native';
import {Platform} from 'react-native';

import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const MainView = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

export const Header = styled.View`
  height: ${Platform.OS === 'ios' ? getStatusBarHeight() + 90 : 100}px;
  width: 100%;
  background-color: #23c1e3;
  padding: 24px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
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
  background-color: #fff;
`;

export const Button = styled.TouchableOpacity`
  width: 105px;
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
  color: #000;
  font-size: 16px;
  font-weight: bold;
`;

export const TotalItem = styled.Text`
  color: #000;
  font-size: 14px;
`;

export const ValorItem = styled.Text`
  color: #000;
  font-size: 14px;
`;

export const ParcelasItem = styled.Text`
  color: #000;
  font-size: 14px;
`;

export const DataItem = styled.Text`
  color: #000;
  font-size: 14px;
`;

export const DivTotal = styled.View`
  width: 100%;
  padding: 15px 24px;
  flex-direction: row;
  justify-content: space-between;
`;

export const TotalText = styled.Text`
  color: #000;
  font-size: 18px;
  font-weight: bold;
`;

export const ViewSaldo = styled.View`
  width: 325px;
  height: 150px;
  border-radius: 6px;
  background-color: #23c1e3;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
`;

export const TitleSaldo = styled.Text`
  color: #000;
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
  color: #000;
  font-size: 14px;
`;

export const ButtonHover = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: rgba(2, 72, 174, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ButtonIcon = styled.Text`
  color: #fff;
  font-size: ${props => props.size};
`;

export const DivActions = styled.View`
  position: absolute;
  bottom: 70px;
  right: 70px;
  background-color: #fff;
  border-radius: 10px;
  padding: 5px;
  width: 150px;
  height: 120px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const LinhaAction = styled.TouchableOpacity`
  background-color: ${props => props.color};
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
`;

export const LinhaActionText = styled.Text`
  color: #000;
  font-size: 16px;
`;

export const ButtonClose = styled.TouchableOpacity`
  position: absolute;
  right: ${props => (props.mode === "item" ? '-5px' : '-10px')};
  top: ${props => (props.mode === "item" ? '-5px' : '-10px')};
  width: ${props => (props.size ? props.size : '30px')};
  height: ${props => (props.size ? props.size : '30px')};
  border-radius: 25px;
  background-color: rgba(227, 35, 49, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
