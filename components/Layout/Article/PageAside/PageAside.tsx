import Image from "next/image";
import Link from "next/link";
import CouponImg from "public/coupon.png";
import { PageAsideWrapper } from "./PageAside.style";

export default function PageAside() {
  return (
    <PageAsideWrapper>
      <Link href={`/2c1fc37a61a6486fb6f8ec72978a76dc`}>
        <Image
          src={CouponImg.src}
          placeholder="blur"
          blurDataURL={CouponImg.blurDataURL}
          width={220}
          height={160}
          alt={"bookimg"}
        />
      </Link>
      {/* <Link href={`/5ce0c0c2a7864c71992576e53182cc1f`}>
        <Image
          src={BookImg.src}
          width={220}
          height={230}
          alt={"bookimg"}
        />
      </Link> */}
    </PageAsideWrapper>
  );
}
