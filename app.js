
shownotes();   //This is done so that notes show immediately after reloading

function notesAddition(){
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes"); //notes namak key ko prapt kro aur yeh dekho ki wo khali h ya nahi if,else se.
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes); //JSON.parse converts string into an js object which can be used later in the code.. 
    }
    notesObj.push(addTxt.value); // naye notes ki value of notesObj array me push kardo.
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = ""; // add note btn dabane ke bad text area khali ho jana chahiye
    console.log(notesObj);
    shownotes();
}



let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  notesAddition();
});


function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="my-2 mx-2 noteCard" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id ="${index}" class="btn btn-primary" onclick="deleteNote(this.id)">Delete Note</button>
                </div>
            </div>   
        `;
    });
    notesElm = document.getElementById("notes");
    if (notesObj.length !=0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `<h5>Nothing to show Please Add some notes.</h5>`
    }

}
// Through onclick we are sending index value of the Note to be deleted to the function deleteNote.

function deleteNote(index){
    notesObj.splice(index, 1); //splice(start, deleteCount) ,from where to start i.e from index no. , and how many to delete i.e = only this one
    localStorage.setItem("notes", JSON.stringify(notesObj)); //Local storage set after deletion
    shownotes(); //Show notes after deletion.
}

let search = document.getElementById('searchTxt');
search.addEventListener("keyup", function(e){
    let inputVal =  e.target.value;
    let card = document.getElementsByClassName('noteCard');
    
    Array.from(card).forEach(function(element){
        let cardTxt = document.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })

});
 