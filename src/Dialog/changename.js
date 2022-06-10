import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setRosterName } from '../store/roster/action';
import Close from '../assets/close.svg';
import './style.scss'

const ChangeNameDialog = (props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const onChangeHandler = (e) => {
        setName(e.target.value);
    }

    const onSaveName = () => {
        dispatch(setRosterName({rostername : name}));
        props.onCloseModal();
    }
    return (
        <Modal
            isOpen={props.isModal}
            onRequestClose={props.onCloseModal}
            style={props.customStyles}
            className="Modal Modal-sm"
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div>
                <button className='btn-close' onClick={props.onCloseModal}><img src={Close} alt='' /></button>
                <div className='modal-header'>
                    <span className='header-title'>Change Name</span>
                </div>
                <div className='modal-body'>
                    <div className='change-container'>
                        <input onChange={(e) => onChangeHandler(e)} />
                    </div>
                </div>
                <button className='btn-save' onClick={onSaveName}>Save</button>

            </div>
        </Modal>
    )
}

export default ChangeNameDialog;