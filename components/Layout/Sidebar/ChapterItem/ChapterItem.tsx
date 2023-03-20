import { Chapter } from "types/content";
import { ChpaterItemWrapper } from "./ChapterItem.style";
import { useRouter } from "next/router";

interface Props extends Chapter {
  isSelected: boolean;
}

export default function ChapterItem(props: Props) {
  const { id, title, isSelected } = props;
  const router = useRouter();

  const onClickItem = () => {
    router.push(`/${id}`);
  };

  return (
    <ChpaterItemWrapper isSelected={isSelected} onClick={onClickItem}>
      {title}
    </ChpaterItemWrapper>
  );
}
