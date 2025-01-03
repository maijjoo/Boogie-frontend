# boogiOnAndOn : 바다환경지킴이 관리 플랫폼

---

![image](https://github.com/user-attachments/assets/e1bb9bd8-324f-4230-9bc8-6618994994b8)

---

## 프로젝트 소개

> ### 프로젝트 주제
> - 부산 해안을 대상으로 GPS 및 데이터 수집을 활용해 해양쓰레기를 수거하고 빅데이터를 생성하는 서비스 개발.
> ### 팀 목표
> - 해안쓰레기의 효율적인 수거와 관리 서비스를 개발하여, 빅데이터 기반으로 체계적이고 효과적인 관리 방안을 제시 하는 것.
> ### 주제 선정 배경
> - 해양쓰레기에 대한 관심과 이슈가 커짐에 따라, 현재 각 행정구역에서는 비용 대비 수거가 용이한 해안쓰레기를 청소하고 있음.
> - 바다환경지킴이 사업은 전국 해안을 접한 기초 지자체마다 상시 전담관리 인력인 바다환경지킴이를 배치하여, 이들이 해안가를 순회하며 쓰레기를 수거하는 사업이다.
> ### 기획 의도
> - 본 프로젝트는 부산 지역 해안을 우선적으로 시험삼아 진행하며, 해양쓰레기 문제를 체계적으로 해결하기 위한 방안을 제시하는 데 중점을 둔다.
> - 해양쓰레기의 효율적인 수거와 관리, 조사를 위한 시스템을 개발하여, 자원의 낭비를 최소화하고 청소 작업의 효과성을 극대화하며 효과적으로 데이터를 수집하는것을 목표로 한다.

---

## 팀원 구성

<div align="center">

|                                                     **김재원**                                                     |                                                        **라주엽**                                                        |                                                         **송지현**                                                          |                                                   **이석현**                                                    |
|:---------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------:|
| [<img src="https://github.com/Jaewon94.png" height=150 width=150> <br/> @Jaewon94](https://github.com/Jaewon94) | [<img src="https://github.com/RAJUYEOB96.png" height=150 width=150> <br/> @RAJUYEOB96](https://github.com/RAJUYEOB96) | [<img src="https://github.com/songdaramji.png" height=150 width=150> <br/> @songdaramji](https://github.com/songdaramji) | [<img src="https://github.com/maijjoo.png" height=150 width=150> <br/> @maijjoo](https://github.com/maijjoo) |

</div>

---

## 개발 환경

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=flat-square&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=spring-boot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=flat-square&logo=spring-security&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring%20Data%20JPA-6DB33F?style=flat-square&logo=spring&logoColor=white)
![QueryDSL](https://img.shields.io/badge/QueryDSL-007ACC?style=flat-square&logo=java&logoColor=white)

![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![DBeaver](https://img.shields.io/badge/DBeaver-4D4D4D?style=flat-square&logo=dbeaver&logoColor=white)

![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)
![IntelliJ IDEA](https://img.shields.io/badge/intellijidea-000000?style=flat-square&logo=intellijidea&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-000000?style=flat-square&logo=json&logoColor=white)


</div>

---

## 프로젝트 구조

```
.
├── HELP.md
├── README.md
├── bin
│   ├── generated-sources
│   │   └── annotations
│   └── generated-test-sources
│       └── annotations
├── build
│   ├── classes
│   │   └── java
│   │       ├── main
│   │       └── test
│   ├── generated
│   │   └── sources
│   │       ├── annotationProcessor
│   │       └── headers
│   ├── generated-snippets
│   ├── reports
│   │   └── tests
│   │       └── test
│   ├── resources
│   │   └── main
│   │       ├── application.properties
│   │       ├── spy.properties
│   │       ├── static
│   │       └── templates
│   ├── test-results
│   │   └── test
│   │       ├── TEST-com.boogionandon.backend.repository.ResearchRepositoryTest.xml
│   │       └── binary
│   └── tmp
│       ├── compileJava
│       │   ├── compileTransaction
│       │   └── previous-compilation-data.bin
│       ├── compileTestJava
│       │   ├── compileTransaction
│       │   └── previous-compilation-data.bin
│       └── test
├── build.gradle
├── gradle
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew
├── gradlew.bat
├── settings.gradle
├── spy.log
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   └── resources
│   │       ├── application.properties
│   │       ├── spy.properties
│   │       ├── static
│   │       └── templates
│   └── test
│       └── java
│           └── com
├── testData
│   ├── testAdminBulkExel.xlsx
│   └── testWorkerBulkExel.xlsx
└── upload
    └── default.png
```

---

## 역할 분담

### 김재원

- **백엔드 담당**
    - Docker를 통해 mySQL을 설정하고 배포
    - 백엔드의 전반적인 밑작업
    - Spring Security를 통한 로그인 코드 작성
    - JPA를 통한 데이터베이스 생성, 사용
    - Worker의 조사/청소/집하 보고서 기능 코드 작성
    - Admin의 통계용 데이터, 작업 관리, 회원 관리 기능 코드 작성
    - QueryDSL을 활용한 검색 기능 코드 작성

### 라주엽

- ** 담당**
  - 
    -

### 송지현

- ** 담당**
  - 
    -

### 이석현

- ** 담당**
  - 
    -

---

## 개발 환경 설정

### 데이터베이스 정보

> - Host: localhost
> - Port: 33061 (호스트) -> 3306 (컨테이너)
> - Database: boogiOnAndOn
> - Username: boogiOnAndOn
> - Password: [비밀번호는 보안을 위해 직접 기록하지 않음]

### 사전 요구사항

> - Docker 설치
> - MySQL 클라이언트 (선택사항)

### Docker를 이용한 데이터베이스 설정

1. Docker 이미지 pull:
   ```
   docker pull dan556/boogi-mysql:multiarch
   ```

2. Docker 컨테이너 실행:
   ```
   docker run -d \
     --name boogi-mysql \
     -e MYSQL_ROOT_PASSWORD=[임의로 만들어 주세요] \
     -p 33061:3306 \
     dan556/boogi-mysql:multiarch
   ```

3. 컨테이너 상태 확인:
   ```
   docker ps
   ```

4. MySQL 접속 (선택사항 - 확인을 위해):
   ```
   mysql -u boogiOnAndOn -p
   ```
   비밀번호 입력 요청 시 아이디와 동일하게 비밀번호를 입력하세요.

### 애플리케이션 설정

1. 프로젝트 클론:
   ```
   git clone [your-repository-url (Fork 해서 가져간]
   cd boogiOnAndOn
   ```

2. 애플리케이션 실행:
   ```
   ./gradlew bootRun
   ```
   또는
   ```
   ./mvnw spring-boot:run
   ```
   (사용하는 빌드 도구에 따라 선택)

## 주의사항

- JPA를 사용하여 테이블을 자동 생성합니다. 수동으로 테이블을 생성할 필요가 없습니다.
- 이 Docker 이미지에는 이미 설정된 데이터베이스 구조와 사용자 정보가 포함되어 있습니다.
- 실제 운영 환경에서는 보안을 위해 데이터베이스 비밀번호를 변경하고, 환경 변수 등을 통해 안전하게 관리해야 합니다.

## 문제 해결

- 포트 충돌 발생 시:
  33061 포트가 이미 사용 중이라면, Docker 실행 명령어의 `-p` 옵션을 수정하여 다른 포트를 사용하세요.
- 컨테이너 접속 문제 발생 시:
  `docker logs mysql-boogiOnAndOn` 명령어로 로그를 확인하세요.

---

## 페이지별 기능

### [사전 설명]

- Worker의 경우 돌아다니면서 일을 해야하기 때문에 핸드폰으로 작업한다는 가정하에 화면크기를 모바일 크기로 설정
    - 모바일 어플리케이션과 비슷한 환경을 보여주기 위해 PWA(프로그래시브 웹 앱) 기술 사용
- Admin의 경우 사무실에서 일한다고 가정하고 화면크기를 일반 모니터 크기로 설정

## 작업자(Worker)

### [로그인 페이지]

- 작업자 아이디로 로그인시 차량 등록 유무에 따라서 수거 관련 활성/비활성
- 쿠키를 활용하여 아이디 저장, 자동 로그인 구현
  ![image](https://github.com/user-attachments/assets/b8b1c726-c136-4847-ba9a-1328d572fe5f)

### [조사 보고서 작성]

- 등록되어 있는 해안명과, 같은 관리자를 공유하는 worker를 드랍다운 형식으로 선택 가능
- 이름 + 전화번호 끝자리를 이용해 동명이인에 대한 중복 방지
- 자연재해를 선택하여 날씨에 따른 추후 AI 학습을 위한 데이터 수집
- 조사 시작시 서브 보고서의 시작 위,경도 자동 저장
- 조사 완료시 서브 보고서의 종료 위,경도 자동 저장
- 각각의 서브 보고서들의 시작 ~ 종료 위경도를 계산하여 조사한 해안길이 자동 입력

![image](https://github.com/user-attachments/assets/f3a11997-2293-4e11-a425-2a211b3b16c2)
![image](https://github.com/user-attachments/assets/cfbbb865-541e-41f5-aa35-95521e01a554)

### [청소 보고서 작성]

- 조사 보고서와 비슷한 방식
- 조사는 메인안에 서브를 여러개 둘 수 있었지만, 청소는 조사를 바탕으로 단건 처리
  ![image](https://github.com/user-attachments/assets/30a6b791-3e9c-436f-9f64-6604f67f1b3f)
  ![image](https://github.com/user-attachments/assets/a8d9d493-e372-4701-bd55-bf787c0e35c7)
  ![image](https://github.com/user-attachments/assets/1661d245-ca19-4d31-8a81-63c341fd1202)

### [집하 보고서 작성]

- 집하장소는 상황에 따라 변경될 수 있기 때문에 임의로 장소 설명을 직접 입력
- 등록하기 버튼 누를 시 GPS를 통해 현재 위치를 저장
  ![image](https://github.com/user-attachments/assets/5174311e-e9a9-4e07-93c4-1240111bed43)

### [수거자 화면]

- 집하 보고서를 바탕으로 지도에 위치 표시
- 경로추가시 다른 수거자 화면에서는 색상이 변경되어서 클릭 할 수 없게 변경
  ![image](https://github.com/user-attachments/assets/9a02a2f3-8a7f-4d16-b6aa-6f1bb7b8c882)
  ![image](https://github.com/user-attachments/assets/606f67e8-1f11-4ae9-b1cc-dc3553b3e5e4)

## 관리자(Admin)

### [로그인 페이지]

- Worker와 동일한 페이지에서 진행
- 아이디가 가지고 있는 Role에 따라서 다른 화면으로 이동

### [데이터 분석 - 주요 쓰레기 분포]

- 청소 보고서를 바탕으로 데이터가 나옴
- 연도별 - (작년 - 4) ~ 작년, 총 5년의 데이터를 보여줌
- 월별 - 해당 년도의 1 ~ 12월의 정보를 보여줌
- 일별 - 해당 년도의 해당 월의 월초 ~ 월말의 정보를 보여줌
- 지도 아래에서 해당 지역의 주요 쓰레기가 어떤 것들이 주로 나오는지 색으로 표현
  ![image](https://github.com/user-attachments/assets/64df816a-98d3-4669-913f-59019f65f4de)
  ![image](https://github.com/user-attachments/assets/d3e13917-1e84-4bba-9577-03ec8ca82d3c)
  ![image](https://github.com/user-attachments/assets/451c562d-1c6a-4821-9006-1a7300eceb4d)

### [데이터 분석 - 수거 예측량 분포]

- 조사 보고서를 바탕으로 데이터가 나옴
- 보여주는 모양은 주요 쓰레기 분포와 동일
- 조사자의 정보들을 모아 관리자가 예측할 수 있게 하기 위한 데이터
- 해당 쓰레기가 연도별, 월별, 일별에 따라 어느 정도의 양이 나왔는지 ton 을 색으로 표현
  ![image](https://github.com/user-attachments/assets/c531a37c-2ea0-46b3-931f-31a4ae5787bd)
  ![image](https://github.com/user-attachments/assets/ebb39d63-d647-447d-b854-0561e7c24fbe)
  ![image](https://github.com/user-attachments/assets/f2035814-082d-4ac3-a9aa-8a0bf886547d)

### [데이터 분석 - 기초 통계]

- 연도별 - (작년 - 4) ~ 작년, 총 5년의 데이터를 보여줌
- 월별 - 해당 년도의 1 ~ 12월의 정보를 보여줌
- 일별 - 해당 년도의 해당 월의 월초 ~ 월말의 정보를 보여줌
- 추가적으로 해안명을 검색하여 특정 해안의 정보를 볼 수 있음
- 관리자는 공무원이라는 가정하에 해당 데이터를 복사하거나 할 수 있도록 엑셀 다운 기능 추가
  ![image](https://github.com/user-attachments/assets/9497a56e-210b-48f8-aec7-dc2b3e2f34dc)
  ![image](https://github.com/user-attachments/assets/16b112f3-2292-4301-9d9b-7720dfc2e191)
  ![image](https://github.com/user-attachments/assets/ba63bf74-b186-436f-ac86-3041e396b5e8)

### [작업 관리 - NEW 작업]

### [작업 관리 - 작업 조회]

### [회원 관리]

- Admin이 자기가 만들어서 배포한 Worker 들만 조회 가능 (super admin은 자기 아래서 만들어진 admin이 만든 Worker 전부 확인 가능)
- 개별 등록시 하나의 회원을 만들 수 있음
- 일괄 등록시 정해진 엑셀파일 형식을 통하여 여러건의 회원을 등록할 수 있음
  ![image](https://github.com/user-attachments/assets/8098b0b7-0f8f-486c-9f0f-6709222bae58)

---

## 개발자를 위한 정보

### 데이터베이스 이미지 업데이트

데이터베이스 스키마나 초기 데이터를 변경해야 할 경우:

1. 컨테이너에서 필요한 변경 작업을 수행합니다.
2. 새 버전의 이미지를 생성합니다:

- 이때 init.sql을 넣어서 보내기 위해 Dockerfile을 같이 빌드하기 위해 (이미지에 넣기 위해)
- cd ~/[두 파일이 같이 있는 폴더] 에 들어가 아래 스크립트를 실행합니다.
- 뒤의 .은 현재 폴더라는 의미 (Dockerfile을 집어넣기 위해 필요)

   ```
   docker build -t dan556/boogi-mysql:latest .
   ```

4. 위의 행동을 통해 만들어진 새 이미지를 Docker Hub에 푸시합니다:
   ```
   docker push dan556/boogi-mysql:latest
   ```
5. README를 업데이트하고 팀원들에게 새 버전 사용을 안내합니다.

---

