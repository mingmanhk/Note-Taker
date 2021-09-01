const $notesEl = $(".notes");
const $noteEl = $(".note");
const $savebtnEl = $(".save");
const $addbtnEl = $(".add");
const $deletebtnEl = $(".delete");
const $titleEl = $(".title");
const $textEl = $(".text");

let currentNote = {};

//call get api
const getnotesapi = () => {
   return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

//call post api
const postnoteapi = (note) => {
  console.log(JSON.stringify(note))
 return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

//call delete api
const deletenoteapi = (id) => {
  console.log(id)
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

//open note 
const opennote = function () {
  currentNote = $(this).data();
  displaynote();
};

//display note
const displaynote = function () {
  if (currentNote.id) {
    $titleEl.val(currentNote.title);
    $textEl.val(currentNote.text);
    $noteEl.show();
    $savebtnEl.show();
  } else {
    $titleEl.val("");
    $textEl.val("");
    $noteEl.hide();
    $savebtnEl.hide();
  }
};

//create new note
const createnewnote  = function ()   {
  currentNote = {};
  displaynote();
  $noteEl.show()
  $savebtnEl.show();
  savenote
};

//save note
const savenote = function ()   {
  const newNote = {
    title: $titleEl.val(),
    text: $textEl.val(),
    id: currentNote.id
  };
  //call post api
  postnoteapi(newNote)
    .then(function (data) {
      currentNote = data[0];
      renderNotes(data);
      displaynote();
  });
}

//delete notes
const detelenote = function () {
  var note = $(this)
    .parents(".list-group-item")
    .data();
  //call delete api
  deletenoteapi(note.id)
    .then(async () => {
    currentNote= {};
    init();
    displaynote();
    });
};
  
const renderNotes = (notes) => {
  //clean notes list
  $notesEl.empty()
  
  //create li
  const newliEl = [];
  
  //generate list item
  const createnotelistitem = (title) => {
    const $li = $("<li class='list-group-item list-group-item-action'>");
    const $divrow = $("<div class='row'>");
    const $divtitle = $("<div class='col-10 align-self-center justify-content-start align-items-center'>");
    const $divtrash = $("<div class='col-2 align-self-center justify-content-end'>");
    const $divh3 = $("<h3>");
    const $divi = $("<i class='bi bi-trash red delete'>");
    $divtitle.text(title);
    $divh3.append($divi);
    $divtrash.append($divh3);
    $divrow.append($divtitle);
    $divrow.append($divtrash);
    $li.append($divrow);
    return $li;
  }
  
  //show no data if note is empty
  if (notes.length === 0) {
   let $li = $("<li class='list-group-item'>");
    $li.text("No Data!");
    newliEl.push($li);
    $savebtnEl.hide();
  };

  // create each list item 
  notes.forEach((note) => {
    let $li = createnotelistitem(note.title).data(note);
    newliEl.push($li);
  });
  // add list item to notes element
  $notesEl.append(newliEl);
};


//add handler
$notesEl.on("click", ".list-group-item", opennote); //select note 
$notesEl.on("click", ".delete",  detelenote);//detele note
$savebtnEl.on('click', savenote);//save note
$addbtnEl.on("click", createnewnote);//create new note
$titleEl.on('keyup', savenote); //add handler for auto save on change
$textEl.on('keyup', savenote); //add handler for auto save on change

// init
const init =  () => {
  return getnotesapi()
    .then
    (async (data) => renderNotes(data))
  .then(displaynote())
};

//Render notes 
init();

