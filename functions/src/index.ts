import * as functions from "firebase-functions"
import { Condition, Song } from "./interface"
import { app } from "./app"

const SDFfda = {
  flutter: 13,
  helo: 0,
}
const db = app.firestore()

const song: Song = {
  singer: "alicia_lee",
  songLink: "testlink1234",
  songName: "마음을_드려요",
  conditionReference: db.collection("conditions").doc("test"),
}

export const addSampleSong = functions.https.onRequest(async (req, res) => {
  //initialize sample condition
  const condition: Condition = {
    angry: 0,
    flutter: 0,
    funny: 0,
  }

  const conditionReference = await db
    .collection("conditions")
    .add(condition)
    .catch((error) => {
      res.send(error)
      return
    })

  if (!conditionReference) {
    return
  }

  const song: Song = {
    singer: "alicia_lee",
    songLink: "testlink1234",
    songName: "마음을_드려요",
    conditionReference: conditionReference,
  }

  const songReference = await db
    .collection("songs")
    .add(song)
    .catch((error) => {
      res.send(error)
      return
    })

  if (songReference) {
    res.send(songReference)
  }
})

export const songs = functions.https.onRequest(async (req, res) => {
  const querySnapshot = await db.collection("songs").get()
  const datas: Song[] = querySnapshot.docs.map((doc) => {
    const song = (doc.data() as unknown) as Song
    song.docId = doc.id

    return song
  })
  res.send(datas)
})

export const increaseCondition = functions.https.onRequest(async (req, res) => {
  const songId = req.query.songId
  if (!songId) {
    res.send("please set songId as Query")
    return
  }

  const emotionType = req.query.emotionType
  if (!emotionType) {
    res.send("please set emotionType as Query")
    return
  }

  const songDoc = await db
    .collection("songs")
    .doc(songId as string)
    .get()
  const song = (songDoc.data() as unknown) as Song

  const result = await song.conditionReference.get().then(async (snapshot) => {
    console.log("--origin condition---")
    const condition = (snapshot.data() as unknown) as Condition
    console.log(condition)
    switch (emotionType) {
      case "flutter":
        condition.flutter += 1
    }
    console.log("---condition after increasing---")
    console.log(condition)

    const result = await snapshot.ref.set(condition)
    console.log("condition updated at " + result.writeTime)
    return result
  })
  res.send(`${songId}'s condition updated at ${result.writeTime}`)
})

export const addMessage = functions.https.onRequest(async (req, res) => {
  const flutterCount = req.query.flutter

  if (flutterCount == undefined) {
    res.send("query is not defined")
    return
  }

  const writeResult = await db.collection("song").add({ flutter: flutterCount })
  res.json({ result: `hello ${writeResult.id}` })
})

export const sayPretty = functions.https.onRequest(async (req, res) => {
  console.log(req.path)
  console.log("지니니")
  res.send("예뿐지니")
})

interface Message {
  original: string
}

export const messages = functions.https.onRequest(async (req, res) => {
  console.log("i")
  const querySnapShot = await db.collection("message").get()
  const messageArray: Message[] = []
  querySnapShot.docs.map((doc) => {
    const data = doc.data() as Message
    messageArray.push(data)
  })
  res.send(messageArray)
})

// // test code
// const getEmotions = (emoitions : string[])=>{
//     db.collection("emotions").orderBy("happy").limit(13).get()

// }
