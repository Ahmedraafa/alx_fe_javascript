// Array to hold the quotes
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// Base URL for the mock API
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
  const savedQuotes = localStorage.getItem('quotes');
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  }
}

// Function to display quotes based on category
function displayQuotes(category = 'all') {
  const filteredQuotes = category === 'all' ? quotes : quotes.filter(q => q.category === category);
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  filteredQuotes.forEach(quote => {
    const quoteElement = document.createElement('div');
    quoteElement.innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
    quoteDisplay.appendChild(quoteElement);
  });
}

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - <strong>${quote.category}</strong>`;
  
  // Save the last viewed quote to session storage
  sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    saveQuotes();
    populateCategories(); // Update the categories in the dropdown
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    displayQuotes();
    syncQuotes(); // Sync with server after adding a new quote
  }
}

// Function to update category filter options
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const categories = new Set(quotes.map(q => q.category));
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  displayQuotes(selectedCategory);
  localStorage.setItem('selectedCategory', selectedCategory);
}

// Function to export quotes as a JSON file
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes = importedQuotes;
    saveQuotes();
    populateCategories(); // Update categories after importing
    displayQuotes();
    syncQuotes(); // Sync with server after importing
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(API_URL);
    const serverQuotes = await response.json();

    // Assuming server data structure matches local data structure
    return serverQuotes.map(q => ({
      text: q.title, // Adjust mapping if needed
      category: q.body // Adjust mapping if needed
    }));
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
    alert('Failed to fetch quotes from the server.');
    return [];
  }
}

// Function to post quotes to the server
async function postQuotesToServer() {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quotes)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Quotes posted to server:', result);
    } else {
      console.error('Failed to post quotes to the server:', response.statusText);
      alert('Failed to post quotes to the server.');
    }
  } catch (error) {
    console.error('Error posting quotes to server:', error);
    alert('Failed to post quotes to the server.');
  }
}

// Function to synchronize quotes between local storage and server
async function syncQuotes() {
  // Fetch quotes from the server
  const serverQuotes = await fetchQuotesFromServer();

  // Simple conflict resolution: server data takes precedence
  if (serverQuotes.length > 0) {
    quotes = serverQuotes;
    saveQuotes();
    displayQuotes();
    alert('Data synchronized with server successfully!');
  }

  // Post local quotes to server (for demonstration purposes)
  await postQuotesToServer();
}

// Function to start periodic synchronization
function startPeriodicSync(interval = 60000) { // Default to 60 seconds
  setInterval(syncQuotes, interval);
}

// Initialize the application
function init() {
  loadQuotes();
  populateCategories(); // Populate categories on initialization
  createAddQuoteForm();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('categoryFilter').addEventListener('change', filterQuotes);
  
  // Load the last viewed quote from session storage (if available)
  const lastQuote = sessionStorage.getItem('lastQuote');
  if (lastQuote) {
    document.getElementById('quoteDisplay').innerHTML = JSON.parse(lastQuote).text;
  }

  // Restore the last selected filter
  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) {
    document.getElementById('categoryFilter').value = savedCategory;
    displayQuotes(savedCategory);
  } else {
    displayQuotes();
  }

  // Start periodic sync with server
  startPeriodicSync(); // You can adjust the interval as needed
}

// Call init function on page load
init();
