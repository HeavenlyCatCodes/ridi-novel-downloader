// Function to extract text content from the current page
function extractTextFromPage() {
  try {
    // Get the title (e.g., "1화" - Chapter 1)
    const chapterTitle = document.querySelector('h1, h2, h3')?.textContent || 
                         document.title || 
                         '수라전설_chapter';
    
    // Extract content
    let textContent = '';
    const textElements = document.querySelectorAll('p, div:not(:has(*))');
    textElements.forEach(element => {
      const text = element.textContent.trim();
      if (text && text.length > 1) {
        textContent += text + '\n\n';
      }
    });
    
    return {
      title: chapterTitle,
      content: textContent.trim()
    };
  } catch (error) {
    console.error('Error extracting text:', error);
    return null;
  }
}

// Function to save text as a .txt file
function saveText(filename, text) {
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Function to get next chapter URL by incrementing ID in the current URL
function getNextChapterUrl() {
  try {
    const currentUrl = window.location.href;
    
    // Extract the ID using regex - matches numbers before /view
    const match = currentUrl.match(/\/books\/(\d+)\/view/);
    
    if (match && match[1]) {
      const currentId = parseInt(match[1]);
      const nextId = currentId + 1;
      
      // Construct the next chapter URL
      return currentUrl.replace(/\/books\/\d+\/view/, `/books/${nextId}/view`);
    }
    
    return null;
  } catch (error) {
    console.error('Error generating next chapter URL:', error);
    return null;
  }
}

// Function to navigate to a URL and return a promise that resolves when page is loaded
function navigateToUrl(url) {
  return new Promise((resolve) => {
    // Add a one-time event listener for the load event
    window.addEventListener('load', function loadHandler() {
      window.removeEventListener('load', loadHandler);
      setTimeout(resolve, 2000); // Give an additional 2 seconds after load event
    }, { once: true });
    
    // Navigate to the URL
    window.location.href = url;
  });
}

// Auto-scroll function to ensure all content is loaded
function autoScrollPage() {
  return new Promise(resolve => {
    let totalHeight = 0;
    let distance = 100;
    let timer = setInterval(() => {
      window.scrollBy(0, distance);
      totalHeight += distance;
      
      if (totalHeight >= document.body.scrollHeight) {
        clearInterval(timer);
        window.scrollTo(0, 0);
        setTimeout(resolve, 500);
      }
    }, 100);
  });
}

// Main function to download multiple episodes using URL incrementing
async function downloadMultipleChapters(maxChapters = 20) {
  let chapterCount = 0;
  let continueDownloading = true;
  
  // Show a floating status indicator
  const statusIndicator = document.createElement('div');
  statusIndicator.style.position = 'fixed';
  statusIndicator.style.top = '10px';
  statusIndicator.style.right = '10px';
  statusIndicator.style.padding = '10px';
  statusIndicator.style.background = 'rgba(0, 0, 0, 0.7)';
  statusIndicator.style.color = 'white';
  statusIndicator.style.borderRadius = '5px';
  statusIndicator.style.zIndex = '9999';
  statusIndicator.style.fontFamily = 'Arial, sans-serif';
  document.body.appendChild(statusIndicator);
  
  while (continueDownloading && chapterCount < maxChapters) {
    try {
      // Update status
      statusIndicator.textContent = `Downloading chapter ${chapterCount + 1}/${maxChapters}...`;
      
      // Wait to ensure content is loaded
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Auto-scroll to ensure all content is loaded
      await autoScrollPage();
      
      // Extract content from current page
      const extractedData = extractTextFromPage();
      
      if (extractedData) {
        // Create filename with chapter number
        const chapterNum = (chapterCount + 1).toString().padStart(3, '0');
        const fileName = `${chapterNum}_${extractedData.title.replace(/[^a-z0-9가-힣]/gi, '_')}.txt`;
        
        // Save the file
        saveText(fileName, extractedData.content);
        console.log(`Downloaded chapter ${chapterCount + 1}: ${extractedData.title}`);
        
        // Increment chapter counter
        chapterCount++;
        
        // If we've reached the maximum chapters, stop
        if (chapterCount >= maxChapters) {
          break;
        }
        
        // Get the next chapter URL
        const nextChapterUrl = getNextChapterUrl();
        
        if (nextChapterUrl) {
          console.log(`Navigating to next chapter: ${nextChapterUrl}`);
          
          // Store reference to current window to check if navigation was successful
          const currentWindowLocation = window.location.href;
          
          // Navigate to the next chapter
          window.location.href = nextChapterUrl;
          
          // Wait for navigation to complete (can't use await navigateToUrl here due to page reload)
          await new Promise(resolve => setTimeout(resolve, 5000));
          
          // The following code won't execute until next execution due to page navigation
        } else {
          console.log('Could not determine next chapter URL');
          continueDownloading = false;
        }
      } else {
        console.log('Failed to extract content from current page');
        continueDownloading = false;
      }
    } catch (error) {
      console.error('Error during download process:', error);
      continueDownloading = false;
    }
  }
  
  // Update final status
  statusIndicator.textContent = `Downloaded ${chapterCount} chapters successfully!`;
  setTimeout(() => {
    document.body.removeChild(statusIndicator);
  }, 5000);
  
  return chapterCount;
}
