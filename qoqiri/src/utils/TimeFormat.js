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

const formatSendTime3 = (sendTime) => {
  const now = new Date();
  const date = new Date(sendTime);
  const timeDiff = now - date;

  const seconds = Math.floor(Math.abs(timeDiff) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

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

export const formatDate24Hours = (sendTime) => {
  const date = new Date(sendTime);
  const today = new Date(); // 오늘 날짜를 가져옴

  // 현재 시간과의 차이를 계산 (밀리초 단위)
  const timeDiff = today - date;
  const hoursDiff = timeDiff / (1000 * 60 * 60); // 차이를 시간으로 변환

  // 24시간이 지났는지 비교
  if (hoursDiff < 24) {
    // 24시간이 지나지 않았다면 formatSendTime3 함수로 시간 포맷을 반환
    return formatSendTime3(sendTime);
  } else {
    // 24시간이 지났다면 formatSendTime1 함수로 날짜 포맷을 반환
    return formatSendTime(sendTime);
  }
};
