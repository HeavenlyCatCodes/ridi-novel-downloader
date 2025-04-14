let downloadState = {
  inProgress: false,
  currentChapter: 0,
  maxChapters: 0,
  baseUrl: '',
  currentId: 0,
  startEpisodeNumber: 1 // Default starting episode number
};

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'startMultipleDownload') {
    startMultiChapterDownload(
      message.tabId, 
      message.episodeCount,
      message.waitTime,
      message.startEpisodeNumber
    );
  } else if (message.action === 'stopDownload') {
    stopDownloadProcess();
  }
});

// Function to stop the download process
function stopDownloadProcess() {
  downloadState.inProgress = false;
  console.log('Download process stopped.');
}

// Function to start the multi-chapter download process
function startMultiChapterDownload(tabId, chapterCount, waitTime, startEpisodeNumber) {
  chrome.tabs.get(tabId, function (tab) {
    const urlMatch = tab.url.match(/\/books\/(\d+)\/view/);

    if (urlMatch && urlMatch[1]) {
      // Initialize download state
      downloadState = {
        inProgress: true,
        currentChapter: 0,
        maxChapters: chapterCount,
        baseUrl: tab.url.replace(/\/books\/\d+\/view/, '/books/'),
        currentId: parseInt(urlMatch[1]),
        startEpisodeNumber: startEpisodeNumber || 1
      };

      // Start the first download
      downloadCurrentChapter(tabId, waitTime);
    } else {
      console.error('Invalid URL format. Please open a valid chapter page.');
    }
  });
}

// Function to download the current chapter
function downloadCurrentChapter(tabId, waitTime) {
  if (!downloadState.inProgress) return;

  chrome.scripting.executeScript({
    target: { tabId },
    func: extractAndDownloadCurrentChapter,
    args: [
      downloadState.currentChapter,
      downloadState.startEpisodeNumber
    ]
  }).then(() => {
    setTimeout(() => {
      continueDownload(tabId, waitTime);
    }, waitTime * 1000);
  });
}

// Function to continue to the next chapter
function continueDownload(tabId, waitTime) {
  if (!downloadState.inProgress) return;

  downloadState.currentChapter++;
  downloadState.currentId++;

  if (downloadState.currentChapter < downloadState.maxChapters) {
    const nextUrl = `${downloadState.baseUrl}${downloadState.currentId}/view`;

    chrome.tabs.update(tabId, { url: nextUrl }, function () {
      setTimeout(() => {
        downloadCurrentChapter(tabId, waitTime);
      }, 3000);
    });
  } else {
    console.log(`Downloaded ${downloadState.currentChapter} chapters successfully.`);
    downloadState.inProgress = false;
    chrome.runtime.sendMessage({
      action: 'downloadComplete',
      chaptersDownloaded: downloadState.currentChapter,
    });
  }
}

// This function will be injected into the page to extract and download content
function extractAndDownloadCurrentChapter(chapterNumber, startEpisodeNumber) {
  try {
    // Extract chapter title and content
    const chapterTitle =
      document.querySelector('h1, h2, h3')?.textContent || document.title || 'Untitled Chapter';
    
    let textContent = '';
    document.querySelectorAll('p').forEach((p) => {
      textContent += p.textContent.trim() + '\n\n';
    });

    // Calculate the actual episode number based on the starting number
    const episodeNumber = parseInt(startEpisodeNumber) + chapterNumber;
    
    // Create filename with customized episode number
    const fileName = `${episodeNumber}_${chapterTitle.replace(/[^a-z0-9가-힣]/gi, '_')}.txt`;
    
    // Create a blob and trigger file download
    const blob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    
    console.log(`Downloaded chapter ${episodeNumber}: ${chapterTitle}`);
    
    return true;
  } catch (error) {
    console.error('Error extracting or downloading content:', error);
    return false;
  }
}
