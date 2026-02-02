// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the popup elements
  const videoPopup = document.getElementById('videoPopup');
  const closeButton = document.querySelector('.video-popup-close');
  const overlay = document.querySelector('.video-popup-overlay');
  const popupVideo = document.getElementById('popupVideo');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playPauseIcon = playPauseBtn.querySelector('i');
  const muteToggle = document.getElementById('muteToggle');
  const muteIcon = muteToggle.querySelector('i');

  // Function to show the video popup
  function showPopup() {
    videoPopup.classList.add('show');
    updateMuteIcon();
  }

  // Function to hide the video popup
  function hidePopup() {
    videoPopup.classList.remove('show');
    popupVideo.pause();
    updatePlayPauseIcon();
  }

  // Function to toggle play/pause
  function togglePlayPause() {
    if (popupVideo.paused) {
      // Try to play with sound, fallback to muted if blocked
      popupVideo.play().catch(error => {
        console.log('Play with sound blocked, falling back to muted:', error);
        popupVideo.muted = true;
        popupVideo.play();
      });
    } else {
      popupVideo.pause();
    }
    updatePlayPauseIcon();
  }

  // Function to update the play/pause icon
  function updatePlayPauseIcon() {
    if (popupVideo.paused) {
      playPauseIcon.classList.remove('bi-pause-fill');
      playPauseIcon.classList.add('bi-play-fill');
    } else {
      playPauseIcon.classList.remove('bi-play-fill');
      playPauseIcon.classList.add('bi-pause-fill');
    }
  }

  // Function to toggle mute/unmute
  function toggleMute() {
    popupVideo.muted = !popupVideo.muted;
    updateMuteIcon();
  }

  // Function to update the mute icon based on current state
  function updateMuteIcon() {
    if (popupVideo.muted) {
      muteIcon.classList.remove('bi-volume-up');
      muteIcon.classList.add('bi-volume-mute');
    } else {
      muteIcon.classList.remove('bi-volume-mute');
      muteIcon.classList.add('bi-volume-up');
    }
  }

  // Show the popup after a short delay (1 second) to ensure page is fully loaded
  setTimeout(showPopup, 1000);

  // Close popup when close button is clicked
  closeButton.addEventListener('click', hidePopup);

  // Close popup when overlay is clicked
  overlay.addEventListener('click', hidePopup);

  // Close popup when Escape key is pressed
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoPopup.classList.contains('show')) {
      hidePopup();
    }
  });

  // Toggle play/pause when play/pause button is clicked
  playPauseBtn.addEventListener('click', togglePlayPause);

  // Toggle mute/unmute when mute button is clicked
  muteToggle.addEventListener('click', toggleMute);

  // Update play/pause icon when video ends
  popupVideo.addEventListener('ended', updatePlayPauseIcon);
});