단점 없이 모든 상황에서 최고의 성능을 보장하는 프로그래밍 언어는 없으며 앞으로도 없을 겁니다. 프로그래밍 언어의 탄생 과정을 보면 대부분 당면 문제를 해결 하는 데 초점을 맞추어 개발되었습니다. 따라서 상황에 맞게 적절한 언어, 기술을 선택하는 것은 프로그래머가 엔지니어로서 갖춰야 할 기본적인 소양입니다.

상황에 맞게 적절한 언어를 선택하기 위해서는 언어가 어떤 목적을 위해 개발 되었는지, 어떠한 특징이 있는지, 어떤 상황에서 사용하는지 등을 알 필요가 있습니다. 사용법을 본격적으로 살펴보기 전에 자바스크립트가 어떤 언어이고, 어떤 목적으로 개발 되었는지 알아보겠습니다.

## 자바스크립트는 어떤 언어인가?

요즘은 자바스크립트로 서버도 개발하는 등 역할의 폭이 확대되었지만, 자바스크립트는 원래 웹(Web) 페이지를 만들 때 사용하는 언어입니다.

여러분들이 서핑 과정에 만나게 되는 인터넷 웹 페이지는 다음과 같은 세 개의 언어로 만들어집니다.

- HTML: 웹 페이지 요소의 배치
- CSS: 웹 페이지 요소의 스타일링
- 자바스크립트: 웹 페이지 요소의 동작 정의

웹 개발에서 세 언어의 역할과 기능을 좀 더 구체적으로 살펴보겠습니다.

<div class="notion-callout">
  <span class="notion-callout-icon">💡</span>
  <div class="notion-callout-content"><strong>Tip</strong></div>
</div>

### **HTML**

HTML(HyperText Markup Language)은 텍스트, 이미지, 버튼, 메뉴 등과 같이 웹 페이지에 나타나는 모든 요소의 배치와 내용을 기술하는 언어입니다. HTML만 사용해도 웹 페이지를 만들 수 있지만, 이것만으로 스타일을 정의하거나 사용자와 요소 간의 상호작용을 처리하기는 어렵습니다. HTML로 개발한 웹 페이지는 웹 브라우저에 띄운 움직이지 않는(정적인) 온라인 신문 같은 겁니다.

### CSS

CSS(Cascading Style Sheets)는 색상이나 크기처럼 웹 페이지 요소의 스타일을 정할 때 사용하는 언어입니다. HTML과 CSS를 이용해 개발하면 좀 더 완성도 있는 웹 페이지를 제작할 수 있지만, 여전히 사용자와 상호작용할 수 없기 때문에 이들 언어로 개발한 웹 서비스는 정적인 수준에 머물게 됩니다.

### 자바스크립트

자바스크립트는 마치 사람의 근육처럼 웹 페이지에 동적인(움직임이 있는) 기능을 장착할 수 있게 도와줍니다. 버튼의 클릭, 정보의 입력, 페이지 스크롤, 페이지 이동 등 웹 브라우저에서 이루어지는 모든 동작은 자바스크립트로구현한 기능들입니다.

위키피디아처럼 정보 전달을 주된 목적으로 하던 웹 서비스 시절은 지나가고, 이제는 페이스북, 넷플릭스처럼 사용자와 상호작용하는 것이 주된 목적인 웹 애플리케이션이 시장을 대표하고 있습니다. 이런 시장의 변화에 따라 오늘날 자바스크립트의 중요성은 점점 더 커지고 있습니다.

## 자바스크립트는 어떻게 실행되나?

자바스크립트는 ‘자바스크립트 엔진’이라는 프로그램이 해석해 실행합니다. 자바스크립트 엔진은 기본적으로 웹 브라우저에 탑재되어 있습니다. 그러므로 앞으로 3장에서 소개할 Node.js와 같은 별도의 실행 환경을 설치하지 않는 한, 자바스크립트를 실행하려면 반드시 웹 브라우저가 있어야 합니다.

이번에는 웹 브라우저에서 아주 간단한 자바스크립트 코드를 작성해보겠습니다. 웹 브라우저의 종류로는 사파리(Safari), 크롬(Chrome), 파이어폭스(Firefox), 오페라(Opera) 등 여러 가지가 있습니다. 이 책의 실습을 위해서는 구글에서 개발 한 크롬을 이용합니다. 크롬은 자바스크립트 엔진의 대명사라 할 수 있는 V8을 사용하는 웹브라우저입니다.

