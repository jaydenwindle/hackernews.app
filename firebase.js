import * as firebase from "firebase";

const HN_DATABASE_URL = "https://hacker-news.firebaseio.com";
const HN_VERSION = "v0";

const app = firebase.initializeApp({
  databaseURL: HN_DATABASE_URL
});
export const db = firebase.database();

export const ref = refValue => db.ref(`${HN_VERSION}/${refValue}`);
