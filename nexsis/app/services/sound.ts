import { Audio } from 'expo-av';

let soundObject: Audio.Sound | null = null;

export const playAlarmSound = async (): Promise<void> => {
  try {
    // If sound is already playing, stop it first
    if (soundObject) {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
      soundObject = null;
    }

    // Configure audio mode for alarm/alerts
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false,
    });

    soundObject = new Audio.Sound();

    // A clean, high-contrast, technical alarm tone from Google Actions public sound archive
    const alarmUri = 'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg';

    await soundObject.loadAsync(
      { uri: alarmUri },
      { shouldPlay: true, isLooping: true, volume: 1.0 }
    );
  } catch (error) {
    console.warn('Failed to play alarm sound:', error);
  }
};

export const stopAlarmSound = async (): Promise<void> => {
  try {
    if (soundObject) {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
      soundObject = null;
    }
  } catch (error) {
    console.warn('Failed to stop alarm sound:', error);
  }
};
