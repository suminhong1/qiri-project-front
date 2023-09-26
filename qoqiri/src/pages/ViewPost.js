import '../css/ViewPost.css';

const ViewPost = () => {
    return (
        <>
            <main id="main">
                <div className="body">
                    <input type="hidden" className="title" value="수민이의 은퇴식" />
                    <input type="hidden" className="ogContent" value />
                    <input type="hidden" className="ogImage" value />
                    <input type="hidden" className="url" value />
                    <div className="back">
                        <a href="#">코끼리끼리 그리고 대충 아이콘</a>
                    </div>

                    <div className="item">
                        <div className="info">
                            <div className="titleContainer">
                                <div className="category" title="게시판에 맞는 카테고리">
                                    <span>
                                        <a href="#">게시판에 맞는 카테고리</a>
                                    </span>
                                </div>
                                <span>
                                    <h1>수민이의 은퇴식</h1>
                                </span>
                            </div>
                            <div className="etc">
                                <div className="left">
                                    <div className="userImage" style={{}}></div>
                                    <div className="nickName">홍수민</div>
                                    <div className="dot"></div>
                                    <div className="dateTime">n일전</div>
                                    <div className="dot"></div>
                                    <div className="viewCount">안에 svg랑 path 넣어줘야함</div>
                                    <div className="dot"></div>
                                    <div className="likeCount">이미지파일이랑 따봉갯수</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="customField">
          출처 :<a href="#" target="_blank"></a>
        </div> */}
                    <div className="customHtml"></div>
                    <div className="content ck-contetnt">
                        <p>100년만에 한번 나올까말까한 희대의 프로그래머</p>
                        <p>홍수민씨의 은퇴식을 시작하겠습니다</p>
                    </div>
                    <div className="html"></div>
                    <div className="customHtml"></div>

                    <div className="likeContainer">
                        <button id="like" className="like">
                            <span>코하하</span>
                        </button>
                        <button id="scrap" className="scrap">
                            스크랩
                        </button>
                    </div>
                    <div className="listAndEdit">
                        <div className="left">
                            <div className="button">
                                <a href="#"> ☜ 이전 글 </a>
                            </div>
                        </div>
                        <div className="center">
                            <div className="button">
                                <a href="#"> 목록 </a>
                            </div>
                        </div>
                        <div className="right">
                            <div className="button">
                                <a href="#">다음 글 ☞</a>
                            </div>
                        </div>
                    </div>
                    <div className="commentTitle">댓글</div>
                    <div className="comments" id="comments">
                        더 추가해야함
                    </div>
                    <div className="commentContainer" id="newComment">
                        <div className="contentContainer">
                            <div className="commentInput">
                                <div className="commentContent">
                                    <textarea disabled name="content" placeholder="로그인 해주세요"></textarea>
                                </div>
                                <div className="submit">
                                    <button type="button" onClick="login(event)">
                                        로그인
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="listAndEdit">
                        <div className="left">
                            <div className="button">
                                <a href="#">목록</a>
                            </div>
                        </div>
                        <div className="right"></div>
                    </div>
                </div>
            </main>
        </>
    );
};
export default ViewPost;
