// Function to handle errors
function handleError(error) {
  console.error('Error accessing the camera:', error);
}

// Initialize variables
var isBroadcaster = false;

// Function to start broadcasting
function startBroadcasting() {
  // Access the user's camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      var video = document.getElementById('video');
      video.srcObject = stream;
      
      // Initialize as broadcaster
      isBroadcaster = true;
      
      // Initialize broadcaster functionality
      initializeBroadcaster(stream);
      
      // Disable the start button
      document.getElementById('startButton').disabled = true;
    })
    .catch(handleError);
}

// Function to initialize broadcaster
function initializeBroadcaster(stream) {
  // Create RTCPeerConnection
  var pc = new RTCPeerConnection();
  
  // Add the camera stream as a track
  stream.getTracks().forEach(track => {
    pc.addTrack(track, stream);
  });

  // Offer negotiation
  pc.createOffer()
    .then(offer => pc.setLocalDescription(offer))
    .then(() => {
      // Broadcast the offer to viewers (signaling)
      broadcastOffer(pc.localDescription);
    })
    .catch(handleError);

  // Handle ICE candidates
  pc.onicecandidate = function(event) {
    if (event.candidate) {
      // Broadcast the ICE candidate to viewers (signaling)
      broadcastICECandidate(event.candidate);
    }
  };
}

// Function to broadcast offer to viewers (signaling)
function broadcastOffer(offer) {
  // Simulate sending the offer to viewers (in a real scenario, you'd use signaling server)
  setTimeout(() => {
    // Simulate receiving the offer on the viewer side
    receiveOfferFromBroadcaster(offer);
  }, 2000);
}

// Function to broadcast ICE candidate to viewers (signaling)
function broadcastICECandidate(candidate) {
  // Simulate sending the ICE candidate to viewers (in a real scenario, you'd use signaling server)
  setTimeout(() => {
    // Simulate receiving the ICE candidate on the viewer side
    receiveICECandidateFromBroadcaster(candidate);
  }, 2000);
}

// Function to receive offer from broadcaster (simulated signaling)
function receiveOfferFromBroadcaster(offer) {
  // Simulate receiving the offer and setting up RTCPeerConnection on viewer side
  var pc = new RTCPeerConnection();
  
  // Set remote description (offer)
  pc.setRemoteDescription(offer)
    .then(() => {
      // Create answer
      return pc.createAnswer();
    })
    .then(answer => {
      // Set local description (answer)
      return pc.setLocalDescription(answer);
    })
    .then(() => {
      // Simulate sending the answer back to the broadcaster
      receiveAnswerFromViewer(pc.localDescription);
    })
    .catch(handleError);

  // Handle ICE candidates
  pc.onicecandidate = function(event) {
    if (event.candidate) {
      // Simulate sending the ICE candidate back to the broadcaster
      receiveICECandidateFromViewer(event.candidate);
    }
  };

  // Handle remote stream
  pc.ontrack = function(event) {
    var video = document.getElementById('video');
    video.srcObject = event.streams[0];
  };
}

// Function to receive answer from viewer (simulated signaling)
function receiveAnswerFromViewer(answer) {
  // Simulate receiving the answer and setting remote description on broadcaster side
  setTimeout(() => {
    // Simulate setting remote description (answer) on broadcaster side
    var pc = getBroadcasterPeerConnection();
    pc.setRemoteDescription(answer)
      .catch(handleError);
  }, 2000);
}

// Function to receive ICE candidate from viewer (simulated signaling)
function receiveICECandidateFromViewer(candidate) {
  // Simulate receiving the ICE candidate and adding it to broadcaster's RTCPeerConnection
  setTimeout(() => {
    // Simulate adding ICE candidate to broadcaster's RTCPeerConnection
    var pc = getBroadcasterPeerConnection();
    pc.addIceCandidate(candidate)
      .catch(handleError);
  }, 2000);
}

// Function to get broadcaster's RTCPeerConnection (simulated)
function getBroadcasterPeerConnection() {
  // Simulate getting the broadcaster's RTCPeerConnection (in a real scenario, you'd store this reference)
  return new RTCPeerConnection();
}

// Event listener for the start button
document.getElementById('startButton').addEventListener('click', function() {
  startBroadcasting();
});
