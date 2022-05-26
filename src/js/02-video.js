import Player from "@vimeo/player"
import throttle from "lodash/throttle"

const iframe = document.querySelector('iframe')
const player = new Player(iframe)

if (localStorage.getItem("videoplayer-current-time")) {
        player.setCurrentTime(localStorage.getItem("videoplayer-current-time"))
}

player.on('timeupdate', throttle((playTime => {
    localStorage.setItem("videoplayer-current-time", playTime.seconds)
}), 1000))
