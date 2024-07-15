const fs = require('fs');
const inquirer = require('inquirer');

// Function to generate the SVG content
function generateSVG(text, textColor, shape, shapeColor) {
  let shapeSVG = '';
  switch (shape) {
    case 'circle':
      shapeSVG = `<circle cx="150" cy="100" r="80" fill="${shapeColor}" />`;
      break;
    case 'triangle':
      shapeSVG = `<polygon points="150,20 280,180 20,180" fill="${shapeColor}" />`;
      break;
    case 'diamond':
      shapeSVG = `<polygon points="150,10 190,100 150,190 110,100" fill="${shapeColor}" />`;
      break;
    case 'star':
      shapeSVG = `<polygon points="150,25 179,111 269,111 197,165 223,251 150,200 77,251 103,165 31,111 121,111" fill="${shapeColor}" />`;
      break;
    case 'square':
      shapeSVG = `<rect x="75" y="50" width="150" height="150" fill="${shapeColor}" />`;
      break;
    default:
      break;
  }

  return `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  ${shapeSVG}
  <text x="150" y="105" font-size="40" text-anchor="middle" fill="${textColor}" dominant-baseline="middle">${text}</text>
</svg>`;
}

// Questions for user input
const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters:',
    validate: (input) => input.length <= 3 || 'Text must be up to 3 characters',
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter text color (keyword or hexadecimal):',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape:',
    choices: ['circle', 'triangle', 'diamond', 'star', 'square'],
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter shape color (keyword or hexadecimal):',
  },
];

// Function to initialize app
function init() {
  inquirer.prompt(questions).then((answers) => {
    const svgContent = generateSVG(answers.text, answers.textColor, answers.shape, answers.shapeColor);
    fs.writeFile('logo.svg', svgContent, (err) => {
      if (err) {
        console.error('Error generating logo.svg:', err);
      } else {
        console.log('Generated logo.svg');
      }
    });
  });
}

// Function call to initialize app
init();
