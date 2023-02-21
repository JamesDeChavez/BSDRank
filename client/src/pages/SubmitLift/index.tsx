import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import NavButtons from "../../components/NavButtons"
import SubmitLiftForm from "../../components/SubmitLiftForm"
import './styles.css'

const SubmitLiftPage = () => {
    const className = 'SubmitLiftPage'
    return (
        <div className={className}>
            <Navbar/>
            <NavButtons/>
            <SubmitLiftForm/>
            <Footer/>
        </div>
    )
}

export default SubmitLiftPage