import styled from 'styled-components/native';
import {Platform} from 'react-native';

import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const MainView = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  height: ${Platform.OS === 'ios' ? getStatusBarHeight() + 100 : 130}px;
  width: 100%;
  background-color: ${({theme}) => theme.colors.primary};
  padding: 0 24px 30px;
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
  color: ${({theme}) => theme.colors.text};
`;

export const Name = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text};
`;

export const DivButtons = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 32px 24px;
  background-color: ${({theme}) => theme.colors.background};
`;

export const List = styled.FlatList.attrs({
  width: '100%',
  maxHeight: Platform.OS === 'ios' ? 300 : 250,
  paddingHorizontal: 24,
  showsVerticalScrollIndicator: false
})``;

export const DivTotal = styled.View`
  width: 100%;
  padding: 15px 24px;
  flex-direction: row;
  justify-content: space-between;
`;

export const TotalText = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 18px;
  font-weight: bold;
`;

export const ButtonHover = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${({theme}) => theme.colors.secondary_light};
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ButtonIcon = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-size: ${props => props.size};
`;

export const DivActions = styled.View`
  position: absolute;
  bottom: 70px;
  right: 70px;
  background-color: ${({theme}) => theme.colors.background};
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
  color: ${({theme}) => theme.colors.text};
  font-size: 16px;
`;

export const ButtonClose = styled.TouchableOpacity`
  position: absolute;
  right: ${props => (props.mode === "item" ? '-5px' : '-10px')};
  top: ${props => (props.mode === "item" ? '-5px' : '-10px')};
  width: ${props => (props.size ? props.size : '30px')};
  height: ${props => (props.size ? props.size : '30px')};
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.close};
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
