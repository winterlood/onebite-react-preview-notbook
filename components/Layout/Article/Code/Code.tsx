// syntax highlighter
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// codes
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import c from "react-syntax-highlighter/dist/esm/languages/prism/c";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import diff from "react-syntax-highlighter/dist/esm/languages/prism/diff";

// themes
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";

import {
  CodeCaption,
  CodeWrapper,
  TopBar,
  TopBarLeftCol,
  TopbarRightCol,
  CopyButton,
} from "./Code.style";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("c", c);
SyntaxHighlighter.registerLanguage("markup", markup);
SyntaxHighlighter.registerLanguage("html", markup);
SyntaxHighlighter.registerLanguage("xml", markup);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("shell", bash);
SyntaxHighlighter.registerLanguage("diff", diff);

interface Props {
  code: string;
  language?: string;
  caption?: string;
}

export default function Code({ code, language, caption }: Props) {
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
        language={language?.toLowerCase()}
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
