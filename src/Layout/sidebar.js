import Ball from '../assets/ball.svg'
import { Link } from 'react-router-dom'
import { ReactComponent as Bar } from '../assets/bars.svg';
import { ReactComponent as Users } from '../assets/users.svg';
import { ReactComponent as Dot } from '../assets/dot.svg';
import './style.scss'

const Sidebar = ( props ) => {
    return (
        <div className="sidebar">
            <Link to="/" ><img width={30} alt="" src={Ball} /></Link>
            {props.dot === 1 && <Dot className="dot1"/> }
            {props.dot === 2 && <Dot className="dot2"/> }
            <Link to="/roster" ><Bar className={props.dot === 1 ? 'bar-selected' : 'bar'} /></Link>
            <Link to="/formation" ><Users className={props.dot === 2 ? 'bar-selected' : 'bar'} /></Link>
        </div>
    )
}

export default Sidebar;