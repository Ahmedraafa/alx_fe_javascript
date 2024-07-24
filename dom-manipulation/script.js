// Function to create and display the add quote form and buttons
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
  
  // Create and append export button
  const exportButton = document.createElement('button');
  exportButton.textContent = 'Export Quotes';
  exportButton.id = 'exportQuotes';
  exportButton.onclick = exportToJsonFile;
  document.body.appendChild(exportButton);

  // Create import file input
  const importFileInput = document.createElement('input');
  importFileInput.type = 'file';
  importFileInput.id = 'importFile';
  importFileInput.accept = '.json';
  importFileInput.onchange = importFromJsonFile;
  document.body.appendChild(importFileInput);
}
