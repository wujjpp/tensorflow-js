/**
* Created by Wu Jian Ping on - 2019/08/06.
*/

const attach = video => {
  let mediaConfig = { video: true }
  let errBack = e => { alert('An error has occurred!', e) }

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(mediaConfig)
      .then(stream => {
        video.srcObject = stream
        video.play()
      })
      .catch(errBack)
  } else if (navigator.getUserMedia) { // Standard
    navigator.getUserMedia(mediaConfig, stream => {
      video.src = stream
      video.play()
    }, errBack)
  } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia(mediaConfig, stream => {
      video.src = window.webkitURL.createObjectURL(stream)
      video.play()
    }, errBack)
  } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
    navigator.mozGetUserMedia(mediaConfig, stream => {
      video.src = window.URL.createObjectURL(stream)
      video.play()
    }, errBack)
  }
}

export default {
  attach
}
