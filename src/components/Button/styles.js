import styled from "styled-components/native";
import { Platform } from "react-native";

export const ContainerButton = styled.TouchableOpacity.attrs({
  shadowOffset: Platform.OS === 'android' ? { width: 5, height: 5 } : { width: 0, height: 4 },
  shadowOpacity: Platform.OS === 'android' ? 0.5 : 0.2,
  shadowRadius: Platform.OS === 'android' ? 15 : 3,
  elevation: Platform.OS === 'android' ? 3 : 0,
  shadowColor: '#000'
})`
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
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text};
`;