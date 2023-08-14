import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AlarmScreen from './src/screens/AlarmScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <AlarmScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