실습 컴퓨터에 크롬 브라우저가 없는 독자는 원활한 실습을 위해 구글 홈페이지 등에서 크롬을 다운로드해 설치한 다음 실습을 진행합니다. 크롬 설치는 간단하기 때문에 이 책의 독자라면 충분히 혼자서도 설치할 수 있습니다.

크롬 설치가 끝나고 실행하면 다음과 같은 화면이 나옵니다.

<figure class="notion-figure">

![구글 홈페이지](/content-images/e69bab6d-d4dd-4e2b-9953-5aeb0cfcadf2/42adf38f-fb00-49da-959c-2c0deca21507.png)

<figcaption>구글 홈페이지</figcaption>
</figure>

위 그림처럼 \[새 탭\]이라는 이름이 붙은 구글 홈페이지가 나옵니다.

이 상태에서 개발자를 위해 여러 유용한 기능을 제공하는 크롬 개발자 도구를 실행하겠습니다. 개발자 도구는 상단 주소표시줄 가장 오른쪽에 있는 아이콘을 클릭하면 나오는 메뉴에서 \[도구 더보기\] - \[개발자 도구\]를 차례로 선택하면 됩니다.

<figure class="notion-figure">

![크롬 개발자 도구 실행하기](/content-images/e69bab6d-d4dd-4e2b-9953-5aeb0cfcadf2/abbfdcbd-4589-40c4-aa55-bee4c91f69d9.png)

<figcaption>크롬 개발자 도구 실행하기</figcaption>
</figure>

<div class="notion-callout">
  <span class="notion-callout-icon">💡</span>
  <div class="notion-callout-content">Tip</div>
</div>

아래의 그림은 크롬 홈페이지에서 개발자 도구를 실행한 화면입니다.

<figure class="notion-figure">

![크롬 개발자 도구](/content-images/e69bab6d-d4dd-4e2b-9953-5aeb0cfcadf2/250f1278-a381-4c92-a3d8-9d54879f7095.png)

<figcaption>크롬 개발자 도구</figcaption>
</figure>

개발자 도구를 실행하면 크롬 브라우저 오른쪽에 개발자 도구 창이 나타납니다. 개발자 도구 창 상단에는 여러 개의 탭이 있습니다. 그 중에서 \[Console\] 탭(이하 콘솔 이라고 함)을 선택합니다.

<figure class="notion-figure">

![개발자 도구의 Console 탭](/content-images/e69bab6d-d4dd-4e2b-9953-5aeb0cfcadf2/e1f042e7-1a73-49e1-a655-ae4efec0621e.png)

<figcaption>개발자 도구의 [Console] 탭</figcaption>
</figure>

콘솔은 자바스크립트의 동작을 기록(로그)하거나 표시할 목적으로 사용합니다. 처음 \[Console\] 탭을 선택하면 파란색 화살표(&gt;) 기호 오른쪽에 커서가 깜빡이면서 어떤 명령을 입력할 때까지 대기하고 있습니다. 이 커서를 ‘프롬프트(prompt)’라고 합니다.

프롬프트에 다음과 같이 간단한 자바스크립트 명령을 입력하고 &lt;Enter&gt; 키를 누릅니다.

```javascript
console.log("안녕 자바스크립트");
```

<figure class="notion-figure">

![콘솔에서 자바스크립트 명령 입력](/content-images/e69bab6d-d4dd-4e2b-9953-5aeb0cfcadf2/5862e792-7f99-4d76-8533-05af4cbe8dee.png)

<figcaption>콘솔에서 자바스크립트 명령 입력</figcaption>
</figure>

console.log는 괄호 안의 문자열을 콘솔에 출력하는 명령어입니다. **안녕 자바스크립트**라는 문자열이 다음 줄에 바로 출력됩니다. 정상적으로 잘 출력 되는지 직접 수행하고 확인합니다.

축하합니다! 여러분은 방금 첫 번째 자바스크립트 코드를 실행하는 데 성공했습니다.

## 웹 에디터로 자바스크립트 편집하기

크롬 개발자 도구의 콘솔에서 코드를 작성하고 실행해, 자바스크립트 엔진이 정상적으로 동작하는지 시험해 보았습니다. 다만 콘솔에서 자바스크립트를 작성하면 코드를 한 줄 입력할 때마다 바로 실행되기 때문에 아주 간단한 코드만 작성할 수 있습니다.

앞으로 독자와 함께 작성할 코드는 최소 50줄 길게는 200줄 이상 되는 코드도 있기 때문에, 한 줄 입력할 때마다 바로 실행되는 환경에서는 코드를 작성 하기가 상당히 불편합니다.

