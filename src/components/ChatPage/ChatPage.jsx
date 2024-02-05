import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Message from "../Message/Message";
import axios from 'axios';
import agents from '../../config/agents.json';

function makeRequest(origin, target){

}

const ChatPage = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [query, setQuery] = useState(false);
    

    useEffect(() => {
        const origin = agents[Math.floor(Math.random() * 3)]
        
        if (messages.length > 0) {
            axios.post(`http://${origin.url}:${origin.port}/v1/chat/completions`, {
                "messages": [
                    { "role": "system", "content": `${origin.role}`+ `${origin.limitations}` },
                    { "role": "user", "content": messages[messages.length - 1].text}
                ],
                "temperature": 0.7,
                "max_tokens": origin.max_tokens,
                "stream": false
            })
                .then(response => {
                    setMessages([...messages, { id: response.data.created, text: response.data.choices[0].message.content, sender: 'bot', user:origin }]);
                    setQuery(!query);
                    console.log(messages)
                })
                .catch(error => {
                    console.error(error);
                });
        }

    }, [query]);


    const handleSend = () => {
        if (input.trim() !== "") {

            setMessages([...messages, { id: 1, text: input, sender: 'user' }]);
            
            setQuery(!query);
            setInput("");

        }
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };


    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
                {messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
            </Box>
            <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            placeholder="Type a message"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            fullWidth
                            size="large"
                            color="primary"
                            variant="contained"
                            endIcon={<SendIcon />}
                            onClick={handleSend}
                        >
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
};

export default ChatPage;