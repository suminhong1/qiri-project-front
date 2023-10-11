import '../css/BestPost.css';
import PageNation from '../components/PageNation';
import NavBtn from '../components/NavBtn';
import kkorang from '../assets/kkorang3.jpg';
const BestPost = () => {
    return (
        <>
            <article id="list">
                <section id="postList" className="bestPost">
                    <a className="item" href="#">
                        <div className="best">
                            <div className="titleContainer">
                                <div className="bestImage">
                                    {/* 여기 이제 url 방식으로 Blob써서 넣어야함 css도 수정 지금 이미지 사이즈랑 베스트글 카테고리 사이즈랑 같이커짐*/}
                                    <img
                                        src={kkorang}
                                        style={{
                                            maxWidth: '100%',
                                            height: '30px',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            borderRadius: '3px',
                                        }}
                                    />
                                </div>
                                <div className="category">[베스트글 카테고리]</div>
                                <div className="title"></div>{' '}
                                <div className="text">
                                    <div className="pre">[베스트글 제목]</div>
                                    어느정도 내용
                                </div>
                                <div className="commentCount">0</div>
                            </div>

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
                                    <i className="like Icon">{/* ::before */}</i>
                                    좋아요{/*아이콘*/}
                                </div>
                            </div>
                        </div>
                    </a>
                </section>
                <section id="postList" className="bestPost">
                    <a className="item" href="#">
                        <div className="best">
                            <div className="titleContainer">
                                <div className="bestImage">
                                    {/* 여기 이제 url 방식으로 Blob써서 넣어야함 css도 수정 지금 이미지 사이즈랑 베스트글 카테고리 사이즈랑 같이커짐*/}
                                    <img
                                        src={kkorang}
                                        style={{
                                            maxWidth: '100%',
                                            height: '30px',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            borderRadius: '3px',
                                        }}
                                    />
                                </div>
                                <div className="category">[베스트글 카테고리]</div>
                                <div className="title"></div>{' '}
                                <div className="text">
                                    <div className="pre">[베스트글 제목]</div>
                                    어느정도 내용
                                </div>
                                <div className="commentCount">0</div>
                            </div>

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
                                    <i className="like Icon">{/* ::before */}</i>
                                    좋아요{/*아이콘*/}
                                </div>
                            </div>
                        </div>
                    </a>
                </section>
                <NavBtn />
            </article>
            <PageNation />
        </>
    );
};

export default BestPost;
