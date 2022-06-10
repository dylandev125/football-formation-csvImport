import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChangeNameDialog from '../Dialog/changename';
import FormationAlert from '../Dialog/formationAlert';
import Layout from '../Layout';
import { ReactComponent as Pen } from '../assets/pen.svg';
import Playground from '../assets/field.png'
import './style.scss';

const Formation = () => {
    const [isFormationAlertModal, setAlertModal] = useState(false);
    const [isNameModal, setNameModal] = useState(false);
    const [playerCount, setPlayerCount] = useState(0);
    const [playerDetail, setPlayerDetail] = useState([]);
    const [posNum, setPosNum] = useState('');
    const rosterValue = useSelector((state) => state.roster);
    const rosterName = rosterValue.rostername;
    const playerData = rosterValue.data;

    useEffect(() => {

        let count = 0;
        let tempDetail = [];
        let temp = playerData.map((item) => item.map(prev => prev))
        temp.map((item) => {
            if(item[8] === "Yes") {
                console.log(item)
                tempDetail.push(item);
                count++;
            }
        })


        setPlayerCount(count);
        setPlayerDetail(tempDetail);
        if(count !== 11) setAlertModal(true);
    },[])

    const onPos = (pos) => {
        setPosNum(pos);
    }

    const changeTitle = () => {
        setNameModal(true);
    }

    const onCloseModal = () => {
        setNameModal(false);
        setAlertModal(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    return (
        <Layout dot={2}>
            <ChangeNameDialog
                isModal={isNameModal}
                onCloseModal={onCloseModal}
                customStyles={customStyles}
            />

            <FormationAlert
                isModal={isFormationAlertModal}
                onCloseModal={onCloseModal}
                customStyles={customStyles}
                count={playerCount}
            />

            <div className="header">
                <div className="title-header">
                    <span className="title">Roster Details</span>
                    <span className="sub-title">{rosterName}
                    {rosterName === 'My Team' ?
                        <span className='visible-icon' onClick={changeTitle}> <Pen /></span> :
                        <div className='hidden-icon' onClick={changeTitle}> <Pen /></div>
                    }</span>

                </div>
            </div>

            <div className='board formation'>
                <div className='field'>
                    <img src={Playground} alt=''/>
                    {playerData.length > 0 && playerCount === 11 &&
                        <>
                            <div className='formation-pos' onClick={() => onPos(0)} style={{left:'7%', top:('calc(50% - 16px)')}}>{playerDetail[0][2]}
                                <span className='player-name'>{playerDetail[0][0]}</span>
                            </div>
                            <div className='formation-pos' onClick={() => onPos(1)} style={{left:'25%', top:'10%'}}>{playerDetail[1][2]}
                                <span className='player-name'>{playerDetail[1][0]}</span>
                            </div>
                            <div className='formation-pos' onClick={() => onPos(2)} style={{left:'24%', top:'35%'}}>{playerDetail[2][2]}
                                <span className='player-name'>{playerDetail[2][0]}</span>
                            </div>
                            <div className='formation-pos' onClick={() => onPos(3)} style={{left:'24%', top:'60%'}}>{playerDetail[3][2]}
                                <span className='player-name'>{playerDetail[3][0]}</span>
                            </div>
                            <div className='formation-pos' onClick={() => onPos(4)} style={{left:'25%', top:'83%'}}>{playerDetail[4][2]}
                                <span className='player-name'>{playerDetail[4][0]}</span>
                            </div>

                            <div className='formation-pos' onClick={() => onPos(5)} style={{left:'calc(50% - 16px)', top:'calc(25% - 40px)'}}>{playerDetail[5][2]}
                                <span className='player-name'>{playerDetail[5][0]}</span>
                            </div>
                            <div className='formation-pos' onClick={() => onPos(6)} style={{left:'calc(50% - 16px)', top:'calc(50% - 16px)'}}>{playerDetail[6][2]}
                                <span className='player-name'>{playerDetail[6][0]}</span>
                            </div>
                            <div className='formation-pos' onClick={() => onPos(7)} style={{left:'calc(50% - 16px)', top:'calc(75% + 10px)'}}>{playerDetail[7][2]}
                                <span className='player-name'>{playerDetail[7][0]}</span>
                            </div>

                            <div className='formation-pos' onClick={() => onPos(8)} style={{left:'calc(75% - 40px)', top:'calc(25% - 15px)'}}>{playerDetail[8][2]}
                                <span className='player-name'>{playerDetail[8][0]}</span>
                            </div>
                            <div className='formation-pos' onClick={() => onPos(9)} style={{left:'calc(75% - 16px)', top:'calc(50% - 16px)'}}>{playerDetail[9][2]}
                                <span className='player-name'>{playerDetail[9][0]}</span>
                            </div>
                            <div className='formation-pos' onClick={() => onPos(10)} style={{left:'calc(75% - 40px)', top:'calc(75% - 15px)'}}>{playerDetail[10][2]}
                                <span className='player-name'>{playerDetail[10][0]}</span>
                            </div>
                        </>
                    }
                </div>
                <div className='player-detail'>
                    <div className='personal-info'>
                        <div className='overlay'></div>
                        {posNum!== '' ?
                            <img src={playerDetail.length > 0 ? playerDetail[posNum][1] : ''} alt=''/> :
                            ""
                        }
                        <div className='big-num'>{posNum!== '' ? playerDetail[posNum][2] : ''}</div>
                        <div className='small-num'>{posNum!== '' ? playerDetail[posNum][2] : ''}</div>
                        <div className='name'>{posNum!== '' ? playerDetail[posNum][0] : ''}</div>
                        <div className='position'>{posNum!== '' ? playerDetail[posNum][3] : ''}</div>
                        <div className='property-info'>
                            {playerDetail.length === 11 && posNum!=='' &&
                                <>
                                    <div className='info-field'>
                                        <span className='title'>Height</span>
                                        <span className='info'>{posNum!== '' ? playerDetail[posNum][4] / 100 + ' m' : ''}</span>
                                    </div>
                                    <div className='info-field'>
                                        <span className='title'>Weight</span>
                                        <span className='info'>{posNum!== '' ? playerDetail[posNum][5]+ 'kg' : ''}</span>
                                    </div>
                                    <div className='info-field'>
                                        <span className='title'>Nationality</span>
                                        <span className='info'>
                                            <img src={posNum!== '' ? playerDetail[posNum][7] : ''} alt=''/>
                                            {posNum!== '' ? playerDetail[posNum][6] : ''}
                                        </span>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div className='record-info'>
                        {playerDetail.length === 11 && posNum!=='' &&
                        <>
                            <div className='detail-row'>
                                <div className='detail-field'>
                                    <span className='field-value'>{playerDetail[posNum][9]}</span>
                                    <span className='field-title'>Appearences</span>
                                </div>
                                <div className='detail-field'>
                                    <span className='field-value'>{playerDetail[posNum][10]}</span>
                                    <span className='field-title'>Minutes Played</span>
                                </div>
                            </div>
                            <div className='detail-row'>
                                <div className='detail-field'>
                                    <span className='field-value'>{playerDetail[posNum][13]}</span>
                                    <span className='field-title'>Clean Sheets</span>
                                </div>
                                <div className='detail-field'>
                                    <span className='field-value'>{playerDetail[posNum][14]}</span>
                                    <span className='field-title'>Saves</span>
                                </div>
                            </div>
                        </>
                        }
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Formation;