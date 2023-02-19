import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import RegisterForm from "../../components/RegisterForm";
import './styles.css'

const RegisterPage = () => {
    const className = 'RegisterPage'
    return (
        <div className={className}>
            <Navbar/>
            <RegisterForm/>
            <Footer/>
        </div>
    );
};

export default RegisterPage;