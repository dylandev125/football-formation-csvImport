import Sidebar from './sidebar';

const Layout = ( props ) => {
    return (
        <>
            <Sidebar dot = {props.dot}></Sidebar>
            <div className='container'> {props.children} </div>
        </>
    )
}

export default Layout;