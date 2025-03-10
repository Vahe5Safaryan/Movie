import { useEffect, useMemo, useState } from "react";
import { createTheme, Theme } from "@mui/material";

const useTheme = (): [Theme, boolean, () => void] => {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const savedDarkMode = localStorage.getItem("darkMode");
        return savedDarkMode ? JSON.parse(savedDarkMode) : true;
    });

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

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
        setDarkMode((prev) => !prev);
    };
    return [theme, darkMode, toggleDarkMode];
};

export default useTheme;