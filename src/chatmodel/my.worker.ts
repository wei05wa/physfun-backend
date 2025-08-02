function initialize(data: { some: string }): void {
  console.log('Worker: Initializing with data:', data);
  // ... perform heavy initialization logic ...

  // Send a message back to the main thread to confirm
  self.postMessage({ status: 'initialized' });
}

function loadLanguage(lang: string): void {
  console.log('Worker: Loading language:', lang);
  // ... perform language loading logic ...

  // Send a message back if you need to
  self.postMessage({ status: 'languageLoaded', lang: lang });
}


// --- Set up the main message listener for the worker ---

self.addEventListener('message', (event) => {
  const { type, payload } = event.data;

  console.log('Worker: Received command:', type);

  // Use a switch or if/else to handle different commands
  switch (type) {
    case 'initialize':
      initialize(payload);
      break;
    case 'loadLanguage':
      loadLanguage(payload);
      break;
    default:
      console.error('Worker: Unknown command received:', type);
  }
});