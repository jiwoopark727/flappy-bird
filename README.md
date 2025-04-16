# Flappy Bird - Classic Game Clone 🐦

<br/>

## 🚀프로젝트 소개

이 프로젝트는 JavaScript를 사용하여 고전 게임 **Flappy Bird**를 모작하여 웹 브라우저에서 즐길 수 있도록 제작한 게임입니다.
대학교 게임 개발 경진대회에 출품하기 위해 일주일 정도의 단기간에 개발하였으며,
Firebase Realtime Database를 활용하여 사용자 정보 관리, 최고 점수 저장, 그리고 순위 기능을 제공합니다.

---

<br/>

## 🎮 주요 기능

- **게임 플레이**: Flappy Bird의 원작 게임 플레이 스타일 재현
- **중력 로직**: apply_gravity라는 커스텀 함수를 만들어 중력을 적용, 새가 자연스럽게 아래로 계속 떨어지도록 구현
- **새의 움직임**: requestAnimationFram을 이용하여 부드러운 애니메이션 구현, 스페이스바와 위방향키로 점프 구현
- **Firebase 통합**: 사용자 로그인 (Google OAuth 지원), 최고 점수 저장 및 리더보드(순위표) 기능
- **제한된 플레이**: 사용자는 최대 3번까지 플레이 가능
- **순위 시스템**: 모든 플레이어의 최고 점수를 기반으로 한 리더보드
- **응답형 UI**: 데스크톱과 모바일 환경 모두에서 플레이 가능
- **파이프 생성 및 스크롤**: 파이프가 화면 오른쪽에서 왼쪽으로 이동, move_speed에 따라 이동 속도 조절,<br/>
  pipe_seperation을 조정하여 move_speed에 비례해 파이프 빈번도 증가, pipe_gap으로 상하 파이프 간격 유지
- **점수에 따른 난이도 조절**: move_speed와 gravity 조정, 게임 진행 중 플레이어가 획득한 점수(score_val.innerHTML)에 따라<br/>
  move_speed와 중력 값(gravity)을 증가시켜 게임 난이도를 동적으로 조정
- **음향효과와 배경 이미지 변경**: 점수 획득할 때마다 효과음 발생, 난이도 변경될 때 마다 맵 배경이미지 변경

---

<br/>

## 🛠 기술 스택

- **Frontend:** HTML, CSS, JavaScript
- **Database:** Firebase Realtime Database
- **Deployment:** Vercel

---

<br/>

## 🌐 배포 및 스크린샷

- **배포 사이트:** <a href="https://flappy-bird-jiwoo-park.vercel.app" target="_blank" rel="noopener noreferrer"><strong>[Flappy Bird 배포 사이트]</strong></a>

<table>
  <tr>
    <td align="center">
      <p>초기 화면</p>
      <img src="https://raw.githubusercontent.com/jiwoopark727/flappy-bird/main/img/readme_home.png" height="250" alt="초기 화면">
    </td>
    <td align="center">
      <p>게임 시작 화면</p>
      <img src="https://raw.githubusercontent.com/jiwoopark727/flappy-bird/main/img/readme_start.png" height="250" alt="게임 시작 화면">
    </td>
  </tr>
  <tr>
    <td align="center">
      <p>두 번째 스테이지 화면</p>
      <img src="https://raw.githubusercontent.com/jiwoopark727/flappy-bird/main/img/readme_first.png" height="250" alt="두 번째 스테이지 화면">
    </td>
    <td align="center">
      <p>세 번째 스테이지 화면</p>
      <img src="https://raw.githubusercontent.com/jiwoopark727/flappy-bird/main/img/readme_second.png" height="250" alt="세 번째 스테이지 화면">
    </td>
  </tr>
  <tr>
    <td align="center">
      <p>네 번째 스테이지 화면</p>
      <img src="https://raw.githubusercontent.com/jiwoopark727/flappy-bird/main/img/readme_third.png" height="250" alt="네 번째 스테이지 화면">
    </td>
    <td align="center">
      <p>게임 종료 화면</p>
      <img src="https://raw.githubusercontent.com/jiwoopark727/flappy-bird/main/img/readme_finish.png" height="250" alt="게임 종료 화면">
    </td>
  </tr>
  <tr>
    <td align="center">
      <p>리더보드1 화면</p>
      <img src="https://raw.githubusercontent.com/jiwoopark727/flappy-bird/main/img/readme_board.png" height="250" alt="리더보드1 화면">
    </td>
    <td align="center">
      <p>리더보드2 화면</p>
      <img src="https://raw.githubusercontent.com/jiwoopark727/flappy-bird/main/img/readme_board2.png" height="250" alt="리더보드2 화면">
    </td>
  </tr>
</table>

---

<br/>

## 📦 설치 및 실행

이 프로젝트를 로컬에서 실행하려면 다음 단계를 따르세요:

```bash
# 1. 레포지토리 클론
git clone https://github.com/jiwoopark727/flappy-bird.git

# 2. Firebase 설정
# 프로젝트의 Firebase 콘솔에서 `firebaseConfig` 정보를 `config.js` 파일에 추가하세요.

# 3. 로컬 서버 실행
# HTML 파일을 브라우저에서 열어 실행하거나, 로컬 서버를 설정해 실행하세요.
```

<br/>

## 📜 라이선스

본 프로젝트는 **MIT 라이선스**를 따릅니다.
