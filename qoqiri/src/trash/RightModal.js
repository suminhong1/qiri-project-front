import { useEffect, useState } from 'react';
import '../css/RightModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faLink, faUserSlash, faFlag } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { getPost } from '../api/post';
import CopyToClipboard from 'react-copy-to-clipboard';

const RightModal = () => {
    const [open, setOpen] = useState(false);
    const [Xmark, setXmark] = useState(false);

    const toggleModal = () => {
        setOpen(!open);
    };

    const handleXmark = () => {
        setXmark(!Xmark);
        setReportText(''); // 신고 접수 후 텍스트 초기화
        setReportModalopen(false);
    };

    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('홍수민이 복사됐습니다.');
        } catch (e) {}
    };

    const [reportText, setReportText] = useState('');
    const [reportModalOpen, setReportModalopen] = useState(false);
    const handleReport = () => {
        // 여기다가 신고 내용을 서버로 보내던 해야함
        if (reportText.trim() === '') {
            alert('차단 내용을 입력하세요.');
        } else {
            alert('수민이가 차단됐습니다.');
            setReportText(''); // 신고 접수 후 텍스트 초기화
            setReportModalopen(false);
        }
    };
 
    const url = window.location.href;
   
    return (
           <div className="right-modal" >
            <div className="buttons">
                <div
                    onClick={() => {
                        toggleModal();
                        handleXmark();
                    }}
                >
                    {Xmark ? (
                        <FontAwesomeIcon icon={faXmark} style={{ color: '#ff7f38' }} />
                    ) : (
                        <FontAwesomeIcon icon={faBars} style={{ color: '#ff7f38' }} />
                    )}
                </div>
            </div>
            {open && (
                <div className="popUptable">
                    <div className="popUp active">
                        <ul>
                            <li className="report">
                                <div type="button" onClick={() => setReportModalopen(true)}>
                                <FontAwesomeIcon icon={faUserSlash} style={{ color: '#ff7f38' }} />
                                    <span className="size">차단</span>
                                </div>
                            </li>
                            {/* <li className="block">
                                <div type="button">
                                    <FontAwesomeIcon icon={faUserSlash} style={{ color: '#ff7f38' }} />
                                    <span className="size">차단</span>
                                </div>
                            </li> */}
                            <li className="share">
                                <div
                                    type="button"
                                    onClick={() => {
                                        handleCopyClipBoard(url);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faLink} style={{ color: '#ff7f38' }} /> 복사
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {reportModalOpen && (
                <div className="report-modal">
                    <div className="report-modal-content">
                        <textarea
                            style={{
                                backgroundColor: 'antiquewhite',
                                border: '1px solid',
                                borderRadius: '5px',
                                resize: 'none',
                                inlineSize: '200px',
                                blockSize: '100px',
                            }}
                            maxLength={200}
                            value={reportText}
                            onChange={(e) => setReportText(e.target.value)}
                            placeholder="차단 사유를 입력하세요."
                        />
                        <br />
                        <button onClick={handleReport} style={{ fontSize: '1em', color: 'grey' }}>
                            차단🚫
                        </button>
                        <button
                            onClick={() => {
                                setReportText('');
                                setReportModalopen(false);
                            }}
                            style={{ fontSize: '1em', color: 'grey' }}
                        >
                            닫기❌
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RightModal;