따라서 크롬처럼 자바스크립트 엔진을 사용하면서도 여러 줄에 걸쳐 코드를 입력하고 편집할 수 있는 웹 에디터를 하나 소개하겠습니다. 이 책에서 소개할 웹 에디터는 코드샌드박스입니다.

코드샌드박스는 샌드박스(Sandbox, 모래통) 단위로 웹 언어(HTML, CSS, 자바스 크립트)를 입력하고 편집할 수 있는 웹 에디터입니다. 이 에디터는 여러분의 컴퓨터에 별도로 설치하거나 환경 설정할 필요 없이 코드샌드박스 사이트에 접속하면 편리하게 코딩할 수 있는 환경을 제공합니다.

<div class="notion-callout">
  <span class="notion-callout-icon">💡</span>
  <div class="notion-callout-content"><strong>샌드박스란?</strong></div>
</div>

<figure class="notion-figure">

![코드샌드박스란?](/content-images/e69bab6d-d4dd-4e2b-9953-5aeb0cfcadf2/118c6b5c-81af-48f7-a7de-85666bfedd77.png)

<figcaption>코드샌드박스란?</figcaption>
</figure>

<a class="notion-bookmark" href="https://codesandbox.io/" target="_blank" rel="noopener noreferrer">
  <span class="notion-bookmark-host">codesandbox.io</span>
  <span class="notion-bookmark-url">https://codesandbox.io/</span>
</a>

코드샌드박스 사이트에 접속하면 다음과 같은 페이지가 나옵니다.

<div class="notion-callout">
  <span class="notion-callout-icon">💡</span>
  <div class="notion-callout-content"><strong>사이트 모양이 달라요!</strong></div>
</div>

<figure class="notion-figure">

![코드샌드박스 홈페이지](/content-images/e69bab6d-d4dd-4e2b-9953-5aeb0cfcadf2/295398b2-9abd-44c3-a625-4197a4a61d2e.png)

<figcaption>코드샌드박스 홈페이지</figcaption>
</figure>

우측 상단의 &lt;Create Sandbox&gt; 버튼을 클릭합니다. 자바스크립트 언어를 실습할 샌드박스를 만듭니다.

<figure class="notion-figure">

![Start from a template 페이지](/content-images/e69bab6d-d4dd-4e2b-9953-5aeb0cfcadf2/0b58cf9b-c792-40bc-8cf1-d580fdf88353.png)

<figcaption>Start from a template 페이지</figcaption>
</figure>

Start from a template 페이지가 나옵니다.

이 페이지에서 구성하길 원하는 프로그래밍 환경을 고르게 되어 있습니다. 1장에서는 자바스크립트를 공부할 예정 이므로 ‘Vanilla’ 환경에서 작업할 수 있게 설정 해야 합니다. Start from a template에서 ‘Vanilla’를 클릭합니다. 해당 메뉴가 보이지 않는다면 우측 상단에 있는 검색 폼에서 ‘Vanilla’를 입력해 검색하면 됩니다.

<div class="notion-callout">
  <span class="notion-callout-icon">✋🏼</span>
  <div class="notion-callout-content"><strong>Vanilla는 무엇인가요?</strong></div>
</div>

약간의 로딩 시간이 지나면 자바스크립트를 실습할 수 있는 샌드박스가 나타납니다.

<figure class="notion-figure">

![Vanilla 자바스크립트 페이지](/content-images/e69bab6d-d4dd-4e2b-9953-5aeb0cfcadf2/90c032a8-55be-4f04-b262-dddceeccf2b9.png)

<figcaption>Vanilla 자바스크립트 페이지</figcaption>
</figure>

샌드박스 페이지는 크게 3개의 창으로 구성되어 있습니다. 가장 왼쪽에 있는 창은 파일 탐색, 검색 등 제어 기능들을 모아 놓은 공간입니다. 가운데 창은 코드를 작성하는 에디터(Editor) 공간입니다. 마지막으로 오른쪽 창은 결과물을 브라우저나 콘솔(Console)에서 확인하는 공간입니다.

실습하기 전에 몇 가지 환경을 설정하겠습니다. 샌드박스 오른쪽 창 하단을 보면 \[Console\], \[Problems\] 두 개의 탭이 보입니다. 크롬 개발자 도구의 콘솔에서 자바스크립트를 작성했던 것처럼, 코드샌드박스에서도 콘솔을 이용합니다. 다만 코드샌드박스에서는 코드를 입력하는 에디터가 따로 있기 때문에 해당 콘솔은 결과를 확 인하는 용도로 활용합니다.

