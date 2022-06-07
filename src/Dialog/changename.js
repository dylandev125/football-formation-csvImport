import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setRosterName } from '../store/roster/action';
import Close from '../assets/close.svg';
import './style.scss'

const ChangeNameDialog = (props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const onFileChange = (file) => {
        let fileReader = new FileReader();
        fileReader.readAsText(file);
        console.log(fileReader);
    }

    const onChangeHandler = (e) => {
        setName(e.target.value);
    }

    const onSaveName = () => {
        dispatch(setRosterName({rostername : name}));
    }
    return (
        <Modal
            isOpen={props.isModal}
            onRequestClose={props.onCloseModal}
            style={props.customStyles}
            className="Modal"
            contentLabel="Example Modal"
        >
            <div>
                <button className='btn-close' onClick={props.onCloseModal}><img src={Close} /></button>
                <div className='modal-header'>
                    <span className='header-title'>Change Name</span>
                </div>
                <div className='modal-body'>
                    <div className='change-container'>
                        <input onChange={(e) => onChangeHandler(e)} />
                        <button className='btn-save' onClick={onSaveName}>Save</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ChangeNameDialog;