let domElements = {
  accordion: document.querySelectorAll(".accordion"),
  ansInput: document.getElementById("ans-input"),
  formSec: document.getElementById("formSec"),
};

var quill = new Quill("#editor-container", {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["image", "code-block"],
    ],
  },
  placeholder: "Compose an epic...",
  theme: "snow", // or 'bubble'
});

let allQuestions = [
  {
    "a25d5619035701" : {
      "ans" : "HTML is a language2",
      "cat" : "html",
      "id" : "25d5619035701",
      "label" : 2,
      "qsn" : "What is HTML2?"
    },
    "458dc43c882da" : {
      "ans" : "Css is a language2",
      "cat" : "css",
      "id" : "458dc43c882da",
      "label" : 2,
      "qsn" : "What is Css2?"
    },
    "642923e8ec27" : {
      "ans" : "Css is a language4",
      "cat" : "css",
      "id" : "642923e8ec27",
      "label" : 4,
      "qsn" : "What is Css4?"
    },
    "b79909cbfebbc" : {
      "ans" : "Css is a language",
      "cat" : "css",
      "id" : "b79909cbfebbc",
      "label" : 1,
      "qsn" : "What is Css?"
    },
    "ba4e86211cb0c" : {
      "ans" : "Javascript is a language2",
      "cat" : "js",
      "id" : "ba4e86211cb0c",
      "label" : 2,
      "qsn" : "What is Javascript2?"
    },
    "bc9bf1d32d0cf" : {
      "ans" : "Javascript is a language4",
      "cat" : "js",
      "id" : "bc9bf1d32d0cf",
      "label" : 4,
      "qsn" : "What is Javascript4?"
    },
    "be368bca0fb2" : {
      "ans" : "HTML is a language3",
      "cat" : "html",
      "id" : "be368bca0fb2",
      "label" : 3,
      "qsn" : "What is HTML3?"
    },
    "cee9a8fe24df7" : {
      "ans" : "Javascript is a language",
      "cat" : "js",
      "id" : "cee9a8fe24df7",
      "label" : 1,
      "qsn" : "What is Javascript?"
    },
    "d5d2bc4f8c114" : {
      "ans" : "Css is a language3",
      "cat" : "css",
      "id" : "d5d2bc4f8c114",
      "label" : 3,
      "qsn" : "What is Css3?"
    },
    "e7724bbffa9e5" : {
      "ans" : "HTML is a language",
      "cat" : "html",
      "id" : "e7724bbffa9e5",
      "label" : 1,
      "qsn" : "What is HTML?"
    },
    "ec50f6ef66a2d" : {
      "ans" : "HTML is a language4",
      "cat" : "html",
      "id" : "ec50f6ef66a2d",
      "label" : 4,
      "qsn" : "What is HTML4?"
    },
    "ef43db37c99f2" : {
      "ans" : "Javascript is a language3",
      "cat" : "js",
      "id" : "ef43db37c99f2",
      "label" : 3,
      "qsn" : "What is Javascript3?"
    }
  }
];

 // Get Qsns from firebase
firebase.database().ref("/").get().then(function(snapshot) {
  if (snapshot.exists()) {
    allQuestions = snapshot.val();
    
    // console.log(Object.values(allQuestions))
    updateDom(Object.values(allQuestions))
  }
  else {
    console.log("No data available");
  }
}).catch(function(error) {
  console.error(error);
});







// let checkQsnsArray = JSON.parse(window.localStorage.getItem('qsnArr'));

// if(checkQsnsArray){
//   allQuestions = checkQsnsArray
// }


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
                            ${ans}
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


  // domElements.accordion.forEach((item, index) => {
  //   // console.log(index);
  //   allQuestions[index].AllQsns.forEach((i) => {
  //     // console.log(i);

  //     let itemInt = getItem(i.qsn, i.ans, i.id, i.label);
  //     //   console.log(itemInt)
  //     item.appendChild(itemInt);
  //   });
  // });
}
// function displayQsns() {
//   domElements.accordion.forEach((item, index) => {
//     // console.log(index);
//     allQuestions[index].AllQsns.forEach((i) => {
//       // console.log(i);

//       let itemInt = getItem(i.qsn, i.ans, i.id, i.label);
//       //   console.log(itemInt)
//       item.appendChild(itemInt);
//     });
//   });
// }
// displayQsns();




let formvals;
let qsnItem = [];

domElements.formSec.addEventListener("submit", (e) => {
  e.preventDefault();

  let valqsn = e.target.elements["qsn"];
  let valCat = e.target.elements["catRadios"];
  let valLavel = e.target.elements["labelCheckbox"];
  let valAns = e.target.elements["ans-input"];
  // valAns.value = JSON.stringify(quill.getContents());
  valAns.value = document.querySelector(".ql-editor").innerHTML
  
  //  Creat Qsn OBJ
  
  let itemind = parseInt(valCat.value) - 1;
 

  let itemsToAdd = {
    qsn: valqsn.value,
    ans: valAns.value,
    id: getId(),
    label: valLavel.value,
    cat: valCat.value,
  }

  allQuestions[itemind].AllQsns.push(itemsToAdd);

  // Update Qsn to DB
  addItem(allQuestions);

  // Reset Form
  e.target.reset();
  document.querySelector(".ql-editor").innerHTML = "";
});

function addItem(item) {
  console.log(item);
  window.localStorage.setItem('qsnArr', JSON.stringify(item))
}

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

 









