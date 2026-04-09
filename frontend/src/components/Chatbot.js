import React, { useState, useRef, useEffect } from 'react';
// i fake a support agent with keyword replies so the site feels alive without ai apis
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{
    id: 1,
    text: 'Hello welcome to BP Heating and Plumbing\n\nI can help with services contact emergency pricing and general questions\n\nWhat do you need',
    sender: 'bot',
    timestamp: new Date()
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  // i keep the latest message visible when the thread grows
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  // i branch on simple keywords because full nlp is out of scope here
  const getBotResponse = userMessage => {
    const message = userMessage.toLowerCase().trim();
    if (message.includes('contact') || message.includes('phone') || message.includes('call') || message.includes('number') || message.includes('email') || message.includes('address')) {
      return 'Contact\n\nPhone +44 7777 998381\nWhatsApp +44 7777 998381\nEmail basitpk4@yahoo.com\nInstagram @abdulb05\n\nEmergency line 24/7';
    }
    if (message.includes('service') && (message.includes('what') || message.includes('offer') || message.includes('provide') || message.includes('do'))) {
      return 'We offer 12 services\n\n1 Boiler install and service\n2 Boiler repair\n3 Central heating\n4 General plumbing\n5 Gas safety\n6 Leak work\n7 Power flush\n8 Water heaters\n9 Pipe work\n10 Hot water cylinders\n11 New appliances\n12 General repairs\n\nGas Safe engineers. Which one do you need';
    }
    if (message.includes('boiler')) {
      if (message.includes('install') || message.includes('installation')) {
        return 'Boiler install and service\n\nNew installs servicing upgrades thermostats\n\nCall +44 7777 998381';
      }
      if (message.includes('repair') || message.includes('fix') || message.includes('broken')) {
        return 'Boiler repair\n\nEmergency repair diagnosis Gas Safe work\n\nCall +44 7777 998381';
      }
      return 'Boiler services install repair service fault finding\n\nCall +44 7777 998381';
    }
    if (message.includes('central heating') || message.includes('heating system')) {
      return 'Central heating\n\nInstall maintain radiators new builds\n\nCall +44 7777 998381';
    }
    if (message.includes('plumb') && !message.includes('heating')) {
      return 'Plumbing\n\nTaps toilets pipes leaks bathrooms kitchens repipes\n\nEmergency +44 7777 998381';
    }
    if (message.includes('gas safe') || message.includes('gas safety') || message.includes('certificate') || message.includes('cp12')) {
      return 'Gas safety\n\nCP12 landlord checks appliances boiler checks\n\nCall +44 7777 998381';
    }
    if (message.includes('leak')) {
      return 'Leak detection and repair\n\nCall +44 7777 998381';
    }
    if (message.includes('power flush') || message.includes('flushing')) {
      return 'Power flush system clean radiators\n\nCall +44 7777 998381';
    }
    if (message.includes('water heater') || message.includes('hot water')) {
      return 'Water heaters and cylinders\n\nCall +44 7777 998381';
    }
    if (message.includes('emergency') || message.includes('urgent') || message.includes('asap') || message.includes('now')) {
      return 'Emergency 24/7\n\nBoiler pipes gas no heat leaks\n\n+44 7777 998381';
    }
    if (message.includes('about') || message.includes('who') || message.includes('company') || message.includes('experience')) {
      return 'BP Heating and Plumbing\n\nGas Safe insured residential and commercial\n\nCall +44 7777 998381';
    }
    if (message.includes('price') || message.includes('cost') || message.includes('quote') || message.includes('how much')) {
      return 'Free quotes\n\nCall +44 7777 998381 for a price';
    }
    if (message.includes('hour') || message.includes('available') || message.includes('when') || message.includes('time')) {
      return 'Emergency 24/7 regular work week round\n\nCall +44 7777 998381';
    }
    if (message.includes('where') || message.includes('location') || message.includes('area') || message.includes('cover')) {
      return 'We work across the UK\n\nCall +44 7777 998381 to check your area';
    }
    if (message.includes('insure') || message.includes('certified') || message.includes('qualified') || message.includes('license')) {
      return 'Gas Safe insured certified work\n\nCall +44 7777 998381';
    }
    if (message.includes('hi') || message.includes('hello') || message.includes('hey') || message === 'hii' || message === 'hiii') {
      return 'Hello welcome to BP Heating and Plumbing\n\nAsk about services contact or emergencies\n\nCall +44 7777 998381';
    }
    if (message.includes('help') || message.includes('option') || message.includes('menu') || message.includes('what can')) {
      return 'Ask about services contact emergency pricing areas hours\n\nCall +44 7777 998381';
    }
    return 'Thanks for your message\n\nPhone +44 7777 998381 for services contact quotes or emergencies';
  };
  // i append user text then fake delay before bot answer for natural rhythm
  const handleSendMessage = e => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    const userInput = inputMessage;
    setInputMessage('');
    setTimeout(() => {
      const botResponse = getBotResponse(userInput);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };
  // i hide the launcher while panel is open so only one control shows
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };
  return <>
      <button type="button" onClick={toggleChatbot} className={`fixed bottom-6 right-6 z-50 min-w-[4rem] min-h-[4rem] px-3 py-2 bg-accent text-white rounded-full shadow-2xl flex items-center justify-center text-sm font-semibold transition-all duration-500 hover:scale-110 ${isOpen ? 'rotate-90 opacity-0 pointer-events-none' : 'animate-bounce-slow hover:animate-none'}`} aria-label="Open chat">
        Chat
        {!isOpen && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />}
      </button>

      <div className={`fixed bottom-6 right-6 z-50 w-[90vw] sm:w-96 h-[65vh] sm:h-[500px] max-h-[calc(100vh-100px)] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-500 transform ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}>
        <div className="bg-gradient-to-r from-primary via-secondary to-primary text-white p-4 sm:p-5 rounded-t-2xl flex items-center justify-between shadow-lg">
          <div>
            <h3 className="font-bold text-base sm:text-lg">BP Heating and Plumbing</h3>
            <p className="text-xs sm:text-sm text-white/80">Support</p>
          </div>
          <button type="button" onClick={toggleChatbot} className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-sm" aria-label="Close chat">
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-gradient-to-b from-background-alt to-white space-y-4">
          {messages.map(message => <div key={message.id} className={`flex items-start gap-3 animate-fade-in-up ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${message.sender === 'user' ? 'bg-accent text-white' : 'bg-primary/10 text-primary'}`}>
                {message.sender === 'user' ? 'You' : 'Bot'}
              </div>
              <div className={`max-w-[75%] sm:max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${message.sender === 'user' ? 'bg-accent text-white rounded-tr-none' : 'bg-white text-primary border border-border rounded-tl-none'}`}>
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                  {message.text}
                </p>
                <span className={`text-xs mt-1 block ${message.sender === 'user' ? 'text-white/70' : 'text-text-light'}`}>
                  {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
                </span>
              </div>
            </div>)}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-border bg-white p-4 rounded-b-2xl">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input ref={inputRef} type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} placeholder="Type a message" className="flex-1 px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm sm:text-base transition-all duration-300" />
            <button type="submit" disabled={!inputMessage.trim()} className="px-4 py-3 bg-accent text-white rounded-xl text-sm font-semibold transition-all hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Send">
              Send
            </button>
          </form>
          <p className="text-xs text-text-light mt-2 text-center">
            Try services contact boiler repair emergency
          </p>
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in" onClick={toggleChatbot} role="presentation" />}
    </>;
};
export default Chatbot;
