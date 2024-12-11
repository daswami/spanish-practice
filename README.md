# Spanish Practice Tool

## Overview

The Spanish Practice Tool is a web application designed to help users practice their Spanish speaking skills with the help of LLM agents. Learning languages has shown to be suboptimal with traditional methods, as memorizing grammar and vocabulary rules may not translate effectively to conversation. The goal of this project is to aid speaking and listening through simulating conversation, providing a fun and educational experience. 

The tool is currently in progress with main functionalities in place. 

## Features

- **Speech Recognition**: Users can speak in Spanish, and their speech will be transcribed in real-time.
- **AI Interaction**: The application interacts with the Google Generative AI to provide responses based on user input.
- **User-Friendly Interface**: A simple and clean interface for easy use. 

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express, SpeechSynthesis API
- **AI Integration**: Google Generative AI

## Future Improvements
- Utilize React/TypeScript for the frontend, transforming the code into production style frameworks
- Incorporate LLM technologies to improve the accuracy of the LLM
- Provide levels of language and learning insights to produce a more tailored educational experience

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- A Google API key for the Generative AI

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/spanish-practice-tool.git
   cd spanish-practice-tool
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Google API key:

   ```plaintext
   GOOGLE_API_KEY=your_google_api_key_here
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

- Click the "Speak" button to start recording your voice.
- Speak in Spanish, and your words will be transcribed in real-time.
- Click "Stop" to end the recording.
- Click "Send" to send your transcription to the AI and receive a response.
- You can reset the conversation at any time using the "Reset" button.

## Acknowledgments

- Thanks to Google for providing the Generative AI API.
- Special thanks to the open-source community for their contributions and support.
