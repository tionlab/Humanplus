# 📦 폐지지원대 (HumanPlus)

> 제 8 회 전국 고등학교 동아리 소프트웨어 경진대회에서 인기상을 수상한 폐지지원대 어플리케이션 프로젝트의 원본 소스코드 리포지토리 입니다.

폐지로 생계를 유지하시는 어르신들을 위한 폐지 위치 정보 제공 애플리케이션

## 프로젝트 소개

-   2023 고등학교 동아리 디지털연구소 2학년 프로젝트
-   Next.js (frontend), Node.js & Express (backend), React Native & Expo (webview, build) 사용
-   어르신들이 쉽게 사용하고 폐지 주울 때 실질적으로 도움이 되는 간편한 앱을 개발하고자 함.

## 수상/전시 내역

-   🏆 전국 고등학교 동아리 소프트웨어 경진대회 **인기상** 수상
    -   주최 : 과학기술정보통신부, 정보통신기획평가원
    -   주관 : KAIST SW교육센터, 우송대학교 SW중심대학사업단, 충남대학교 소프트웨어중심대학사업단, 배제대학교 AI·SW중심대학사업단, 국립한밭대학교 SW중심대학사업단
-   🖼️ 2023 인천소프트웨어(SW) 미래채움 교육 페스티벌 어울림존(AI교육 정책학교) 전시작품
    -   주최 : 인천시교육청, 과학기술정보통신부, 정보통신산업진흥원, 인천테크노파크

## 데모
> 외부서버 데이터 저장/불러오기, 구글 지도, Tmap 긽찾기 기능은 금전적 이유로 데모에서 작동되지 않습니다.

https://humanplus.netlify.app/


## 주요 기능

1. 초기 회원 가입

두 가지 질문(닉네임과 역할 선택)을 답변하여 가입을 진행.
자판 사용에 어려움을 겪는다는 점을 고려하여 STT를 사용하여 기입.
계정 데이터는 로컬에 저장되며, 핀 추가/교류 시스템에서 계정 데이터를 요구할 시 DB로 전송하여 처리.

2. 폐지 길 안내 기능

파랑 폐지(작업 가능한 폐지)를 클릭하면 해당 핀에 있는 폐지의 정보를 보여주고 작업 시작 버튼을 노출. 작업 시작 버튼을 누르면 Tmap API를 활용한 길 안내가 시작.

3. 폐지 신고 기능

화면에서 폐지의 위치를 찾고 해당 위치를 클릭하면 핀 추가하기 팝업 표시. 이후 해당 장소의 사진을 한 장 찍고 업로드하여 추가하면 지도에 파란 폐지 핀 추가. 해당 파랑 폐지를 클릭하면 해당 핀에 있는 폐지의 정보 노출.

## 개발 기획서 및 프로젝트 설명서

[HumanPlus 개발 기획서 프로젝트 설명서](https://tionlabs.notion.site/HumanPlus-1a7ef91ff2c5803887d9fd9727faf552)

[프로젝트 설명서 PDF](./docs/docs.pdf)

## 유의사항

백엔드(서버) 소스코드의 최종 원본파일이 사라져 현재 찾을수 없는 상태가 되어 초기에 테스트 용도로 사용한것으로 추정되는 버전의 소스코드로 대신 대체하였습니다

## 기여자

본 프로젝트는 팀 프로젝트로 기획되었으나, 진행 과정에서 여러 어려움이 있었습니다. 팀원들의 프로그래밍 경험 부족뿐만 아니라, 프로젝트 자체에 대한 관심과 참여도 역시 저조했습니다. 이에 따라, 팀장이 프로젝트에 필요한 프레임워크 및 프로그래밍 언어 교육 프로그램을 주도적으로 마련하여 이 문제를 해결하려 극도로 노력했음에도 팀원들의 참여율과 성실도가 현저히 낮았으며, 프로젝트 전반에 대한 팀원들의 열정 또한 매우 부족했습니다.

결과적으로, 본 프로젝트의 기획, 개발, 구현, 문서화 등 모든 작업은 **팀장 Tation이 단독으로 수행하였음**을 밝힙니다.

## 라이선스

이 프로젝트는 MIT 라이선스에 따라 라이선스가 부여됩니다.<br/>
자세한 내용은 LICENSE 파일을 참조하세요.
