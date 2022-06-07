import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setPlayerData } from '../store/roster/action';
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

    const csvJSON = (csvText) => {
        let lines = [];
        const linesArray = csvText.split('\n');
        // for trimming and deleting extra space
        linesArray.forEach((e) => {
            const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
            lines.push(row);
        });
        // for removing empty record
        lines.splice(lines.length - 1, 1);
        const result = [];
        const headers = lines[0].split(",");

        for (let i = 1; i < lines.length; i++) {

            const obj = {};
            const currentline = lines[i].split(",");

            for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        return result; //JavaScript object
        //return JSON.stringify(result); //JSON
        //return result;
    }

    const onFileChange = (file) => {
        let fileReader = new FileReader();
        fileReader.readAsText(file);
        // console.log(fileReader);
        fileReader.onload = () => {
            setFileName(file.name);
            const text = fileReader.result;
            const csvToJson = csvJSON(text);
            console.log(csvToJson);

            for (let i = 0 ; i < csvToJson.length ; i++) {
                for ( let j = 0 ; j < dataFields.length ; j++) {
                    if(csvToJson[i][dataFields[j]] === '') {
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
            numData.totalPlayer = csvToJson.length;
            csvToJson.map((item) => {
                if (item.Height === 'Goalkeeper') cnt_goalkeeper++;
                else if (item.Height === 'Defender') cnt_defender++;
                else if (item.Height === 'Midfielder') cnt_midfielder++;
                else if (item.Height === 'Forward') cnt_forward++;
            })
            numData.goalkeeper = cnt_goalkeeper;
            numData.defender = cnt_defender;
            numData.midfielder = cnt_midfielder;
            numData.forward = cnt_forward;
            setData(numData);
        };
    }

    const onImport = () => {
        dispatch(setPlayerData({data : data}))
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
                <button className='btn-close' onClick={props.onCloseModal}><img src={Close} /></button>
                <div className='modal-header'>
                    <span className='header-title'>Importer</span>
                </div>
                <div className='modal-body'>
                    <span className='subtitle'>Roster File</span>
                    <div className={dataState === 2 ? 'browse-wrapper error-wrapper' : "browse-wrapper"}>
                        <div className='selected-file'>
                            {fileName ? fileName : "No File Selected"}
                        </div>

                        <label className={dataState === 2 ? "file-upload error-wrapper-select" : "file-upload"}>
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
                            <span className='subtitle'>File Summary</span>

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
                    <button className='btn-save' onClick={onImport}>Import</button> :
                    <span className='mark'>Import</span>
                }
            </div>
        </Modal>
    )
}

export default ImportDialog;