import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setPlayerData } from '../store/roster/action';
import Modal from 'react-modal';
import Close from '../assets/close.svg';
import './style.scss'

var country_list = [  'Afghan',
'Albanian',
'Algerian',
'American',
'Andorran',
'Angolan',
'Antiguans',
'Argentinian',
'Armenian',
'Australian',
'Austrian',
'Azerbaijani',
'Bahamian',
'Bahraini',
'Bangladeshi',
'Barbadian',
'Barbudans',
'Batswana',
'Belarusian',
'Belgian',
'Belizean',
'Beninese',
'Bhutanese',
'Bolivian',
'Bosnian',
'Brazilian',
'British',
'Bruneian',
'Bulgarian',
'Burkinabe',
'Burmese',
'Burundian',
'Cambodian',
'Cameroonian',
'Canadian',
'Cape Verdean',
'Central African',
'Chadian',
'Chilean',
'Chinese',
'Colombian',
'Comoran',
'Congolese',
'Costa Rican',
'Croatian',
'Cuban',
'Cypriot',
'Czech',
'Danish',
'Djibouti',
'Dominican',
'Dutch',
'East Timorese',
'Ecuadorean',
'Egyptian',
'Emirian',
'Equatorial Guinean',
'Eritrean',
'Estonian',
'Ethiopian',
'Fijian',
'Filipino',
'Finnish',
'French',
'Gabonese',
'Gambian',
'Georgian',
'German',
'Ghanaian',
'Greek',
'Grenadian',
'Guatemalan',
'Guinea-Bissauan',
'Guinean',
'Guyanese',
'Haitian',
'Herzegovinian',
'Honduran',
'Hungarian',
'I-Kiribati',
'Icelander',
'Indian',
'Indonesian',
'Iranian',
'Iraqi',
'Irish',
'Israeli',
'Italian',
'Ivorian',
'Jamaican',
'Japanese',
'Jordanian',
'Kazakhstani',
'Kenyan',
'Kittian and Nevisian',
'Kuwaiti',
'Kyrgyz',
'Laotian',
'Latvian',
'Lebanese',
'Liberian',
'Libyan',
'Liechtensteiner',
'Lithuanian',
'Luxembourger',
'Macedonian',
'Malagasy',
'Malawian',
'Malaysian',
'Maldivan',
'Malian',
'Maltese',
'Marshallese',
'Mauritanian',
'Mauritian',
'Mexican',
'Micronesian',
'Moldovan',
'Monacan',
'Mongolian',
'Morocco',
'Mosotho',
'Motswana',
'Mozambican',
'Namibian',
'Nauruan',
'Nepalese',
'New Zealander',
'Nicaraguan',
'Nigerian',
'Nigerien',
'North Korean',
'Northern Irish',
'Norwegian',
'Omani',
'Pakistani',
'Palauan',
'Panamanian',
'Papua New Guinean',
'Paraguayan',
'Peruvian',
'Polish',
'Portuguese',
'Qatari',
'Romanian',
'Russian',
'Rwandan',
'Saint Lucian',
'Salvadoran',
'Samoan',
'San Marinese',
'Sao Tomean',
'Saudi',
'Scottish',
'Senegalese',
'Serbian',
'Seychellois',
'Sierra Leonean',
'Singaporean',
'Slovakian',
'Slovenian',
'Solomon Islander',
'Somali',
'South African',
'South Korean',
'Spanish',
'Sri Lankan',
'Sudanese',
'Surinamer',
'Swazi',
'Swedish',
'Swiss',
'Syrian',
'Taiwanese',
'Tajik',
'Tanzanian',
'Thai',
'Togolese',
'Tongan',
'Trinidadian/Tobagonian',
'Tunisian',
'Turkish',
'Tuvaluan',
'Ugandan',
'Ukrainian',
'Uruguayan',
'Uzbekistani',
'Venezuelan',
'Vietnamese',
'Welsh',
'Yemenite',
'Zambian',
'Zimbabwean'];
var position_list = ["GoalKeepr", "Defender", "Midfielder", "Forward"]

