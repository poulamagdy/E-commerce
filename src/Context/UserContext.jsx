import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextprovider({children})
{
    let [userToken, setUsertoken] = useState(null)

    return <>
    <UserContext.Provider value={{userToken,setUsertoken}}>
        {children}
    </UserContext.Provider>
    </>
}