\[Console\] 탭을 클릭하면 다음과 같이 화면 우측 하단에 콘솔이 활성화됩니다.

<figure class="notion-figure">

![Console 탭 활성화](/content-images/e69bab6d-d4dd-4e2b-9953-5aeb0cfcadf2/10c0e0cc-2164-4c38-bc32-626be30968cc.png)

<figcaption>[Console] 탭 활성화</figcaption>
</figure>

\[Console\] 탭 바로 위에는 \[Browser\] 탭의 결과물이 나타나는데, 지금은 \[Browser\] 탭이 필요하지 않습니다. 따라서 \[Console\] 탭의 영역을 더 확장합니다. 

\[Console\] 탭과 \[Browser\] 탭의 경계에 마우스 포인터를 두면 드래그할 수 있도록 마우스 커서가 활성화됩니다. 이 마우스 커서를 이용해 \[Console\] 탭을 상단 끝까지 밀어 올리면 됩니다.

<figure class="notion-figure">

![Console 탭을 상단까지 키우기](/content-images/e69bab6d-d4dd-4e2b-9953-5aeb0cfcadf2/0e916dfc-20e6-4b91-9942-28f08df87f5f.png)

<figcaption>[Console] 탭을 상단까지 키우기</figcaption>
</figure>

위 그림처럼 오른쪽 창이 콘솔로 꽉 차도록 만듭니다.

다음에는 에디터 설정을 하겠습니다. 크롬 환경 설정 때 처럼 우측 상단에 있는 아이콘을 선택하면 나오는 메뉴에서 \[Preferences\]를 클릭합니다.

<figure class="notion-figure">

![코드샌드박스의 환경 설정](/content-images/e69bab6d-d4dd-4e2b-9953-5aeb0cfcadf2/70a1ceb0-c22b-48a6-a5d3-684a9c40edc5.png)

<figcaption>코드샌드박스의 환경 설정</figcaption>
</figure>

Preferences 창이 나옵니다. Preferences 창 왼쪽에는 환경 설정에 필요한 여러 메뉴가 나열되어 있습니다.이 메뉴 중 ‘Preview’ 항목을 클릭 합니다.

오른쪽 창에 Preview 페이지가 나타납니다. Preview 페이지에는 세 가지 설정 옵션이 있습니다. 가장 위에 있는 ‘Preview on Edit’와 가장 아래에 있는 ‘Instant Preview’ 옵션은 자바스크립트를 입력할 때 마다 실행 결과를 바로 보여주는 기능입니다.

아직 자바스크립트가 익숙하지 않은 입문자는 이런 동작이 낯설 수 있으므로 스위치를 클릭해 둘 다 비활성화 합니다. 그러면 샌드박스와 관련한 환경 설정도 모두 끝났습니다. 빈 곳을 클릭해 원래의 화면으로 돌아갑니다.

<figure class="notion-figure">

![코드샌드박스의 환경 설정](/content-images/e69bab6d-d4dd-4e2b-9953-5aeb0cfcadf2/dbea1444-c1ad-4f10-adc5-bbea6f595348.png)

<figcaption>코드샌드박스의 환경 설정</figcaption>
</figure>

이제 생성한 샌드박스에서 간단한 코드를 작성하겠습니다. 샌드박스가 처음 생성 되면 페이지 중앙에는 index.js라는 이름의 탭이 자동으로 생성됩니다. 이 탭에 있는 코드를 모두 삭제하고 다음과 같이 입력합니다.

```javascript
console.log("안녕 코드샌드박스");
```

코드를 입력하고 파일 저장 단축키 &lt;Ctrl&gt;+&lt;S&gt;를 눌러 index.js를 저장합니다. 참고로 macOS 유저는 &lt;Command&gt; + &lt;S&gt;를 눌러 저장할 수 있습니다.

<figure class="notion-figure">

![코드샌드박스에서 코드 입력하고 저장하기](/content-images/e69bab6d-d4dd-4e2b-9953-5aeb0cfcadf2/fb814098-3ecd-4a58-b23a-08bcf235bc64.png)

<figcaption>코드샌드박스에서 코드 입력하고 저장하기</figcaption>
</figure>

\[index.js\] 탭에서 코드를 작성하고 저장하면 코드 실행 결과가 바로 오른쪽 콘솔에 나타납니다. 앞

으로 코드샌드박스에서 진행할 자바스크립트의 실습은 다음 과정으로 이루어집니다.

1. 책에 있는 코드 입력
2. 저장(&lt;Ctrl&gt;+&lt;S&gt;)
3. 오른쪽 콘솔에서 결과를 확인
