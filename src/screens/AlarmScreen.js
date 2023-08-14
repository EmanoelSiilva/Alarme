import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { scheduleNotificationAsync, getPermissionsAsync, requestPermissionsAsync } from 'expo-notifications';

function AlarmScreen() {
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [alarms, setAlarms] = useState([
    { id: '1', time: '00:00', enabled: false },
    { id: '2', time: '00:00', enabled: false },
    { id: '3', time: '00:00', enabled: false },
  ]);
  const [selectedAlarmId, setSelectedAlarmId] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await requestPermissionsAsync();
        if (newStatus !== granted) {
          console.log('Permission not granted for notifications');
        }
      }
    })();
  }, []);

  

  const handleTimeChange = (event, selected) => {
    setShowTimePicker(false);
    if (selected) {
      const hours = selected.getHours().toString().padStart(2, '0');
      const minutes = selected.getMinutes().toString().padStart(2, '0');
      setSelectedTime(`${hours}:${minutes}`);
    
      if (selectedAlarmId) {
        const now = new Date();
        const selectedDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          selected.getHours(),
          selected.getMinutes(),
          0
        );
  
        // Calcula a diferença de tempo em milissegundos
        const timeDifference = selectedDate - now;
  
        if (timeDifference > 0) {
          // Agenda a notificação
          scheduleNotificationAsync({
            content: {
              title: 'Alarme!',
              body: 'Hora de acordar!',
              sound: 'default',
              priority: 'high',
              channelId: 'alarm-channel',
            },
            trigger: {
              seconds: timeDifference / 1000, // Converte para segundos
            },
          });
  
          setAlarms((prevAlarms) =>
            prevAlarms.map((alarm) =>
              alarm.id === selectedAlarmId
                ? { ...alarm, time: `${hours}:${minutes}`, enabled: true }
                : alarm
            )
          );
          setSelectedAlarmId(null);
        }
      }
    }
  };

  const handleToggleAlarm = (id) => {
    setAlarms((prevAlarms) =>
      prevAlarms.map((alarm) =>
        alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
      )
    );
  };

  const handleSetAlarmTime = (id) => {
    setShowTimePicker(true);
    setSelectedAlarmId(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Configurar Alarmes</Text>
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime ? new Date(`2000-01-01T${selectedTime}:00`) : new Date()}
            mode="time"
            display="clock"
            onChange={handleTimeChange}
          />
        )}
        <FlatList
          data={alarms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.alarmItem}>
              <TouchableOpacity
                style={styles.alarmButton}
                onPress={() => handleSetAlarmTime(item.id)}
              >
                <Text style={styles.alarmTimeText}>{item.time}</Text>
              </TouchableOpacity>
              <Switch
                value={item.enabled}
                onValueChange={() => handleToggleAlarm(item.id)}
              />
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
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
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    marginVertical: 50
  },
  alarmItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  alarmButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  alarmTimeText: {
    fontSize: 18,
    color: 'white',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    shadowColor:'#000',
    elevation: 4,
    shadowOpacity:0.2,
    shadowRadius: 4,
  },
});

export default AlarmScreen;
