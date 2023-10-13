import React from "react"; // React를 임포트
import BuildedEditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor as Editor } from "@ckeditor/ckeditor5-react";
import "../css/PostWrite.css";

const PostWrite = () => {
  return (
    <>
      <div className="postWrite">
        <h1>글쓰기</h1>
        <form action="/write/new" method="POST">
          <div className="subContainer">
            <div className="mainMinorSubject">
              <div className="boradContainer">
                <select>
                  <option value="">선택하세요</option>
                  <option value="apple">사과</option>
                  <option value="banana">바나나</option>
                  <option value="cherry">체리</option>
                </select>
              </div>
              <div className="categoryContainer">
                <select>
                  <option value="">카테고리 없음</option>
                </select>
              </div>
            </div>
            <div className="checkbox"></div>
          </div>
          <div className="title">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="제목"
              maxLength="100"
            />
          </div>
          <div className="content">
            <div className="textareaContainer">
              <textarea
                name="content"
                id="editor"
                maxLength="10000000"
                style={{ display: "none" }}
              ></textarea>
              <Editor editor={BuildedEditor} />
            </div>
          </div>
          <div className="tags">
            <input
              type="text"
              name="tags"
              placeholder="태그"
              maxLength="100"
            ></input>
          </div>
          <div className="button">
            <button type="submit">등록</button>{" "}
            {/* 버튼 타입을 submit으로 변경 */}
          </div>
        </form>
      </div>
    </>
  );
};

export default PostWrite;
