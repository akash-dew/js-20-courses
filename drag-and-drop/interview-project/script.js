let domElements = {
  accordion: document.querySelectorAll(".accordion"),
  ansInput: document.getElementById('ans-input')
};


var quill = new Quill('#editor-container', {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block']
      ]
    },
    placeholder: 'Compose an epic...',
    theme: 'snow'  // or 'bubble'
  });

let allQuestions = [
  {
    questionCat: "HTML",
    AllQsns: [
      { qsn: "What is HTML?", ans: "HTML is a language", id: 12, label: 1 },
      { qsn: "What is HTML2?", ans: "HTML is a language2", id: 123, label: 2 },
      { qsn: "What is HTML3?", ans: "HTML is a language3", id: 124, label: 3 },
      { qsn: "What is HTML4?", ans: "HTML is a language4", id: 125, label: 4 },
    ],
  },
  {
    questionCat: "CSS",
    AllQsns: [
      { qsn: "What is Css?", ans: "Css is a language", id: 126, label: 1 },
      { qsn: "What is Css2?", ans: "Css is a language2", id: 127, label: 2 },
      { qsn: "What is Css3?", ans: "Css is a language3", id: 128, label: 3 },
      { qsn: "What is Css4?", ans: "Css is a language4", id: 129, label: 4 },
    ],
  },
  {
    questionCat: "Javascript",
    AllQsns: [
      {
        qsn: "What is Javascript?",
        ans: "Javascript is a language",
        id: 131,
        label: 1,
      },
      {
        qsn: "What is Javascript2?",
        ans: "Javascript is a language2",
        id: 132,
        label: 2,
      },
      {
        qsn: "What is Javascript3?",
        ans: "Javascript is a language3",
        id: 133,
        label: 3,
      },
      {
        qsn: "What is Javascript4?",
        ans: "Javascript is a language4",
        id: 134,
        label: 4,
      },
    ],
  },
];

function getItem(qsn, ans, id) {
  let itemHTML = `<h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne${id}" aria-expanded="true" aria-controls="collapseOne">
                            ${qsn}
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

function displayQsns() {
  domElements.accordion.forEach((item, index) => {
    console.log(index);
    allQuestions[index].AllQsns.forEach((i) => {
      console.log(i);

      let itemInt = getItem(i.qsn, i.ans, i.id);
      //   console.log(itemInt)
      item.appendChild(itemInt);
    });
  });
}
displayQsns();




// var about = document.querySelector('input[name=about]');
// about.value = JSON.stringify(quill.getContents());