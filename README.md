# AI Tech Tree

## Introduction

Welcome to AI Tech Tree, an innovative project inspired by 4X strategy games like Civilization V. This TypeScript-based project explores the concept of a never-ending technology tree, dynamically generated using generative AI. Unlike traditional tech trees that have a finite end, AI Tech Tree offers a unique, ever-expanding universe of technological advancements tailored to your civilization's characteristics and choices.

## Concept

In 4X strategy games, players often reach the end of a predefined tech tree. AI Tech Tree breaks this limitation by leveraging AI to propose plausible next steps in technological evolution, based on your civilization's history and choices. If your civilization is sea-oriented, the tech tree will evolve differently than if you were focused on land or air, providing a unique and immersive experience every time.

## How it Works

- Based on TypeScript and hosted as a serverless function on Azure.
- Connects with OpenAI to generate dynamic tech tree options.
- Tailored progression: The AI considers your civilization's traits and past choices to generate relevant technological options.

## Setup

1. **Clone the Repository**

   ```
   git clone <repo>
   ```

2. **Install Dependencies**

   Navigate to the project directory and run:

   ```
   npm i
   ```

3. **Configuration**

   Set up the Azure function and OpenAI credentials in the configuration file.

   ```
   // Example configuration
   {
     "azure": "[Your Azure Function URL]",
     "openAIKey": "[Your OpenAI API Key]"
   }
   ```

4. **Running the Project**

   Launch the project locally by running:

   ```
   npm run dev
   ```

   This will run the site locally on your machine.

## Usage

- Select options that define your civilization's characteristics.
- The AI will generate a tech tree based on these choices.
- Explore different technological paths as your civilization evolves.

## Contribution

Contributions are welcome! Feel free to fork the repository, make changes, and submit pull requests.
