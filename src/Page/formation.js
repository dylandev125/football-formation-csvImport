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

const Formation = () => {
    const [isModal, setModal] = useState(false);
    const [isNameModal, setNameModal] = useState(false);
    const [isActionModal, setActionModal] = useState(false);
    const [itemIndex, setItemIndex] = useState(0);
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
        <Layout dot={2}>

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

            <div className='board'>

            </div>
        </Layout >
    )
}

export default Formation;