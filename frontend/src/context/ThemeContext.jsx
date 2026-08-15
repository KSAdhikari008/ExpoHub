import { createContext, useState} from 'react';

const ThemeContext = createContext();

export function ThemeProvider({children}){

    const [theme, setTheme] = useState('dark');

    function toggleTheme(){
        setTheme(prev => ( prev === 'dark' ? 'light' : "dark"));
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
        )
}

export {ThemeContext};
