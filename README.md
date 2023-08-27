# 영화 리뷰 앱

## 안내사항
- 본 레포지토리를 fork하여 과제를 수행하고, 완료시 PR을 보냅니다.
- 과제의 소스코드는 본인의 GitHub 레포지토리에 **Public**으로 올려주세요.
- 진행 간 문의사항은 이 레포지토리의 Issue로 등록해주세요.
- 구현 내용은 README.md 하단에 이어서 작성해 주세요.

## 기본 요구사항
- 아래 제시된 라이브러리, 프레임워크를 활용하여 영화 리뷰 앱을 구현합니다.
- 일관된 코딩 컨벤션을 유지해주세요.
- 기능 당 커밋은 필수입니다.

### React.JS
- TypeScript로 작성해주세요.
- 별도의`.env` 파일을 사용하여 api호출 주소에 대한 정보를 분리해주세요
   
### Next.JS
- TypeScript로 작성해주세요.
- 별도의`.env` 파일을 사용하여 api호출 주소에 대한 정보를 분리해주세요

### Flutter
- Flutter, Dart 최신 버전을 사용해주세요
- IOS 시뮬레이터 구동을 위한 Xcode가 설치되어 있어야 합니다.

### Svelte
- 최신 버전의 Svelte를 사용해주세요.

<br>

## 백엔드 해커톤을 진행하지 않았을 경우 사용할 수 있는 백엔드 레포 주소
- repo : https://github.com/0BVer/Good-Night-2nd-Hackathon-Backend
- swagger : http://localhost:8080/api/v1/swagger/index.html#/

<br>

## 기능
- [X] 영화 등록 페이지
- [X] 영화 목록
- [X] 영화 수정
- [X] 영화 상세 정보
  - [X] 리뷰 등록
- [X] 어드민 페이지 (추가기능)

### 영화 등록 페이지
> **영화 정보 입력**: 사용자는 영화 정보를 입력할 수 있습니다.
- **장르 선택**: '스릴러', '로맨스', '코믹', '액션' 중 하나를 드롭다운 메뉴에서 선택합니다.
- **개봉일 입력**: Date-Picker 도구를 사용해 개봉일을 선택합니다.
- **상영 종료일 입력**: Date-Picker 도구를 사용해 상영 종료일을 선택합니다.
- **예외처리** : 빈 문자열 및 Null값으로 입력에 대한 등록했을때 안내 메세지를 띄워주세요(추가 기능)

### 영화 목록 페이지
> **영화 목록 표시**: 등록된 영화의 목록을 볼 수 있습니다.
- **영화 추가** : 별도의 추가하기 버튼을 눌러 영화 등록 페이지로 이동합니다.
- **영화 상세 정보 조회**: 영화 항목을 클릭하면 해당 영화의 상세 정보 페이지로 이동합니다.
- **영화 수정**: 각 영화 항목 옆에 있는 '수정' 버튼을 클릭하면 영화 수정 페이지로 이동합니다.
- **영화 삭제**: 각 영화 항목 옆에 있는 '삭제' 버튼을 클릭하면 해당 영화를 삭제할 수 있어야 합니다.
- **필터링 기능**:
    - 장르와 상영 여부를 기준으로 필터링하여 영화 목록을 조회할 수 있어야 합니다.
    - 평점이 n점 이상인 영화만 필터링하여 조회할 수 있어야 합니다. **(추가 기능)**
- **페이지네이션**: 영화 목록은 페이지네이션 기능을 통해 조회됩니다. **(추가 기능)**

### 영화 수정 페이지
> **기존 영화 정보 표시**: 수정 페이지에 접속하면 해당 영화의 기존 정보가 표시됩니다. 사용자는 이 정보를 바탕으로 원하는 부분을 수정할 수 있습니다.

### **영화 상세 정보 페이지**
1. **상제 정보 조회** : 해당 영화의 기존 정보가 표현됩니다.
    - **예외처리** : 존재하지 않는 영화에 대한 정보를 조회 했을때 에러 메세지를 표현해주세요(추가 기능)
2. **리뷰 등록**: 사용자는 영화에 대한 리뷰와 평점을 등록할 수 있습니다.
    - **평점 입력**: 평점은 1~5점 사이에서 1 단위로 선택 가능합니다.
3. **리뷰 목록 조회**: 영화에 대한 리뷰들을 확인할 수 있습니다.
    - **리뷰 필터링**: 평점이 n점 이상인 리뷰만 필터링하여 조회 가능합니다. (추가 기능)

### 어드민 페이지 (추가기능)
> **관리자 모드** : 관리자 모드 버튼을 통해 관리자모드로 전환이 가능합니다.
- 관리자 모드일때만 영화에 대해 추가, 수정, 삭제가 가능해야 합니다.
- 관리자는 리뷰를 작성할 수 없습니다.
- 관리자 상태는 로컬스토리지에 저장하고 관리해주세요

# 기여해주신 분
- [김영준](https://github.com/0BVer)
- [이수현](https://github.com/suhyeon0921)
- [정태원](https://github.com/teawon)
- [백한결](https://github.com/baekhangyeol)
