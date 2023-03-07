import Navbar from "../../components/Navbar"
import NavButtons from "../../components/NavButtons"
import VerifySection from "../../components/VerifySection"
import './styles.css'

const VerifyPage = () => {
    const className = 'VerifyPage'
    return (
        <div className={className}>
            <Navbar/>
            <VerifySection/>
            <NavButtons/>
        </div>
    )
}

export default VerifyPage