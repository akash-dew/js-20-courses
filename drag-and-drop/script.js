const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const itemListsMain = document.querySelectorAll('.drag-column');
const itemLists = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArray = [];

// Drag Functionality
let dragItem;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  listArray = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  const arrayNames = ['backlogItems','progressItems','completeItems','onHoldItems'];

  arrayNames.forEach((item, index) =>{
    window.localStorage.setItem(item, JSON.stringify(listArray[index]));
  });
 
}



// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // console.log('columnEl:', columnEl);
  // console.log('column:', column);
  // console.log('item:', item);
  // console.log('index:', index);
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.draggable = true;
  listEl.setAttribute('ondragstart', 'drag(event)');
  listEl.setAttribute('contenteditable', 'true');
  listEl.setAttribute('keypress', 'alert(123)');
  listEl.textContent = item;
  columnEl.appendChild(listEl)
  
} 


function drag(e){
  console.log(e.target);
  dragItem = e.target;
}


function allowDrop(e){
  e.preventDefault();
  // console.log(e.target)
  // .appendChild(dragItem)
}

function drop(e) {
  e.preventDefault();
 let itmeCon = e.target;
 itmeCon.appendChild(dragItem)
 itemLists.forEach((item)=>{
   item.classList.remove('over')
 })

 refelectItems()
}

function dragEnter(event) {
  event.target.classList.add('over');
  if ( event.target.className == "drag-column on-hold-column" ) {
    
  }
  console.dir(event.target)



}

function dragLeave(event) {
  // if ( event.target.className == "droptarget" ) {
    event.target.classList.remove('over');

  // }
}


// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once

  if(!updatedOnLoad){
    getSavedColumns();
  }

  // Backlog Column
  backlogList.textContent = ''
  backlogListArray.forEach((item,index) =>{
    createItemEl(backlogList,0,item,index)
  })

  // Progress Column
  progressList.textContent = ''
  progressListArray.forEach((item,index) =>{
    createItemEl(progressList,0,item,index)
  })

  // Complete Column
  completeList.textContent = ''
  completeListArray.forEach((item,index) =>{
    createItemEl(completeList,0,item,index)
  })
  // On Hold Column
  onHoldList.textContent = ''
  onHoldListArray.forEach((item,index) =>{
    createItemEl(onHoldList,0,item,index)
  })
  // Run getSavedColumns only once, Update Local Storage;
  updatedOnLoad = true;
  updateSavedColumns();
}

function showItemBox(c){
  addBtns[c].style.display = 'none';
  addItemContainers[c].style.display = "flex";
  saveItemBtns[c].style.display = "flex";
  addItemContainers[c].children[0].innerText = '';
}

function hideItemBox(c){
  addBtns[c].style.display = 'block';
  addItemContainers[c].style.display = "none";
  saveItemBtns[c].style.display = "none";

  saveItemBox(c)
}

function saveItemBox(a){
  let itemText = addItemContainers[a].children[0].innerText;
  // console.log(itemText.length > 0)
  if(itemText.length > 0){
    let dummyArray = listArray[a]
    dummyArray.push(itemText);
    updateDOM()
  }
  
}


// Allows arrays to reflect drag and drop
function refelectItems(){

 
  backlogListArray = []
  for(let i =0; i < backlogList.children.length; i++){
    backlogListArray.push(backlogList.children[i].textContent);
  }

  progressListArray = []
  for(let i =0; i < progressList.children.length; i++){
    progressListArray.push(progressList.children[i].textContent);
  }

  completeListArray = []
  for(let i =0; i < completeList.children.length; i++){
    completeListArray.push(completeList.children[i].textContent);
  }

  onHoldListArray = []
  for(let i =0; i < onHoldList.children.length; i++){
    onHoldListArray.push(onHoldList.children[i].textContent);
  }

 updateDOM()

}




updateDOM()
