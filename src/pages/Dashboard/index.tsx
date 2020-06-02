import React from 'react';
import {View, Button} from 'react-native';
import {userAuth} from '../../hooks/auth';
const Dashboard: React.FC = () => {
  const {singOut} = userAuth();
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Button title="Sair" onPress={singOut} />
    </View>
  );
};

export default Dashboard;
