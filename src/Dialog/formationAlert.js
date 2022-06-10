import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import './style.scss'
import Alert from '../assets/alert.svg';

const FormationAlert = (props) => {
    const playerData = useSelector((state) => state.roster.data);
    return (
        <>
            <Modal
                isOpen={props.isModal}
                onRequestClose={props.onCloseModal}
                style={props.customStyles}
                className="Modal Modal-alert"
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div>
                    <div className='modal-header nounderline-header alert'>
                        <img src={Alert} alt=''/>
                        <span className='header-title'>
                        {playerData.length > 0 ?
                            (props.count < 11 ? "Not enough starters" : props.count > 11 ? "There are too many starters" : "There are too many starters") :
                            "No player data found"
                        }
                        </span>
                    </div>
                    <div className='modal-body'>
                        <span className='alert-text'>
                            { playerData.length > 0 ? ( props.count < 11 ?
                                "Your team doesn’t have enough starters  for one or more of the positions in the 4-3-3 formation."
                                :
                                props.count > 11 ?
                                "Your team has too many starters for one or more of the positions in the 4-3-3 formation."
                                :
                                "Your team has too many starters for one or more of the positions in the 4-3-3 formation."
                                )
                                :
                                "Please importer your roster first"
                            }
                            </span>
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default FormationAlert;