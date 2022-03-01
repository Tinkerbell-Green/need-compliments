import {getAnalytics} from "firebase/analytics";
import {Database} from "./database"
import {initializeFirebaseApp} from "./firebase";

export const firebaseApp = initializeFirebaseApp()
export const database = new Database(firebaseApp)
console.log("database: ", database); // TODO: remove

export const analytics = getAnalytics(firebaseApp);

export * from "./firebase"
export * from "./database"
export * from "firebase/analytics";
