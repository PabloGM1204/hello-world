import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'hello-world',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
