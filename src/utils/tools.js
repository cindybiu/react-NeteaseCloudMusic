function getTime (second) {
  second = Math.floor(second)
  let minute = Math.floor(second / 60)
  second = second - minute * 60
  return minute  + ":" + formatTime(second)
}

function formatTime (time) {
  let timeStr = "00"
  if (time > 0 && time < 10) {
    timeStr = "0" + time
  } else if (time >= 10) {
    timeStr = time
  }
  return timeStr
}

export const utils = {
  getTime,
  formatTime
}