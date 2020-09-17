# backend-function

> ## case 1 : classify song with calculation

- 앱 : {emotion, weather, heartRate} 를 서버로 보냄
- 서버 : 현재 시간대, 계절 , 심박수 측정도 구함. by. getTime(), getSeason(), sortHeartRate()
- 앱 : 서버로부터 {songList} 받아서 사용자 앱에 띄워줌 (like or bad도)
- 함수 : classifySong()

        1. input : emotion, weather, heartRate
        2. time, season, heartRateState 를 구한다.
        3. 각 노래의 condition 중 감정, 시간, 계절, 날씨, 심박수의 count를 0-1 사이의 값으로 정규화 한다.
        3-1. 값에 음수가 있을 경우 모든 값에 음수의 절대값을 더해준 후 양의 정수 값으로 변환 후 총합이 1인 값을 만들어낸다.
        4. 각 항목의 상위에 해당하는 곡을 추출.
            감정 : 상위 20%
            시간 : 상위 10%
            계절 : 상위 10%
            날씨 : 상위 20%
            심박수 : 상위 5%
            (퍼센트는 결과 정확도 보고 변경 예정, 같은 곡이 나왔을 경우 에러처리)

        5. 이렇게 선별된 곡 중에 5곡 랜덤으로 추출
        6. output : 5곡의 songList

---

> ## case 2 : change condition count

- 앱 : 사용자가 노래에대한 피드백(good or bad)을 보내면 {songName, condition, satisfaction} 을 서버로 보냄

- 서버 : db에서 해당 songName에 해당하는 데이터 찾고 counter 역할 수행

- 함수

        1. input : songName, condition, like or dislike (1, 2번 공통)
        2. increaseCondition() : db에서 해당 song의 해당 condition의 count를 +1 해준다.

        3. decreaseCondition() : db에서 해당 song의 해당 condition의 count를 -1 해준다.

        4. output : X (1, 2번 공통)

---

> ## sortHeartRate()

- 심박수를 계산하여 정상/비정상 반환
- input : heartRate
- output : heartRateState

> ## getTime()

- 시간 분류후 반환
- output : time

> ## getSeoson()

- 계절 분류 후 반환
- output : season
