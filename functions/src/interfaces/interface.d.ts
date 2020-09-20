interface ActionResult {
  ok: boolean
  error_message?: string
}

interface DatabaseItem {
  docId?: string
}

interface Song extends DatabaseItem {
  songName: string
  singer: string
  songLink: string
  conditionReference?: FirebaseFirestore.DocumentReference
  normalizedConditionReference?: FirebaseFirestore.DocumentReference
}

interface ConditionRequest {
  emotion: string
  weather: string
  time: string
  season: string
}

interface ConditionFeedbackRequest {
  songDocId: string
  condition: ConditionRequest
}

interface Condition extends DatabaseItem {
  songReference?: FirebaseFirestore.DocumentReference
  originReference?: FirebaseFirestore.DocumentReference
  nomalizedReference?: FirebaseFirestore.DocumentReference
  [key: string]: any

  angry: number
  flutter: number
  funny: number
  happy: number
  sad: number
  soso: number

  sunshine: number
  cloudy: number
  rainy: number
  hot: number
  cold: number
  snowy: number

  spring: number
  summer: number
  fall: number
  winter: number

  morning: number
  lunch: number
  evening: number
  dawn: number
}
