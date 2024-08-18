// 목적: 회원가입 화면 속 정보 입력 화면 구현
// 기능: 사용자 정보 입력
// 2024.08.08/곤/장고은
// 추가되어야 할 기능: 아이디 중복확인, 이메일 본인인증하기, 닉네임 유효성 검사 멘트 수정, api 연결

import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5d6670;
  font-size: small;

  .idCheckBtn,
  .emailCheckBtn {
    width: 100px;
    height: 35px;
    color: white;
    border: none;
    margin-left: 20px;
  }

  .idCheckBtn {
    background-color: #3e77ff;
  }

  .emailCheckBtn {
    background-color: #011b6c;
  }

  .femaleBtn {
    font-weight: 500;
    color: #fff;
    background-color: #011b6c;
  }

  .maleBtn {
    font-weight: bold;
    color: #061522;
    background-color: #dbe1e9;
  }

  table {
    width: 630.38px;
  }

  input {
    height: 33px;
    width: 300px;
    padding-left: 10px;
    border-radius: 5px;
    border: 0.5px solid #d9d9d9;
  }

  input:focus::placeholder {
    opacity: 0;
  }

  input:focus {
    outline: none;
  }

  caption {
    color: #000;
    margin: 10px;
    font-size: 20px;
    font-weight: bold;
  }

  td {
    padding: 10px 30px 10px 20px;
  }

  button {
    border-radius: 5px;
    cursor: pointer;
    border: none;
  }

  span {
    color: #3e77ff;
  }
`;

const FormSection = styled.div`
  margin-bottom: 30px;
  &.add td {
    padding-right: 70px;
  }

  &.add button {
    width: 150px;
    height: 35px;
    margin-right: 15px;
  }

  .birthDate {
    width: 95px;
    height: 35px;
    margin-right: 15px;
    text-align: right;
    border-radius: 5px;
    border: 0.5px solid #d9d9d9;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .back {
    color: #000;
    background-color: #d9d9d9;
  }

  .signup {
    color: white;
    background-color: #3e77ff;
  }

  button {
    width: 200px;
    height: 50px;
    border: none;
    border-radius: 10px;
    font-weight: bolder;
  }
`;
const ErrorMessage = styled.p`
  margin-top: 5px;
  color: #011b6c;
