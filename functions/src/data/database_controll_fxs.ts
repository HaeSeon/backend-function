import * as functions from "firebase-functions"

import { songs as SONG_LIST_DATA } from "./songs_list.json"

import {
  conditions_collections,
  conditions_normalized_collections,
  songs_collections,
} from "../app"

const defaultCondition: Condition = {
  angry: 50,
  flutter: 50,
  funny: 50,
  happy: 50,
  sad: 50,
  soso: 50,

  sunshine: 50,
  cloudy: 50,
  rainy: 50,
  hot: 50,
  cold: 50,
  snowy: 50,

  spring: 50,
  summer: 50,
  fall: 50,
  winter: 50,

  morning: 50,
  lunch: 50,
  evening: 50,
  dawn: 50,
}

export const uploadSongs = functions.https.onRequest((req, res) => {
  console.log("test fx")
  const songs_data = SONG_LIST_DATA
  songs_data
    // .filter((song, index) => index < 5)
    .map(async (songItem) => {
      const currentDefaultCondition = Object.assign({}, defaultCondition)

      const songRef = songs_collections.doc()
      const conditionRef = conditions_collections.doc()
      const normalConditionRef = conditions_normalized_collections.doc()

      currentDefaultCondition.songReference = songRef
      currentDefaultCondition.originReference = conditionRef
      currentDefaultCondition.nomalizedReference = normalConditionRef

      const song: Song = songItem
      song.conditionReference = conditionRef
      song.normalizedConditionReference = normalConditionRef

      // todo : need to implement error handling
      const writeSongResult = await songRef.set(song)

      if (!writeSongResult) {
        return
      }

      const condition = currentDefaultCondition

      // todo : need to implement error handling
      const writeConditionResult = await conditionRef.set(condition)

      if (!writeConditionResult) {
        return
      }

      console.log("song created" + song.songName)
    })

  res.send("req")
})
