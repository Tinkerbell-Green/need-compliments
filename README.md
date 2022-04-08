<p align="center"><img alt="칭찬이 필요해 로고" src="https://user-images.githubusercontent.com/65804460/161986602-8d788136-d40d-4a0c-8cd6-93e0d90b58de.png" width=150/></p>

<p align="center">일상을 칭찬으로 기록하고 공유하는 칭찬 커뮤니티</p>

### <p align="center">✨칭찬이 필요해✨</p>
> ## 한눈에 보기
> 리드미 작성자 :   
> [서비스 소개](https://github.com/Tinkerbell-Green/need-compliments/blob/master/README.md#서비스-소개)  
> [주요 기능](https://github.com/Tinkerbell-Green/need-compliments/blob/master/README.md#주요-기능)  
> [역할](https://github.com/Tinkerbell-Green/need-compliments/blob/master/README.md#역할)  
> [배포 히스토리](https://github.com/Tinkerbell-Green/need-compliments/blob/master/README.md#배포-히스토리)
## 서비스 소개
[칭찬이 필요해 바로 사용해보기🏃🏻‍♀️](https://need-compliments.vercel.app/)

### 탄생 배경
👥👥 : **"너무 당연한 일이라 그닥 칭찬받을만한지 모르겠네요"**  

당연한 일은 칭찬하면 안되는걸까? 라는 생각에서 시작된 서비스입니다.  

이 생각을 시작으로  
스스로 칭찬하고 사람들과 나누는 과정에서 자기긍정감을 높일 수 있는 선순환 커뮤니티를 생각하게 되었습니다.

### 기술 스택
<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-v4.5.5-blue?style=for-the-badge&logo=TypeScript"/>
  <img src="https://img.shields.io/badge/React-v17.0.2-blue?style=for-the-badge&logo=React"/>
  <img src="https://img.shields.io/badge/Styled component-v5.3.3-DB7093?style=for-the-badge&logo=styled-components"/>
  <img src="https://img.shields.io/badge/Next.js-v12.0.10-000000?style=for-the-badge&logo=Next.js"/>
  <img src="https://img.shields.io/badge/redux-v4.1.2-764ABC?style=for-the-badge&logo=Redux"/>
  <img src="https://img.shields.io/badge/redux saga-v1.1.3-764ABC?style=for-the-badge&logo=Redux-Saga"/>
  <img src="https://img.shields.io/badge/firebase-v9.6.7-FFCA28?style=for-the-badge&logo=Firebase"/>
  <img src="https://img.shields.io/badge/Vercel-deploy-000000?style=for-the-badge&logo=Vercel"/>
</p>

## 주요 기능
### 로그인
![로그인](https://user-images.githubusercontent.com/65804460/162002994-ba307e62-9ea4-4499-842d-9c0e1a0859b2.png)
- next-auth를 사용하여 구글, 네이버, 카카오톡 OAuth인증을 통해 로그인할 수 있습니다.  
- 회원에 한하여 글 작성이 가능합니다.

<br>

### 전체글 모아보기
![홈(전체글)페이지](https://user-images.githubusercontent.com/65804460/162003387-0abd4b4c-15dc-41bf-b984-a8fa9a048698.gif)
- 사용자들의 칭찬 기록을 모아볼 수 있는 게시판입니다.
- 비회원이어도 볼 수 있습니다.
- 사용자가 전체공개로 설정한 기록에 한하여 공개됩니다.
- 회원에 한하여 리액션 버튼을 통해 기록에 반응을 보일 수 있습니다. (구현 중)  

<br>

### 내 피드
1. 기록을 한눈에 볼 수 있는 캘린더와 칭찬 추가하기
![QuickTime movie](https://user-images.githubusercontent.com/65804460/162006923-386a92bb-173e-42b9-a679-409e124d807a.gif)
- 캘린더 형식으로 내가 작성한 칭찬기록을 효과적으로 시각화하였습니다.
- 캘린더의 날짜를 클릭하여 해당 날의 기록을 추가할 수 있습니다.
- 내가 한 일을 떠올리며 스스로 기록을 추가하는 컨셉에 맞춰 미래날짜를 클릭하면 추가버튼이 비활성화됩니다.  

2. 기록 수정, 삭제하기
![QuickTime movie](https://user-images.githubusercontent.com/65804460/162007593-d4ed10d9-2521-489c-8283-d7b425b9e983.gif)
- 모달창을 통해 기록을 수정, 삭제할 수 있습니다.  

<br>

### 목표 관리하기
<img width="1256" alt="스크린샷 2022-04-01 오전 3 19 22" src="https://user-images.githubusercontent.com/65804460/162264592-0f6b136c-ddfa-45a2-8de9-cfa52eadc9f5.png">
- 목표 페이지에서 나의 목표를 수정,추가할 수 있습니다.

<br>

### 목표 수정하기
<img width="1381" alt="목표상세관리 페이지" src="https://user-images.githubusercontent.com/65804460/162264914-43fe19d3-ad91-47b2-80d7-a7c750c0fbd1.png">
- 해당 목표를 수정, 삭제하거나 새로운 목표를 만들 수 있습니다.
- 목표설정 시, 공개범위를 설정할 수 있습니다. 전체공개로 설정한 목표에 속한 나의 칭찬들만 전체글 페이지에 표시됩니다.

<br>

### 설정 페이지
<img width="1363" alt="설정페이지" src="https://user-images.githubusercontent.com/65804460/162265267-540ed8e0-0412-436b-8765-1000348ada75.png">
- 로그인한 사용자가 로그아웃, 탈퇴할 수 있습니다.
- 연동된 이메일과 이름을 확인할 수 있습니다.

<br>

### 반응형 페이지
(작성 중)

<br>

### 웹 접근성 개선
(작성 중)

<br>

## 역할
### 공통
- 각종 컨벤션 의논
  - 변수이름, 폴더구조 (Atomic Design), Git 플로우, Git 커밋 메시지 등 

### 성은지
- (작성중)

### 이홍빈 
- 와이어프레임, 일정 조율, 배포
- 전체공개 글을 모두 보여주는 전체글 페이지 구현
- 캘린더와 기록 추가,삭제,수정이 가능한 내 피드 페이지 구현
- redux saga를 이용한 deleteUser, getGoalsByIds saga 작성
- 서비스 전반의 웹 접근성 개선

### 박재현 
- 전역 상태관리, 데이터 통신에 대한 전반적인 작업 
  - redux saga 로 firestore 와 데이터 통신
  - 데이터 통신 작업을 위한 hook 작성 (React Query 를 흉내)
  - redux 를 이용한 서버사이드에서의 데이터 통신과 SSR 구현
- authentication, authorization 관련 provider 

## 배포 히스토리
### v1.0.0(22.03.24)
- 개인사용자 위주의 기능 배포
   - 유저 회원가입(로그인,로그아웃, 탈퇴)
   - 목표(추가,수정,삭제)
   - 내피드(기록 추가,수정,삭제)  
   
   
### v2.0.0(22.04.04) ✅latest
- 사용성 개선, 전체글 페이지 추가 
  - Global Navigation Bar 추가
  - 전체글 페이지(비회원도 읽을 수 있는 컨텐츠) 추가
  - safari애서 svg안보임 현상 수정


### v2.1.0 ✔️be planned
- SEO를 고려한 SSR처리, 리액션 기능 추가 

<br>
