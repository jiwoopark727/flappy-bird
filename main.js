import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  query,
  orderByChild,
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js';

// Firebase 설정
const firebaseConfig = {
  apiKey: 'AIzaSyBepd6pzHsheESMVwgo5Ja2iTaYZg7MZFQ',
  authDomain: 'flappy-bird-efdcb.firebaseapp.com',
  databaseURL: 'https://flappy-bird-efdcb-default-rtdb.firebaseio.com',
  projectId: 'flappy-bird-efdcb',
  storageBucket: 'flappy-bird-efdcb.appspot.com',
  messagingSenderId: '725142925346',
  appId: '1:725142925346:web:e765bff9199b96bff0da7b',
  measurementId: 'G-8727RQ0CKS',
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Realtime Database 초기화

// 전역 변수 선언
let globalName = '';
let globalDepartment = '';
let globalStudentId = '';
let globalGamesPlay = 0;

// 사용자 정보를 저장하는 함수
async function saveUserData(studentId, name, department) {
  try {
    const userRef = ref(db, 'users/' + studentId);
    await set(userRef, {
      name: name,
      department: department,
      studentId: studentId,
      gamesPlayed: 0,
      highScore: 0,
    });
    console.log('사용자 정보가 성공적으로 저장되었습니다.');
  } catch (error) {
    console.error('사용자 정보 저장 실패:', error);
  }
}

// 게임 종료 후 점수 저장
// 전역 변수 사용 예시 (게임 종료 시 데이터 저장)
async function endGame(score) {
  const userRef = ref(db, 'users/' + globalStudentId);

  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    const userData = snapshot.val();
    const highScore = Math.max(userData.highScore, score); // 최고 점수 갱신

    // 업데이트된 최고 점수와 게임 플레이 수 저장
    await update(userRef, {
      // gamesPlayed: userData.gamesPlayed + 1,
      highScore: highScore,
    });
    console.log('게임 결과 저장 완료:', highScore);
  } else {
    console.error('사용자 데이터를 찾을 수 없습니다.');
  }
}

// 배경 스크롤 속도
let move_speed = 5;

// 중력 상수 값
let gravity = 0.65;

// 새 요소를 참조
let bird = document.querySelector('.bird');

// 새 요소의 속성 가져오기
let bird_props = bird.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();

// 점수 요소를 참조
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let message2 = document.querySelector('.message2');
let score_title = document.querySelector('.score_title');

// 게임 상태를 초기화
let game_state = 'Start';

// 공통 로그인 후 게임 시작 로직을 함수로 추출
async function handleLoginAndStartGame() {
  if (game_state === 'ShowRanking') {
    location.reload();
    return;
  }

  if (game_state !== 'Play') {
    if (
      globalName === '' ||
      globalDepartment === '' ||
      globalStudentId === ''
    ) {
      const name = document.getElementById('name').value;
      const department = document.getElementById('department').value;
      const studentId = document.getElementById('studentId').value;
      if (!name || !department || !studentId) {
        alert('모든 정보를 입력해주세요.');
        return;
      }

      globalName = name;
      globalDepartment = department;
      globalStudentId = studentId;
      globalGamesPlay = 0;

      await saveUserData(studentId, name, department);
    } else if (globalGamesPlay >= 3) {
      alert('3번의 기회를 다 소진했습니다. 로그인 화면으로 돌아갑니다.');

      const usersRef = ref(db, 'users');
      const highScoreQuery = query(usersRef, orderByChild('highScore'));
      const snapshot = await get(highScoreQuery);

      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const sortedUsers = Object.entries(usersData).sort(
          ([, userA], [, userB]) => userB.highScore - userA.highScore
        );

        const rankingListItems = document.querySelector('.ranking');
        rankingListItems.innerHTML = ''; // 이전 순위 초기화

        sortedUsers.slice(0, 10).forEach((user, index) => {
          const li = document.createElement('li');
          li.textContent = `${index + 1}위 ${user[1].name} ${
            user[1].department
          } ${user[1].studentId} ${user[1].highScore}점`;

          li.style.color = 'white'; // 점수가 높으면 흰색으로
          rankingListItems.appendChild(li);
        });
      }

      game_state = 'ShowRanking';
      return;
    }

    const userRef = ref(db, 'users/' + globalStudentId);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      await update(userRef, {
        gamesPlayed: userData.gamesPlayed + 1,
      });
    }

    document.querySelectorAll('.pipe_sprite').forEach((e) => e.remove());
    bird.style.top = '40vh';
    game_state = 'Play';
    message.innerHTML = '';
    message2.innerHTML = '';
    score_title.innerHTML = '';
    score_val.innerHTML = '0';
    globalGamesPlay += 1;
    document.querySelector('.background').style.backgroundImage =
      "url('/img/background.jpg')";
    play();
  }
}

document.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    await handleLoginAndStartGame();
  }
});

document.addEventListener('touchstart', async (e) => {
  await handleLoginAndStartGame();
});

document.getElementById('loginBtn').addEventListener('click', async () => {
  await handleLoginAndStartGame();
});

