# JEST 공부하기

## 프로젝트에 jest 시작하는 법

```bash
npm i -g jest

jest --init # jest.config.js 생성(옵션 모두 y)

npm run test # jest 실행(script 수정 되어있음)
```

## cheat sheet

```bash
# jest.config.js
collectCoverage: true, # 옵션을 키면 테스트 마다 coverage 보기

# bash 
jest --coverage # coverage 보기

# package.json
# --watch 옵션은 이미 커밋된 테스트에 대해서는 실행하지 않는다.
"scripts": {
    "test": "jest --watch" # watch 옵션으로 생산성 높이기 || --watchAll
},

```
