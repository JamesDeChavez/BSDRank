import React, { useState } from "react";
import AdminPage from "../../pages/Admin";
import CommunityPage from "../../pages/Community";
import ProfilePage from "../../pages/Profile";
import SubmitLiftPage from "../../pages/SubmitLift";
import VerifyPage from "../../pages/Verify";

export const AuthRenderContext = React.createContext<[string[], React.Dispatch<React.SetStateAction<string>>, string]>([[], () => {}, '']);

const AuthBranch = () => {
    const RENDERS = ['PROFILE', 'SUBMITLIFT', 'VERIFY', 'COMMUNITY', 'ADMIN'];
    const [render, setRender] = useState('PROFILE');

    return (
    <>
        <AuthRenderContext.Provider value={[RENDERS, setRender, render]}>
            {{
                [RENDERS[0]]: <ProfilePage/>,
                [RENDERS[1]]: <SubmitLiftPage/>,
                [RENDERS[2]]: <VerifyPage/>,
                [RENDERS[3]]: <CommunityPage/>,
                [RENDERS[4]]: <AdminPage/>
            }[render]}
        </AuthRenderContext.Provider>
    </>
    );
};

export default AuthBranch;