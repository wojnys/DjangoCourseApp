import React, {useEffect, useState} from 'react';
import {Topic} from "../../../utils/types";
import axios from "axios";
import {Box, Button, Card, CardContent, CardHeader, Container} from "@mui/material";
import {useNavigate} from "react-router-dom";

function AllTopicsPage() {

    const [topics, setTopics] = useState<Topic[]>([]);

    const getAllTopics = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/topic`);
            console.log(response);
            setTopics(response.data)
        }catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllTopics()
    }, []);

    const navigate = useNavigate()

    return (
        <Container>
            <h1>All topics</h1>
            <Box sx={{display:"flex", flexWrap:"wrap", gap:3}}>
                {
                    topics.map((topic, index) => (
                        <Button key={index} onClick={() => navigate(`/admin/topic/${topic.id}`)}
                            sx={{
                                width: 100,
                                borderRadius: 1,
                                border:"1px solid black",
                                boxShadow:"2px 3px 5px 0 rgba(0,0,0,0.5)",
                            }}
                        >
                            {topic.name}
                        </Button>
                    ))
                }
            </Box>
        </Container>
    );
}

export default AllTopicsPage;
