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

## 계산기 Unit test 작성해보기

### 좋지 않은 테스트 코드

```js
test('caculator',()=>{
    const calculator = new Calculator();
    calculator.set(0);
    expect(calculator.value).toBe(0);

    calculator.clear();
    expect(calculator.value).toBe(0);

    calculator.add(10);
    calculator.multiply(2);
    expect(calculator.value).toBe(20)

    calculator.subtract(5);
    expect(calculator.value).toBeLessThan(20)

    calculator.divide(2);
    expect(calculator.value).toBeCloseTo(7.5)
})
/*
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.332 s, estimated 1 s
*/
```

### 명시적으로 분리 하여 개선하기

```js
describe('Calculator',()=>{
    it('inits with 0',()=>{
        const calculator = new Calculator();
        calculator.set(0);
        expect(calculator.value).toBe(0);
    })

    it('clear to 0',()=>{
        const calculator = new Calculator();
        calculator.clear();
        expect(calculator.value).toBe(0);
    })
})
/*
PASS  src/test/calculator.test.js
Calculator
✓ inits with 0 (2 ms)
✓ clear to 0 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.313 s, estimated 1 s
*/
```

### 각 테스트를 독립적으로 유지하기 위해 beforeEach() 사용하기

> new Calculator() 객체를 매번 생성해야하는 것이 적절하다. 최상단에 객체를 초기화하고 그것을 사용하면 테스트들이 독립적이지 못하게된다.
> let 으로 선언하여 매 테스트마다 초기화 해줄 수 있도록 beforeEach()를 사용한다.

```js
describe('Calculator',()=>{
    let calculator;
    beforeEach(()=>{
        calculator = new Calculator();
    })

    it('inits with 0',()=>{
        calculator.set(0);
        expect(calculator.value).toBe(0);
    })

    it('clear to 0',()=>{
        calculator.clear();
        expect(calculator.value).toBe(0);
    })
})
```

### describe 중첩하기

```js

describe('Calculator',()=>{
    let calculator;
    beforeEach(()=>{
        calculator = new Calculator();
    })

    it('inits with 0',()=>{
        calculator.set(0);
        expect(calculator.value).toBe(0);
    })

    it('clear to 0',()=>{
        calculator.set(10)
        calculator.clear();
        expect(calculator.value).toBe(0);
    })

    it('add',()=>{
        calculator.set(99);
        calculator.add(1);
        expect(calculator.value).toBe(100)
    })

    describe('divides',()=>{
        it('0 / 0 === NaN',()=>{
            calculator.set(0);
            calculator.divide(0);
            expect(calculator.value).toBe(NaN);
        })
        it('1 / 0 === Infinity',()=>{
            calculator.set(1);
            calculator.divide(0);
            expect(calculator.value).toBe(Infinity);
        })
        it('4 / 4 === 1',()=>{
            calculator.set(4);
            calculator.divide(4);
            expect(calculator.value).toBe(1);
        })
    })
})
/*
PASS  src/test/calculator.test.js
Calculator
    ✓ inits with 0 (2 ms)
    ✓ clear to 0 (1 ms)
    ✓ add
divides
      ✓ 0 / 0 === NaN
      ✓ 1 / 0 === Infinity (1 ms)
      ✓ 4 / 4 === 1   
*/
```

### Error 테스트하기

> jest --coverage 를 확인해보면 아래와 같이 Uncovered 영역이 표시된다.
> 코드 중에서 테스트코드가 작성되지 않은 라인을 알려주고 있어서, 해당 라인을 찾아가서 모든 경우에 대해서 테스트 코드를 작성해주면 된다.

```bash
---------------|---------|----------|---------|---------|-------------------
File           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------|---------|----------|---------|---------|-------------------
All files      |   85.36 |    85.71 |      75 |   85.36 |                   
 add.js        |     100 |      100 |     100 |     100 |                   
 calculator.js |   82.85 |    83.33 |   71.42 |   82.85 | 17-18,23-24,27-28 
---------------|---------|----------|---------|---------|-------------------
```

> Error 는 expect()에 callback 함수로 한번 감싸서 넣어주고, chaining 으로 toThrow()를 사용해 어떤 에러인지 message 를 검사하면 된다. 혹은 다른 error 검사하는 메서드를 사용하면 된다.

```js
    it('add throw Error when value is greater than 100',()=>{
        expect(()=>{
            calculator.set(0);
            calculator.add(101);
        }).toThrow('Value can not be greater than 100')
    })

// add(num) {
//     const sum = this.value + num;
//     if (sum > 100) {
//         throw new Error('Value can not be greater than 100');
//     }
//     this.value = sum;
// }
```

## 비동기 테스트하기

> ERR_UNHANDLED_REJECTION 에러가 발생한다.
> then() 방식으로 체크하려면 it의 인자로 들어오는 doneCallback 을 호출해주어야한다.

```js
    it('async-done',()=>{
        fetchProduct().then(result=>{
            expect(result).toEqual({name:'kong',job:'FE developer'})
        })
    })
```

> 이렇게 done()을 호출해주면되는데, 실패하는 케이스의 경우 done()의 실행시간이 5초를 넘아가기 때문에, 이방식 보다는 Promise 자체를 return 하면 같은 효과를 누릴 수 있다.

```js
    it('async-done',(done)=>{
        fetchProduct().then(result=>{
            expect(result).toEqual({name:'kong',job:'FE developer'})
            done();
        })
    })
```

```js
    it('async return',()=>{
        return fetchProduct().then(result=>{
            expect(result).toEqual({name:'kong',job:'FE developer'})
        })
    })
```

> async - await 방식

```js
    it('async await',async ()=>{
    const result = await fetchProduct();
    expect(result).toEqual({name:'kong',job:'FE developer'})
})
```

> resolves, rejects 방식

```js
    it('async resolves',()=>{
        return expect(fetchProduct()).resolves.toEqual({name:'kong',job:'FE developer'})
    })

    it('async rejects',()=>{
        return expect(fetchProduct('error')).rejects.toBe('network error')
    })
```

## Mock

