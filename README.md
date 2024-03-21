# clean-architecture-issue-tracker

### Overiview

- '관심사 분리를 하라는데 도대체 어떤 관심사들이 있지?', '외부 API와 종속성을 끊고, 백엔드와 병렬 개발이 가능한 구조를 만드려면 어떻게 할까?' 와 같은 고민을 해결하기 위한 학습용 토이 프로젝트입니다.

### Architecture

![image](https://github.com/caesar1030/clean-architecture-issue-tracker/assets/76683390/9d5b4757-6eda-4287-928b-011b6738db0f)
(간략함을 위해 사용 관계만 표시하였습니다. 의존성은 생략 하였습니다.)

#### Presentation

- 익숙한 리액트 코드들 입니다.
- 리액트의 관심사는 상태의 반영(state reflection)에만 있다고 생각하기 때문에 비지니스 로직을 두지 않았습니다.

#### UseCase

- 초기 설계는 복잡한 여러 Service, Manager, Repository에 대한 Facade로서 설계 하였으나, 이슈 트래커의 경우 단순한 CRUD 앱이기 때문에 현재는 Repository에 대한 단순 래퍼로서 동작합니다.

#### Model

- 엔티티들을 정의하고, 엔티티를 기반으로 각 Resource들의 Response 타입을 정의하였습니다.
- 외부 API에 변경 사항이 발생해도 이 부분은 변하지 않습니다.

#### Repository(인터페이스)

- 클린 아키텍처는 의존성의 방향이 안쪽으로 향해야 한다는 규칙이 있습니다.
- UseCase의 경우 도메인 레이어에 위치하고, Repository의 구현체는 데이터 레이어에 위치합니다. 데이터 레이어는 도메인 레이어 외부에 위치합니다.
- 따라서 Repository의 인터페이스를 도메인 레이어로 이동하였습니다.

#### Repository(구현부)

- DataSource를 사용하여 가져온 데이터를 Model에서 정의한 Response에 맞게 매핑하는 역할을 합니다.
- 외부 데이터 API의 구조가 바뀔 경우 이 곳의 코드만 수정하고 Domain 레이어와 Presentation 레이어에는 코드 수정이 필요하지 않습니다.

#### Datasource

- 실제 외부에서 데이터를 가져오는 역할을 합니다.

### Link

- 좀 더 상세한 내용을 담은 블로그 링크입니다.  
  [Blog | 0. 계기](https://caesar1030.tistory.com/17)  
  [Blog | 1. 아키텍처](https://caesar1030.tistory.com/18)  
  [Blog | 2. 타입스크립트](https://caesar1030.tistory.com/19)  
  [Blog | 3. 웹팩](https://caesar1030.tistory.com/20)  
  [Blog | 4. 공용 컴포넌트](https://caesar1030.tistory.com/21)
