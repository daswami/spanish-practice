# Spanish Practice Tool

## Overview

The Spanish Practice Tool is a web application designed to help users practice their Spanish speaking skills through speech recognition and interaction with a generative AI model. Users can record their speech, receive transcriptions, and get responses from the AI, all while improving their language skills.

## Features

- **Speech Recognition**: Users can speak in Spanish, and their speech will be transcribed in real-time.
- **AI Interaction**: The application interacts with the Google Generative AI to provide responses based on user input.
- **User-Friendly Interface**: A clean and responsive design that works well on both desktop and mobile devices.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **AI Integration**: Google Generative AI
- **Environment Variables**: dotenv for managing API keys

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

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to Google for providing the Generative AI API.
- Special thanks to the open-source community for their contributions and support.
