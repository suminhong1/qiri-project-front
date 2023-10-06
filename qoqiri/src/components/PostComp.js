import '../css/PostComp.css';

const PostComp = () => {
    return (
        <>
            <article id="list">
                <section id="postList" className="justPost">
                    <a className="item" href="#">
                        <div className="post">
                            <div className="titleContainer">
                                <div className="category">[게시글 카테고리]</div>
                                <div className="title"></div>{' '}
                                <div className="text">
                                    <div className="pre">[게시글 제목]</div>
                                    어느정도 내용
                                </div>
                            </div>

                            <div className="commentCount">0</div>

                            <div className="etc">
                                <div className="nickName">
                                    닉네임
                                    <i className="nicknameIcon">{/* ::before */}</i>
                                </div>
                                <div className="dot"></div>
                                <div className="datetime">n일전</div>
                                <div className="dot">{/* :: after */}</div>
                                <div className="viewCount">
                                    <i className="viewIcon"></i>
                                    {/* ::before */}뷰{/* 아이콘*/}
                                </div>
                                <div className="dot">{/* :: after */}</div>
                                <div className="likeCount">
                                    <span className="like Icon">👍</span>
                                    {/*나중에 이모티콘 수정*/}
                                </div>
                            </div>
                        </div>
                    </a>
                </section>
                <section id="postList" className="justPost">
                    <a className="item" href="#">
                        <div className="post">
                            <div className="titleContainer">
                                <div className="category">[게시글 카테고리]</div>
                                <div className="title"></div>{' '}
                                <div className="text">
                                    <div className="pre">[게시글 제목]</div>
                                    어느정도 내용
                                </div>
                            </div>

                            <div className="commentCount">0</div>

                            <div className="etc">
                                <div className="nickName">
                                    닉네임
                                    <i className="nicknameIcon">{/* ::before */}</i>
                                </div>
                                <div className="dot"></div>
                                <div className="datetime">n일전</div>
                                <div className="dot">{/* :: after */}</div>
                                <div className="viewCount">
                                    <i className="viewIcon"></i>
                                    {/* ::before */}뷰{/* 아이콘*/}
                                </div>
                                <div className="dot">{/* :: after */}</div>
                                <div className="likeCount">
                                    <span className="like Icon">👍</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </section>
            </article>
        </>
    );
};

export default PostComp;
