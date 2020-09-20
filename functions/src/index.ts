import * as FirebaseFunctions from "firebase-functions"

import * as SONGS from "./songs"
import * as CONDITIONS from "./conditions"

import * as DBCONTROLL from "./data/database_controll_fxs"

export const uploadSampleSongs = DBCONTROLL.uploadSongs

const functions = FirebaseFunctions.region("asia-northeast3")

export const requestSongListWithCondition = functions.https.onCall(async (data, context) => {
  const request = (data as unknown) as ConditionRequest

  return SONGS.getSongsFromConditionQuery(request).catch((error) => {
    console.log(error)
    throw new Error(error)
  })
  // const request: ConditionRequest = {emotion, season, time, weather}
})

export const autoNormalizing = functions.firestore
  .document("conditions/{docId}")
  .onWrite(async (change, context) => {
    console.log("condition document has changed : " + context.params.docId)
    const condition = (await change.after.data()) as Condition

    if (!condition || !condition.nomalizedReference) {
      throw new Error("condition not exist")
    }

    const normalizedCondition = CONDITIONS.normalizeCondition(Object.assign({}, condition))

    return condition.nomalizedReference
      .set(normalizedCondition)
      .then(() => {
        console.log(`normalized condition updated id : ${condition.nomalizedReference?.id} `)
      })
      .catch((error) => {
        console.log("cannot update normal condition : ")
        console.log(normalizedCondition)
        throw new Error(
          `cannot update normalized condition. id : ${condition.nomalizedReference?.id}` + error
        )
      })
  })

export const increaseCondition = functions.https.onCall(
  async (data, context): Promise<ActionResult> => {
    const request = data as ConditionFeedbackRequest

    return CONDITIONS.increaseCondtion(request).catch((error) => {
      throw new Error(error)
    })
  }
)

export const decreaseCondition = functions.https.onCall(
  async (data, context): Promise<ActionResult> => {
    const request = data as ConditionFeedbackRequest

    return CONDITIONS.decreaseCondtion(request).catch((error) => {
      throw new Error(error)
    })
  }
)

// export const addSampleSong = functions
//   .region("asia-northeast3")
//   .https.onRequest(async (req, res) => {
//     //initialize sample condition
//     const condition: Condition = {
//       angry: 0,
//       flutter: 0,
//       funny: 0,
//     }

//     const conditionReference = await db
//       .collection("conditions")
//       .add(condition)
//       .catch((error) => {
//         res.send(error)
//         return
//       })

//     if (!conditionReference) {
//       return
//     }

//     const song: Song = {
//       singer: "alicia_lee",
//       songLink: "testlink1234",
//       songName: "마음을_드려요",
//       conditionReference: conditionReference,
//     }

//     const songReference = await db
//       .collection("songs")
//       .add(song)
//       .catch((error) => {
//         res.send(error)
//         return
//       })

//     if (songReference) {
//       res.send(songReference)
//     }
//   })

// export const songs = functions.region("asia-northeast3").https.onRequest(async (req, res) => {
//   const querySnapshot = await db.collection("songs").get()
//   const datas: Song[] = querySnapshot.docs.map((doc) => {
//     const song = (doc.data() as unknown) as Song
//     song.docId = doc.id
//     return song
//   })
//   res.send(datas)
// })

// export const sortHeartRate = functions.region("asia-northeast3").https.onCall((data, context) => {
//   const heartRate: number = 80
//   let heartRateState
//   if (heartRate < 80) {
//     heartRateState = "normal"
//     console.log("심박수 정상")
//   } else {
//     heartRateState = "abnormal"
//     console.log("심박수 비정상")
//   }
//   return heartRateState
// })

// export const increaseCondition = functions
//   .region("asia-northeast3")
//   .https.onRequest(async (req, res) => {
//     if (!req.query.songId) {
//       res.send("please set songId as Query")
//       return
//     }
//     const songId = req.query.songId as string

//     if (!req.query.conditionType) {
//       res.send("please set conditionType as Query")
//       return
//     }
//     const conditionType = req.query.conditionType as string

//     const songDoc = await db.collection("songs").doc(songId).get()
//     const song = (songDoc.data() as unknown) as Song

//     const result = await song.conditionReference.get().then(async (snapshot) => {
//       let conditions = (snapshot.data() as unknown) as Condition
//       console.log("--origin condition---")
//       console.log(conditions)

//       const conditionsMap = new Map<string, number>()
//       Object.entries(conditions).map((entry) => {
//         conditionsMap.set(entry[0], entry[1])
//       })

//       const conditionValue = conditionsMap.get(conditionType)

//       if (!conditionValue) {
//         res.send("invalid condition type")
//         return
//       }

//       conditionsMap.set(conditionType, conditionValue + 1)

//       console.log("---condition after increasing---")
//       console.log(conditions)

//       const writeResult = await snapshot.ref.set(conditions)
//       console.log("condition updated at " + writeResult.writeTime.toDate().toDateString())
//       return writeResult
//     })

//     if (result) {
//       res.send(`${songId}'s condition updated at ${result.writeTime.toDate().toDateString()}`)
//     }
//   })

// export const addMessage = functions.https.onRequest(async (req, res) => {
//   const flutterCount = req.query.flutter

//   if (flutterCount == undefined) {
//     res.send("query is not defined")
//     return
//   }

//   const writeResult = await db.collection("song").add({ flutter: flutterCount })
//   res.json({ result: `hello ${writeResult.id}` })
// })

// export const sayPretty = functions.https.onRequest(async (req, res) => {
//   console.log(req.path)
//   console.log("테스트")
//   res.send("예뿐해서니")
// })

// interface Message {
//   original: string
// }

// export const messages = functions.https.onRequest(async (req, res) => {
//   console.log("i")
//   const querySnapShot = await db.collection("message").get()
//   const messageArray: Message[] = []
//   querySnapShot.docs.map((doc) => {
//     const data = doc.data() as Message
//     messageArray.push(data)
//   })
//   res.send(messageArray)
// })

// // test code
// const getEmotions = (emoitions : string[])=>{
//     db.collection("emotions").orderBy("happy").limit(13).get()

// }
