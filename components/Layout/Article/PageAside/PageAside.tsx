import Image from "next/image";
import Link from "next/link";
import BookImg from "public/book.png";
import { Description, PageAsideWrapper } from "./PageAside.style";

export default function PageAside() {
  return (
    <PageAsideWrapper>
      <Link href={`/5ce0c0c2a7864c71992576e53182cc1f`}>
        <Image src={BookImg.src} width={220} height={230} alt={"bookimg"} />
      </Link>
    </PageAsideWrapper>
  );
}
