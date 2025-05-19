# 🏫 학교 분실물 찾아줌 (School Lost & Found Helper)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fjoko8145%2FSchool_Lost_Found&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com) <!-- 방문자 수 카운터 (선택 사항) -->

우리 학교 학생들과 교직원들을 위한 분실물 관리 및 조회 웹 애플리케이션입니다. 잃어버린 물건을 쉽게 찾고, 습득한 물건을 편리하게 등록할 수 있도록 돕습니다.

## ✨ 주요 기능

*   **분실물 등록:**
    *   Google Forms를 통해 간편하게 습득한 분실물의 정보(물품명, 카테고리, 발견 장소, 특징, 사진 등)를 등록할 수 있습니다.
    *   등록된 정보는 Google Sheets에 안전하게 저장됩니다.
*   **분실물 조회 및 검색:**
    *   웹 앱을 통해 등록된 분실물 목록을 확인할 수 있습니다.
    *   물품명, 카테고리, 특징 등 다양한 키워드로 분실물을 검색할 수 있습니다.
    *   페이징 기능을 통해 많은 양의 분실물도 효율적으로 탐색할 수 있습니다.
*   **사진 확인:**
    *   등록 시 첨부된 분실물 사진 링크를 통해 실제 물품의 모습을 확인할 수 있습니다. (Google Drive 연동)

## 🛠️ 기술 스택

*   **프론트엔드 (분실물 조회):** HTML, CSS, JavaScript
*   **백엔드 (분실물 조회 로직):** Google Apps Script
*   **데이터베이스:** Google Sheets
*   **분실물 등록 인터페이스:** Google Forms
*   **버전 관리:** Git, GitHub
*   **등록 안내 페이지 호스팅 (예시):** GitHub Pages (또는 Netlify, Vercel 등)

## 🚀 시작하기 (사용 방법)

### 1. 분실물 등록하기

1.  **[분실물 등록 안내 페이지 바로가기](YOUR_REGISTER_PAGE_HOSTED_URL_HERE)** 에 접속합니다.
    *   *(위 링크의 `YOUR_REGISTER_PAGE_HOSTED_URL_HERE` 부분을 실제 `register_page.html`이 호스팅된 URL로 변경해주세요.)*
2.  페이지 내의 "분실물 등록 양식 열기" 버튼을 클릭합니다.
3.  새 창 또는 탭에서 Google Forms 양식이 열립니다.
4.  양식에 따라 물품명, 카테고리, 발견 장소, 특징 등을 자세히 입력하고, 필요한 경우 사진을 첨부합니다.
5.  "제출" 버튼을 클릭하여 등록을 완료합니다.

### 2. 분실물 조회 및 검색하기

1.  **[분실물 조회 웹 앱 바로가기](YOUR_APPS_SCRIPT_WEB_APP_URL_HERE)** 에 접속합니다.
    *   *(위 링크의 `YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` 부분을 실제 배포된 Google Apps Script 웹 앱 URL로 변경해주세요.)*
2.  등록된 분실물 목록이 나타납니다.
3.  상단의 검색창에 찾고 싶은 물품의 키워드(물품명, 카테고리, 특징 등)를 입력하고 "검색" 버튼을 클릭합니다.
4.  검색 결과가 목록에 표시됩니다.
5.  필요한 경우 페이지 하단의 페이징 버튼을 사용하여 다른 페이지의 목록을 확인할 수 있습니다.

## 🔧 프로젝트 설정 및 구조 (개발자 참고)

*   **로컬 프로젝트 폴더 구조:**
    ```
    school-lost-and-found/
    ├── register_page.html         # 분실물 등록 안내 페이지
    └── apps-script-project/       # Google Apps Script 프로젝트 파일
        ├── Code.gs                # 서버 사이드 로직
        └── index.html             # 분실물 조회 페이지 HTML
    └── README.md                  # 프로젝트 설명
    └── .gitignore                 # Git 추적 제외 목록
    ```
*   **Google Apps Script 설정:**
    *   `Code.gs` 파일 내 `SPREADSHEET_ID`와 `DATA_SHEET_NAME` 변수를 실제 사용하는 Google Sheets 정보로 정확히 설정해야 합니다.
    *   웹 앱 배포 시 "액세스 권한이 있는 사용자" 설정을 적절히 선택해야 합니다. (예: "모든 사용자")
