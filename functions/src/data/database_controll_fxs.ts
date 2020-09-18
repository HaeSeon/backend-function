import * as functions from "firebase-functions"

import { songs as SONG_LIST_DATA } from "./songs_list.json"

import {
  conditions_collections,
  conditions_normalized_collections,
  songs_collections,
} from "../App"
import { Condition, Song } from "../interface"

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

      //   normalization
      const normalCondition = normalizeCondition(currentDefaultCondition)

      // todo : need to implement error handling
      const writeNormalConditionResult = await normalConditionRef.set(normalCondition)

      if (!writeNormalConditionResult) {
        return
      }

      console.log("song created" + song.songName)
    })

  res.send("req")
})

// get origin type condition, return normalized condition
const normalizeCondition = (condition: Condition): Condition => {
  let totalCount = 0

  Object.values(condition).map((value) => {
    if (typeof value == "number") {
      totalCount += value
    }
  })

  //   const newCondtion = new Map<string, any>()
  const newCondition: { [key: string]: any } = {}
  Object.entries(condition).map((entry) => {
    if (typeof entry[1] == "number") {
      newCondition[entry[0]] = entry[1] / totalCount
      //   newCondtion.set(entry[0], entry[1] / totalCount)
    } else {
      newCondition[entry[0]] = entry[1]
      //   newCondtion.set(entry[0], entry[1])
    }
  })

  return newCondition as Condition
}
