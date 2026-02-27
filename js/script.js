const myLibrary = [];

function Book(name, author, description, year, isRead) {
    this.uuid = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.description = description;
    this.year = year;
    this.isRead = isRead;
}

function addBookToLibrary(name, author, description, year, isRead) {
    const book = new Book(name, author, description, year, isRead);
    myLibrary.push(book);
}

function deleteBook(uuidToDelete) {
    const indexToDelete = myLibrary.findIndex(item => 
        item.uuid === uuidToDelete
    );
    myLibrary.splice(indexToDelete,1);
    renderBooks();
}

//add books to library
addBookToLibrary('Book of Secrets', 'Zworley' , 'NY Times Bestseller for years in a row. Depicts all the secrets how to manioulate dog moms and dads to get all the treats you could possibly imagine. And all the pets.. Let\'s not forget about the pets.', 2025, false);

addBookToLibrary('Brimstone', 'Callie Hart' , 'Second book in the Fae & Alchemy series, a dark fantasy romance that continues the story of Queen Saeris and Kingfisher, focusing on political intrigue, danger, and their developing relationship as they face threats to their realm.', 2025, false);

addBookToLibrary('A Court of Thorns and Roses', 'Sarah J. Maas', 'A Court of Thorns and Roses (ACOTAR) is a bestselling fantasy romance series by Sarah J. Maas, following huntress Feyre Archeron after she is taken to the faerie lands of Prythian. The series blends romance, adventure, and faerie lore, and includes five main books: A Court of Thorns and Roses, A Court of Mist and Fury, A Court of Wings and Ruin, A Court of Frost and Starlight, and A Court of Silver Flames. It is known for its mature themes, which have led to some challenges and bans in certain areas.', 2015, false);

addBookToLibrary('Fahrenheit 451', 'Ray Bradbury', 'Fahrenheit 451 is a classic dystopian novel by Ray Bradbury, published in 1953, that depicts a future American society where books are outlawed and burned by "firemen" to suppress knowledge and independent thought, following a fireman named Guy Montag as he becomes disillusioned with his role and begins to question his world. The title refers to the temperature at which book paper catches fire and burns. It\'s a cautionary tale about censorship, conformity, and the dangers of a media-saturated, anti-intellectual culture, often compared to 1984 and Brave New World.', 1953, true);

addBookToLibrary('Theo of Golden: A Novel','Allen Levi','His name is Theo. And he asks a lot more questions than he answers.Theo visits the local coffeehouse, where ninety-two pencil portraits hang on the walls, portraits of the people of Golden done by a local artist. He begins purchasing them, one at a time, and putting them back in the hands of their “rightful owners.” With each exchange, a story is told, a friendship born, and a life altered.A story of giving and receiving, of seeing and being seen, Theo of Golden is a beautifully crafted novel about the power of creative generosity, the importance of wonder to a purposeful life, and the invisible threads of kindness that bind us to one another.', 2026, false);

addBookToLibrary('Rendezvous with Rama', 'Arthur C. Clarke', 'Rendezvous with Rama is a 1973 science fiction novel by British writer Arthur C. Clarke. Set in the 2130s, the story involves a 50-by-20-kilometre (31-by-12-mile) cylindrical alien starship that enters the Solar System. The story is told from the point of view of a group of human explorers who intercept the ship in an attempt to unlock its mysteries. The novel won the Hugo, Locus, and Nebula awards upon its release, and is regarded as one of the cornerstones in Clarke\'s bibliography. The concept was later extended with several sequels, written by Clarke and Gentry Lee.', 1973, true);

function renderBooks() {
    const libraryContainer = document.getElementById('library');
    libraryContainer.innerHTML='';
    
    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('card');
        //add UUID data
        card.dataset.uuid = book.uuid;
        const title = document.createElement('h2');
        title.textContent = book.name;
        const author = document.createElement('h4');
        author.classList.add('author');
        author.textContent = book.author;
        const description = document.createElement('p');
        description.classList.add('description');
        description.textContent = book.description;
        const year = document.createElement('p');
        year.classList.add('year');
        year.textContent = "Release Year: " + book.year;
        //add menu on bottom of the card
        const cardMenu = document.createElement('div');
        cardMenu.classList.add('card-menu');
        
        //is book read
        const isBookRead = book.isRead;
        const isBookReadBtn = document.createElement('Button');
        if (isBookRead) {
            isBookReadBtn.textContent = 'Finished!';
            isBookReadBtn.classList.add('finished');
            card.classList.add('finished');
        }

        else {
            isBookReadBtn.textContent = 'Not Finished Yet';
            isBookReadBtn.classList.add('not-finished');
            card.classList.add('not-finished');
        }
        cardMenu.appendChild(isBookReadBtn);

        const removeBook = document.createElement('button');
        removeBook.textContent = 'Remove Book';
        cardMenu.appendChild(removeBook);

        removeBook.addEventListener('click', (e) => {
            deleteBook(book.uuid);
        })

        //form a full card
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(description);
        card.appendChild(year);
        card.appendChild(cardMenu);
        libraryContainer.appendChild(card);
    })
}

renderBooks();

const addBookDialog = document.getElementById('add-book');

const confirmBtn = addBookDialog.querySelector('#confirmBtn');
const formBookName = addBookDialog.querySelector('#book-name');
const formAuthor = addBookDialog.querySelector('#author');
const formDescription = addBookDialog.querySelector('#description');
const formYear = addBookDialog.querySelector('#year');
const formIsRead = addBookDialog.querySelector('#is-read');

addBookDialog.addEventListener('close', (e) => {
    formBookName.value='';
    formAuthor.value='';
    formDescription.value='';
    formYear.value='';
    formIsRead.checked = false;
} );

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newBookName = formBookName.value;
    const newBookAuthor = formAuthor.value;
    const newBookDescription = formDescription.value;
    const newBookYear = formYear.value;
    const newBookIsRead = formIsRead.checked;
    addBookToLibrary(newBookName, newBookAuthor, newBookDescription,newBookYear, newBookIsRead)
    addBookDialog.close();
    renderBooks();
})