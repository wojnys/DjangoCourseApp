import React from 'react';
import {Alert, AlertTitle, Typography} from "@mui/material";


type MessageBoxProps = {
    messages: string[]; // Define the type for messages
    status: number;
}


function MessageBox({messages, status}: MessageBoxProps) {
    return (

        <Alert severity={`${ status <= 205 ? "success" : "error"}`}>
            <div>          {
                messages.map((message, index) => {
                    return (
                        <Typography align={"left"} key={index}>{message}</Typography>
                    )
                })
            }
            </div>
        </Alert>
    );
}

export default MessageBox;
