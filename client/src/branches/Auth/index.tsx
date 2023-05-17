import React, { Suspense, lazy, useState } from "react";
import SuspenseLoad from "../../components/SuspenseLoad";

const ProfilePage = lazy(() => import('../../pages/Profile'))
const SubmitLiftPage = lazy(() => import('../../pages/SubmitLift'))
const VerifyPage = lazy(() => import('../../pages/Verify'))
const CommunityPage = lazy(() => import('../../pages/Community'))
const AdminPage = lazy(() => import('../../pages/Admin'))

export const AuthRenderContext = React.createContext<[string[], React.Dispatch<React.SetStateAction<string>>, string]>([[], () => {}, '']);

const AuthBranch = () => {
    const RENDERS = ['PROFILE', 'SUBMITLIFT', 'VERIFY', 'COMMUNITY', 'ADMIN'];
    const [render, setRender] = useState('PROFILE');

    return (
    <>
        <AuthRenderContext.Provider value={[RENDERS, setRender, render]}>
            <Suspense fallback={<SuspenseLoad/>}>
                {{
                    [RENDERS[0]]: <ProfilePage/>,
                    [RENDERS[1]]: <SubmitLiftPage/>,
                    [RENDERS[2]]: <VerifyPage/>,
                    [RENDERS[3]]: <CommunityPage/>,
                    [RENDERS[4]]: <AdminPage/>
                }[render]}
            </Suspense>
        </AuthRenderContext.Provider>
    </>
    );
};

export default AuthBranch;