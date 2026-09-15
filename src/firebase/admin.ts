
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { firebaseConfig } from './config';

function createAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // This will use the GOOGLE_APPLICATION_CREDENTIALS environment variable
  // for authentication, which is automatically set in the App Hosting environment.
  return initializeApp({
    projectId: firebaseConfig.projectId,
    databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
  });
}

export const adminApp = createAdminApp();
