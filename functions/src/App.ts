import * as admin from "firebase-admin"

export const app = admin.initializeApp()

const db = app.firestore()

export const conditions_normalized_collections = db.collection("normalized_conditions")
export const conditions_collections = db.collection("conditions")
export const songs_collections = db.collection("songs")
