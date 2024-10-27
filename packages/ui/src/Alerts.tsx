"use client"
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { IoCloseSharp } from "react-icons/io5";
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';



export function AlertPopup({ message, type, onClose }: { message: string; type: 'success' | 'warning' | 'info' | 'error', onClose : ()=> void }) {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });


    return (
        <ThemeProvider theme={darkTheme}>
        <div className="fixed top-0 left-0 w-full flex justify-center z-50">
        <Stack sx={{ width: '100%' }} spacing={1}>
            <Alert
                severity={type}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={onClose}
                    >
                        <IoCloseSharp fontSize="inherit" />
                    </IconButton>
                }
            >
                <AlertTitle>{type.charAt(0).toUpperCase() + type.slice(1)}</AlertTitle>
                {message}
            </Alert>
        </Stack>
        </div>
        </ThemeProvider>
    );
}