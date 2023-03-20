import Image from "next/image";
import {
  ProfileWrapper,
  ContentWrapper,
  StyledName,
  StyledNickname,
} from "./Profile.style";
import config from "config/config.json";

const profile = config.profile;

export default function Profile() {
  return (
    <ProfileWrapper>
      <Image src={"/profile.png"} alt={profile.name} width={34} height={34} />
      <ContentWrapper>
        <StyledName>{profile.name}</StyledName>
        <StyledNickname>{profile.nickname}</StyledNickname>
      </ContentWrapper>
    </ProfileWrapper>
  );
}
