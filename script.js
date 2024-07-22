let quotes = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    populateCategories();
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('exportQuotes').addEventListener('click', exportToJson);
});

// Display a random quote
function showRandomQuote() {
    if (quotes.length === 0) return;
    const filteredQuotes = filterQuotesByCategory();
    if (filteredQuotes.length === 0) {
        document.getElementById('quoteDisplay').innerText = 'No quotes available.';
        return;
    }
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    document.getElementById('quoteDisplay').innerText = `"${quote.text}" - ${quote.category}`;
}

// Add a new quote
function addQuote() {
    const text = document.getElementById('newQuoteText').value;
    const category = document.getElementById('newQuoteCategory').value;
    if (text && category) {
        quotes.push({ text, category });
        saveQuotes();
        populateCategories();
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        showRandomQuote(); // Optionally show the newly added quote
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load quotes from local storage
function loadQuotes() {
    const savedQuotes = localStorage.getItem('quotes');
    if (savedQuotes) {
        quotes = JSON.parse(savedQuotes);
    }
}

// Populate categories in the filter dropdown
function populateCategories() {
    const categories = new Set(quotes.map(q => q.category));
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes based on the selected category
function filterQuotes() {
    showRandomQuote(); // Refresh the displayed quote based on the filter
}

// Filter quotes by category
function filterQuotesByCategory() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    return selectedCategory === 'all' ? quotes : quotes.filter(q => q.category === selectedCategory);
}

// Export quotes to a JSON file
function exportToJson() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        const importedQuotes = JSON.parse(e.target.result);
        quotes = importedQuotes;
        saveQuotes();
        populateCategories();
        showRandomQuote(); // Refresh the display with imported quotes
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}
