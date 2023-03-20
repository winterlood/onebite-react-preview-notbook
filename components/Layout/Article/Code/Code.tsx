import style from "./Code.module.scss";

// syntax highlighter
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// codes
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import c from "react-syntax-highlighter/dist/esm/languages/prism/c";

// themes
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import Image from "next/image";
import {
  CodeCaption,
  CodeWrapper,
  TopBar,
  TopBarLeftCol,
  TopbarRightCol,
  CopyButton,
} from "./Code.style";
import { CodeBlock } from "types/notion";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("c", c);

export default function Code(props: CodeBlock) {
  const {
    block: {
      properties: { title, language, caption: blockCaption },
    },
  } = props;

  const code = title.map((it) => it.join("")).join("");
  const caption =
    blockCaption && blockCaption.map((it) => it.join("")).join("");
  const lang = language.at(0)?.at(0);

  const onClickCopyCode = () => {
    window.navigator.clipboard
      .writeText(code)
      .then(() => alert("복사 되었습니다 👍"));
  };

  return (
    <CodeWrapper>
      <TopBar>
        <TopBarLeftCol>
          <CodeCaption>{caption}</CodeCaption>
        </TopBarLeftCol>
        <TopbarRightCol>
          <CopyButton onClick={onClickCopyCode}>Copy</CopyButton>
        </TopbarRightCol>
      </TopBar>
      <SyntaxHighlighter
        style={oneDark}
        showLineNumbers={true}
        language={lang?.toLowerCase()}
        customStyle={{
          marginTop: "0px",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
        }}
      >
        {code || ""}
      </SyntaxHighlighter>
    </CodeWrapper>
  );
}
