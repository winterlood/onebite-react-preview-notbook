import styled from "@emotion/styled";

export const CodeWrapper = styled("div")`
  width: 100%;
  font-size: 14px;
  margin-top: 10px;
`;

export const TopBar = styled("div")`
  background-color: rgb(55, 58, 65);
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.2em 0.7em;
  border-bottom: 1px solid rgb(55, 58, 65);
`;

export const TopBarLeftCol = styled("div")`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

export const TopbarRightCol = styled("div")``;

export const IconWrapper = styled("div")``;

export const CodeCaption = styled("div")`
  font-size: 12px;
  color: white;
  font-weight: bold;
`;

export const CopyButton = styled("div")`
  cursor: pointer;
  font-size: 12px;
  color: white;
  font-weight: bold;
  background-color: rgb(40, 43, 52);
  padding: 0.2em 0.7em;
  border-radius: 5px;
`;
