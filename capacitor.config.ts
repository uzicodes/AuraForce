import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.utsho.auraforce',
  appName: 'AuraForce',
  webDir: 'public',
  server: {
    url: 'https://auraforce.vercel.app',
    cleartext: true
  }
};

export default config;