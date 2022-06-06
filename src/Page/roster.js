import { useState } from 'react';
import Layout from '../Layout';
import ImportDialog from '../Dialog/import';
import { ReactComponent as Pen } from '../assets/pen.svg';
import Search from '../assets/search.svg';
import './style.scss';

const Roster = () => {
    const [isModal, setModal] = useState(false);
    const [boardTitle, setBoardTitle] = useState("My Team");

    const changeTitle = () => {
        setBoardTitle()
    }

    const onImport = () => {
        setModal(true);
    }
    const onCloseModal = () => {
        setModal(false);
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

            <div className="header">
                <div className="title-header">
                    <span className="title">Roster Details</span>
                    <span className="sub-title">{boardTitle}</span> <a href='#' onClick={changeTitle}><Pen /></a>
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
                        <th>Player Name</th>
                        <th>Jersey Number</th>
                        <th>Position</th>
                        <th>Weight</th>
                        <th>Height</th>
                        <th>Nationality</th>
                    </thead>

                    <tbody>

                    </tbody>
                </table>

                <div className='empty-board'>
                    <div className='Wrapper'>
                        <span className='empty'>You do not have any players on the roster</span>
                        <a className='import-link' href="#" onClick={onImport}><span className='import'>Import Team</span></a>
                    </div>
                </div>


            </div>
        </Layout >
    )
}

export default Roster;