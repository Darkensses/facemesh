const videoElement = document.getElementById('input-video');
const outputElement = document.getElementById('output');
const canvasCtx = outputElement.getContext('2d');

const constraints = {
    video: { 
      height: 500,
      width: 500,
      facingMode: 'user'
    },
    audio: false
};

navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    videoElement.srcObject = stream;
});

function drawCircle(x, y) {
    canvasCtx.fillStyle = "#FF0000";
    canvasCtx.beginPath();
    canvasCtx.arc(x*500, y*500, 1, 0, 2 * Math.PI, false);
    canvasCtx.fillStyle = '#00FF00';
    canvasCtx.fill();
}

function drawDots(landmarks, arrType) {
    for(const dots of arrType) {
        const d1 = landmarks[dots[0]];
        const d2 = landmarks[dots[1]];

        drawCircle(d1.x, d1.y);
        drawCircle(d2.x, d2.y);
    }
    
}

function onResultsFaceMesh(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, outputElement.width, outputElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, outputElement.width, outputElement.height);
    if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
            //console.log(landmarks.length) //468
            //console.log(FACEMESH_TESSELATION.length) //2556
            drawDots(landmarks, FACEMESH_TESSELATION);            
            drawConnectors(
                canvasCtx, landmarks, FACEMESH_RIGHT_EYE,
                {color: '#0000FF', lineWidth: 1});
            drawConnectors(
                canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW,
                {color: '#0000FF', lineWidth: 1});
            drawConnectors(
                canvasCtx, landmarks, FACEMESH_LEFT_EYE,
                {color: '#0000FF', lineWidth: 1});
            drawConnectors(
                canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW,
                {color: '#0000FF', lineWidth: 1});
            drawConnectors(
                canvasCtx, landmarks, FACEMESH_FACE_OVAL,
                {color: '#0000FF', lineWidth: 1});
        }
    }
    canvasCtx.restore();
}

const faceMesh = new FaceMesh({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.1/${file}`;
}});
faceMesh.onResults(onResultsFaceMesh);

const camera = new Camera(videoElement, {
    onFrame: async () => {
      await faceMesh.send({image: videoElement});
    },
    width: 480,
    height: 480
});
camera.start();

// const FPS = 3;
// const sendFrames = () => {
//   setInterval(() => {
//     console.log('sending video to facemesh');
//     faceMesh.send({ image: videoElement });
//   }, (1000/FPS));
// } 

// setTimeout(() => {
//     console.log('** start sending frames **');
//     sendFrames();
//   }, 5000);
  