const EditDialog = (props) => {
    const dispatch = useDispatch();
    const playerData = useSelector((state) => state.roster.data);
    const [dataState, setDataState] = useState(false);
    const [tempArr, setTempArr] = useState(Array(15).fill(''));
    const ind = props.index;
    const [starterCheck, setStarterCheck] = useState(Array(100).fill(''));

    const onChangeHandler = (e, arr_ind) => {
        setDataState(true);
        let tempData = [];
        tempArr.map((item) =>  {
            tempData.push(item);
        });
        tempData[arr_ind] = e.target.value;
        setTempArr(tempData);
    }

    const onEdit = () => {
        let tempData = playerData.map((item) => item.map(prev => prev))
        console.log(tempData);

        let editedPlayer = tempData[ind];
        for (let i = 0 ; i < editedPlayer.length ; i ++) {
            console.log(tempArr[i])
            if(tempArr[i] !== '') {
                editedPlayer[i] = tempArr[i];
            }
        }
        tempData[ind] = editedPlayer;
        console.log(tempData);
        dispatch(setPlayerData({data : tempData}));
        props.onCloseModal();
        setDataState(false);
    }

    const onStarterNo = () => {
        let temp = [];
        starterCheck.map((item) => {
            temp.push(item);
        })
        temp[ind] = false;

        let t_arr = [];
        tempArr.map((item) => {
            t_arr.push(item);
        })
        t_arr[8] = 'No';
        setDataState(true);
        setTempArr(t_arr);
        setStarterCheck(temp);
    }
    const onStarterYes = () => {
        let temp = [];
        starterCheck.map((item) => {
            temp.push(item);
        })
        temp[ind] = true;

        let t_arr = [];
        tempArr.map((item) => {
            t_arr.push(item);
        })
        t_arr[8] = 'Yes';
        setDataState(true);
        setTempArr(t_arr);
        setStarterCheck(temp);
    }
    return (
        <Modal
            isOpen={props.isModal}
            onRequestClose={() => {
                props.onCloseModal();
                setDataState(false);
            }}
            style={props.customStyles}
            className="Modal Modal-edit"
            contentLabel="Example Modal"
        >
            <div>
                <button className='btn-close' onClick={props.onCloseModal}><img src={Close} alt='' /></button>
                <div className='modal-header nounderline-header'>
                    <span className='header-title'>Edit Player</span>
                </div>
                <div className='modal-body'>
                    <div className='info-row'>
                        <div className="info-input" style={{width:'66%'}}>
                            <span className='title-info'>Plyaer Name</span>
                            <input defaultValue={playerData.length > 0 ? playerData[ind][0] : ''} onChange={(e) => onChangeHandler(e, 0)}/>
                        </div>
                        <div className="info-input" style={{width:'30%'}}>
                            <span className='title-info'>Jersey Number</span>
                            <input defaultValue={playerData.length > 0 ? playerData[ind][2] : ''} onChange={(e) => onChangeHandler(e, 2)}/>
                        </div>
                    </div>

                    <div className='info-row'>
                        <div className="info-input" style={{width:'48%'}}>
                            <span className='title-info'>Height</span>
                            <input defaultValue={playerData.length > 0 ? playerData[ind][4] : ''} onChange={(e) => onChangeHandler(e, 4)}/>
                        </div>
                        <div className="info-input" style={{width:'48%'}}>
                            <span className='title-info'>Weight</span>
                            <input defaultValue={playerData.length > 0 ? playerData[ind][5] : ''} onChange={(e) => onChangeHandler(e, 5)}/>
                        </div>
                    </div>

                    <div className='info-row'>
                        <div className='info-input'>
                            <span className='title-info'>Nationality</span>
                            <select defaultValue={playerData.length > 0 ? playerData[ind][6] : ''} onChange={(e) => onChangeHandler(e, 6)}>
                                {
                                    country_list.map((item) => (
                                        <option>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className='info-row'>
                        <div className='info-input'>
                            <span className='title-info'>Position</span>
                            <select defaultValue={playerData.length > 0 ? playerData[ind][3] : ''} onChange={(e) => onChangeHandler(e, 3)}>
                                {
                                    position_list.map((item) => (
                                        <option>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className='info-row'>
                        <div className='info-input'>
                            <span className='title-info'>Starter</span>
                            <div className='radio-group'>
                                <input
                                type={'radio'}
                                id='radioNo'
                                checked={starterCheck[ind]!=='' ? !starterCheck[ind] : playerData.length > 0 ? playerData[ind][8] === 'No' : ""}
                                onClick={onStarterNo}
                                />

                                <label for='radioNo'></label><span className='starter-text'>No</span>

                                <input
                                type={'radio'}
                                id='radioYes'
                                checked={starterCheck[ind]!=='' ? starterCheck[ind] : playerData.length > 0 ? playerData[ind][8] === 'Yes' : ""}
                                onClick={onStarterYes}
                                />
                                <label for='radioYes'></label><span className='starter-text'>Yes</span>
                            </div>
                        </div>
                    </div>
                </div>
                {dataState ?
                    <button className='btn-save edit-player' onClick={onEdit}>{'Edit Player'}</button> :
                    <button className='btn-save edit-player non-edit'>{'Edit Player'}</button>
                }
            </div>
        </Modal>
    )
}

export default EditDialog;