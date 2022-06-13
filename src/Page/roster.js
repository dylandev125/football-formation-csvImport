import { useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../Layout';
import ImportDialog from '../Dialog/import';
import ChangeNameDialog from '../Dialog/changename';
import ActionDialog from '../Dialog/action';
import { ReactComponent as Pen } from '../assets/pen.svg';
import Search from '../assets/search.svg';
import Edit from '../assets/edit.svg';
import Close from '../assets/close.svg';
import './style.scss';

const Roster = () => {
    const [isModal, setModal] = useState(false);
    const [isNameModal, setNameModal] = useState(false);
    const [isActionModal, setActionModal] = useState(false);
    const [itemIndex, setItemIndex] = useState(0);
    const rosterValue = useSelector((state) => state.roster);
    const [searchValue, setSearchValue] = useState('');
    const [isSearch, setSearch] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
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

    const onSearch = (e) => {
        if (e.key === 'Escape') {
            setSearchValue('');
            document.getElementById('search').value = '';
        }
        else if (e.key === 'Enter' && e.target.value !== '') {
            onSearchClick();
        }
        else {
            setSearchValue(e.target.value);
        }
    }

    const onSearchClick = () => {
        setSearch(true);
        document.getElementById('search').setAttribute('disabled', true);

        let temp = searchResult.map((item) => item.map(i => i))


        for (let i = 0; i < playerData.length; i++) {
            if (playerData[i][0].toLowerCase().includes(searchValue.toLowerCase()) || playerData[i][3].toLowerCase().includes(searchValue.toLowerCase())) {
                let t_arr = playerData[i].map((item) => item)
                t_arr[15] = i;
                temp.push(t_arr);
            }
        }

        setSearchResult(temp)
    }

    const onSearchCancel = () => {
        document.getElementById('search').removeAttribute('disabled');
        setSearch(false);
        document.getElementById('search').value = '';
        setSearchValue('');
        setSearchResult([]);
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
        <Layout dot={1}>
            <ImportDialog
                isModal={isModal}
                onCloseModal={onCloseModal}
                customStyles={customStyles}
            />
            <ChangeNameDialog
                isModal={isNameModal}
                onCloseModal={onCloseModal}
                customStyles={customStyles}
            />

            <ActionDialog
                isModal={isActionModal}
                onCloseModal={onCloseModal}
                index={itemIndex}
                customStyles={customStyles}
            />

            <div className="header">
                <div className="title-header">
                    <span className="title">Roster Details</span>
                    <span className="sub-title">{rosterName}
                        {rosterName === 'My Team' ?
                            <span className='visible-icon' onClick={changeTitle}> <Pen /></span> :
                            <div className='hidden-icon' onClick={changeTitle}> <Pen /></div>
                        }</span>

                </div>
                <div className="action-header">
                    <div className="input-wrapper">
                        <img alt='' src={Search} />
                        <input id='search' onChange={(e) => onSearch(e)} onKeyDown={(e) => onSearch(e)} placeholder='Find Player' />
                        {searchValue !== '' && isSearch === false &&
                            <button className='btn-search' onClick={onSearchClick}>search</button>
                        }
                        {searchValue !== '' && isSearch === true &&
                            <button className='btn-close' onClick={onSearchCancel}><img src={Close} alt='' /></button>
                        }
                    </div>

                    <button className={playerData.length > 0 ? 'btn-import reimport' : 'btn-import'} onClick={onImport}>{playerData.length > 0 ? "Re-Import Team" : "Import Team"}</button>
                </div>
            </div>

            <div className='board'>
                <table>
                    <thead>
                        {
                            playerData.length > 0 ?
                                <tr>
                                    <th>Player Name</th>
                                    <th>Jersey Number</th>
                                    <th>Starter</th>
                                    <th>Position</th>
                                    <th>Height</th>
                                    <th>Weight</th>
                                    <th>Nationality</th>
                                    <th>Appearences</th>
                                    <th>Minutes Played</th>
                                    <th></th>
                                </tr>
                                :
                                <tr>
                                    <th>Player Name</th>
                                    <th>Jersey Number</th>
                                    <th>Position</th>
                                    <th>Weight</th>
                                    <th>Height</th>
                                    <th>Nationality</th>
                                </tr>
                        }
                    </thead>

                    <tbody>
                        {!isSearch && playerData.length > 0 ?
                            playerData.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <img width={24} height={24} src={item[7]} alt='' /> {item[0]}
                                    </td>
                                    <td>{item[2]}</td>
                                    <td>{item[8]}</td>
                                    <td>{item[3]}</td>
                                    <td>{item[4] / 100} m</td>
                                    <td>{item[5]} kg</td>
                                    <td>{item[6]}</td>
                                    <td>{item[9]}</td>
                                    <td>{item[10]}</td>
                                    <td>
                                        <div className='edit-player' onClick={() => onEdit(index)}><img src={Edit} alt='' /></div>
                                    </td>
                                </tr>
                            )) :
                            searchResult.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <img width={24} height={24} src={item[7]} alt='' /> {item[0]}
                                        </td>
                                        <td>{item[2]}</td>
                                        <td>{item[8]}</td>
                                        <td>{item[3]}</td>
                                        <td>{item[4] / 100} m</td>
                                        <td>{item[5]} kg</td>
                                        <td>{item[6]}</td>
                                        <td>{item[9]}</td>
                                        <td>{item[10]}</td>
                                        <td>
                                            <div className='edit-player' onClick={() => onEdit(item[15])}><img src={Edit} alt='' /></div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {!playerData.length > 0 &&
                    <div className='empty-board'>
                        <div className='Wrapper'>
                            <span className='empty'>You do not have any players on the roster</span>
                            <a className='import-link' href="#" onClick={onImport} ><span className='import'>Import Team</span></a>
                        </div>
                    </div>
                }


            </div>
        </Layout >
    )
}

export default Roster;