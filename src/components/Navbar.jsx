// Navbar.jsx
// 목적: 상단 네비게이션 바를 구현
// 기능: 사이드바 토글, 검색, 알림, 설정, 프로필 페이지 이동
// 작성자: 임사랑
// 작성일: 2024.07.19

import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import navMascotImage from "../assets/navMascot.png";
import Sidebar from "./Sidebar";
import axios from "axios";

// 네비게이션 바 전체 컨테이너 스타일
const NavbarContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 60px;
  left: 0;
  top: 0;
  background: ${({ isSpecialRoute }) => (isSpecialRoute ? "#3E77FF" : "#ffffff")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
  box-sizing: border-box;

  ${({ $isSpecialPage }) =>
    $isSpecialPage &&
    css`
      background: #3e77ff;
    `}
`;

// 마스코트 아이콘 스타일
const SideMascot = styled.div`
  width: 40px;
  height: 40px;
  background: url(${navMascotImage}) no-repeat center center;
  background-size: cover;
  cursor: pointer;
`;

// 네비게이션 바 오른쪽 아이콘 컨테이너 스타일
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

// 로그인 버튼 스타일
const LoginButton = styled.button`
  width: 119px;
  height: 41px;
  background: #3e77ff;
  border: 1px solid #3e77ff;
  border-radius: 30px;
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileUrl, setProfileUrl] = useState("/roundLogo1.png");
  const navigate = useNavigate();
  const location = useLocation();

  const isSearchPage = location.pathname === "/search"; // 현재 경로가 검색 페이지인지 확인
  const specialPages = ["/login", "/signup", "/find-id", "/find-pswd"];
  const isSpecialPage = specialPages.includes(location.pathname); // 특수 페이지인지 확인

  // 프로필 정보를 가져오는 함수
  const fetchProfile = async () => {
    try {
      const token =
        sessionStorage.getItem("accessToken") ||
        localStorage.getItem("accessToken");

      if (!token) return;

      const response = await axios.get("/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { profileUrl } = response.data.data;
      if (profileUrl) {
        setProfileUrl(profileUrl);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  // 로그인된 상태일 때 프로필 이미지 가져오기
  useEffect(() => {
    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn]);

  // Axios 인터셉터 설정
  // useEffect(() => {
  //   const interceptor = axios.interceptors.response.use(
  //     (response) => response,
  //     (error) => {
  //       if (error.response && error.response.status === 401) {
  //         // 401 에러 발생 시 로그아웃 처리
  //         sessionStorage.removeItem("accessToken");
  //         sessionStorage.removeItem("refreshToken");
  //         localStorage.removeItem("accessToken");
  //         localStorage.removeItem("refreshToken");
  //         setIsLoggedIn(false);
  //         navigate("/login"); // 로그인 페이지로 리다이렉트
  //       }
  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     axios.interceptors.response.eject(interceptor);
  //   };
  // }, [navigate]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // 401 에러 발생 시 로그아웃 처리 로직 제거
          console.error("401 Unauthorized error:", error.response.data);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  // 검색어 입력 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색 제출 핸들러
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // 프로필 클릭 핸들러 (사이드바 열기/닫기)
  const handleProfileClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 로그인 버튼 클릭 핸들러
  const handleLoginClick = () => {
    navigate("/login");
  };

  // 마스코트 클릭 핸들러
  const handleMascotClick = () => {
    if (location.pathname === "/") {
      navigate("/landing");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <NavbarContainer $isSpecialPage={isSpecialPage}>
        <SideMascot onClick={handleMascotClick} />
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {!isSpecialPage && (
            <SearchBarContainer $isSearchPage={isSearchPage}>
              <SearchBar $isSearchPage={isSearchPage}>
                <form
                  onSubmit={handleSearchSubmit}
                  style={{ display: "flex", width: "100%" }}
                >
                  <SearchInput
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </form>
              </SearchBar>
              <SearchIconContainer $isSearchPage={isSearchPage}>
                <SearchIcon
                  $isSearchPage={isSearchPage}
                  onClick={handleSearchSubmit}
                />
              </SearchIconContainer>
            </SearchBarContainer>
          )}
          <IconContainer>
            {isLoggedIn ? (
              <>
                <AlarmIcon />
                <ProfileIcon
                  profileUrl={profileUrl}
                  onClick={handleProfileClick}
                />
              </>
            ) : (
              <LoginButton onClick={handleLoginClick}>
                <AiOutlineUser size={24} /> 로그인
              </LoginButton>
            )}
          </IconContainer>
        </div>
      </NavbarContainer>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
