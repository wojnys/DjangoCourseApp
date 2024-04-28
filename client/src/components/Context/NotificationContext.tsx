import React, { createContext, useContext, useState, ReactNode } from 'react';
import {Alert, Container, Typography} from "@mui/material";

interface Notification {
    messages: string[];
    type: 'success' | 'error' ;
}

interface NotificationContextType {
    showNotification: (messages: string[], type: 'success' | 'error') => void;
    hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notification, setNotification] = useState<Notification | null>(null);

    const showNotification = (messages: string[], type: 'success' | 'error') => {
        setNotification({messages, type})
    };

    const hideNotification = () => {
        setNotification(null);
    };

    return (
        <NotificationContext.Provider value={{ showNotification, hideNotification }}>
    {children}
    {notification && (
        <Container>
            {
                notification.messages.length > 0 && (
                    <Alert severity={`${notification.type}`}>
                        <div>
                            {
                                notification.messages.map((message, index) => {
                                    return (
                                        <Typography align={"left"} key={index}>{message}</Typography>
                                    )
                                })
                            }
                        </div>
                    </Alert>
                )
            }
        </Container>
    )}
    </NotificationContext.Provider>
);
};
