import { useSelector, useDispatch } from 'react-redux';
import { setPlayerData } from '../store/roster/action'
import Modal from 'react-modal';
import Close from '../assets/close.svg';
import './style.scss'

const ConfirmDialog = (props) => {
    const dispatch = useDispatch();
    const playerData = useSelector((state) => state.roster.data);
    const onCancel = () => {
        props.onCloseModal();
    }
    const onDelete = () => {
        let tempData  = [];
        playerData.map((item) => {
            tempData.push(item);
        })
        tempData.splice(props.index, 1);
        dispatch(setPlayerData({data : tempData}))
        props.onCloseModal();
    }
    return (
        <Modal
            isOpen={props.isModal}
            onRequestClose={props.onCloseModal}
            style={props.customStyles}
            className="Modal Modal-confirm"
            contentLabel="Example Modal"
        >
            <div>
                <button className='btn-close' onClick={props.onCloseModal}><img src={Close} alt='' /></button>
                <div className='modal-header nounderline-header'>
                    <span className='header-title'>Are you sure?</span>
                </div>
                <div className='modal-body'>
                    <div className='alert-wrapper'>
                        <span className='text-btn'>This action cannot be undone.</span>
                    </div>
                    <div className='button-wrapper'>
                        <button className='btn-cancel' onClick={onCancel}>Cancel</button>
                        <button className='btn-delete' onClick={onDelete}>Delete</button>
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default ConfirmDialog;