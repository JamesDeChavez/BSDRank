import Navbar from '../../components/Navbar'
import NavButtons from '../../components/NavButtons'
import VerifyRequestsTable from '../../components/VerifyRequestsTable'
import './styles.css'

const AdminPage = () => {
    const className = 'AdminPage'
    return (
        <div className={className}>
            <Navbar/>
            <div className={`${className}_main`}>
                <VerifyRequestsTable/>
            </div>
            <NavButtons/>
        </div>
    )
}

export default AdminPage