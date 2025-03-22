# Birthday Wish Generator

An interactive React application for creating personalized birthday wishes with animations, music, and sharing capabilities.

## Features

### Core Features
- **Personalized Wishes**: Enter a name to generate a custom birthday message
- **Random Messages**: Enjoy a different birthday wish each time from a collection of positive messages
- **Interactive UI**: Festive design with animated birthday cake image
- **Responsive Design**: Works on all devices with a clean card-based UI

### Enhanced Features
- **Confetti Animation**: Celebratory confetti effect when the wish is displayed
- **Birthday Music**: Plays a birthday tune when the wish is generated
- **Countdown Timer**: Enter a birthdate to see countdown to the next birthday
- **Dark/Light Mode**: Toggle between light and dark themes
- **Themed Backgrounds**: Dynamic gradient backgrounds that change based on birth month
- **Shareable Greeting**: Generate a shareable URL to send to others
- **Download as Image**: Save the birthday wish as an image to share on social media

## Technologies Used

- React (with Hooks for state management)
- CSS3 (with animations and transitions)
- react-confetti for the festive confetti effect
- react-icons for UI icons
- html2canvas for image generation
- URL parameters for sharing

## Setup Instructions

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open your browser to http://localhost:3000

## How to Use

1. Enter the birthday person's name
2. Optionally select their birthdate for a countdown and themed background
3. Click "Generate Birthday Wish"
4. Enjoy the animated birthday message with confetti and music
5. Share the wish via URL or download as an image
6. Toggle between light and dark mode using the sun/moon icon

## Customization

You can easily customize this app by:

- Adding more birthday messages to the `birthdayMessages` array
- Changing the birthday image URL
- Adding different background themes
- Customizing the CSS styles and animations
- Adding more sharing options

## License

MIT 