`;

const SignUpInputInfo = ({ setActiveStep }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
    nickname: "",
    gender: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    verificationCode: "",
    nickname: "",
  });

  const [touched, setTouched] = useState({
    username: false,
    password: false,
    confirmPassword: false,
    email: false,
    verificationCode: false,
    nickname: false,
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    //   Validate username
    if (!form.username) {
      newErrors.username = "아이디는 필수입력사항입니다.";
      isValid = false;
    } else {
      newErrors.username = "";
    }

    // Validate password
    const passwordValidation =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!form.password || !passwordValidation.test(form.password)) {
      newErrors.password =
        "비밀번호는 8~20자, 영문, 숫자, 특수문자 혼합으로 입력해주세요.";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    // Validate confirmPassword
    if (!form.confirmPassword || form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      isValid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    // Validate email
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailValidation.test(form.email)) {
      newErrors.email = "이메일 형식이 적합하지 않습니다.";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    // Validate verificationCode
    if (!form.verificationCode) {
      newErrors.verificationCode = "인증번호가 일치하지 않습니다.";
      isValid = false;
    } else {
      newErrors.verificationCode = "";
    }

    // Validate nickname
    if (!form.nickname) {
      newErrors.nickname = "멋진 닉네임이네요!";
      isValid = false;
    } else {
      newErrors.nickname = "";
    }

    // Validate gender
    if (!form.gender) {
      isValid = false;
    }

    // Validate birth date
    if (!form.birthYear || !form.birthMonth || !form.birthDay) {
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const daysInMonth = (month, year) => {
    const thirtyOneDays = [1, 3, 5, 7, 8, 10, 12];
    const thirtyDays = [4, 6, 9, 11];

    if (thirtyOneDays.includes(month)) {
      return 31;
    } else if (thirtyDays.includes(month)) {
      return 30;
    } else if (month === 2) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29;
      } else {
        return 28;
      }
    }
    return 30;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    validateForm();
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: false,
    });
  };
  const handleGenderSelect = (gender) => {
    setForm({
      ...form,
      gender,
    });
  };

  const handleMonthChange = (e) => {
    const { value } = e.target;
    const month = parseInt(value, 10);
    const days = daysInMonth(month, parseInt(form.birthYear, 10));

    setForm({
      ...form,
      birthMonth: value,
      birthDay: form.birthDay > days ? days : form.birthDay,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 모든 필드를 touched 상태로 설정하여 에러 메시지를 표시
    setTouched({
      username: true,
      password: true,
      confirmPassword: true,
      email: true,
      verificationCode: true,
      nickname: true,
    });

    if (validateForm()) {
      setActiveStep(2);
      console.log(form);
    }
  };

  return (
    <FormContainer>
      <form method="post" onSubmit={handleSubmit}>
        <FormSection className="basic">
          <table>
            <caption>기본정보</caption>
            <tr>
              <td htmlFor="username">
                아이디 <span>*</span>
              </td>
              <td>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  placeholder="아이디를 입력해 주세요."
                />
                <button className="idCheckBtn" type="button">
                  중복확인
                </button>
                {touched.username && errors.username && (
                  <ErrorMessage>{errors.username}</ErrorMessage>
                )}
              </td>
            </tr>
            <tr>
              <td htmlFor="password">
                비밀번호 <span>*</span>
              </td>
              <td>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  placeholder="영문 숫자 특수문자 포함 8~20자 입니다."
                />
                {touched.password && errors.password && (
                  <ErrorMessage>{errors.password}</ErrorMessage>
                )}
              </td>
            </tr>
            <tr>
              <td htmlFor="confirmPassword">
                비밀번호 재확인 <span>*</span>
              </td>
              <td>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
                )}
              </td>
            </tr>
            <tr>
              <td htmlFor="email">
                이메일 <span>*</span>
              </td>
              <td>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  placeholder="이메일을 입력해 주세요."
                />
                <button className="emailCheckBtn" type="button">
                  본인인증
                </button>
                {touched.email && errors.email && (
                  <ErrorMessage>{errors.email}</ErrorMessage>
                )}
              </td>
            </tr>
            <tr>
              <td htmlFor="verificationCode">
                인증번호 <span>*</span>
              </td>
              <td>
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  value={form.verificationCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
                <button className="emailCheckBtn" type="button">
                  인증확인
                </button>
                {touched.verificationCode && errors.verificationCode && (
                  <ErrorMessage>{errors.verificationCode}</ErrorMessage>
                )}
              </td>
            </tr>
          </table>
        </FormSection>

        <hr style={{ margin: "20px 0" }} />

        <FormSection className="add">
          <table>
            <caption>추가정보</caption>
            <tr>
              <td htmlFor="nickname">
                닉네임 <span>*</span>
              </td>
              <td>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={form.nickname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
                {touched.nickname && errors.nickname && (
                  <ErrorMessage>{errors.nickname}</ErrorMessage>
                )}
              </td>
            </tr>
            <tr>
              <td htmlFor="gender">
                성별 <span>*</span>
              </td>
              <td>
                <button
                  type="button"
                  className="maleBtn"
                  selected={form.gender === "남성"}
                  onClick={() => handleGenderSelect("남성")}
                >
                  남자
                </button>
                <button
                  type="button"
                  className="femaleBtn"
                  selected={form.gender === "여성"}
                  onClick={() => handleGenderSelect("여성")}
                >
                  여자
                </button>
              </td>
            </tr>
            <tr>
              <td htmlFor="birthDate">
                생년월일 <span>*</span>
              </td>
              <td>
                <select
                  className="birthDate"
                  name="birthYear"
                  value={form.birthYear}
                  onChange={handleChange}
                >
                  <option value="">년</option>
                  {Array.from({ length: 125 }, (_, i) => 1900 + i).map(
                    (year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  )}
                </select>
                <select
                  className="birthDate"
                  name="birthMonth"
                  value={form.birthMonth}
                  onChange={handleMonthChange}
                >
                  <option value="">월</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  className="birthDate"
                  name="birthDay"
                  value={form.birthDay}
                  onChange={handleChange}
                >
                  <option value="">일</option>
                  {Array.from(
                    {
                      length: daysInMonth(
                        parseInt(form.birthMonth, 10),
                        parseInt(form.birthYear, 10)
                      ),
                    },
                    (_, i) => i + 1
                  ).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </table>
        </FormSection>
        <ButtonContainer>
          <button
            className="back"
            type="button"
            onClick={() => setActiveStep(0)}
          >
            이전
          </button>
          <button className="signup" type="submit">
            회원가입
          </button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default SignUpInputInfo;
