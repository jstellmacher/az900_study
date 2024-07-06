# Accordion Questions Project

This project demonstrates how to fetch questions from a JSON file and display them in an accordion format on a web page.

## Features

- Fetches questions and answers from a JSON file (`questions.json`).
- Displays each question as an accordion item with options (`A: Yes`, `B: No`).
- Allows users to expand/collapse each question to view the answer.

## Technologies Used

- HTML
- CSS
- JavaScript

## Setup

1. **Clone the repository:**
   ```
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**
   ```
   cd accordion-questions-project
   ```

3. **Open `index.html` in your web browser to view the application.**

## Project Structure

- `index.html`: Main HTML file that displays the accordion.
- `style.css`: CSS file for styling the accordion and other elements.
- `script.js`: JavaScript file that fetches data from `questions.json` and dynamically creates the accordion.

## Usage

- Upon opening `index.html`, questions will be fetched from `questions.json`.
- Click on each question to expand and view the answer options (`A: Yes`, `B: No`).

## JSON Structure (`questions.json`)

The `questions.json` file should have an array of objects, each containing a `question` and `answer`.

Example:
```json
[
  {
    "question": "You are planning a strategy to deploy numerous web servers and database servers to Azure. This strategy should allow for connection types between the web servers and database servers to be controlled. Solution: You include network security groups (NSGs) in your strategy. Does the solution meet the goal?",
    "answer": "Answer: A"
  },
  {
    "question": "You are planning a strategy to deploy numerous web servers and database servers to Azure. This strategy should allow for connection types between the web servers and database servers to be controlled. Solution: You include a local network gateway in your strategy. Does the solution meet the goal?",
    "answer": "Answer: B"
  }
]
```

## Screenshots

instead of looking at the screenshots, check it out! https://jstellmacher.github.io/az900_study/

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
