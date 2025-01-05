// alert('Happy New Year!');
// Random data to initialize the library array.
const start_data = [
    { title: 'Awo: The Autobiography of Chief Obafemi Awolowo', author: 'Obafemi Awolowo', pages: 315, read: true },
    { title: 'Chess Opening Essentials', author: 'Stefan Djuric, Dimitri Komarov and Claudio Pantaleoni', pages: 352, read: false },
    { title: 'How to win friends and influence people', author: 'Dale Carnegie', pages: 267, read: true },
    { title: 'Start with Why', author: 'Simon Sinek', pages: 231, read: false },
    { title: 'Selected Poems: A retrospective', author: 'Wole Soyinka', pages: 185, read: false },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt and David Thomas', pages: 352, read: true },
    { title: 'Clean Code', author: 'Robert C. Martin', pages: 464, read: true },
    { title: '1984', author: 'George Orwell', pages: 328, read: false },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', pages: 281, read: true },
    { title: 'The Art of War', author: 'Sun Tzu', pages: 273, read: true },
    { title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', pages: 443, read: false },
    { title: 'The Alchemist', author: 'Paulo Coelho', pages: 208, read: true },
    { title: 'Think and Grow Rich', author: 'Napoleon Hill', pages: 238, read: false },
    { title: 'The Lean Startup', author: 'Eric Ries', pages: 336, read: false }
];







const myLibrary = [];

function Book(title, author, pages, read = false) {
    //the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        if (this.read) {
            return (`${this.title} by ${this.author}, ${this.pages} pages, read this already`);
        } else {
            return (`${this.title} by ${this.author}, ${this.pages} pages, not read yet`);
        }
    }
}

function addBookToLibrary(title, author, pages, read = false) {
    // do stuff here
    const myBook = new Book(title, author, pages, read);
    myLibrary.push(myBook);
}




                  

console.table(start_data);

// add starting data to our main array.
for (let i = 0; i < start_data.length; i++) {
    this_book = start_data[i];
    addBookToLibrary(this_book.title, this_book.author, this_book.pages, this_book.read);
};

console.table(myLibrary);


// Update divs with book details.

function updateHtml() {
    // document.getElementById('container').innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {

        this_book = myLibrary[i];
        if (this_book != undefined && this_book != null) {
            let div = document.createElement('div');
            div.id = `card_${i}`;
            div.classList.add("my-card");
            if(this_book.read === true){
                div.innerHTML = `<div>Title : ${this_book.title} <br> Author :  ${this_book.author} <br> Pages : ${this_book.pages}  </div> <div class="read-delete"> <button id = "delete-${i}" class="delete-button">Delete Book</button> <br>  <button id= "read-${i}" class="read-button"> Read this already</button></div>`;
            } else {
                div.innerHTML = `<div>Title : ${this_book.title} <br> Author :  ${this_book.author} <br> Pages : ${this_book.pages} </div> <div class="read-delete"> <button id = "delete-${i}" class="delete-button">Delete Book</button> <br> <button id= "read-${i}" class="read-button"> Yet to read this</button></div>`;
            }

            document.getElementById('container').appendChild(div);
        }
    }
    window.scrollTo(0, 0);


    
    const delete_buttons = document.querySelectorAll('.delete-button');
    delete_buttons.forEach(function(delete_button){
        delete_button.addEventListener('click', ()=>{
            console.log('Delete Button is Clicked!');
            button_id = delete_button.id;
            const buttonIndexArray = button_id.split("-");
            button_index = buttonIndexArray[1];
            button_index = parseInt(button_index);
            console.log(`buttonid: ${button_id}, index: ${button_index}`);
            // delete_button.parentElement.remove();
            // const current_div = document.getElementById(`card_${button_index}`);
            // current_div.remove();
            // myLibrary.splice(button_index, 1);
            const deletes_parent = delete_button.parentElement;
            const deletes_grandparent = deletes_parent.parentElement;
            deletes_grandparent.remove();
            delete myLibrary[button_index];
            console.table(myLibrary);
        });
    });
   

    const read_buttons = document.querySelectorAll('.read-button')
    read_buttons.forEach(function(read_button){
        read_button.addEventListener('click', function(){
            console.log('Read Button is Clicked!');
             let read_id = read_button.id
            const buttonIndexArray = read_id.split("-");
            let button_index = buttonIndexArray[1];
            button_index = parseInt(button_index);
            let read_index = button_index;
            console.log(`Read button index: ${read_index}`);
            read_book = myLibrary[read_index];
            if (read_book.read === true) {
                //Toggle to false
                myLibrary[read_index].read = false;
                read_button.innerHTML = 'Yet to read this';
                console.table(myLibrary)
            } else {
                //Toggle to true
                myLibrary[read_index].read = true;
                read_button.innerHTML = 'Read this already';
                console.table(myLibrary);

            }
            
        });
    });


  
};

updateHtml();


const displayDialog = document.getElementById('new-book-button');
const myDialog = document.getElementById('book-dialog');
const submitButton = document.getElementById('submit-book');

const bookTitle = document.getElementById('book_title');
const bookAuthor = document.getElementById('book_author');
const bookPages = document.getElementById('book_pages');
const bookSelect = document.querySelector('select');



displayDialog.addEventListener('click', function(){
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    bookSelect.value = 'default';
    myDialog.showModal();
});


submitButton.addEventListener('click', function(event){
    event.preventDefault();
    console.log(bookTitle.value);
    console.log(bookAuthor.value);
    console.log(bookPages.value);
    console.log(bookSelect.value);
    let readValue = false;
    if(bookSelect.value === "true") {
        readValue = true;
    } else if (bookSelect.value === "false") {
        readValue = false;
    }
    myDialog.close();
    addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, readValue);
    document.getElementById('container').innerHTML = '';
    updateHtml();
    // window.scrollTo(0, -5);
    //scroll effect, courtesy of ChatGPT
    document.documentElement.scrollIntoView({behavior: 'smooth', block: 'end'})
});



