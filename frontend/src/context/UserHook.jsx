import { useContext } from "react";
import { UserContext } from "./UserContext";

export function useIsUser(){
    const context = useContext(UserContext);

    if(!context){
        throw new Error('useIsUser must be used within a UserContextProvider')
    }

    return context;
}