import { useNavigate} from "react-router-dom"
import "./Homepage.css"
import { Plus, Mic, Send} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import {toast} from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";

export default function Homepage(){
        const [inputValue, setInputValue] = useState('');
        const [showAuthPrompt, setShowAuthPrompt] = useState(false);
        const [isRecording, setIsRecording] = useState(false);
        const [isSelected, setIsSelected] = useState(false);

        const navigate = useNavigate();
        
        const handleLogin = () => {
            navigate("/login")
        };

        const textareaRef = useRef(null);
        useEffect(() => {
            if (textareaRef.current) {
              textareaRef.current.style.height = 'auto';
              textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
          }, [inputValue]);

    const handleSubmit = () => {
        if (!inputValue.trim()) return;
        setShowAuthPrompt(true);
    };

    const handleGuestContinue = () => {
        console.log('Continue as guest with message:', inputValue);
        setShowAuthPrompt(false);
    };

    const handleAuthRequired = () => {
        setShowAuthPrompt(false);
        handleLogin();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
        }
    };

    const handleVoiceInput = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('Speech recognition is not supported in your browser.');
        return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        setIsRecording(true);
        recognition.start();

        recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsRecording(false);
        };

        recognition.onerror = (event) => {
            setIsRecording(false);
            if(event.error == "not-allowed")
                toast.error("Please allow microphone for speech recognition");
            else
                toast.error('Speech recognition error: ' + event.error);
            console.error('Speech recognition error:', event.error);
        };

        recognition.onend = () => {
            setIsRecording(false);
        };
    };

    const handleNewChat = () => {
        setInputValue('');
    };

    return(
        <div className="flex flex-col min-h-screen bg-base-200">
            <Navbar />
           <main className="flex-grow flex flex-col justify-end px-4 pt-6 pb-2">
                <div className="flex-grow flex items-center justify-center">
                <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-base-content sm:text-4xl mb-4">
                    What can I help you with?
                </h2>
                    <p className="text-lg text-base-content/70 mb-8">
                      Start a conversation with our AI assistant. Get answers, solve problems, or just chat!
                    </p>
                </div>
            </div>
        </main>
        
              <footer className="sticky bottom-0 bg-base-100/80 backdrop-blur-md pt-3 pb-5 border-t border-base-300">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex items-end gap-2">
                    <button
                      onClick={handleNewChat}
                      className="flex h-12 w-12 items-center justify-center rounded-full p-2 text-base-content/60 hover:bg-base-200 transition-colors"
                      aria-label="New chat"
                    >
                      <Plus size={20} />
                    </button>
                    
                    <div className="relative flex-grow flex items-end">
                      <textarea
                        ref={textareaRef}
                        className={`w-full resize-none rounded-2xl border-none bg-base-200 py-3 pl-4 pr-12 text-base text-base-content placeholder:text-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow ${isSelected ? 'selected' : ''}`}
                        placeholder="Type your message..."
                        rows="1"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={{ maxHeight: '120px', overflowY: 'auto' }}
                        onSelect={() => setIsSelected(true)}
                      />

                      <button
                        onClick={handleVoiceInput}
                        disabled={isRecording}
                        className={`absolute right-3 bottom-3 rounded-full p-2 transition-all duration-300 ${
                          isRecording 
                            ? 'bg-error text-error-content animate-pulse scale-110 shadow-lg shadow-error/50' 
                            : 'text-base-content/60 hover:bg-base-300'
                        }`}
                        aria-label="Voice input"
                      >
                        <Mic size={16} className={isRecording ? 'animate-bounce' : ''} />
                      </button>
                    </div>
                    
                    <button
                      onClick={handleSubmit}
                      disabled={!inputValue.trim()}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-sm hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                      aria-label="Send message"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </footer>
        
              {isRecording && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-40">
                  <div className="bg-base-100 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-error rounded-full opacity-20 animate-ping"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-error rounded-full opacity-40 animate-ping animation-delay-150"></div>
                      </div>
                      <div className="relative flex items-center justify-center w-12 h-12 bg-error rounded-full mx-auto">
                        <Mic size={24} className="text-error-content animate-pulse" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-base-content mb-2">
                      Listening...
                    </h3>
                    <p className="text-base-content/70 mb-4">
                      Speak clearly into your microphone
                    </p>
                    
                    <div className="flex items-center justify-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-error rounded-full animate-pulse"
                          style={{
                            height: '20px',
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: '1s'
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => {
                        setIsRecording(false);
                      }}
                      className="px-4 py-2 text-sm text-base-content/60 hover:text-base-content transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {showAuthPrompt && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-base-100 rounded-lg p-6 max-w-md w-full">
                    <h3 className="text-lg font-semibold text-base-content mb-4">
                      Ready to start chatting?
                    </h3>
                    <p className="text-base-content/70 mb-6">
                      To continue with your message "{inputValue.length > 50 ? inputValue.substring(0, 50) + '...' : inputValue}", please choose an option:
                    </p>
                    <div className="space-y-3">
                      <button
                        onClick={handleGuestContinue}
                        className="w-full py-2 px-4 bg-base-200 text-base-content rounded-md hover:bg-base-300 transition-colors"
                      >
                        Continue as Guest
                      </button>
                      <button
                        onClick={handleAuthRequired}
                        className="w-full py-2 px-4 bg-primary text-primary-content rounded-md hover:bg-primary-focus transition-colors"
                      >
                        Login for Full Features
                      </button>
                      <button
                        onClick={() => setShowAuthPrompt(false)}
                        className="w-full py-2 px-4 text-base-content/60 hover:text-base-content transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <style jsx>{`
                .animation-delay-150 {
                  animation-delay: 150ms;
                }
                
                @keyframes pulse-scale {
                  0%, 100% {
                    transform: scale(1);
                    opacity: 1;
                  }
                  50% {
                    transform: scale(1.1);
                    opacity: 0.8;
                  }
                }
              `}</style>
            </div>
    )
}