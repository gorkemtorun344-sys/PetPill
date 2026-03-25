import { Audio } from 'expo-av';
import { Platform } from 'react-native';

let soundEnabled = true;
const loadedSounds = {};

export const setSoundEnabled = (enabled) => {
  soundEnabled = enabled;
};

export const isSoundEnabled = () => soundEnabled;

// Generate cute tones programmatically using short beeps
// We use expo-av's Audio.Sound with generated frequency tones

const playTone = async (frequency, duration) => {
  if (!soundEnabled) return;
  try {
    // Use a simple haptic-like approach with system sounds
    // Since we can't generate tones without native modules,
    // we use notification-style feedback
    const { sound } = await Audio.Sound.createAsync(
      { uri: 'data:audio/wav;base64,' + generateWavBase64(frequency, duration) },
      { shouldPlay: true, volume: 0.3 }
    );
    // Auto unload after playing
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync().catch(() => {});
      }
    });
  } catch (e) {
    // Silently fail - sounds are optional cute additions
  }
};

// Generate a small WAV file as base64
const generateWavBase64 = (frequency, durationMs) => {
  const sampleRate = 8000;
  const numSamples = Math.floor(sampleRate * durationMs / 1000);
  const dataSize = numSamples;
  const fileSize = 44 + dataSize;

  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  // WAV header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, fileSize - 8, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // chunk size
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate, true); // byte rate
  view.setUint16(32, 1, true); // block align
  view.setUint16(34, 8, true); // bits per sample
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // Generate sine wave with envelope
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const envelope = Math.min(1, Math.min(i / 200, (numSamples - i) / 200));
    const sample = Math.sin(2 * Math.PI * frequency * t) * envelope;
    view.setUint8(44 + i, Math.floor((sample + 1) * 127.5));
  }

  // Convert to base64
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const writeString = (view, offset, string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

// Cute sound effects
export const playSuccess = () => playTone(880, 150); // High A - cheerful "ding!"
export const playTap = () => playTone(660, 80);      // E note - soft tap
export const playPop = () => playTone(1200, 60);     // High pop
export const playComplete = async () => {             // Two-note celebration
  if (!soundEnabled) return;
  await playTone(660, 100);
  setTimeout(() => playTone(880, 150), 120);
};
export const playMedGiven = async () => {             // Three ascending notes
  if (!soundEnabled) return;
  await playTone(523, 80);  // C
  setTimeout(() => playTone(659, 80), 100);  // E
  setTimeout(() => playTone(784, 120), 200); // G
};
export const playAlert = () => playTone(440, 200);    // A note - gentle alert
export const playPremium = async () => {              // Sparkle sound
  if (!soundEnabled) return;
  await playTone(784, 80);   // G
  setTimeout(() => playTone(988, 80), 100);  // B
  setTimeout(() => playTone(1319, 150), 200); // E high
};
export const playNavigation = () => playTone(550, 50); // Quick nav click

// Initialize audio mode for background compatibility
export const initAudio = async () => {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: false,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });
  } catch (e) {
    // Audio init is non-critical
  }
};
