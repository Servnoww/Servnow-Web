// 목적: 설문 시작 화면
// 기능: 설문 시작 전 설문지에 대한 정보 제공
// 2024.08.21./엠마/신윤지
// 추가되어야 할 기능: api url, id 및 이미지 변경 + 토큰 받아왔을 때 제대로 작동되는지 확인
import React, { useState } from "react";
import styled from "styled-components";
import character from "../assets/logo1.png";
import axios from "axios";

const Container = styled.div`
  padding: 48px;
  background-color: #f2f5ff;
`;

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;

  div:nth-child(2) {
    display: flex;
    flex-direction: row;
    align-items: center;

    div:first-child {
      width: 70%;
      padding: 48px 40px;
      margin-top: 24px;

      div {
        width: fit-content;
        padding: 0;
        margin: 0;
        text-align: left;
      }
    }
  }
`;

const SurveyWrapper = styled.div`
  display: flex;

  div {
    display: flex;
    align-items: center;
  }

  div:nth-child(2) {
    padding: 24px 36px;
    margin: 0 0 0 12px;
  }
`;

const Survey = styled.div`
  padding: 16px 32px;
  border-radius: 12px;
  box-shadow: 1px 1px 1px 1px rgb(0 0 0 / 10%);
  background-color: white;
  color: #061522;
  font-size: 22px;

  span {
    margin: 0 8px 0 0;
    font-size: 32px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Pretendard Bold";
  font-size: 26px;
  padding-right: 18px;
`;

const Term = styled.p`
  margin-top: 12px;
  color: #5d6670;
  font-size: 20px;
`;

const Email = styled.div`
  width: 30%;
  padding: 32px 32px 52px 32px;
  margin: 24px 0 0 24px;
  border-radius: 12px;
  box-shadow: 1px 1px 1px 1px rgb(0 0 0 / 10%);
  background-color: white;
  color: #061522;
  font-size: 22px;

  div:first-child {
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;

    span {
      color: #3e77ff;
    }
  }
`;

const Text = styled.input`
  width: 100%;
  margin-top: 12px;
  padding: 8px 8px;
  border: 0px;
  border-bottom: 1px solid #dbe1e9;
  font-size: 16px;
  outline: none;

  ::placeholder,
  ::-ms-input-placeholder {
    color: #dbe1e9;
  }
`;

const DescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  div:nth-child(2) {
    width: 100%;

    div {
      width: 40%;
    }
  }

  img {
    width: 432px;
  }
`;

const Description = styled.div`
  width: 40%;
  padding: 2% 15% 2% 4%;
  margin: 24px 36px;
  border-radius: 24px 24px 24px 0;
  background-color: #3e77ff;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;
  word-break: keep-all;
`;

const AnswerStartPage = () => {
  const loginStatus = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const fetchLoginedData = async () => {
    await axios
      .get("/api/v1/survey/2/intro", {
        headers: {
          Authorization: "Bearer " + loginStatus,
        },
      })
      .then((res) => {
        setLoading(false);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("질문지 답변 전 화면에서 에러 발생 :" + err);
        alert("오류가 발생했습니다.");
      });
  };

  const fetchUnloginedData = async () => {
    await axios
      .get("/api/v1/survey/guest/1/intro")
      .then((res) => {
        setLoading(false);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("질문지 답변 전 화면에서 에러 발생 :" + err);
        alert("오류가 발생했습니다.");
      });
  };

  useState(() => {
    if (loginStatus) {
      fetchLoginedData();
    } else {
      fetchUnloginedData();
    }
  }, []);

  const changeTime = (localDateTime) => {
    var year = localDateTime.substr(0, 4);
    var month = localDateTime.substr(5, 2);
    var day = localDateTime.substr(8, 2);

    var hour = localDateTime.substr(11, 2);
    var min = localDateTime.substr(14, 2);

    if (hour > 12) {
      return year + "." + month + "." + day + ". 오후 " + hour - 12 + ":" + min;
    } else {
      return year + "." + month + "." + day + ". 오전 " + hour + ":" + min;
    }
  };

  return (
    <Container>
      {!loading && (
        <>
          <SurveyContainer>
            <SurveyWrapper>
              <Survey>
                <span>🕘</span> 약 {data.duration}분, {data.questionCount}개 질문
              </Survey>
              <Survey>
                <span>🎁</span> {data.reward} 추첨 {data.rewardCount}명
              </Survey>
            </SurveyWrapper>
            <div>
              <Survey>
                <Title>{data.title}</Title>
                <Term>
                  {changeTime(data.createdAt)}~ {changeTime(data.expiredAt)}
                </Term>
              </Survey>
              {!loginStatus && (
                <Email>
                  <div>
                    이메일&nbsp;
                    <span>*</span>
                    <Text type="text" placeholder="응답을 받기 위해 필수적으로 입력해주세요." />
                  </div>
                </Email>
              )}
            </div>
          </SurveyContainer>

          <DescriptionContainer>
            <img src={character} />
            <div>
              <Description>{data.content1}</Description>
              <Description>{data.content2} </Description>
            </div>
          </DescriptionContainer>
        </>
      )}
    </Container>
  );
};

export default AnswerStartPage;
