import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import searchImage from "../assets/search.png";
import alarmImage from "../assets/alarm.png";
import profileImage from "../assets/profileOrigin.png";
import navMascotImage from "../assets/navMascot.png";
import Sidebar from "./Sidebar";

// Navbar 컨테이너 스타일
const NavbarContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 60px;
  left: 0;
  top: 0;
  background: #ffffff;
  // box-shadow: 0px 0.550964px 0.550964px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
  box-sizing: border-box;
`;

// NavMascot 컴포넌트 스타일
const SideMascot = styled.div`
  width: 40px;
  height: 40px;
  background: url(${navMascotImage}) no-repeat center center;
  background-size: cover;
  cursor: pointer;
`;

// 검색 바 스타일
const SearchBarContainer = styled.div`
  width: ${({ isSearchPage }) => (isSearchPage ? "60%" : "305px")};
  height: 41px;
  display: flex;
  align-items: center;
  position: ${({ isSearchPage }) => (isSearchPage ? "absolute" : "relative")};
  left: ${({ isSearchPage }) => (isSearchPage ? "50%" : "auto")};
  transform: ${({ isSearchPage }) =>
    isSearchPage ? "translateX(-50%)" : "none"};
  transition: width 0.3s ease-in-out, left 0.3s ease-in-out,
    transform 0.3s ease-in-out;
`;

const SearchBar = styled.div`
  flex: 1;
  height: 100%;
  background: #f2f5ff;
  border: ${({ isSearchPage }) =>
    isSearchPage ? "1px solid #e6e6e6" : "none"};
  border-radius: 30px 0 0 30px;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const SearchIconContainer = styled.div`
  width: 50px;
  height: 41px;
  background: ${({ isSearchPage }) => (isSearchPage ? "#C6D3FF" : "#f2f5ff")};
  border: ${({ isSearchPage }) =>
    isSearchPage ? "1px solid #e6e6e6" : "none"};
  border-left: none;
  border-radius: 0 30px 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SearchIcon = styled.div`
  width: 29px;
  height: 29px;
  background: url(${searchImage}) no-repeat center center;
  background-size: contain;
`;

// 검색 입력 스타일
const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  outline: none;
  padding: 0 10px;
  border-radius: 30px;
  font-size: 14px;
  font-family: "Pretendard", sans-serif;
`;

// 아이콘 컨테이너 스타일
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

// 알림 아이콘 스타일
const AlarmIcon = styled.div`
  width: 21.75px;
  height: 22.584px;
  background: url(${alarmImage}) no-repeat center center;
  background-size: contain;
  cursor: pointer;
`;

// 프로필 아이콘 스타일
// 임시 수정해야됨
const ProfileIcon = styled.div`
  width: 21.75px;
  height: 22.584px;
  background: url(${profileImage}) no-repeat center center;
  background-size: contain;
  cursor: pointer;
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
  gap: 8px; /* 아이콘과 텍스트 사이의 간격 */
`;

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const navigate = useNavigate();
  const location = useLocation();

  const isSearchPage = location.pathname === "/search";

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

  // 프로필 클릭 핸들러
  const handleProfileClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 로그인 버튼 클릭 핸들러
  const handleLoginClick = () => {
    // 로그인 페이지로 이동하거나 로그인 처리를 수행
    navigate("/login");
  };

  return (
    <>
      <NavbarContainer>
        {/* 랜딩페이지 연결 수정*/}
        <SideMascot onClick={() => navigate("/")} />
        {!isSearchPage && (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <SearchBarContainer isSearchPage={isSearchPage}>
              <SearchBar isSearchPage={isSearchPage}>
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
              <SearchIconContainer isSearchPage={isSearchPage}>
                <SearchIcon
                  isSearchPage={isSearchPage}
                  onClick={handleSearchSubmit}
                />
              </SearchIconContainer>
            </SearchBarContainer>
            <IconContainer>
              {isLoggedIn ? (
                <>
                  <AlarmIcon />
                  <ProfileIcon onClick={handleProfileClick} />
                </>
              ) : (
                <LoginButton onClick={handleLoginClick}>
                  <AiOutlineUser size={24} /> 로그인
                </LoginButton>
              )}
            </IconContainer>
          </div>
        )}
        {isSearchPage && (
          <>
            <SearchBarContainer isSearchPage={isSearchPage}>
              <SearchBar isSearchPage={isSearchPage}>
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
              <SearchIconContainer isSearchPage={isSearchPage}>
                <SearchIcon
                  isSearchPage={isSearchPage}
                  onClick={handleSearchSubmit}
                />
              </SearchIconContainer>
            </SearchBarContainer>
            <IconContainer>
              {isLoggedIn ? (
                <>
                  <AlarmIcon />
                  <ProfileIcon onClick={handleProfileClick} />
                </>
              ) : (
                <LoginButton onClick={handleLoginClick}>
                  <AiOutlineUser size={24} /> 로그인
                </LoginButton>
              )}
            </IconContainer>
          </>
        )}
      </NavbarContainer>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
