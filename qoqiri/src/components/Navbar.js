import alarm from '../assets/alarm.gif';
import { useState, useEffect } from 'react';
import { getBoards, getPosts } from '../api/post';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import { GrHomeRounded } from 'react-icons/gr';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [bell, setBell] = useState([false]);
    useEffect(() => {}, [bell]);

    if (location.pathname === '/Login' || location.pathname === '/signup') {
        return null;
    }

    return (
        <>
            <div className="navbar2">
                <div className="navbar-home">
                    <a href="/" className="homeButton">
                        <GrHomeRounded />
                    </a>
                </div>
                <div className="navbar-menu">
                    <a href="/" className="matchingPost">
                        끼리모집
                    </a>
                    <a href="/" className="matchingSearch">
                        끼리찾기
                    </a>
                    <a href="/" className="review">
                        끼리후기
                    </a>
                    <Link to="/bestPost" className="post">
                        커뮤니티
                    </Link>
                </div>

                <div className="navbar-alarm">
                    <a href="/" className="alarm">
                        <img src={alarm} style={{ height: '40px', width: 'auto' }} alt="alarm" />
                    </a>
                </div>
            </div>
        </>
    );
};
export default Navbar;
