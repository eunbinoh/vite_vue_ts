/**
* 인프런 강의 _  리팩토링 by 백기선
*  책 _ Refactoring by 마틴 파울러
*/



/**
* Extract Function  - "의도" vs "구현" 함수 구분해서 사용
*
* '구현'을 위한 : 코드 복잡도 high, 반복, 주석 설명이 많이 필요, 무슨 기능인지 한눈에 잘 안보일수있음
* '의도'를 위한 : 한줄짜리 메소드라도 분리할 필요가 있을까? Yes, 그 기능의 목적을 확실히 보여주고 싶을 경우
*
* /



/**
* 1. Naming
*
* 깔끔한 코드에서 가장 중요한 것 중 하나가 바로 “좋은 이름”이다. 
* 함수, 변수, 클래스, 모듈의 각 역할을 직관적으로 표현해야 한다. 
*
* << extract refactoring Skill >>
*   함수 선언 변경하기 (Change Function Declaration) 
*   변수 이름 바꾸기 (Rename Variable) 
*   필드 이름 바꾸기 (Rename Field)
* /


/**
* 2. Duplicated Code
*
* ( 중복 코드의 단점 )
* 비슷한지, 완전히 동일한 코드인지 주의 깊게 봐야한다. 
* 코드를 변경할 때, 동일한 모든 곳의 코드를 변경해야 한다. 

* << extract refactoring Skill >>
*   동일한 코드를 여러 메소드에서 사용하는 경우, 함수 추출하기 (Extract Function) 
*   코드가 비슷하게 생겼지만 완전히 같지는 않은 경우, 코드 분리하기 (Slide Statements) 
*   여러 하위 클래스에 동일한 코드가 있다면, 메소드 올리기 (Pull Up Method)
*
* 비슷하지만 일부 값만 다른 경우 : “함수 매개변수화하기 (Parameterize Function)” 
* 하위클래스 코드가 상위클래스가 아닌 하위클래스 기능에 의존하는 경우: “필드 올리기(Pull Up Field)”
* 두 메소드가 비슷한 절차를 따르고 있다면 : “템플릿 메소드 패턴 (Template Method Pattern)” 적용 고려
*
* /




/**
* 3. Long Function
*

* << extract refactoring Skill >>

* 1. Replace Temp with Query (임시변수를 질의함수로!)
*  - 반복해서 동일한 기능의 식을 호출해야할 경우, 함수의 매개변수로 빼내면서 호출 수 줄이기
*  ex) new parameter = calcFunction( countA, rule, etc ) 

* 2. Introduce Parameter Object (매개변수 객체만들기)
*  - 같은 매개변수들이 여러 메소드에서 사용될때, 묶은 자료 구조 만들어서 사용하기
*  ex) private final field A = a ;  function ex1(a),  function ex2(a)

* 3. Preserve Whole Object (객체 통째로 넘기기)
*  - 범위가 큰 파라미터 -> HashMap / Map / Object 로 묶고, 그 안에서 꺼내서 사용하기
*  - 주의) 의존성 고려 필요

* 4. Replace Function with Command (함수를 명령으로 바꾸기)
*  - 함수를 독립적인 객체인, Command Pattern 으로 만들어 사용
*  - 장점) undo 기능 사용 가능, 상속/템플릿 쪼개서 활용 가능

* 5. Decompose Conditional (조건문 분해하기)
*  - “조건”과 “액션” 모두 “의도”를 표현해야한다
*  - ex) if A return   else B return  복잡하고 길어져서 의도를 잘 표현하지 못할떄,
*        => A ? A : B 삼항연산, extract Method 등을 사용하여 가독성을 높일수있다

* 6. Split Loop (반복문 쪼개기)
*  - 주의) 성능 문제를 야기할 가능성
*  - “리팩토링”은 “성능 최적화”와 별개의 작업이다
*  - 리팩토링을 마친 이후에 성능 최적화 시도할 수 있다

* 7. Replace Conditional with Polymorphism (조건문을 다형성으로 바꾸기)
*  - 타입에 따라 다른 로직으로 처리해야 하는 경우 다형성을 적용해서 조건문을 보다 명확하게 분리 
*  ex) 책, 음악, 음식 등… 반복되는 switch문을 각기 다른 클래스로 만들어 제거
*     int dTime = switch(order.getDeliveryState()){
      case "CA", "KO" -> 2;
      case "CH", "IN", "KI" -> 4;
      default -> 3;

*
*
* /



}