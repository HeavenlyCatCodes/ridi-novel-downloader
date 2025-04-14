document.addEventListener('DOMContentLoaded', function () {
  const downloadMultipleBtn = document.getElementById('downloadMultiple');
  const stopDownloadBtn = document.getElementById('stopDownload');
  const startEpisodeNumberInput = document.getElementById('startEpisodeNumber');
  const episodeCountInput = document.getElementById('episodeCount');
  const waitTimeInput = document.getElementById('waitTime');
  const progressBar = document.getElementById('progressBar');
  const statusMessage = document.getElementById('statusMessage');

  let stopDownload = false;

  // Load saved settings
  chrome.storage.sync.get({
    startEpisodeNumber: 1,
    episodeCount: 20,
    waitTime: 3
  }, function(items) {
    startEpisodeNumberInput.value = items.startEpisodeNumber;
    episodeCountInput.value = items.episodeCount;
    waitTimeInput.value = items.waitTime;
  });
  
  // Save settings when changed
  startEpisodeNumberInput.addEventListener('change', saveSettings);
  episodeCountInput.addEventListener('change', saveSettings);
  waitTimeInput.addEventListener('change', saveSettings);
  
  function saveSettings() {
    chrome.storage.sync.set({
      startEpisodeNumber: startEpisodeNumberInput.value,
      episodeCount: episodeCountInput.value,
      waitTime: waitTimeInput.value
    });
  }
  
  // Start downloading multiple chapters
  downloadMultipleBtn.addEventListener('click', function () {
    stopDownload = false;
    const startEpisodeNumber = parseInt(startEpisodeNumberInput.value);
    const episodeCount = parseInt(episodeCountInput.value);
    const waitTime = parseInt(waitTimeInput.value);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.runtime.sendMessage({
        action: 'startMultipleDownload',
        tabId: tabs[0].id,
        startEpisodeNumber: startEpisodeNumber,
        episodeCount: episodeCount,
        waitTime: waitTime
      });
    });
  });

  // Stop downloading chapters
  stopDownloadBtn.addEventListener('click', function () {
    stopDownload = true;
    chrome.runtime.sendMessage({ action: 'stopDownload' });
  });

  // Listen for progress updates
  chrome.runtime.onMessage.addListener(function (message) {
    if (message.action === 'downloadProgress') {
      const progressPercentage = (message.current / message.total) * 100;
      progressBar.style.width = `${progressPercentage}%`;

      if (message.current === message.total) {
        showStatus(`Downloaded ${message.total} chapters successfully!`, 'success');
      } else {
        showStatus(`Downloading episode ${message.current}/${message.total}...`);
      }
    } else if (message.action === 'downloadError') {
      showStatus(`Error: ${message.error}`, 'error');
    } else if (message.action === 'downloadComplete') {
      showStatus(`Downloaded ${message.chaptersDownloaded} chapters successfully!`, 'success');
    }
  });

  function showStatus(message, type = '') {
    statusMessage.textContent = message;
    statusMessage.className = 'status-message';
    if (type === 'success') {
      statusMessage.style.color = 'green';
    } else if (type === 'error') {
      statusMessage.style.color = 'red';
    } else {
      statusMessage.style.color = 'black';
    }
  }
});
