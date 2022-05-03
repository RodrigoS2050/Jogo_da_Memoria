export const formatTimeElapsed = (seconds: number) => {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  let sceString = `${seconds < 10 ? "0" + seconds : seconds}`;
  let minString = `${minutes < 10 ? "0" + minutes : minutes}`;
  return `${minString}:${sceString}`;
};
