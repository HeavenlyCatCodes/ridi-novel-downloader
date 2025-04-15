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


# 리디 다운로더

리디 다운로더는 리디북스 소설의 챕터를 다운로드하는 과정을 자동화하기 위해 설계된 크롬 확장 프로그램입니다. 사용자가 여러 챕터를 순차적으로 다운로드하고, 파일 이름을 사용자 지정하며, 시작 에피소드 번호를 설정하고, 다운로드 간 대기 시간을 구성할 수 있습니다.

## 중요

첫 번째 에피소드/챕터에서 다운로드하지 않는 경우 에피소드 번호를 올바르게 설정해야 합니다. 그렇지 않으면 출력 파일 이름이 기본적으로 1부터 시작됩니다. 잠긴 챕터를 다운로드할 때 주의해야 합니다. 잠긴 챕터를 다운로드하려고 하면 빈 페이지만 다운로드됩니다.

---

## 기능

- **순차적 챕터 다운로드**: URL 패턴을 기반으로 챕터를 자동으로 탐색합니다.
- **사용자 지정 파일 이름**: 파일 이름에 사이트 제목과 사용자 지정 에피소드 번호를 포함합니다.
- **시작 에피소드 번호**: 적절한 순차적 번호 매기기를 위해 시작 에피소드 번호를 지정합니다.
- **대기 시간 구성**: 서버 과부하를 방지하기 위해 챕터 다운로드 간 지연 시간을 설정합니다.
- **다운로드 중지**: "다운로드 중지" 버튼을 사용하여 언제든지 프로세스를 중단할 수 있습니다.
- **진행 상황 추적**: 진행 막대와 상태 메시지로 다운로드 진행 상황을 표시합니다.

---

## 설치

1. Releases에서 확장 프로그램 패키지를 다운로드하고 폴더에 압축을 풉니다.

2. Chrome을 열고 `chrome://extensions/`로 이동합니다.

3. **개발자 모드**를 활성화합니다(오른쪽 상단 모서리의 토글).

4. **압축 해제된 확장 프로그램 로드**를 클릭하고 압축을 푼 파일이 포함된 폴더를 선택합니다.

---

## 사용법

### 1. 챕터 페이지 열기
리디북스 챕터 페이지로 이동합니다(예: `https://ridibooks.com/books/3170039150/view`).

### 2. 설정 구성
팝업에서:
- **시작 에피소드 번호**를 설정합니다(예: 첫 번째 에피소드는 `1`, 열 번째는 `10`).
- 다운로드하려는 **챕터 수**를 입력합니다.
- 다운로드 간 **대기 시간**(초 단위)을 지정합니다.

### 3. 다운로드 시작
**다운로드 시작**을 클릭하여 순차적으로 챕터 다운로드를 시작합니다.

### 4. 다운로드 중지
언제든지 **다운로드 중지**를 클릭하여 추가 처리를 중단합니다.

---

## 파일 이름 지정 규칙

다운로드된 파일은 다음과 같이 이름이 지정됩니다:
```
[에피소드 번호]_[챕터 제목].txt
```
예시:
- `1_수라전설_序.txt`
- `2_수라전설_序.txt`

시작 에피소드 번호를 `10`으로 설정하면 파일 이름은 다음과 같습니다:
- `10_수라전설_序.txt`
- `11_수라전설_序.txt`

---

## 설정 개요

### 시작 에피소드 번호
에피소드 번호 매기기가 시작되는 번호를 설정합니다.

### 챕터 수
순차적으로 다운로드하려는 챕터 수를 지정합니다.

### 대기 시간
원활한 작동을 위해 다운로드 간 지연 시간을 설정합니다.

---

### URL 탐색 작동 방식
확장 프로그램은 URL 패턴을 기반으로 챕터를 식별합니다:
```
https://ridibooks.com/books/[Chapter ID]/view
```
각 후속 챕터에 대해 `[Chapter ID]`를 증가시킵니다.

### 파일 이름 생성 방법
파일 이름에는 다음이 포함됩니다:
1. 각 챕터마다 증가하는 사용자 정의 시작 에피소드 번호.
2. 페이지에서 추출한 챕터 제목(`document.title`).

---

## 기여

기여는 환영합니다! 문제를 발견하거나 개선을 위한 제안이 있으면 이슈를 열거나 풀 리퀘스트를 제출해 주세요.

---

## 라이선스

이 프로젝트는 MIT 라이선스에 따라 라이선스가 부여됩니다.

