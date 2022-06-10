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
    const [posField, setPosField] = useState('');
    const [isRoster, setRoster] = useState(false);
    const [goalkeeper, setGoalkeeper] = useState([]);
    const [defender, setDefender] = useState([]);
    const [midfielder, setMidfielder] = useState([]);
    const [forward, setForward] = useState([]);
    const rosterValue = useSelector((state) => state.roster);
    const rosterName = rosterValue.rostername;
    const playerData = rosterValue.data;

    const fieldList = [goalkeeper,defender, midfielder, forward] ;

    useEffect(() => {
        let gk_cnt = 0, def_cnt = 0, mid_cnt = 0, fw_cnt = 0;
        let count = 0;
        let tempDetail = [];
        let temp = playerData.map((item) => item.map(prev => prev))
        temp.map((item) => {
            if(item[8] === "Yes") {
                tempDetail.push(item);
                count++;
            }
        })

        tempDetail.map((item) => {
            if (item[3] === 'Goalkeeper') {
                let temp = []
                temp = goalkeeper;
                temp.push(item);
                setGoalkeeper(temp);
                gk_cnt ++;
            }
            else if (item[3] === 'Defender') {
                let temp = []
                temp = defender;
                temp.push(item);
                setDefender(temp);
                def_cnt ++;
            }
            else if (item[3] === 'Midfielder') {
                let temp = []
                temp = midfielder;
                temp.push(item);
                setMidfielder(temp);
                mid_cnt ++;
            }
            else if (item[3] === 'Forward') {
                let temp = []
                temp = forward;
                temp.push(item);
                setForward(temp);
                fw_cnt ++;
            }
        })

        let tempIsRoster = gk_cnt === 1 && def_cnt === 4 && mid_cnt === 3 && fw_cnt === 3;

        if(tempIsRoster) setRoster(true);
        else setRoster(false);

        setPlayerCount(count);
        setPlayerDetail(tempDetail);
        if(count !== 11 || !tempIsRoster) setAlertModal(true);
    },[])

    const onPos = (pos, field) => {
        setPosNum(pos);
        setPosField(field);
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
                    {playerData.length > 0 && playerCount === 11 && isRoster &&
                        <>
                            <div className='formation-pos' onClick={() => onPos(0, 0)} style={{left:'7%', top:('calc(50% - 16px)')}}>{goalkeeper[0][2]}
                                <span className='player-name'>{goalkeeper[0][0]}</span>
                            </div>
                            <div className='formation-pos' onClick={() => onPos(0, 1)} style={{left:'25%', top:'10%'}}>{defender[0][2]}
                                <span className='player-name'>{defender[0][0]}</span>
                            </div>
                            <div className='formation-pos' onClick={() => onPos(1, 1)} style={{left:'24%', top:'35%'}}>{defender[1][2]}
                                <span className='player-name'>{defender[1][0]}</span>
                            </div>
                            <div className='formation-pos' onClick={() => onPos(2, 1)} style={{left:'24%', top:'60%'}}>{defender[2][2]}
                                <span className='player-name'>{defender[2][0]}</span>
                            </div>
                            <div className='formation-pos' onClick={() => onPos(3, 1)} style={{left:'25%', top:'83%'}}>{defender[3][2]}
                                <span className='player-name'>{defender[3][0]}</span>
                            </div>

                            <div className='formation-pos' onClick={() => onPos(0, 2)} style={{left:'calc(50% - 16px)', top:'calc(25% - 40px)'}}>{midfielder[0][2]}
                                <span className='player-name'>{midfielder[0][0]}</span>
                            </div>
                            <div className='formation-pos' onClick={() => onPos(1, 2)} style={{left:'calc(50% - 16px)', top:'calc(50% - 16px)'}}>{midfielder[1][2]}
                                <span className='player-name'>{midfielder[1][0]}</span>
                            </div>
                            <div className='formation-pos' onClick={() => onPos(2, 2)} style={{left:'calc(50% - 16px)', top:'calc(75% + 10px)'}}>{midfielder[2][2]}
                                <span className='player-name'>{midfielder[2][0]}</span>
                            </div>

                            <div className='formation-pos' onClick={() => onPos(0, 3)} style={{left:'calc(75% - 40px)', top:'calc(25% - 15px)'}}>{forward[0][2]}
                                <span className='player-name'>{forward[0][0]}</span>
                            </div>
                            <div className='formation-pos' onClick={() => onPos(1, 3)} style={{left:'calc(75% - 16px)', top:'calc(50% - 16px)'}}>{forward[1][2]}
                                <span className='player-name'>{forward[1][0]}</span>
                            </div>
                            <div className='formation-pos' onClick={() => onPos(2, 3)} style={{left:'calc(75% - 40px)', top:'calc(75% - 15px)'}}>{forward[2][2]}
                                <span className='player-name'>{forward[2][0]}</span>
                            </div>
                        </>
                    }
                </div>
                <div className='player-detail'>
                    <div className='personal-info'>
                        <div className='overlay'></div>
                        {playerDetail.length === 11 && posNum === '' && posField === '' &&
                            <img src={playerDetail.length > 0 ? fieldList[0][0][1] : ''} alt=''/>
                        }
                        {playerDetail.length === 11 && posNum !== '' && posField !== '' &&
                            <img src={playerDetail.length > 0 ? fieldList[posField][posNum][1] : ''} alt=''/>
                        }
                        <div className='big-num'>{posNum!== '' ? fieldList[posField][posNum][2] : ''}</div>
                        <div className='small-num'>{posNum!== '' ? fieldList[posField][posNum][2] : ''}</div>
                        <div className='name'>{posNum!== '' ? fieldList[posField][posNum][0] : ''}</div>
                        <div className='position'>{posNum!== '' ? fieldList[posField][posNum][3] : ''}</div>
                        <div className='property-info'>
                            {playerDetail.length === 11 && posNum ==='' && posField === '' &&
                                <>
                                    <div className='info-field'>
                                        <span className='title'>Height</span>
                                        <span className='info'>{fieldList[0][0][4] / 100 + ' m' }</span>
                                    </div>
                                    <div className='info-field'>
                                        <span className='title'>Weight</span>
                                        <span className='info'>{fieldList[0][0][5]+ 'kg'}</span>
                                    </div>
                                    <div className='info-field'>
                                        <span className='title'>Nationality</span>
                                        <span className='info'>
                                            <img src={fieldList[0][0][7]} alt=''/>
                                            {fieldList[0][0][6]}
                                        </span>
                                    </div>
                                </>
                            }
                            {playerDetail.length === 11 && posNum !=='' && posField !== '' &&
                                <>
                                    <div className='info-field'>
                                        <span className='title'>Height</span>
                                        <span className='info'>{posNum!== '' ? fieldList[posField][posNum][4] / 100 + ' m' : ''}</span>
                                    </div>
                                    <div className='info-field'>
                                        <span className='title'>Weight</span>
                                        <span className='info'>{posNum!== '' ? fieldList[posField][posNum][5]+ 'kg' : ''}</span>
                                    </div>
                                    <div className='info-field'>
                                        <span className='title'>Nationality</span>
                                        <span className='info'>
                                            <img src={posNum!== '' ? fieldList[posField][posNum][7] : ''} alt=''/>
                                            {posNum!== '' ? fieldList[posField][posNum][6] : ''}
                                        </span>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div className='record-info'>
                        {playerDetail.length === 11 && posNum==='' && posField === '' &&
                        <>
                        <div className='detail-row'>
                            <div className='detail-field'>
                                <span className='field-value'>{fieldList[0][0][9]}</span>
                                <span className='field-title'>Appearences</span>
                            </div>
                            <div className='detail-field'>
                                <span className='field-value'>{fieldList[0][0][10]}</span>
                                <span className='field-title'>Minutes Played</span>
                            </div>
                        </div>
                        <div className='detail-row'>
                            <div className='detail-field'>
                                <span className='field-value'>{fieldList[0][0][3]==='Goalkeeper' ? fieldList[0][0][13] : fieldList[0][0][11]}</span>
                                <span className='field-title'>{fieldList[0][0][3]==='Goalkeeper' ?  "Clean Sheets" : "Goals"}</span>
                            </div>
                            <div className='detail-field'>
                                <span className='field-value'>{fieldList[0][0][3]==='Goalkeeper' ? fieldList[0][0][14] : fieldList[0][0][12] }</span>
                                <span className='field-title'>{fieldList[0][0][3]==='Goalkeeper' ?  "Saves" : "Assists"}</span>
                            </div>
                        </div>
                    </>
                        }
                        {playerDetail.length === 11 && posNum!=='' && posField !== '' &&
                        <>
                            <div className='detail-row'>
                                <div className='detail-field'>
                                    <span className='field-value'>{fieldList[posField][posNum][9]}</span>
                                    <span className='field-title'>Appearences</span>
                                </div>
                                <div className='detail-field'>
                                    <span className='field-value'>{fieldList[posField][posNum][10]}</span>
                                    <span className='field-title'>Minutes Played</span>
                                </div>
                            </div>
                            <div className='detail-row'>
                                <div className='detail-field'>
                                    <span className='field-value'>{fieldList[posField][posNum][3]==='Goalkeeper' ? fieldList[posField][posNum][13] : fieldList[posField][posNum][11]}</span>
                                    <span className='field-title'>{fieldList[posField][posNum][3]==='Goalkeeper' ?  "Clean Sheets" : "Goals"}</span>
                                </div>
                                <div className='detail-field'>
                                    <span className='field-value'>{fieldList[posField][posNum][3]==='Goalkeeper' ? fieldList[posField][posNum][14] : fieldList[posField][posNum][12] }</span>
                                    <span className='field-title'>{fieldList[posField][posNum][3]==='Goalkeeper' ?  "Saves" : "Assists"}</span>
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