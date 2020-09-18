import * as functions from "firebase-functions"
// import { Condition, Song } from "./interface"

export const increaseCondition = functions.https.onCall((data, context) => {
  console.log(data.message)
  return {
    message: "안녕? 해당 곡의 condition을 +1해줄게~~",
  }
})

export const decreaseCondition = functions.https.onCall((data, context) => {
  console.log(data.message)
  return {
    message: "안녕? 해당 곡의 condition을 -1해줄게~~",
  }
})

export const classifySong = functions.https.onCall((data, context) => {
  console.log(data.message)
  return {
    message: "노래를 추천해줄거야아!!",
  }
})
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

// export const classifySong = functions
//   .region("asia-northeast3")
//   .https.onCall(async (data, context) => {
//     //user input
//     // const emotion = "angry"
//     // const weather = "snow"
//     // const time = "morning"
//     // const season = "fall"
//     // const heartRate = "abnormal"
//   })

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

// export const getSeason = functions.region("asia-northeast3").https.onCall((data, context) => {
//   let today = new Date()
//   let nowMonth = today.getMonth() + 1

//   let season
//   if (nowMonth == 12 || nowMonth == 1 || nowMonth == 2) {
//     season = "winter"
//   } else if (nowMonth == 3 || nowMonth == 4 || nowMonth == 5) {
//     season = "spring"
//   } else if (nowMonth == 6 || nowMonth == 7 || nowMonth == 8) {
//     season = "summer"
//   } else {
//     season = "fall"
//   }
//   return season
// })

// export const getTime = functions.region("asia-northeast3").https.onCall((data, context) => {
//   let today = new Date()
//   let nowTime = today.getHours()
//   let time
//   if (
//     nowTime == 5 ||
//     nowTime == 6 ||
//     nowTime == 7 ||
//     nowTime == 8 ||
//     nowTime == 9 ||
//     nowTime == 10 ||
//     nowTime == 11 ||
//     nowTime == 12
//   ) {
//     time = "morning"
//   } else if (
//     nowTime == 13 ||
//     nowTime == 14 ||
//     nowTime == 15 ||
//     nowTime == 16 ||
//     nowTime == 17 ||
//     nowTime == 18
//   ) {
//     time = "lunch"
//   } else if (
//     nowTime == 19 ||
//     nowTime == 20 ||
//     nowTime == 21 ||
//     nowTime == 22 ||
//     nowTime == 23 ||
//     nowTime == 0
//   ) {
//     time = "evening"
//   } else {
//     time = "dawn"
//   }
//   return time
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
