import Footer from "../../components/Footer";
import LoginForm from "../../components/LoginForm";
import Navbar from "../../components/Navbar";
import './styles.css'

const LoginPage = () => {
    const className = 'LoginPage'
    return (
        <div className={className}>
            <Navbar/>
            <LoginForm/>
            <Footer/>
        </div>
    );
};

export default LoginPage;