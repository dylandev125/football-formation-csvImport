import Layout from '../Layout'
import { ReactComponent as Pen } from '../assets/pen.svg';
import './style.scss'

const Formation = () => {
    return (
        <Layout dot={2}>
            <span className="title">Formation Details</span>
            <span className="sub-title">My Team</span> <Pen/>
        </Layout>
    )
}

export default Formation;