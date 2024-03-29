import Navbar from "../../components/Navbar"
import NavButtons from "../../components/NavButtons"
import SubmitLiftForm from "../../components/SubmitLiftForm"
import './styles.css'

const SubmitLiftPage = () => {
    const className = 'SubmitLiftPage'
    return (
        <div className={className}>
            <Navbar/>
            <SubmitLiftForm/>
            <NavButtons/>
        </div>
    )
}

export default SubmitLiftPage