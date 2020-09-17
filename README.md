# backend-function

> ## case 1 : change condition count

- 앱 : songName, condition, like or dislike 를 서버로 보냄

- 서버 : db에서 해당 songName에 해당하는 데이터 찾음

- 함수

        1. increaseCondition() : db에서 해당 song의 해당 condition의 count를 +1 해준다.

        2. decreaseCondition() : db에서 해당 song의 해당 condition의 count를 -1 해준다.

        3. input : songName, condition, like or dislike (1, 2번 공통)
        4. output : X (1, 2번 공통)

---

> ## case 2 : classify song with calculation

- 앱 : 감정, 날씨, 심박수 서버로 보냄, output songList 받아서 사용자 앱에 띄워줌 (like or bad도)
- 서버 : 현재 시간, 날짜구함.
- 함수 : classifySong()

        1. input : 감정, 날씨, 심박수
        2. 현재 시간, 날짜, 날씨를 구한다.
        3. 각 노래의 condition 중 감정, 시간, 계절, 날씨, 심박수의 count를 0-1 사이의 값으로 정규화 한다.
        4. 값에 음수가 있을 경우 모든 값에 음수의 절대값을 더해준 후 양의 정수 값으로 변환 후 총합이 1인 값을 만들어낸다.
        5. 각 항목의 상위에 해당하는 곡을 추출.
            감정 : 상위 20%
            시간 : 상위 10%
            계절 : 상위 10%
            날씨 : 상위 20%
            심박수 : 상위 5%
            (퍼센트는 결과 정확도 보고 변경 예정, 같은 곡이 나왔을 경우 에러처리)

        6. 이렇게 선별된 곡 중에 5곡 랜덤으로 추출
        7. output : 5곡의 songList

---

> ## case3 : sort heart-rate

- 함수 : sortHeartRate()

> ## case4 : get time and weather
