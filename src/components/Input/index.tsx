import React from 'react';
import {TextInputProps} from 'react-native';

import {Container, TextInput, Icon} from './styles';

interface inputProps extends TextInputProps {
  name: string;
  icon: string;
}
const Input: React.FC<inputProps> = ({name, icon, ...rest}) => {
  return (
    <Container>
      <Icon name={icon} size={20} color="#6663" />
      <TextInput placeholderTextColor="#666360" {...rest}></TextInput>
    </Container>
  );
};

export default Input;
