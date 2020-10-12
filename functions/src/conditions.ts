import { songs_collections } from "./app"

export const increaseCondtion = async (
  request: ConditionFeedbackRequest
): Promise<ActionResult> => {
  console.log(request)
  const { songDocId, condition: requestCondition, starRate } = request

  if (!(songDocId && requestCondition)) {
    throw new Error("invalid request")
  }

  const songRef = await songs_collections
    .doc(songDocId)
    .get()
    .catch((error) => {
      throw new Error("song is not exist" + error)
    })
  const song = songRef.data() as Song

  console.log("request song is : " + song.songName)

  if (!song.conditionReference) {
    throw Error("song does not have conditionRef")
  }

  const conditionReference = song.conditionReference

  const conditionSnapshot = await conditionReference.get().catch((error) => {
    throw new Error("cannot get condition data :" + error)
  })

  const condition = conditionSnapshot.data() as Condition
  console.log("origin condition : ")
  console.log(`${requestCondition.emotion}:  ${condition[requestCondition.emotion]}`)
  console.log(`${requestCondition.weather}:  ${condition[requestCondition.weather]}`)
  console.log(`${requestCondition.season}:  ${condition[requestCondition.season]}`)
  console.log(`${requestCondition.time}:  ${condition[requestCondition.time]}`)
  console.log(`${requestCondition.heartRate}:  ${condition[requestCondition.heartRate]}`)

  condition[requestCondition.emotion] += starRate
  condition[requestCondition.weather] += starRate
  condition[requestCondition.season] += starRate
  condition[requestCondition.time] += starRate
  condition[requestCondition.heartRate] += starRate

  console.log("changed condition : ")
  console.log(`${requestCondition.emotion}:  ${condition[requestCondition.emotion]}`)
  console.log(`${requestCondition.weather}:  ${condition[requestCondition.weather]}`)
  console.log(`${requestCondition.season}:  ${condition[requestCondition.season]}`)
  console.log(`${requestCondition.time}:  ${condition[requestCondition.time]}`)
  console.log(`${requestCondition.heartRate}:  ${condition[requestCondition.heartRate]}`)

  return conditionReference.set(condition).then(async () => {
    console.log((await conditionReference.get()).ref.id)
    console.log("increase condtion finished")
    console.log("request :")
    console.log(request)
    return { ok: true }
  })
}

// export const decreaseCondition = (request: ConditionFeedbackRequest) => {}

// get origin type condition, return normalized condition
export const normalizeCondition = (condition: Condition): Condition => {
  console.log("condition normalizing")

  // set all values to positive number
  let minimum = condition.angry
  Object.values(condition).map((value) => {
    if (typeof value === "number" && value < minimum) {
      minimum = value
    }
  })

  Object.keys(condition).map((key) => {
    if (typeof condition[key] === "number") {
      condition[key] -= minimum
    }
  })

  let totalCount = 1

  Object.values(condition).map((value) => {
    if (typeof value === "number") {
      totalCount += value
    }
  })

  //   const newCondtion = new Map<string, any>()
  const newCondition: { [key: string]: any } = {}
  Object.entries(condition).map((entry) => {
    if (typeof entry[1] === "number") {
      newCondition[entry[0]] = entry[1] / totalCount
      //   newCondtion.set(entry[0], entry[1] / totalCount)
    } else {
      newCondition[entry[0]] = entry[1]
      //   newCondtion.set(entry[0], entry[1])
    }
  })

  // console.log(newCondition)
  return newCondition as Condition
}
