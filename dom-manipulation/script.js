// Array to hold the quotes
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  }
}

// Function to create and display the add quote form
function createAddQuoteForm() {
  // Check if the form already exists
  const existingForm = document.getElementById('addQuoteForm');
  if (existingForm) return;

  // Create form elements
  const form = document.createElement('div');
  form.id = 'addQuoteForm';
  
  const inputText = document.createElement('input');
  inputText.id = 'newQuoteText';
  inputText.type = 'text';
  inputText.placeholder = 'Enter a new quote';
  
  const inputCategory = document.createElement('input');
  inputCategory.id = 'newQuoteCategory';
  inputCategory.type = 'text';
  inputCategory.placeholder = 'Enter quote category';
  
  const button = document.createElement('button');
  button.textContent = 'Add Quote';
  button.onclick = addQuote;

  // Append elements to the form
  form.appendChild(inputText);
  form.appendChild(inputCategory);
  form.appendChild(button);

  // Append the form to the body or a specific container
  document.body.appendChild(form);
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Call createAddQuoteForm to display the form on page load
createAddQuoteForm();
