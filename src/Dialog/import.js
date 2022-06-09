import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setPlayerData } from '../store/roster/action';
import Papa from "papaparse";
import { dataFields } from '../constants'
import Modal from 'react-modal';
import Close from '../assets/close.svg';
import './style.scss'

const ImportDialog = (props) => {
    const dispatch = useDispatch();
    const [fileName, setFileName] = useState("");
    const [data, setData] = useState({});
    const [csvData, setCsvData] = useState();
    const [dataState, setDataState] = useState(0);
    const playerData = useSelector((state) => state.roster.data);


    const onFileChange = (file) => {
    let csvToJson;
        setFileName(file.name);
        Papa.parse(file, {
            complete: function (results) {
                console.log("Finished:", results.data);
                csvToJson = results.data;
                csvToJson.splice(0, 1);

                for (let i = 0; i < csvToJson.length; i++) {
                    for (let j = 0; j < dataFields.length; j++) {
                        if (csvToJson[i][j] === '') {
                            setDataState(2);
                            return;
                        }
                    }
                }
                setDataState(1);
                setCsvData(csvToJson);

                let numData = {};
                let cnt_goalkeeper = 0;
                let cnt_defender = 0;
                let cnt_midfielder = 0;
                let cnt_forward = 0;
                numData.totalPlayer = csvToJson.length - 1;
                csvToJson.map((item) => {
                    if (item[3] === 'Goalkeeper') cnt_goalkeeper++;
                    else if (item[3] === 'Defender') cnt_defender++;
                    else if (item[3] === 'Midfielder') cnt_midfielder++;
                    else if (item[3] === 'Forward') cnt_forward++;
                })
                numData.goalkeeper = cnt_goalkeeper;
                numData.defender = cnt_defender;
                numData.midfielder = cnt_midfielder;
                numData.forward = cnt_forward;
                setData(numData);
                setCsvData(csvToJson);
            }
        }
        )
    }

    const onImport = () => {
        dispatch(setPlayerData({ data: csvData }))
        console.log(csvData);
        props.onCloseModal();
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
                <button className='btn-close' onClick={props.onCloseModal}><img src={Close} alt='' /></button>
                <div className='modal-header'>
                    <span className='header-title'>Importer</span>
                </div>
                <div className='modal-body'>
                    <span className='subtitle'>Roster File</span>
                    <div className={dataState === 2 ? 'browse-wrapper error-wrapper' : csvData ? "browse-wrapper selected-wrapper" : "browse-wrapper"}>
                        <div className='selected-file'>
                            {fileName ? fileName : "No File Selected"}
                        </div>

                        <label className={dataState === 2 ? "file-upload error-wrapper-select" :  "file-upload"}>
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
                    {dataState === 0 ?
                        <span className='tip'>File must be .csv format</span> :
                        dataState === 1 ?
                            <>
                                <span className='tip'>File must be .csv format</span>
                                <div className='subtitle-2'>File Summary</div>

                                <table>
                                    <thead>
                                        <th>Total Players</th>
                                        <th>GoalKeepers</th>
                                        <th>Defenders</th>
                                        <th>Midfielders</th>
                                        <th>Forwards</th>
                                    </thead>
                                    <tbody>
                                        <td>{data.totalPlayer}</td>
                                        <td>{data.goalkeeper}</td>
                                        <td>{data.defender}</td>
                                        <td>{data.midfielder}</td>
                                        <td>{data.forward}</td>
                                    </tbody>
                                </table>
                            </>
                            :
                            <>
                                <span className='error'>Error</span>
                                <span className='tip'>Your sheet is missing data. Please ensure all cells are filled out.</span>
                            </>
                    }
                </div>
                {dataState === 1 ?
                    <button className='btn-save' onClick={onImport}>{playerData.length > 0 ? 'Re-Import' : 'Import'}</button> :
                    <span className='mark'>{ 'Import'}</span>
                }
            </div>
        </Modal>
    )
}

export default ImportDialog;