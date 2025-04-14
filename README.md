# Ridi Downloader

Ridi Downloader is a Chrome extension designed to automate the process of downloading chapters from Ridibooks novels. It allows users to download multiple chapters sequentially, customize file names, set a starting episode number, and configure wait times between downloads.

## Important

You must set the episode number correctlly if you are not downloading from first episode/chapter otherwise the output file names will start from 1 by default. You must be careful while downloading locked chapters. It'll just download blank page if you try to download locked chapters.

---

## Features

- **Sequential Chapter Download**: Automatically navigates through chapters based on URL patterns.
- **Custom File Naming**: Includes the site title and custom episode numbers in file names.
- **Starting Episode Number**: Specify the starting episode number for proper sequential numbering.
- **Wait Time Configuration**: Set a delay between downloading chapters to avoid server overload.
- **Stop Download**: Halt the process at any time using the "Stop Download" button.
- **Progress Tracking**: Displays download progress with a progress bar and status messages.

---

## Installation

1. Download the exetension package from Releases and extract it to a folder.

2. Open Chrome and navigate to `chrome://extensions/`.

3. Enable **Developer mode** (toggle in the top-right corner).

4. Click **Load unpacked** and select the folder containing the extracted files.

---

## Usage

### 1. Open a Chapter Page
Navigate to a Ridibooks chapter page (e.g., `https://ridibooks.com/books/3170039150/view`).

### 2. Configure Settings
In the popup:
- Set the **Starting Episode Number** (e.g., `1` for first episode, `10` for tenth).
- Enter the **Number of Chapters** you want to download.
- Specify the **Wait Time** between downloads (in seconds).

### 3. Start Download
Click **Start Download** to begin downloading chapters sequentially.

### 4. Stop Download
Click **Stop Download** at any time to halt further processing.

---

## File Naming Convention

The downloaded files will be named as follows:
```
[Episode Number]_[Chapter Title].txt
```
For example:
- `1_수라전설_序.txt`
- `2_수라전설_序.txt`

If you set the starting episode number to `10`, files will be named:
- `10_수라전설_序.txt`
- `11_수라전설_序.txt`

---

## Settings Overview

### Starting Episode Number
Set the number from which episode numbering begins.

### Number of Chapters
Specify how many chapters you want to download sequentially.

### Wait Time
Set a delay between downloads to ensure smooth operation.

---


### How URL Navigation Works
The extension identifies chapters based on their URL pattern:
```
https://ridibooks.com/books/[Chapter ID]/view
```
It increments the `[Chapter ID]` for each subsequent chapter.

### How File Names Are Generated
The file name includes:
1. The user-defined starting episode number incremented for each chapter.
2. The chapter title extracted from the page (`document.title`).

---

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License. 
