import { conditions_normalized_collections } from "./app"

export const getSongsFromConditionQuery = async (request: ConditionRequest): Promise<Song[]> => {
  console.log("get songs from query")

  console.log(request)
  const { emotion, season, time, weather, heartRate } = request

  //   request check
  if (!(emotion && season && time && weather)) {
    return Promise.reject("request invalid")
  }

  const songsFromEmotion = getSongRefsFromConditionField(emotion, 10)
  const songsFromSeason = getSongRefsFromConditionField(season, 1)
  const songsFromTime = getSongRefsFromConditionField(time, 1)
  const songsFromWeather = getSongRefsFromConditionField(weather, 1)
  const songsFromHeartRate = getSongRefsFromConditionField(heartRate, 1)

  const songList = await Promise.all<FirebaseFirestore.DocumentReference[]>([
    songsFromEmotion,
    songsFromSeason,
    songsFromTime,
    songsFromWeather,
    songsFromHeartRate,
  ]).then(async (refsArray) => {
    console.log("finished getting all conditions query")
    const refReducedList: FirebaseFirestore.DocumentReference[] = []
    refsArray.map((refs) => {
      refs.map((ref) => {
        if (!refReducedList.map((value) => value.id).includes(ref.id)) {
          refReducedList.push(ref)
        }
      })
    })

    while (refReducedList.length > 5) {
      const random = Math.round(Math.random() * 100) % refReducedList.length
      refReducedList.splice(random, 1)
    }

    const songsPromise = Promise.all(
      refReducedList.map(async (ref) => {
        const docSnapshot = await ref.get()

        const song = docSnapshot.data() as Song
        song.docId = docSnapshot.id

        return song
      })
    )

    return await songsPromise
  })

  console.log("request from : ")
  console.log(request)
  console.log("query result :")
  console.log(songList.map((song) => song.songName))
  return songList
}

// randomly reduce songs from list
// const reducedSongArray: Song[] = []

// songList.map((song) => {
//   if (!reducedSongArray.map((song) => song.songLink).includes(song.songLink)) {
//     reducedSongArray.push(song)
//   }
// })

// if (reducedSongArray.length <= 0) {
//   throw new Error("song list is empty")
// }

// if (reducedSongArray.length <= 5) {
//   return reducedSongArray
// }

// while (reducedSongArray.length > 5) {
//   const random = Math.random() * 100
//   const randomIndex = Math.round(random) % 20

//   if (reducedSongArray[randomIndex]) {
//     console.log(reducedSongArray[randomIndex].songName + "is deleted")
//     reducedSongArray.splice(randomIndex, 1)
//   }
// }

const getSongRefsFromConditionField = async (
  field: string,
  count: number
): Promise<FirebaseFirestore.DocumentReference[]> => {
  console.log(`query to normalized conditions for : ${field}`)
  return new Promise(async (resolve, reject) => {
    const querySnapshot = await conditions_normalized_collections
      .orderBy(field, "desc")
      .limit(count)
      .get()
      .catch((error) => {
        reject(error)
      })

    if (!querySnapshot) {
      console.log("query result is empty")
      return
    }

    const songRefs: FirebaseFirestore.DocumentReference[] = []
    querySnapshot.docs.map((docSnapshot) => {
      console.log(docSnapshot.id)
      const condition = docSnapshot.data() as Condition
      if (condition.songReference) {
        songRefs.push(condition.songReference)
      }
    })

    if (songRefs.length > 0) {
      console.log("field :" + field)
      console.log("song refs :")
      console.log(songRefs.map((ref) => ref.id))
      resolve(songRefs)
    } else {
      reject("song list is empty")
    }
  })
}
