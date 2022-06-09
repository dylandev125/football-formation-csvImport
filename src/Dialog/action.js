import { useState } from 'react';
import Modal from 'react-modal';
import Close from '../assets/close.svg';
import Edit from '../assets/editPlayer.svg';
import Delete from '../assets/deletePlayer.svg';
import ConfirmDialog from './confirm';
import EditDialog from './edit';
import './style.scss'

const ActionDialog = (props) => {
    const [isConfirmModal, setConfirmModal] = useState(false);
    const [isEditModal, setEditModal] = useState(false);

    const onEdit = () => {
        setEditModal(true);
        props.onCloseModal();
    }

    const onDelete = () => {
        setConfirmModal(true);
        props.onCloseModal();
    }
    const onCloseModal = () => {
        setConfirmModal(false);
        setEditModal(false);
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
        <>
            <ConfirmDialog
                isModal={isConfirmModal}
                onCloseModal={onCloseModal}
                customStyles={customStyles}
                index = {props.index}
            />
            <EditDialog
                isModal={isEditModal}
                onCloseModal={onCloseModal}
                customStyles={customStyles}
                index = {props.index}
            />
            <Modal
                isOpen={props.isModal}
                onRequestClose={props.onCloseModal}
                style={props.customStyles}
                className="Modal Modal-action"
                contentLabel="Example Modal"
            >
                <div>
                    <button className='btn-close' onClick={props.onCloseModal}><img src={Close} alt='' /></button>
                    <div className='modal-header nounderline-header'>
                        <span className='header-title'>Actions</span>
                    </div>
                    <div className='modal-body'>
                        <div className='action-btn' onClick={onEdit}>
                            <img src={Edit} width={15} alt=''/><span className='text-btn'>Edit Player</span>
                        </div>
                        <div className='action-btn' onClick={onDelete}>
                            <img src={Delete} width={15} alt=''/><span className='text-btn'>Delete Player</span>
                        </div>
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default ActionDialog;