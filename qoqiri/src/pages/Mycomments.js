import React, { useState, useEffect } from "react";
import { getComment } from "../api/comment";

function MyComments() {
    const [myComments, setMyComments] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('user');
        if (storedUserInfo) {
            const parsedUserInfo = JSON.parse(storedUserInfo);
            setUserInfo(parsedUserInfo);

            const getMyComments = async () => {
                try {
                    if (parsedUserInfo) {
                        const response = await getComment(parsedUserInfo.id);
                        setMyComments(response.data);
                        console.log(response.data);
                    }
                } catch (error) {
                    console.error("오류가 발생했습니다. ", error);
                }
            };
            getMyComments();
        }
    }, []);

    return (
        <div>
            <h1>내가 쓴 댓글 목록</h1>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>댓글 내용</th>
                    </tr>
                </thead>
                <tbody>
                    {myComments.map((comment) => (
                        <tr key={comment.commentsSEQ}>
                            <td>{comment.commentDesc}</td>
                            <td>{comment.commentText}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MyComments;
