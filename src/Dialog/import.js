import Modal from 'react-modal';
import Close from '../assets/close.svg';
import './style.scss'

const ImportDialog = (props) => {
    const onFileChange = (file) => {
        let fileReader = new FileReader();
        fileReader.readAsText(file);
        console.log(fileReader);
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
                    <span className='header-title'>Importer</span>
                </div>
                <div className='modal-body'>
                    <span className='subtitle'>Roster File</span>
                    <div className='browse-wrapper'>
                        <div className='selected-file'>
                            No File Selected
                        </div>

                        <label class="file-upload">
                            <input
                                type="file"
                                name='myName'
                                multiple="multiple"
                                onChange={(e) => onFileChange(e.target.files[0])}
                                accept='.csv'

                            />
                            Select Files
                        </label>

                    </div>
                    <span className='tip'>File must be .csv format</span>
                </div>
            </div>
        </Modal>
    )
}

export default ImportDialog;