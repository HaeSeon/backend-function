# 🎵사용자 감성기반 음악추천 안드로이드 APP "EmoMusic" backend-function
## 상명대학교 2020 컴퓨터과학과 졸업프로젝트 bakE팀<br>

## What is EmoMusic?
**사용자의 심박수, 현 위치 주변의 날씨 및 시간 그리고 사용자의 감정을 복합적으로 고려한 음악 추천 안드로이드 어플리케이션**

<img width="539" alt="what" src="https://user-images.githubusercontent.com/18053479/101611626-168a7e80-3a4d-11eb-8b2d-6a94185260b5.PNG">

[Android application code] - https://github.com/SMU-BakE/recommended_music_final

## 음악 추천 과정
<img width="400" alt="노래추천1" src="https://user-images.githubusercontent.com/18053479/101717732-39677200-3ae3-11eb-994b-9a4d6a5a7873.PNG">

* 사용자가 추천 요청을 하면 감정, 심박수, 시간, 계절 등을 서버로 보내준다. <br/>
 ```requestSongListWithCondition(conditions)```
 
* 서버에서 해당 함수가 실행되면 노래 추천을 시작한다. 
 
    <img width="400" alt="노래추천" src="https://user-images.githubusercontent.com/18053479/101726829-9c163900-3af6-11eb-925a-8e668cbde604.png">

* 추천된 노래를 사용자에게 보내준다. 

* 사용자가 노래에대한 피드백 점수를 보내면 노래, condition(감정, 심박수, 시간, 계절 등), 만족도 점수를 서버에 보내준다. </br>
```increaseCondition()```

*  서버에서는 db에서 해당 songName에 해당하는 데이터 찾고 점수에 변화를 준다.
``condition[requestCondition.emotion]+=satisfactionCount``<br>
``condition[requestCondition.heartRate]+=satisfactionCount``<br>
``condition[requestCondition.time]+=satisfactionCount``<br>
``condition[requestCondition.weather]+=satisfactionCount``<br>

* 점수들을 표준화 한다. 
```autoNormalizing()```

