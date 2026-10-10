# Kirana Change

## Game Overview
Kirana Change is a fun, educational web application simulating an Indian neighborhood grocery shop. Designed for children aged 7-10, it teaches how to calculate bills, understand Indian rupee denominations, and give the correct change. 

## Main Features
* **Progressive Difficulty**: 10 levels ranging from simple coin combinations to complex shopping carts and discounts.
* **Realistic Scenarios**: Encounter multiple customers, products, and dynamic scenarios where the given payment varies.
* **Hint System**: An easy-to-understand count-up hint system to guide players on how to make correct change.
* **Bilingual Support**: Fully playable in both English and Hindi.
* **Progression and Scoring**: Stars awarded based on accuracy and hint usage, with a persistent level map (saved to your browser's local storage).
* **Audio-Visual Feedback**: Delightful sound effects and animations to celebrate correct answers.

## Technologies Used
* **Framework**: React with Vite and TypeScript
* **Styling**: Tailwind CSS
* **Routing**: TanStack Router
* **Animations**: Framer Motion
* **Testing**: Vitest

## Installation Instructions

1. Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. Clone this repository to your local machine:
   ```bash
   git clone <this-repository-url>
   cd "Kirana Change"
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

## How to Run the Development Server
To start the local development server:
```bash
npm run dev
```
Then, open the provided URL (usually `http://localhost:5173`) in your web browser.

## How to Run Tests
To run the automated test suite and ensure all game logic and calculations are correct:
```bash
npm run test
```

## How to Build for Production
To create a production-ready build:
```bash
npm run build
```
The optimized files will be located in the `dist` directory.

## Project Structure
* `src/game/engine.ts`: Contains the core game rules, scenarios generation, bill calculation, and hint logic.
* `src/components/game/`: Houses the game's UI elements like the CashDrawer, ChangeTray, HomeScreen, GameScreen, and HintPanel.
* `src/routes/`: Contains the TanStack Router configuration and the root entry points.
* `src/assets/`: Static assets like images.

## Scoring and Progression
* Players earn 1 to 3 stars per customer based on accuracy and whether hints were used.
* 3 stars: Perfect change without hints.
* 2 stars: Correct change with minimal mistakes or hint usage.
* 1 star: Completed after multiple mistakes.
* Completing a level unlocks the next one.
* Progress is automatically saved in your browser so you can continue where you left off.
