# 🏫 학교 분실물 센터

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fjoko8145%2FSchool_Lost_Found&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

우리 학교 학생들과 교직원들을 위한 분실물 관리 및 조회 웹 애플리케이션입니다. 잃어버린 물건을 쉽게 찾고, 습득한 물건을 편리하게 등록할 수 있도록 돕습니다.

## ✨ 주요 기능

*   **분실물 등록:** Google Forms를 통해 사진을 포함한 분실물 정보를 간편하게 등록합니다. (조회 페이지에서 등록 안내 페이지로 이동 가능)
*   **분실물 조회 및 검색:** 웹 앱을 통해 등록된 분실물을 키워드로 검색하고 목록으로 확인할 수 있습니다.
*   **페이징:** 많은 분실물도 효율적으로 탐색할 수 있도록 페이지를 나누어 보여줍니다.

## 🛠️ 기술 스택

*   프론트엔드 (분실물 조회): HTML, CSS, JavaScript
*   백엔드 (분실물 조회 로직): Google Apps Script
*   데이터베이스: Google Sheets
*   분실물 등록 인터페이스: Google Forms
*   버전 관리: Git, GitHub
*   등록 안내 페이지 호스팅: GitHub Pages

## 🚀 시작하기 (사용 방법)

### 1. 분실물 조회 및 등록하기

1.  **[학교 분실물 센터 바로가기](https://script.google.com/macros/s/AKfycbyYoAuAmyHcJT_Ky7wAOaWqcrVpMhFxCUxA_X856EmV3EsDAgUtbyS_c5Vd0KTFm7BK/exec)** 에 접속합니다.
    *   *(위 링크는 새로운 앱스 스크립트 웹 앱 URL로 수정되었습니다.)*
2.  **분실물 조회:** 등록된 분실물 목록을 확인하고, 검색창을 이용하여 원하는 물품을 찾아보세요.
3.  **분실물 등록:** 페이지 내의 "분실물 등록하기" 버튼을 클릭하면 등록 안내 페이지로 이동합니다. 해당 페이지의 안내에 따라 Google Forms 양식을 작성하여 제출합니다.
    *   등록 안내 페이지 직접 접속: [https://joko8145.github.io/School_Lost_Found/apps-script-project/register_page.html](https://joko8145.github.io/School_Lost_Found/apps-script-project/register_page.html)
    *   Google Form 직접 접속: [https://docs.google.com/forms/d/e/1FAIpQLSeX6J5pEMevHP3CVcM4nalMhxhAQDCfbXTJDNWImXxTHrkZAQ/viewform](https://docs.google.com/forms/d/e/1FAIpQLSeX6J5pEMevHP3CVcM4nalMhxhAQDCfbXTJDNWImXxTHrkZAQ/viewform)


## 🔧 프로젝트 설정 및 구조 (개발자 참고)

*   **로컬 프로젝트 폴더 구조:**
    ```
    school-lost-and-found/
    ├── apps-script-project/       # Google Apps Script 프로젝트 파일 및 등록 안내 페이지
    │   ├── Code.gs
    │   ├── index.html
    │   └── register_page.html
    └── README.md
    ```
*   **Google Apps Script (`Code.gs`):**
    *   `SPREADSHEET_ID` (현재: `1nrdJVkWkq16yVhfSd6tPC6ZdPODYFzSlrq8WZRc0rec`) 및 `DATA_SHEET_NAME` (현재: `분실물_데이터베이스`)을 실제 Google Sheets 정보로 설정해야 합니다.
    *   `template.registerPageUrl` (현재: `https://joko8145.github.io/School_Lost_Found/apps-script-project/register_page.html`)에 `register_page.html`의 GitHub Pages URL을 정확히 입력해야 합니다.
*   **Google Forms (URL: `https://docs.google.com/forms/d/e/1FAIpQLSeX6J5pEMevHP3CVcM4nalMhxhAQDCfbXTJDNWImXxTHrkZAQ/viewform`):**
    *   사진 첨부가 가능한 등록 양식을 만들고, 응답을 Google Sheets에 저장하도록 설정합니다.
    *   폼의 공유 링크를 `register_page.html`에 사용합니다.
*   **`register_page.html` (호스팅 URL: `https://joko8145.github.io/School_Lost_Found/apps-script-project/register_page.html`):**
    *   Google Form 공유 링크와 앱스 스크립트 조회 웹 앱 URL(현재: `https://script.google.com/macros/s/AKfycbyYoAuAmyHcJT_Ky7wAOaWqcrVpMhFxCUxA_X856EmV3EsDAgUtbyS_c5Vd0KTFm7BK/exec`)을 정확히 입력해야 합니다.

## 🖼️ 스크린샷 (선택 사항)

*   조회 화면: `[이미지 URL]`
*   등록 안내 화면: `[이미지 URL]`

---