*   **Google Forms 설정:**
    *   분실물 등록용 Google Form을 생성하고, 응답이 Google Sheets에 저장되도록 설정합니다.
    *   파일 업로드 질문을 포함하여 사진 첨부가 가능하도록 합니다.
    *   생성된 Google Form의 **공유 링크**를 `register_page.html` 및 `README.md`에 사용합니다.

## 🖼️ 스크린샷 (선택 사항)

*(이 부분에 앱의 주요 화면 스크린샷 이미지를 추가하면 좋습니다. GitHub에 이미지를 업로드하고 링크하거나, 이슈 등에 이미지를 올리고 그 링크를 사용할 수 있습니다.)*

*   **분실물 조회 화면 예시:**
    `![조회 화면](URL_TO_YOUR_SCREENSHOT_IMAGE_1)`
*   **분실물 등록 안내 페이지 예시:**
    `![등록 안내 화면](URL_TO_YOUR_SCREENSHOT_IMAGE_2)`

## 🤝 기여 방법 (선택 사항 - 오픈소스 프로젝트라면)

이 프로젝트에 기여하고 싶으시다면, 다음 절차를 따라주세요:

1.  이 저장소를 Fork합니다.
2.  새로운 기능이나 버그 수정을 위한 브랜치를 만듭니다. (`git checkout -b feature/AmazingFeature` 또는 `git checkout -b fix/SomeBug`)
3.  변경 사항을 커밋합니다. (`git commit -m 'Add some AmazingFeature'`)
4.  만든 브랜치로 푸시합니다. (`git push origin feature/AmazingFeature`)
5.  Pull Request를 생성합니다.

## 📜 라이선스 (선택 사항)

이 프로젝트는 [MIT 라이선스](LICENSE.md) 하에 배포됩니다. (라이선스 파일을 추가하고 싶다면 `LICENSE.md` 파일을 만들고 해당 라이선스 내용을 넣어주세요. MIT는 가장 일반적인 오픈소스 라이선스 중 하나입니다.)

---

**작성 후 할 일:**

1.  **`YOUR_REGISTER_PAGE_HOSTED_URL_HERE` 부분을 실제 `register_page.html`이 호스팅된 URL로 반드시 변경해주세요.**
2.  **`YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` 부분을 실제 배포된 Google Apps Script 웹 앱 URL로 반드시 변경해주세요.**
3.  **(선택 사항)** "스크린샷" 섹션에 실제 앱의 스크린샷 이미지 링크를 추가합니다.
4.  **(선택 사항)** "라이선스" 섹션을 사용하려면 `LICENSE.md` 파일을 만들고 내용을 채워 넣습니다. (예: [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT) 에서 MIT 라이선스 템플릿 복사)
5.  이 내용을 로컬 `school_lost_found` 폴더에 `README.md` 라는 이름의 파일로 저장합니다.
6.  터미널에서 다음 명령을 실행하여 GitHub에 푸시합니다:
    ```bash
    git add README.md
    git commit -m "Docs: Add initial README.md file"
    git push origin main
    ```

**추가 팁:**

*   **간결하고 명확하게:** 너무 길거나 복잡한 설명보다는 핵심 내용을 쉽게 이해할 수 있도록 작성합니다.
*   **마크다운 문법 활용:** 제목, 목록, 링크, 코드 블록 등 마크다운 문법을 적절히 사용하여 가독성을 높입니다. ([마크다운 가이드](https://gist.github.com/ihoneymon/652be052a0727ad59601) 참고)
*   **지속적인 업데이트:** 프로젝트가 변경되거나 새로운 기능이 추가될 때마다 `README.md` 파일도 함께 업데이트해주는 것이 좋습니다.
*   **방문자 카운터 (Hits):** 예시에 포함된 `[![Hits](...)](...)` 부분은 GitHub 저장소 방문자 수를 보여주는 배지입니다. [hits.seeyoufarm.com](https://hits.seeyoufarm.com/) 에서 본인 저장소에 맞게 생성하여 사용할 수 있습니다. (필수는 아닙니다.)

이 템플릿을 바탕으로 프로젝트에 맞게 내용을 채워 넣으시면 훌륭한 `README.md` 파일을 만드실 수 있을 겁니다!