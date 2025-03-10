import {useEffect, useMemo, useState} from "react";
import {createTheme, Theme} from "@mui/material";

const useTheme = ():[Theme, boolean, () => void] => {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const savedDarkMode = localStorage.getItem("darkMode");
        if (savedDarkMode !== null) {
            setDarkMode(JSON.parse(savedDarkMode));
        } else {
            setDarkMode(true);
        }
    }, []);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? "dark" : "light",
                },
            }),
        [darkMode]
    );

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
    };

    return [theme, darkMode, toggleDarkMode];
}

export default useTheme;