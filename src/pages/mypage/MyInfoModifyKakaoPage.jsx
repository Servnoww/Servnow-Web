//목적: 마이페이지 내정보 수정의 로직과 레이아웃 담당(카카오로그인 버전)
//기능: 사용자가 내정보 수정을 할 수 있도록 한다.(카카오로그인 버전)
//2024.07.31 데이-이연
//더 추가할기능: api 연결

import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import kakaoLogo from '../../../src/assets/kakao_logo.png'
import axios from 'axios';

const PageContainer = styled.div`
  margin: 0 auto;
  padding: 5rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 10px;
`;

const Header = styled.h2`
  font-size: 1.8rem;
  color: #4C76FE;
  margin-bottom: 1rem;
`;

const HorizontalLine = styled.hr`
  width: 100%;
  border: none;
  border-top: 3px solid #4C76FE;
  margin-bottom: 1.5rem;
`;
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;
const ProfileImageWrapper = styled.div`
  position: relative;
`;
const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 2rem;
  object-fit: cover;
`;
const IconButton = styled.button`
  width: 120px;
  height: 35px;
  background-color: #4C76FE;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-left: 1rem;
`;
const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NicknameInput = styled.input`
  width: 280px;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  margin-right: 3rem;
`;

const UpdateButton = styled.button`
  width:18%;
  padding: 0.8rem 1.55rem;
  background-color: #4C76FE;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Section = styled.div`
  width: 100%;
  padding: 1rem 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  color: #3a3a3a;
  margin-bottom: 1.5rem;
`;
const SectionSubTitle = styled.p`
  font-size: 1rem;
  color: #3a3a3a;
  margin-bottom: 2.5rem;
`
const KakaoButton = styled.button`
  width: 360px;
  padding: 0.8rem;
  background-color: #f9e000;
  margin-bottom: 1rem;
  color: #3a3a3a;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KakaoIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
`;

const SecondSectionTitle = styled.p`
  font-size: 1.1rem;
  margin-top: 0rem;
  margin-bottom: 2.5rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const InfoLabel = styled.label`
  width: 100px;
  font-size: 1rem;
  color: #3a3a3a;
  margin-right: 3rem;
  text-align: left;
`;

const InfoInput = styled.input`
  width: 270px;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;

`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  width: 420px;
`;

const PrevButton = styled.button`
  width: 50%;
  padding: 1rem 2rem;
  background-color: #ddd;
  color: #3a3a3a;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 1rem;
`;

const ReAuthButton = styled.button`
  width: 50%;
  padding: 1rem 2rem;
  background-color: #4C76FE;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
`;
const HorizontalSemiLine = styled.hr`
  width: 600px;
  border: none;
  border-top: 1px solid #ddd;
  margin: 2rem 0;
`;
const MyInfoModifyKakaoPage = () => {
  const [nickname, setNickname] = useState('ari7717');
  const [profileImage, setProfileImage] = useState('../../../src/assets/logo1.png')
  
  useEffect(() => {
    axios.get('')
    .then(response => {
      setNickname(response.data.nickname);
    })
    .catch(error => [
      console.error('There was an error fetching the nickname!', error)
    ]);
  }, []);

  const handleUpdateNickname = () => {
    axios.post('', {nickname})
      .then(response => {
        alert('닉네임이 수정되었습니다.');
      })
      .catch(error => {
        console.error('There was an error updating the nickname!', error);
        alert('아이디 수정에 실패했습니다.');
      });
  }
  return (
    <PageContainer>
      <Header>내 정보 수정</Header>
      <HorizontalLine></HorizontalLine>
      <ProfileImageWrapper>
        <ProfileImage src={profileImage} alt='profile image'/>
        <IconButton style={{ position: 'absolute', top: '70px', right: '0', width: '25px', height: '25px', padding: '0' }}>✎</IconButton>
      </ProfileImageWrapper>
      <ProfileContainer> 
        <NicknameContainer>
          <InfoLabel>닉네임</InfoLabel>
          <NicknameInput type="text" value={nickname} />
          <UpdateButton type='button' onClick={handleUpdateNickname}>수정하기</UpdateButton>
        </NicknameContainer>
      </ProfileContainer>
      <HorizontalSemiLine/>
      <Section>
        <SectionTitle>SNS 연결</SectionTitle>
        <SectionSubTitle>연결된 SNS 계정으로 로그인할 수 있습니다.</SectionSubTitle>
        <KakaoButton>
          <KakaoIcon src={kakaoLogo} alt="Kakao Logo"/> 카카오로 연결
        </KakaoButton>
      </Section>
      <HorizontalSemiLine/>
      <Section>
        <SecondSectionTitle>본인 인증된 회원 정보</SecondSectionTitle>
        <InfoContainer>
          <InfoItem>
            <InfoLabel>성명</InfoLabel>
            <InfoInput type="text" value="우*진" readOnly />
          </InfoItem>
          <InfoItem>
            <InfoLabel>연락처</InfoLabel>
            <InfoInput type="text" value="010-****-7637" readOnly />
          </InfoItem>
        </InfoContainer>
      </Section>
      <ButtonContainer>
        <PrevButton>이전</PrevButton>
        <ReAuthButton>본인 인증 다시하기</ReAuthButton>
      </ButtonContainer>
    </PageContainer>
  );
};

export default MyInfoModifyKakaoPage;
