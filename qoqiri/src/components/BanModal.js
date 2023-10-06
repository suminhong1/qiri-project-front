const BanModal = () => {
    // 수민이꺼 보고수정
    return (
        <>
            <section id="modal" className="class">
                <div class="container share">
                    <div class="urlLink">
                        <a href="#"></a>
                    </div>
                </div>
                <div class="container removeArticle">
                    <form action="#" method="POST">
                        <input type="password" name="password" placeholder="비밀번호" maxlength="100" />
                        <button>확인</button>
                    </form>
                </div>
                <div class="container removeComment">
                    <input type="password" name="password" placeholder="비밀번호" maxlength="100" />
                    <button>확인</button>
                </div>
                <div class="container report">
                    <input type="hidden" name="type" />
                    <input type="hidden" name="id" />
                    <textarea name="content" placeholder="신고 내용" maxlength="200"></textarea>
                    <button>확인</button>
                </div>

                <div class="userBan">
                    <input type="hidden" name="type" />
                    <input type="hidden" name="id" />
                    <textarea name="content" placeholder="차단 사유" maxlength="200"></textarea>
                    <button>확인</button>
                </div>
                <div class="container ban">
                    <input type="hidden" name="id" />
                    <input type="hidden" name="type" />
                    <input type="hidden" name="contentId" />
                    <input type="text" name="duration" placeholder="정지 기간 (일)" maxlength="3" />
                    <input type="text" name="reason" placeholder="정지 사유" maxlength="100" />
                    <input type="text" name="displayReason" placeholder="사용자에게 보일 정지 사유" maxlength="100" />
                    <button>확인</button>
                </div>
                <div className="background"></div>
            </section>
            ;
        </>
    );
};
export default BanModal;
