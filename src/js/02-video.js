import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const PLAYER_CURRENT_TIME = 'videoplayer-current-time';

function saveCurrentTime(time) {
  localStorage.setItem(PLAYER_CURRENT_TIME, time.toString());
}

function restoreCurrentTime() {
  const currentTime = localStorage.getItem(PLAYER_CURRENT_TIME);

  if (currentTime !== null) {
    player.setCurrentTime(parseFloat(currentTime));
  }
}

player.on(
  'timeupdate',
  throttle(data => {
    const currentTime = data.seconds;
    saveCurrentTime(currentTime);
  }, 1000)
);

restoreCurrentTime();
