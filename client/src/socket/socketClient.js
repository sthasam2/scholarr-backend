import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";

function connectSocket() {
	const textSocket = socketIOClient(`${ENDPOINT}/text`);
	const videoSocket = socketIOClient(`${ENDPOINT}/video`);

	console.log(textSocket.id);
	console.log(videoSocket.id);
}

export default connectSocket;
