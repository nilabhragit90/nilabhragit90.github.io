// Wait for the DOM to be fully loaded
let videoPopup, closeButton, overlay, popupVideo, playPauseBtn, playPauseIcon, muteToggle, muteIcon;

// Function to hide the video popup
function hidePopup() {
  if (videoPopup) {
    videoPopup.classList.remove('show');
    if (popupVideo) {
      popupVideo.pause();
      updatePlayPauseIcon();
    }
  }
}

// Function to toggle play/pause
function togglePlayPause() {
  if (popupVideo) {
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
}

// Function to update the play/pause icon
function updatePlayPauseIcon() {
  if (playPauseIcon && popupVideo) {
    if (popupVideo.paused) {
      playPauseIcon.classList.remove('bi-pause-fill');
      playPauseIcon.classList.add('bi-play-fill');
    } else {
      playPauseIcon.classList.remove('bi-play-fill');
      playPauseIcon.classList.add('bi-pause-fill');
    }
  }
}

// Function to toggle mute/unmute
function toggleMute() {
  if (popupVideo) {
    popupVideo.muted = !popupVideo.muted;
    updateMuteIcon();
  }
}

// Function to update the mute icon based on current state
function updateMuteIcon() {
  if (muteIcon && popupVideo) {
    if (popupVideo.muted) {
      muteIcon.classList.remove('bi-volume-up');
      muteIcon.classList.add('bi-volume-mute');
    } else {
      muteIcon.classList.remove('bi-volume-mute');
      muteIcon.classList.add('bi-volume-up');
    }
  }
}

// Make showPopup globally accessible
function showPopup() {
  console.log('showPopup called');
  if (videoPopup) {
    videoPopup.classList.add('show');
    updateMuteIcon();
    // Try to load the video with error handling
    if (popupVideo) {
      // Add error event listener for video
      popupVideo.onerror = function(e) {
        console.error('Video loading error:', e);
        // The popup will still be visible even if video fails to load
      };
      popupVideo.load();
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Get the popup elements
  videoPopup = document.getElementById('videoPopup');
  closeButton = document.querySelector('.video-popup-close');
  overlay = document.querySelector('.video-popup-overlay');
  popupVideo = document.getElementById('popupVideo');
  playPauseBtn = document.getElementById('playPauseBtn');
  playPauseIcon = playPauseBtn.querySelector('i');
  muteToggle = document.getElementById('muteToggle');
  muteIcon = muteToggle.querySelector('i');

  // Show the popup after a short delay to create user interest (as requested)
  // Only show the popup if it hasn't been shown in this session yet
  if (!sessionStorage.getItem('videoPopupShown')) {
    setTimeout(() => {
      showPopup();
      sessionStorage.setItem('videoPopupShown', 'true');
    }, 1000);
  }
  
  // Close popup when close button is clicked
  if (closeButton) {
    closeButton.addEventListener('click', hidePopup);
  }

  // Close popup when overlay is clicked
  if (overlay) {
    overlay.addEventListener('click', hidePopup);
  }

  // Close popup when Escape key is pressed
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoPopup && videoPopup.classList.contains('show')) {
      hidePopup();
    }
  });

  // Toggle play/pause when play/pause button is clicked
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlayPause);
  }

  // Toggle mute/unmute when mute button is clicked
  if (muteToggle) {
    muteToggle.addEventListener('click', toggleMute);
  }

  // Update play/pause icon when video ends
  if (popupVideo) {
    popupVideo.addEventListener('ended', updatePlayPauseIcon);
  }
});