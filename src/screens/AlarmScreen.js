import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';

function AlarmScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurar Alarme</Text>
      <View style={styles.content}>
        <Button
          icon={() => <Ionicons name="time" size={24} color="white" />}
          mode="contained"
          style={styles.button}
        >
          Selecionar Hora
        </Button>
        <Button
          icon={() => <Ionicons name="save" size={24} color="white" />}
          mode="contained"
          style={styles.saveButton}
        >
          Salvar Alarme
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: '100%'
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
    width: 200,
  },
  saveButton: {
    backgroundColor: 'green',
    marginTop: 20,
    width: 200,
  },
});

export default AlarmScreen;
