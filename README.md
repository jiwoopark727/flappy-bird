# Flappy Bird - Classic Game Clone 🐦

## 프로젝트 소개

이 프로젝트는 JavaScript를 사용하여 고전 게임 **Flappy Bird**를 모작하여 웹 브라우저에서 즐길 수 있도록 제작한 게임입니다.  
Firebase Realtime Database를 활용하여 사용자 정보 관리, 최고 점수 저장, 그리고 순위 기능을 제공합니다.

---

## 🌐 배포 및 스크린샷

- **배포 사이트:** [https://flappy-bird-jiwoo-park.vercel.app/](https://flappy-bird-jiwoo-park.vercel.app/)
- 주요 스크린샷:  
  ![게임 화면](https://via.placeholder.com/500x300)  
  ![순위 페이지](https://via.placeholder.com/500x300)

---

## 🎮 주요 기능

- **게임 플레이**: Flappy Bird의 원작 게임 플레이 스타일 재현
- **중력 로직**: apply_gravity라는 커스텀 함수를 만들어 중력을 적용, 새가 자연스럽게 아래로 계속 떨어지도록 구현
- **새의 움직임**: requestAnimationFram을 이용하여 부드러운 애니메이션 구현, 스페이스바와 위방향키로 점프 구현
- **Firebase 통합**: 사용자 로그인 (Google OAuth 지원), 최고 점수 저장 및 리더보드(순위표) 기능
- **제한된 플레이**: 사용자는 최대 3번까지 플레이 가능
- **순위 시스템**: 모든 플레이어의 최고 점수를 기반으로 한 리더보드
- **응답형 UI**: 데스크톱과 모바일 환경 모두에서 플레이 가능
- **제한된 플레이**: 사용자는 최대 3번까지 플레이 가능
- **순위 시스템**: 모든 플레이어의 최고 점수를 기반으로 한 리더보드
- **응답형 UI**: 데스크톱과 모바일 환경 모두에서 플레이 가능

---

## 🛠 기술 스택

- **Frontend:** HTML, CSS, JavaScript
- **Database:** Firebase Realtime Database
- **Authentication:** Google OAuth 2.0
- **Deployment:** Vercel

---

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
