let recognition;
let isRecording = false;
let fullTranscript = ""; // To store the accumulated transcription

function startRecording() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert("Your browser does not support speech recognition.");
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'es-MX'; // Changed from 'en-US' to 'es-ES' for Spanish
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => {
        isRecording = true;
        document.getElementById("record-btn").disabled = true;
        document.getElementById("stop-btn").disabled = false;
        console.log("Recording started...");
    };

    recognition.onresult = (event) => {
        let interimTranscript = "";

        // Combine all interim results
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const isFinal = event.results[i].isFinal;
            const transcript = event.results[i][0].transcript;

            if (isFinal) {
                fullTranscript += transcript + " "; // Append to the final transcript
            } else {
                interimTranscript += transcript; // Collect interim results
            }
        }

        // Display interim transcript alongside the full transcript
        document.getElementById("transcription").textContent = fullTranscript + interimTranscript;
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        alert("Error occurred in speech recognition: " + event.error);
    };

    recognition.onend = () => {
        if (isRecording) {
            console.log("Restarting recognition due to pause...");
            recognition.start(); // Restart if manually not stopped
        } else {
            console.log("Recognition stopped manually.");
        }
    };

    recognition.start();
}

function stopRecording() {
    return new Promise((resolve) => {
        if (isRecording && recognition) {
            isRecording = false;
            recognition.stop(); // Manually stop recognition

            // Check if elements exist before modifying their properties
            const recordBtn = document.getElementById("record-btn");
            const stopBtn = document.getElementById("stop-btn");
            const transcribeBtn = document.getElementById("transcribe-btn");

            if (recordBtn) recordBtn.disabled = false;
            if (stopBtn) stopBtn.disabled = true;
            if (transcribeBtn) transcribeBtn.disabled = false;

            // Resolve the promise after a short delay to ensure recognition has stopped
            setTimeout(() => {
                resolve();
            }, 100); // Adjust the delay as needed
        } else {
            resolve(); // Resolve immediately if not recording
        }
    });
}

function reset() {
    document.getElementById("transcription").textContent = "";
    document.getElementById("gemini-response").textContent = "";
    document.getElementById("text-input").value = "";
    fullTranscript = ""; // Clear the accumulated transcript
}

// Function to transcribe text
function transcribeText() {
    const transcription = document.getElementById("transcription").textContent;
    if (transcription) {
        document.getElementById("text-input").value = transcription;
    } else {
        alert("No transcription available to use.");
    }
}

// Function to interact with the Gemini API
async function askGemini(directInput) {
    const textInput = directInput || document.getElementById('text-input').value;

    // Backend endpoint
    const endpoint = '/generate';
    console.log("it gets to the earlier setp")

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: textInput }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("it got here")
        const geminiResponse = data.response;

        // Display the response from Gemini API
        document.getElementById('gemini-response').textContent = geminiResponse;

        // Convert the Gemini response into speech
        const speech = new SpeechSynthesisUtterance(geminiResponse);
        const voices = window.speechSynthesis.getVoices();
        let spanishVoice = voices.find(voice => voice.lang === 'es-ES'); // Select Spanish voice

        if (spanishVoice) {
            speech.voice = spanishVoice;
        } else {
            speech.lang = 'es-ES'; // Fallback to Spanish if no specific voice is found
        }

        window.speechSynthesis.speak(speech);
    } catch (error) {
        console.error('Error communicating with backend:', error);
        document.getElementById('gemini-response').textContent =
            'There was an error processing your request.';
    }
}

async function sendTranscript() {
    // Stop recording before sending the transcript
    await stopRecording();

    if (fullTranscript.trim() === "") {
        alert("The transcript is empty. Please record something first.");
        return;
    }
    
    // Call askGemini and clear fullTranscript only after the AI has processed the request
    askGemini(fullTranscript).then(() => {
        fullTranscript = ""; // Clear the accumulated transcript after sending
    });
}