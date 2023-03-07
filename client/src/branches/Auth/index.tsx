import React, { useState } from "react";
import CommunityPage from "../../pages/Community";
import ProfilePage from "../../pages/Profile";
import SubmitLiftPage from "../../pages/SubmitLift";
import VerifyPage from "../../pages/Verify";

export const AuthRenderContext = React.createContext<[string[], React.Dispatch<React.SetStateAction<string>>, string]>([[], () => {}, '']);

const AuthBranch = () => {
    const RENDERS = ['PROFILE', 'SUBMITLIFT', 'VERIFY', 'COMMUNITY'];
    const [render, setRender] = useState('PROFILE');

    return (
    <>
        <AuthRenderContext.Provider value={[RENDERS, setRender, render]}>
            {{
                [RENDERS[0]]: <ProfilePage/>,
                [RENDERS[1]]: <SubmitLiftPage/>,
                [RENDERS[2]]: <VerifyPage/>,
                [RENDERS[3]]: <CommunityPage/>
            }[render]}
        </AuthRenderContext.Provider>
    </>
    );
};

export default AuthBranch;