function play() {
  function move() {
    // 게임이 종료되었는지 감지
    if (game_state != 'Play') return;

    // 모든 파이프 요소를 참조
    let pipe_sprite = document.querySelectorAll('.pipe_sprite');
    pipe_sprite.forEach((element) => {
      let pipe_sprite_props = element.getBoundingClientRect();
      bird_props = bird.getBoundingClientRect();

      // 화면 밖으로 나간 파이프는 삭제하여 메모리 절약
      if (pipe_sprite_props.right <= 0) {
        element.remove();
      } else {
        // 새와 파이프의 충돌 감지
        if (
          bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
          bird_props.left + bird_props.width > pipe_sprite_props.left &&
          bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
          bird_props.top + bird_props.height > pipe_sprite_props.top
        ) {
          // 충돌이 발생하면 게임 상태를 변경하고 게임 종료
          game_state = 'End';
          message2.innerHTML = 'GAME OVER <br/> PRESS ENTER';
          endGame(score_val.innerHTML);
          // message.style.left = '26vw';
          return;
        } else {
          // 플레이어가 파이프를 성공적으로 회피하면 점수 증가
          if (
            pipe_sprite_props.right < bird_props.left &&
            pipe_sprite_props.right + move_speed >= bird_props.left &&
            element.increase_score == '1'
          ) {
            score_val.innerHTML = +score_val.innerHTML + 1;
            const audio = new Audio('/sound/Coin.mp3');
            // 소리 재생
            audio.play().catch((error) => {
              console.error('소리 재생 중 오류 발생:', error);
            });

            if (score_val.innerHTML > 20) {
              const backgroundDiv = document.querySelector('.background');
              backgroundDiv.style.backgroundImage =
                "url('/img/background2.jpg')"; // 새로운 이미지 경로
              move_speed = 7; //move_speed 가 원래 5 -> 7
              gravity = 0.75;
            }

            if (score_val.innerHTML > 40) {
              const backgroundDiv = document.querySelector('.background');
              backgroundDiv.style.backgroundImage =
                "url('/img/background3.png')"; // 새로운 이미지 경로
              move_speed = 10; //move_speed 가 원래 5 -> 7
              gravity = 0.9;
            }

            if (score_val.innerHTML > 60) {
              const backgroundDiv = document.querySelector('.background');
              backgroundDiv.style.backgroundImage =
                "url('/img/background4.jpg')"; // 새로운 이미지 경로
              move_speed = 15; //move_speed 가 원래 5 -> 7
              gravity = 1.2;
            }
          }
          element.style.left = pipe_sprite_props.left - move_speed + 'px';
          // element.style.left = '100px';
        }
      }
    });

    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  let bird_dy = 0;

  function jump() {
    if (game_state === 'Play') {
      bird_dy = -12.6;
    }
  }

  async function apply_gravity() {
    if (game_state != 'Play') return;

    bird_dy = bird_dy + gravity;

    document.addEventListener('keydown', (e) => {
      if (e.key == 'ArrowUp' || e.key == ' ') {
        jump();
      }
    });

    document.addEventListener('touchstart', () => {
      jump();
    });

    // 새와 창 상단 또는 하단의 충돌 감지
    if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
      game_state = 'End';
      message2.innerHTML = 'GAME OVER <br/> PRESS ENTER';
      endGame(score_val.innerHTML);

      // 게임 플레이 횟수 -1
      const userRef = ref(db, 'users/' + globalStudentId);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        // 업데이트된 최고 점수와 게임 플레이 수 저장
        await update(userRef, {
          gamesPlayed: userData.gamesPlayed - 0.5,
        });
        console.log('게임플레이횟수 -1 성공');
      } else {
        console.error('사용자 데이터를 찾을 수 없습니다.');
      }
      globalGamesPlay -= 0.5;

      // message.style.left = '26vw';
      bird_props = bird.getBoundingClientRect();
      return;
    }

    bird.style.top = bird_props.top + bird_dy + 'px';
    bird_props = bird.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);

  let pipe_seperation = 0;

  // 두 파이프 사이의 간격에 대한 상수 값
  let pipe_gap = 31;

  function create_pipe() {
    if (game_state != 'Play') return;

    // move_speed에 따라 파이프 생성 주기를 조정
    if (pipe_seperation > 100 - (move_speed - 5) * 6) {
      pipe_seperation = 0;

      // 파이프의 Y축 위치를 무작위로 계산
      let pipe_posi = Math.floor(Math.random() * 60) + 8;

      // 위쪽 파이프 생성
      let pipe_sprite_inv = document.createElement('div');
      pipe_sprite_inv.className = 'pipe_sprite pipe_sprite_top'; // 위쪽 파이프에 특정 클래스 추가
      pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
      pipe_sprite_inv.style.left = '100vw';
      document.body.appendChild(pipe_sprite_inv);

      // 아래쪽 파이프 생성
      let pipe_sprite = document.createElement('div');
      pipe_sprite.className = 'pipe_sprite pipe_sprite_bottom'; // 아래쪽 파이프에 특정 클래스 추가
      pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
      pipe_sprite.style.left = '100vw';
      pipe_sprite.increase_score = '1';
      document.body.appendChild(pipe_sprite);
    }
    pipe_seperation++;
    requestAnimationFrame(create_pipe);
  }

  requestAnimationFrame(create_pipe);
}
