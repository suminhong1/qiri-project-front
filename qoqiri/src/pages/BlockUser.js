import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBlockUser, delBlockUser } from "../api/blockuser";
import "../css/BlockUser.css";

const BlockUserInfo = () => {
  const [blockUser, setBlockUser] = useState([]);
  const user = useSelector((state) => state.user);

  const blockUserAPI = async () => {
    const result = await getBlockUser(user.id);
    setBlockUser(result.data);
  };

  useEffect(() => {
    blockUserAPI();
  }, [user]);

  const filteredBlockUser = blockUser.filter(
    (blockUser) => blockUser.unblock === "Y"
  );

  const handleBlockUser = async (userId) => {
    const deleteBlockUser = await delBlockUser(userId);
    alert("수정되었습니다.");
    window.location.reload();
    return deleteBlockUser.data;
  };

  return (
    <div className="blockUser-container">
      <table className="blockUser-table">
        <thead>
          <tr>
            <th>차단 아이디</th>
            <th>차단 날짜</th>
            <th>차단 해제</th>
          </tr>
        </thead>
        <tbody>
          {filteredBlockUser.map((blockUser) => (
            <tr key={blockUser.blockUserSeq}>
              <td>{blockUser.blockInfo.userId}</td>
              <td>
                {blockUser.blockDate ? blockUser.blockDate.split("T")[0] : ""}
              </td>
              <td>
                {/* 수정된 부분: handleBlockUser 함수에 userId 전달 */}
                <button
                  onClick={() => handleBlockUser(blockUser.blockInfo.userId)}
                >
                  유저 차단 해제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlockUserInfo;
