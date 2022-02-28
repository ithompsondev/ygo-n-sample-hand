export async function postDeckList(deckName,deckList,createdDeckListHandler) {
    const response = await fetch(
        `http://localhost:${process.env.PORT}/deck/create`,
        {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    deckName: deckName,
                    deckList: deckList
                }),
                credentials: 'include'
        }
    );
    const jResponse = await response.json();
    if (jResponse.status === 200) { createdDeckListHandler(); }
}

// We make a get request to the server to retrieve deck name and list session data to fill the form
// The handler callback passed in ensures that we update the relevant components state
export async function preloadSessionData(preloadDataHandler) {
    const response = await fetch(
        `http://localhost:${process.env.PORT}/preload`,
        {
            method: 'GET',
            credentials: 'include'
        }    
    );
    const jResponse = await response.json();
    if (jResponse.status === 200) {
        preloadDataHandler(jResponse.deckName,jResponse.deckList);
    }
}

export async function downloadDeck(downloadDeckHandler) {
    const response = await fetch(
        `http://localhost:${process.env.PORT}/deck/decklist`,
        {
            method: 'GET',
            credentials: 'include'
        }
    );
    const jResponse = await response.json();
    if (jResponse.status === 200) {
        downloadDeckHandler(jResponse.deckName,jResponse.deck,jResponse.errors);
    }
}