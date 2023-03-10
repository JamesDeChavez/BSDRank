import Navbar from '../../components/Navbar';
import NavButtons from '../../components/NavButtons';
import UserLifts from '../../components/UserLifts';
import UserRank from '../../components/UserRank';
import cache from '../../utils/cache';
import { LiftingStats } from '../../utils/interfaces'
import './styles.css'

const ProfilePage = () => {
    const userData = cache.user
    const bestLiftsData: LiftingStats = {
        weight: userData.weight,
        benchWeight: userData.verified.bench.amount,
        benchReps: userData.verified.bench.reps,
        squatWeight: userData.verified.squat.amount,
        squatReps: userData.verified.squat.reps,
        deadliftWeight: userData.verified.deadlift.amount,
        deadliftReps: userData.verified.deadlift.reps,
        sex: userData.sex
    }
    
    const liftsData: LiftingStats = {
        weight: userData.weight,
        benchWeight: userData.bestLifts.bench.weight,
        benchReps: userData.bestLifts.bench.reps,
        squatWeight: userData.bestLifts.squat.weight,
        squatReps: userData.bestLifts.squat.reps,
        deadliftWeight: userData.bestLifts.deadlift.weight,
        deadliftReps: userData.bestLifts.deadlift.reps,
        sex: userData.sex
    }


    const className = 'ProfilePage'
    return (
        <div className={className}>
            <Navbar/>
            <div className={`${className}_main`}>
                <UserRank liftingData={liftsData} bestLiftsData={bestLiftsData} />
                <UserLifts/>
            </div>
            <NavButtons/>
        </div>
    );
};

export default ProfilePage;