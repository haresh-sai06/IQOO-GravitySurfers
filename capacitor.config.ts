import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.iqoo.gravitysurfers',
  appName: 'LiveVolume',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
