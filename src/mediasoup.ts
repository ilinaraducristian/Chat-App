import {Device} from "mediasoup-client";

const mediasoup = new Device();
const remoteStream = new MediaStream();
const audioContext = new AudioContext();

let created = false;

function createMediaStreamSource() {
  if (created) return;
  created = true;
  audioContext.createMediaStreamSource(remoteStream).connect(audioContext.destination);
}

export {remoteStream, createMediaStreamSource};
export default mediasoup;