import '../css/ViewPost.css';
import logo from '../assets/logo.png';
import UnderPostList from '../components/UnderPostList';
import PageNation from '../components/PageNation';
import Counter from '../components/Counter';
import RightModal from '../components/RightModal';
import NavBtn from '../components/NavBtn';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const ViewPost = () => {
    const [bookMark, setBookMark] = useState(false);
    // const [likeCount, setLikeCount] = useState(0);
    const handleBookMark = () => {
        setBookMark(!bookMark);
        if (bookMark) {
            alert('게시물이 저장됐습니다.');
        } else {
            alert('게시물 저장이 해제됐습니다.');
        }
    };

    return (
        <>
            <main id="main">
                <div className="body">
                    <input type="hidden" className="title" value="수민이의 은퇴식" />
                    <input type="hidden" className="ogContent" value />
                    <input type="hidden" className="ogImage" value />
                    <input type="hidden" className="url" value />
                    <div className="back">
                        <div className="bestBox">
                            {/*홈버튼 쪼끔 수정 */}
                            <a href="http://localhost:3000/">
                                {/*Link to로 수정할거*/}
                                <span className="gobest">Best</span>
                                <img
                                    src={logo}
                                    className="ViewPost-logo"
                                    alt="logo"
                                    style={{ height: '30px', width: 'auto' }}
                                />
                            </a>
                        </div>
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
                                    <div className="likeCount">👍{/*여기도 카운팅 올라가는건 나중에 생각하자*/}</div>
                                </div>
                                <div className="right">
                                    <RightModal></RightModal>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="customField">
          출처 :<a href="#" target="_blank"></a>
        </div> */}
                    <div className="customHtml"></div>
                    <div className="bestContent">
                        <p>100년만에 한번 나올까말까한 희대의 프로그래머</p>
                        <p>홍수민씨의 은퇴식을 시작하겠습니다</p>
                    </div>
                    <div className="html"></div>
                    <div className="customHtml"></div>

                    <div className="likeContainer">
                        <div id="like" className="like">
                            <Counter></Counter> {/*count={likeCount} setCount={setLikeCount}*/}
                        </div>
                        <div
                            onClick={() => {
                                handleBookMark();
                            }}
                        >
                            <div type="button" className="scrap">
                                <div className="scp">스크랩</div>
                                {bookMark ? (
                                    <FontAwesomeIcon icon={faBookmark} style={{ color: 'thistle' }} className="sc" />
                                ) : (
                                    <FontAwesomeIcon icon={faBookmark} style={{ color: '#ff7f38' }} className="sc" />
                                )}
                            </div>
                        </div>
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
                        여러 이용자들이 댓글쓴거랑 베댓 나오게해야함
                    </div>
                    <div className="commentContainer" id="newComment">
                        <div className="contentContainer">
                            <div className="commentInput">
                                <div className="commentContent">
                                    <textarea disabled name="content" placeholder="로그인 해주세요"></textarea>
                                </div>
                                <div className="submit">
                                    <button type="button" onClick="login(event)">
                                        {/*로그인 폼뜨게*/}
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
                <NavBtn />
                <UnderPostList />
                <PageNation />
            </main>
        </>
    );
};
export default ViewPost;
