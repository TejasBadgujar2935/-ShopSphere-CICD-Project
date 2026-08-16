import { useState, useEffect, useRef } from 'react'
import { FiMic, FiMicOff } from 'react-icons/fi'

const VoiceSearch = ({ onSearch, isListening, setIsListening }) => {
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef(null)

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = ''
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(finalTranscript || interimTranscript)
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [setIsListening])

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setTranscript('')
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  useEffect(() => {
    if (transcript && !isListening) {
      onSearch(transcript)
      setTranscript('')
    }
  }, [transcript, isListening, onSearch])

  return (
    <button
      onClick={toggleListening}
      className={`p-2 rounded-full transition-colors ${
        isListening
          ? 'bg-red-500 text-white animate-pulse'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
      title={isListening ? 'Stop listening' : 'Voice search'}
    >
      {isListening ? (
        <FiMic className="w-5 h-5" />
      ) : (
        <FiMicOff className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      )}
    </button>
  )
}

export default VoiceSearch
