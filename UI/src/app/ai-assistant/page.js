'use client';

import {
  Grid,
  Row,
  Column,
  TextInput,
  Button,
  Tile,
  InlineLoading,
} from '@carbon/react';
import { useState, useEffect, useRef } from 'react';
import styles from './_ai-assistant.module.scss';
import WidgetCCAT from './Widget_CCAT';

const ChatWithHeader = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHeight, setChatHeight] = useState(0);
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Calculate the available height after header and input section
    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
    const inputSectionHeight = inputRef.current?.offsetHeight || 0;
    const availableHeight =
      window.innerHeight - headerHeight - inputSectionHeight;
    setChatHeight(availableHeight);

    const handleResize = () => {
      const availableHeight =
        window.innerHeight - headerHeight - inputSectionHeight;
      setChatHeight(availableHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!userInput) return;

    const userMessage = { type: 'user', text: userInput };
    setMessages([...messages, userMessage]);
    setUserInput('');
    setIsTyping(true);

    const aiResponse = await fetchAIResponse(userInput);
    setIsTyping(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'ai', text: aiResponse },
    ]);
  };

  const fetchAIResponse = async (input) => {
    console.log(`User input: ${input}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return 'Your input is ' + input;
  };

  //   return (
  //     <div className={styles['chat-page']} style={{ height: `${chatHeight}px` }}>
  //       <div className={styles['conversation-history']}>
  //         {messages.map((msg, index) => (
  //           <Tile
  //             key={index}
  //             className={`${styles.message} ${
  //               msg.type === 'user'
  //                 ? styles['user-message']
  //                 : styles['ai-message']
  //             }`}
  //           >
  //             <span
  //               className={
  //                 msg.type === 'user' ? styles['user-label'] : styles['ai-label']
  //               }
  //             >
  //               {msg.type === 'user' ? 'You: ' : 'AI: '}
  //             </span>
  //             {msg.text}
  //           </Tile>
  //         ))}
  //         {isTyping && <InlineLoading description="AI is typing..." />}
  //         <div ref={messageEndRef} />
  //       </div>
  //       <div ref={inputRef} className={styles['input-section']}>
  //         <TextInput
  //           id="user-input"
  //           labelText=""
  //           placeholder="Type your question..."
  //           value={userInput}
  //           onChange={(e) => setUserInput(e.target.value)}
  //           onKeyPress={(e) => {
  //             if (e.key === 'Enter') handleSend();
  //           }}
  //         />
  //         <Button onClick={handleSend} kind="primary">
  //           Send
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div>
      <WidgetCCAT
        baseUrl="localhost"
        port="1865"
        initialPhrase="Hey there! Airu here, an agent AI-powered assistant. How can I help you?"
        sorryPhrase="oops... Airu encountered a technical issue."
        chatUnderneathMessage="LLM can make mistakes. Check important info."
      />
    </div>
  );
};
export default ChatWithHeader;
