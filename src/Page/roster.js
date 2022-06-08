import { useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../Layout';
import ImportDialog from '../Dialog/import';
import ChangeNameDialog from '../Dialog/changename';
import ActionDialog from '../Dialog/action';
import { ReactComponent as Pen } from '../assets/pen.svg';
import Search from '../assets/search.svg';
import Edit from '../assets/edit.svg';
import './style.scss';

const Roster = () => {
    const [isModal, setModal] = useState(false);
    const [isNameModal, setNameModal] = useState(false);
    const [isActionModal, setActionModal] = useState(false);
    const [itemIndex, setItemIndex] = useState();
    const rosterValue = useSelector((state) => state.roster);
    const rosterName = rosterValue.rostername;
    const playerData = rosterValue.data;

    const changeTitle = () => {
        setNameModal(true);
    }

    const onImport = () => {
        setModal(true);
    }
    const onCloseModal = () => {
        setModal(false);
        setNameModal(false);
        setActionModal(false);
    }

    const onEdit = (ind) => {
        setActionModal(true);
        setItemIndex(ind);
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
        <Layout dot={1}>
            <ImportDialog
                isModal={isModal}
                onCloseModal={onCloseModal}
                customStyles={customStyles}
            />
            <ChangeNameDialog
                isModal={isNameModal}
                onCloseModal={onCloseModal}
                customStyles={customStyles}
            />

            <ActionDialog
                isModal={isActionModal}
                onCloseModal={onCloseModal}
                index = {itemIndex}
                customStyles={customStyles}
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
                <div className="action-header">
                    <div className="input-wrapper">
                        <img alt='' src={Search} />
                        <input placeholder='Find Player' />
                    </div>

                    <button className='btn-import' onClick={onImport}> Import Team</button>
                </div>
            </div>

            <div className='board'>
                <table>
                    <thead>
                        {
                        playerData.length > 0 ?
                        <tr>
                            <th>Player Name</th>
                            <th>Jersey Number</th>
                            <th>Starter</th>
                            <th>Position</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>Nationality</th>
                            <th>Appearences</th>
                            <th>Minutes Played</th>
                            <th></th>
                        </tr>
                        :
                        <tr>
                            <th>Player Name</th>
                            <th>Jersey Number</th>
                            <th>Position</th>
                            <th>Weight</th>
                            <th>Height</th>
                            <th>Nationality</th>
                        </tr>
                    }
                    </thead>

                    <tbody>
                    {playerData.length > 0 ?
                        playerData.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <img width={24} height={24} src={item[7]}/> {item[0]}
                                </td>
                                <td>{item[2]}</td>
                                <td>{item[8]}</td>
                                <td>{item[3]}</td>
                                <td>{item[4] / 100} m</td>
                                <td>{item[5]} kg</td>
                                <td>{item[6]}</td>
                                <td>{item[9]}</td>
                                <td>{item[10]}</td>
                                <td>
                                    <div className='edit-player' onClick={() => onEdit(index)}><img src={Edit}/></div>
                                </td>
                            </tr>
                        )) :
                        <></>
                    }
                    </tbody>
                </table>
                {!playerData.length > 0 &&
                <div className='empty-board'>
                    <div className='Wrapper'>
                        <span className='empty'>You do not have any players on the roster</span>
                        <a className='import-link' href="#" onClick={onImport}><span className='import'>Import Team</span></a>
                    </div>
                </div>
                }


            </div>
        </Layout >
    )
}

export default Roster;