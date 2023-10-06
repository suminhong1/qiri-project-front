import '../css/PageNation.css';

const PageNation = () => {
    return (
        <>
            <section className="pagination">
                <div className="prev"></div>
                <div className="number">
                    <a className="selected">1</a>
                    <a href="#" className="notSelected">
                        2
                    </a>
                    <a href="#" className="notSelected">
                        3
                    </a>
                    <a href="#" className="notSelected">
                        4
                    </a>
                    <a href="#" className="notSelected">
                        5
                    </a>
                    {/*여기도 맵으로?*/}
                </div>
                <div className="next">
                    <a href="#">다음</a>
                </div>
            </section>

            <div className="searchAndWrite">
                <div></div>
                <div>
                    <form action="/post">
                        <div className="search">
                            <select name="searchType">
                                <option value={'title'}>제목</option>
                                <option value={'titleAndContent'}>제목+내용</option>
                                <option value={'nickName'}>글쓴이</option>
                            </select>
                            <input type="text" name="keyword" maxLength={'50'} />
                            <button>검색</button>
                        </div>
                    </form>
                </div>
                <div className="write"> </div>
            </div>
        </>
    );
};
export default PageNation;
