import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.maslatino.app',
  appName: 'MásLatino',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '267944476848-3j6fef7ptprjr0e0g29pfng0elrbvikm.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;


/*import type { CapacitorConfig } from '@capacitor/cli';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

const config: CapacitorConfig = {
  appId: 'com.maslatino.app',
  appName: 'MásLatino',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '267944476848-3j6fef7ptprjr0e0g29pfng0elrbvikm.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
*/