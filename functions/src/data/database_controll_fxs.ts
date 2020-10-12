import * as functions from "firebase-functions"

import { songs as SONG_LIST_DATA } from "./songs_list.json"

import {
  conditions_collections,
  conditions_normalized_collections,
  songs_collections,
} from "../app"

const defaultCondition: Condition = {
  angry: 0,
  flutter: 0,
  funny: 0,
  happy: 0,
  sad: 0,
  soso: 0,

  sunshine: 0,
  cloudy: 0,
  rainy: 0,
  hot: 0,
  cold: 0,
  snowy: 0,

  spring: 0,
  summer: 0,
  fall: 0,
  winter: 0,

  morning: 0,
  lunch: 0,
  evening: 0,
  dawn: 0,

  normalHeartRate: 0,
  abnormalHeartRate: 0,
}

export const uploadSongs = functions.https.onRequest(async (req, res) => {
  console.log("upload sample songs")
  const songs_data = SONG_LIST_DATA
  // todo : use for instead of map
  // for can do with sequence but map asyncronizely
  // ex) for : 1 await 1_ 2 await 2_
  // ex) map : 1 2 await await 1_ 2_
  await Promise.all(
    songs_data
      // .filter((song, index) => index < 10)
      .map(async (songItem) => {
        console.log(`create song : ${songItem.songName}`)

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
        console.log(`song created ${songItem.songName}, ${songRef.id}`)

        if (!writeSongResult) {
          return
        }

        const condition = currentDefaultCondition

        // todo : need to implement error handling
        const writeConditionResult = await conditionRef.set(condition)
        console.log(`song condition created ${songItem.songName}, ${conditionRef.id}`)

        if (!writeConditionResult) {
          return
        }

        console.log("song created successfully" + song.songName)
      })
  )
  res.send("req")
})
