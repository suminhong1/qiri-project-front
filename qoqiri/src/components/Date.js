import React from "react";
import { differenceInMonths, differenceInYears } from "date-fns";

function Test({ postDate }) {
  // postDate를 Date 객체로 변환
  const postDateAsDate = new Date(postDate);

  // 현재 시간
  const currentTime = new Date();

  // 경과 시간을 계산
  const timeDifference = currentTime - postDateAsDate; // 밀리초 단위로 경과 시간 계산

  // 년, 월, 일, 시간, 분, 초로 변환하는 함수
  const formatTime = (milliseconds) => {
    const years = differenceInYears(new Date(), postDateAsDate);
    const months = differenceInMonths(new Date(), postDateAsDate);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
    const seconds = Math.floor(milliseconds / 1000) % 60;

    if (years > 0) {
      return `${years}년전`;
    } else if (months > 0) {
      return `${months}달전`;
    } else if (days > 0) {
      return `${days}일전`;
    } else if (hours > 0) {
      return `${hours}시간전`;
    } else if (minutes > 0) {
      return `${minutes}분전`;
    } else {
      return `${seconds}초전`;
    }
  };

  return (
    <div className="App">
      <p>{formatTime(timeDifference)}</p>
    </div>
  );
}

export default Test;
