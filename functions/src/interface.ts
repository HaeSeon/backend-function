import firebase = require("firebase")

export interface DatabaseItem {
  docId?: string
}

export interface Song extends DatabaseItem {
  songName: string
  singer: string
  songLink: string
  conditionReference: FirebaseFirestore.DocumentReference
}

export interface Condition extends DatabaseItem {
  angry: number
  flutter: number
  funny: number
  // happy: number
  // sad: number
  // soso: number

  // sunshine: number
  // cloudy: number
  // rainy: number
  // hot: number
  // cold: number
  // snowy: number

  // spring: number
  // summer: number
  // fall: number
  // winter: number

  // morning: number
  // lunch: number
  // evening: number
  // dawn: number
}
