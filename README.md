# clean-architecture-issue-tracker

![2024-05-2813-14-05-ezgif com-video-to-gif-converter](https://github.com/caesar1030/clean-architecture-issue-tracker/assets/76683390/a3e3d6a9-99b4-47b8-b9ba-b7098722075c)

### Overiview

- webpack 환경에서 vite로 전환하였습니다.
- 기존의 아키텍처를 걷어내고 실용적인 코드 구조로 수정하였습니다. 이전 아키텍처는 [여기](https://github.com/caesar1030/clean-architecture-issue-tracker/tree/clean-architecture)에서 확인할 수 있습니다.
- storybook을 이용하여 공용 컴포넌트를 문서화 하였습니다. [여기](https://caesar1030.github.io/clean-architecture-issue-tracker/?path=/docs/introduction--docs)에서 확인할 수 있습니다.

### Vite

- 기존의 CRA 환경이 다소 무겁다고 판단하여, webpack을 이용하여 개발 환경을 구성했습니다.
- 하지만 여전히 webpack의 느린 dev server와 hmr로 인해 ESM based dev server를 지원하는 vite로 전환하였습니다.
  - dev server 구동 시간: 12.32s -> 0.3s
  - hmr: 0.5s -> 0.003s
  - production build : 20.5s -> 3.7s

### 코드 구조 개선

- 기존 아키텍처의 경우 불필요한 코드 양이 많아 복잡성을 오히려 증가시킨다고 판단하였습니다.
- inversify와 불필요한 인터페이스를 제거하고 좀 더 간단히 코드를 이해할 수 있도록 구조를 수정하였습니다.

### Storybook

- 공용 컴포넌트의 상세 구현 코드를 직접 확인하지 않아도 사용할 수 있도록, 사용법과 props들에 대한 설명을 문서화 하였습니다.
- 시각적 회귀 테스트를 통해 의도치 않은 수정을 방지하고자 했으며, 일부 공용 컴포넌트의 경우 단위 테스트를 작성했습니다.

### Link

- 리팩토링 이전 프로젝트에 관한 글입니다. 현재 프로젝트 구조와 많이 다를 수 있습니다.

  [Blog | 0. 계기](https://caesar1030.tistory.com/17)  
  [Blog | 1. 아키텍처](https://caesar1030.tistory.com/18)  
  [Blog | 2. 타입스크립트](https://caesar1030.tistory.com/19)  
  [Blog | 3. 웹팩](https://caesar1030.tistory.com/20)  
  [Blog | 4. 공용 컴포넌트](https://caesar1030.tistory.com/21)
