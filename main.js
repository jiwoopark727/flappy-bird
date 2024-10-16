// 배경 스크롤 속도
let move_speed = 5;

// 중력 상수 값
let gravity = 0.5;

// 새 요소를 참조
let bird = document.querySelector('.bird');

// 새 요소의 속성 가져오기
let bird_props = bird.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();

// 점수 요소를 참조
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

// 게임 상태를 초기화
let game_state = 'Start';

// 키보드 입력 이벤트 리스너 추가
document.addEventListener('keydown', (e) => {
  // 엔터 키가 눌리면 게임 시작
  if (e.key == 'Enter' && game_state != 'Play') {
    document.querySelectorAll('.pipe_sprite').forEach((e) => {
      e.remove();
    });
    bird.style.top = '40vh';
    game_state = 'Play';
    message.innerHTML = '';
    score_title.innerHTML = 'Score : ';
    score_val.innerHTML = '0';
    play();
  }
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
          message.innerHTML = '엔터키를 눌러 게임 재시작';
          message.style.left = '26vw';
          return;
        } else {
          // 플레이어가 파이프를 성공적으로 회피하면 점수 증가
          if (
            pipe_sprite_props.right < bird_props.left &&
            pipe_sprite_props.right + move_speed >= bird_props.left &&
            element.increase_score == '1'
          ) {
            score_val.innerHTML = +score_val.innerHTML + 1;
          }
          element.style.left = pipe_sprite_props.left - move_speed + 'px';
        }
      }
    });

    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  let bird_dy = 0;
  function apply_gravity() {
    if (game_state != 'Play') return;
    bird_dy = bird_dy + gravity;
    document.addEventListener('keydown', (e) => {
      if (e.key == 'ArrowUp' || e.key == ' ') {
        bird_dy = -12.6;
      }
    });

    // 새와 창 상단 또는 하단의 충돌 감지
    if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
      game_state = 'End';
      message.innerHTML = '엔터키를 눌러 게임 재시작';
      message.style.left = '26vw';
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
  let pipe_gap = 35;
  function create_pipe() {
    if (game_state != 'Play') return;

    // 두 파이프 사이의 거리가 미리 정의된 값을 초과하면
    // 새로운 파이프 세트를 생성
    if (pipe_seperation > 115) {
      pipe_seperation = 0;

      // 파이프의 Y축 위치를 무작위로 계산
      let pipe_posi = Math.floor(Math.random() * 43) + 8;
      let pipe_sprite_inv = document.createElement('div');
      pipe_sprite_inv.className = 'pipe_sprite';
      pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
      pipe_sprite_inv.style.left = '100vw';

      // 생성된 파이프 요소를 DOM에 추가
      document.body.appendChild(pipe_sprite_inv);
      let pipe_sprite = document.createElement('div');
      pipe_sprite.className = 'pipe_sprite';
      pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
      pipe_sprite.style.left = '100vw';
      pipe_sprite.increase_score = '1';

      // 생성된 파이프 요소를 DOM에 추가
      document.body.appendChild(pipe_sprite);
    }
    pipe_seperation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}
