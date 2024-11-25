import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './widget_CCAT.css';

import { TextInput, Button } from '@carbon/react';
import { IoSend } from 'react-icons/io5';
import { CatClient } from 'ccat-api';
import ReactMarkdown from 'react-markdown';

const Widget_CCAT = ({
  baseUrl = 'localhost',
  port = '1865',
  initialPhrase = 'Ciao Sono lo Stregatto, una intelligenza artificiale curiosa e cortese. Come posso aiutarti?',
  sorryPhrase = 'ops... il gatto ha avuto qualche problema',
  chatUnderneathMessage = 'i LLM posso fare errori, stai attento alle allucinazioni',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [canAnimate, setCanAnimate] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesContainerRef = useRef(null);
  const [gatto_attivo, setGattoAttivo] = useState(false);
  const [cat, setcat] = useState(false);

  const sendMessage = async () => {
    if (input !== '') {
      if (gatto_attivo) {
        setIsProcessing(true);
        setMessages([...messages, { text: input, sender: 'user' }]);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: '', sender: 'bot_writing' },
        ]);
        setInput('');

        try {
          cat.send(input);
          cat
            .onConnected(() => {
              console.log('Socket connected');
            })
            .onMessage((msg) => {
              console.log(msg);

              setMessages((prevMessages) => {
                const lastMessage = prevMessages[prevMessages.length - 1];
                if (lastMessage && lastMessage.sender === 'bot_writing') {
                  return prevMessages.slice(0, -1);
                }
                return prevMessages;
              });

              setMessages((prevMessages) => [
                ...prevMessages,
                { text: msg.content, sender: 'bot' },
              ]);

              setIsProcessing(false);
            })
            .onError((err) => {
              console.log(err);
              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  text: sorryPhrase,
                  sender: 'bot',
                },
              ]);
            })
            .onDisconnected(() => {
              console.log('Socket disconnected');
            });
        } catch (error) {
          console.error('Errore nel ricevere la risposta del bot:', error);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: sorryPhrase, sender: 'bot' },
          ]);
        }
      }
    }
  };

  // Aggiungi un messaggio iniziale quando il componente viene montato
  useEffect(() => {
    async function restCCAT() {
      setcat(
        new CatClient({
          baseUrl: baseUrl,
          port: port,
        })
          .onConnected(() => {
            console.log('Socket connected');
            setGattoAttivo(true);
          })
          .onError((err) => {
            console.log(err);
            setGattoAttivo(false);
          })
      );
      if (gatto_attivo) {
        setMessages([
          {
            text: initialPhrase,
            sender: 'bot',
          },
        ]);
        cat.api.memory.wipeConversationHistory();
        console.log(cat.api);
      } else {
        setMessages([
          {
            text: sorryPhrase,
            sender: 'bot',
          },
        ]);
      }
    }
    restCCAT();
  }, [gatto_attivo]);

  return (
    <motion.div
      className={!isOpenChat ? 'cat-icon' : 'cat-chat'}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ overflow: 'hidden' }}
      animate={{
        rotate:
          canAnimate && isHovered && !isOpenChat ? [0, 30, -30, 10, -10, 0] : 0,
        scale: canAnimate && isHovered && !isOpenChat ? 1.2 : 1,
      }}
      onClick={
        !isOpenChat
          ? () => {
              setIsOpenChat(true);
            }
          : null
      }
    >
      <div className="rectangle">
        {isOpenChat ? (
          <div
            className="close-icon"
            onClick={() => {
              setIsOpenChat(false);
            }}
          >
            X
          </div>
        ) : (
          ''
        )}
        <img
          src={
            'https://cheshire-cat-ai.github.io/docs/assets/img/cheshire-cat-logo.svg'
          }
          alt="cat Icon"
        />
        {isOpenChat ? (
          <div className="chat-page">
            <div className="chat-messages" ref={messagesContainerRef}>
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.sender === 'bot_writing' ? (
                    <div class="dots">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  )}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <TextInput
                label="chiaccera con il CCAT"
                variant="standard"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                style={{ width: '100%' }}
                disabled={isProcessing || !gatto_attivo}
              />
              <Button
                variant="contained"
                onClick={sendMessage}
                disabled={isProcessing || !gatto_attivo}
              >
                <IoSend />
              </Button>
            </div>
            <p
              style={{
                fontSize: '0.8rem',
                margin: '0',
                color: '#999',
              }}
            >
              {chatUnderneathMessage}
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
    </motion.div>
  );
};

export default Widget_CCAT;
