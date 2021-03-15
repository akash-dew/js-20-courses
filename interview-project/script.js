let domElements = {
  accordion: document.querySelectorAll(".accordion"),
  ansInput: document.getElementById("ans-input"),
  formSec: document.getElementById("formSec"),
  valqsn: formSec.elements["qsn"],
  valCat: formSec.elements["catRadios"],
  valLavel: formSec.elements["labelCheckbox"],
  valAns: formSec.elements["ans-input"],
  itemId: formSec.elements["itemId"],
  pillsTab: document.querySelectorAll("#pills-tab li button"),
  hardLoad: document.getElementById("hardLoad"),
  
};

var quill = new Quill("#editor-container", {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["image", "code-block"],
    ],
  },
  placeholder: "Enter answer ...",
  theme: "snow", // or 'bubble'
});

let allQuestions = [];

// Check Localhost Arrays
let loadDataFromLH = window.localStorage.getItem('qsnArry');


// function addItem(item) {
//   console.log(item);
//   window.localStorage.setItem('qsnArr', JSON.stringify(item))
// }

if(loadDataFromLH){
  // Load Localhost data
  allQuestions = JSON.parse(loadDataFromLH)
  updateDom(Object.values(allQuestions))
  console.log(allQuestions)
}else{
  // Load Firebase data
  loadDataFromFirebase();
}

domElements.hardLoad.addEventListener('click', () =>{
  let confirm = window.confirm('Are you sure! want to reload?')
  if(confirm){
    window.localStorage.removeItem('qsnArry');
    window.location.reload()

  }
})

 function loadDataFromFirebase(){
  // Get Qsns from firebase
  firebase.database().ref("/").get().then(function(snapshot) {
    if (snapshot.exists()) {
      allQuestions = snapshot.val();
      
      // console.log(Object.values(allQuestions))
      updateDom(Object.values(allQuestions))
      window.localStorage.setItem('qsnArry', JSON.stringify(allQuestions))

    }
    else {
      console.log("No data available");
    }
  }).catch(function(error) {
    console.error(error);
  });

 }




function getItem(qsn, ans, id, label) {
  let labelDom;
  if (label == 1) {
    labelDom = `
    <span class="badge bg-primary badge-sm">Beginner</span>
    `;
  } else if (label == 2) {
    labelDom = `
    <span class="badge bg-warning badge-sm">Intermediate</span>
    `;
  } else {
    labelDom = `
    <span class="badge bg-danger badge-sm">Expert</span>
    `;
  }

  let itemHTML = `<h2 class="accordion-header" id="headingOne">
                        
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne${id}" aria-expanded="true" aria-controls="collapseOne">
                            ${labelDom}  ${qsn} 
                        </button>
                    </h2>
                    <div id="collapseOne${id}" class="accordion-collapse collapse"
                        aria-labelledby="headingOne">
                        <div class="accordion-body">
                        <button class="btn btn-link float-end p-0" onclick="editItem('${id}')">Edit</button> ${ans}
                        </div>
                    </div>`;

  let item = document.createElement("div");
  item.classList.add("accordion-item");
  //  item.classList.add('accordion-item');

  item.innerHTML = itemHTML;

  return item;
}




function updateDom(arry) {
   let items = arry;
   console.log(items[1])
  // allQuestions.forEach()

  


  items.forEach(i=>{


   
    let itemInt = getItem(i.qsn, i.ans, i.id, i.label);

    let domElementsInd;
    
    if( i.cat == 'html'){
      domElementsInd = 0
    }else if(i.cat == 'css'){
      domElementsInd = 1
    }else{
      domElementsInd = 2
    }
    
    domElements.accordion[domElementsInd].appendChild(itemInt);
  })

 
}
 



let formvals;
let qsnItem = [];
let isEdit = false;

domElements.formSec.addEventListener("submit", (e) => {
  e.preventDefault();
  // valAns.value = JSON.stringify(quill.getContents());

    
  domElements.valAns.value = document.querySelector(".ql-editor").innerHTML  
  //  Creat Qsn OBJ
  let itemind = parseInt(domElements.valCat.value) - 1;

 

  let itemsToAdd = {
    qsn: domElements.valqsn.value,
    ans: domElements.valAns.value,
    label: domElements.valLavel.value,
    cat: domElements.valCat.value,
  }

  // allQuestions[itemind].AllQsns.push(itemsToAdd);

  if(isEdit){
    itemsToAdd.id = domElements.itemId.value;
    firebase.database().ref("/"+itemsToAdd.id).update(itemsToAdd)

  }else{
    itemsToAdd.id = getId();
    firebase.database().ref("/"+itemsToAdd.id).set(itemsToAdd)

  } 

  // Update Qsn to DB
  // addItem(allQuestions);

  // Reset Form
  e.target.reset();
  document.querySelector(".ql-editor").innerHTML = "";
  isEdit = false
  domElements.itemId.value = ''
});

// function addItem(item) {
//   console.log(item);
//   window.localStorage.setItem('qsnArr', JSON.stringify(item))
// }

// make Id
function getId(){
  return Math.random().toString(16).slice(2)
}



 
 

  // Firebase database
// firebase.database().ref("/").get().then(function(snapshot) {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   }
//   else {
//     console.log("No data available");
//   }
// }).catch(function(error) {
//   console.error(error);
// });

// let allQsnsMerged = [...allQuestions[0].AllQsns,...allQuestions[1].AllQsns,...allQuestions[2].AllQsns]

// allQsnsMerged.forEach(i =>{
//    i.id = getId()
//    let yo = i.id
//   console.log(i.id)
//    firebase.database().ref("/"+yo).set(i)
// })

// firebase.database().ref("/0/AllQsns/").set({qsn:'akash this side'})
// firebase.database().ref("/").remove()

 



function editItem(id){

  isEdit = true
  domElements.itemId.value = id;

  firebase.database().ref("/"+id).get().then(function(snapshot) {
    if (snapshot.exists()) {
      editeItemValues = snapshot.val();
      // console.log(editeItemValues)
      // console.log(Object.values(allQuestions))
      updateEditDom(editeItemValues)
    }
    else {
      console.log("Edit Item No data available");
    }
  }).catch(function(error) {
    console.error(error);
  });



      function updateEditDom(arry){
        
        console.log(arry)

        domElements.valqsn.value = arry.qsn;
        // domElements.valAns.value = arry.asn;
        document.querySelector(".ql-editor").innerHTML = arry.ans

          // id: getId(),
          // label: domElements.valLavel.value,
          // cat: domElements.valCat.value,


          domElements.valCat.forEach(i =>{
            console.log(i.value)
            console.log(arry.cat)
            if(i.value == arry.cat){
              i.checked = true
            }
          });
          domElements.valLavel.forEach(i =>{
            console.log(i.value)
            console.log(arry.label)
            if(i.value == arry.label){
              i.checked = true
            }
          });

        domElements.pillsTab[1].click()



        // getId(),
        // domElements.valLavel.value,
        // domElements.valCat.value,
      }



     


}





