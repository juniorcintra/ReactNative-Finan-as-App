import React from "react";

import { ContainerButton, TextButton } from './styles';

export function Button({ 
  active, 
  colorActive,
  colorInactive,
  title, 
  onPress
}) {
  return (
    <ContainerButton
      active={active}
      colorActive={colorActive}
      color={colorInactive}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <TextButton>{title}</TextButton>
    </ContainerButton>
  )
}