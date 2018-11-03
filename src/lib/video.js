export async function getStream() {
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
  const stream = await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true
    })
    .catch(console.log);
  if (stream) {
    console.log({ stream });
    return stream;
  }
}
