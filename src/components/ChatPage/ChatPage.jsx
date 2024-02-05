import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Message from "../Message/Message";
import axios from 'axios';


const ChatPage = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState(["hola"]);
    const [messageids, setMessageId] = useState(1);
    const [query, setQuery] = useState(false);

    useEffect(() => {
        if (messages.length > 0) {
            axios.post('http://localhost:1234/v1/chat/completions', {
                "messages": [
                    { "role": "system", "content": "Always answer in rhymes." },
                    { "role": "user", "content": messages[messages.length - 1].text }
                ],
                "temperature": 0.7,
                "max_tokens": -1,
                "stream": false
            })
                .then(response => {
                    setMessages([...messages, { id: response.data.created, text: response.data.choices[0].message.content, sender: 'bot' }]);
                })
                .catch(error => {
                    console.error(error);
                });
        }

    }, [query]);


    const handleSend = () => {
        if (input.trim() !== "") {

            setMessages([...messages, { id: messageids, text: input, sender: 'user' }]);
            setMessageId(messageids + 1);
            setQuery(!query);
            console.log(messages);
            // 
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