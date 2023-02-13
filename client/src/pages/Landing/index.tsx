import Navbar from "../../components/Navbar";

const LandingPage = () => {
    
    const className = 'LandingPage';
    return (
        <div className={className}>
            <Navbar/>
            <div>Rank Search Form</div>
            <div>Top Lifts Table</div>
            <div>Recent Lifts Table</div>
            <div>Signup Section</div>
            <div>Footer</div>
        </div>
    );
};

export default LandingPage;