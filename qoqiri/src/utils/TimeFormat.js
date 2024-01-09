// 시간 포맷 설정(날짜)
const formatSendTime1 = (sendTime) => {
  const date = new Date(sendTime);
  const options = {
    month: "numeric", // 월
    day: "numeric", // 일
  };
  return date.toLocaleDateString("en-US", options);
};

// 시간 포맷 설정(시, 분)
const formatSendTime2 = (sendTime) => {
  const date = new Date(sendTime);
  const options = {
    hour: "2-digit", // 시간 (2자리)
    minute: "2-digit", // 분 (2자리)
  };
  return date.toLocaleTimeString("en-US", options);
};

// 시간 포맷 설정(월, 일, 시, 분)
export const formatSendTime = (sendTime) => {
  const date = new Date(sendTime);
  const options = {
    month: "numeric", // 월
    day: "numeric", // 일
    hour: "numeric", // 시간
    minute: "numeric", // 분
    hour12: true, // 오전/오후 표시
  };
  return date.toLocaleDateString("en-US", options);
};

export const formatSendTimeBasedOnDate = (sendTime) => {
  const date = new Date(sendTime);
  const today = new Date(); // 오늘 날짜를 가져옴

  // 오늘 날짜와 비교
  if (date.toDateString() === today.toDateString()) {
    // 오늘 날짜와 같다면 formatSendTime2 함수로 시간 포맷을 반환
    return formatSendTime2(sendTime);
  } else {
    // 오늘 날짜가 아니라면 formatSendTime1 함수로 날짜 포맷을 반환
    return formatSendTime1(sendTime);
  }
};
