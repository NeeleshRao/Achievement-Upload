import { createContext, useContext, useState } from "react";


export const internContext=createContext();

export function useIntern(){
    return useContext(internContext);
}

export function InternProvider({children}){
    const [openModel,setOpenModel]=useState(false);
    const [interns, setInterns] = useState();
    return (
        <internContext.Provider value={{openModel,setOpenModel,interns,setInterns}}>
            {children}
        </internContext.Provider>
    )
}