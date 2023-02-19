import React, { useState } from "react";
import CommunityPage from "../../pages/Community";
import ProfilePage from "../../pages/Profile";
import SubmitLiftPage from "../../pages/SubmitLift";

export const AuthRenderContext = React.createContext<[string[], React.Dispatch<React.SetStateAction<string>>]>([[], () => {}]);

const AuthBranch = () => {
    const RENDERS = ['PROFILE', 'SUBMITLIFT', 'COMMUNITY'];
    const [render, setRender] = useState('PROFILE');

    return (
    <>
        <AuthRenderContext.Provider value={[RENDERS, setRender]}>
            {{
                [RENDERS[0]]: <ProfilePage/>,
                [RENDERS[1]]: <SubmitLiftPage/>,
                [RENDERS[2]]: <CommunityPage/>
            }[render]}
        </AuthRenderContext.Provider>
    </>
    );
};

export default AuthBranch;