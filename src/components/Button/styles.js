import styled from "styled-components";

export const ContainerButton = styled.TouchableOpacity`
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
  color: ${({theme}) => theme.colors.text};
`;