// let hero = document.querySelector(".hero");
// let slider = document.querySelector(".slider");
// let animation = document.querySelector("section.animation-wrapper");

// const time_line = new TimelineMax();
// // parameter 1 是要控制的對象
// // parameter 2 是Duration
// // parameter 3 是控制對象的原始狀態
// // parameter 4 是控制對象的改變後的狀態
// // parameter 5 控制動畫開始時間

// time_line
//   .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInout })
//   .fromTo(
//     hero,
//     1.2,
//     { width: "80%" },
//     { width: "100%", ease: Power2.easeInout }
//   )
//   .fromTo(slider, 1, { x: "-100%" }, { x: "0%", ease: Power2.easeInout }, "0.6")
//   .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

// setTimeout(() => {
//   animation.style.pointerEvents = "none";
// }, 2500);

// 防止Enter 交出結果
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

// 防止Button Summit
let allButton = document.querySelectorAll("button"); //是靜態的nodeList
allButton.forEach((Button) => {
  Button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// 選擇Select 內部的Option 要改變相對應的顏色
let allSelect = document.querySelectorAll("select");
allSelect.forEach((select) => {
  select.addEventListener("change", (e) => {
    setGpa();
    changeColor(e.target); // e.target 就是select
  });
});

let credits = document.querySelectorAll(".class-credit");
credits.forEach((credit) => {
  credit.addEventListener("change", (e) => {
    setGpa();
  });
});

function changeColor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value == "B" ||
    target.value == "B+" ||
    target.value == "B-"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (
    target.value == "C" ||
    target.value == "C+" ||
    target.value == "C-"
  ) {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else if (
    target.value == "D" ||
    target.value == "D+" ||
    target.value == "D-"
  ) {
    target.style.backgroundColor = "red";
    target.style.color = "black";
  } else if (target.value == "F") {
    target.style.backgroundColor = "gray";
    target.style.color = "white";
  } else {
    target.style.backgroundColor = "white";
    target.style.color = "black";
  }
}

function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

function setGpa() {
  let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credit");
  let selects = document.querySelectorAll("select");
  let sum = 0;
  let creditSum = 0;

  for (let i = 0; i < credits.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += credits[i].valueAsNumber;
    }
  }

  for (let i = 0; i < formLength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      sum += credits[i].valueAsNumber * convertor(selects[i].value);
    }
  }

  let result;
  if (creditSum == 0) {
    result = (0.0).toFixed(2);
  } else {
    result = (sum / creditSum).toFixed(2);
  }

  document.getElementById("result-gpa").innerText = result;
}

let addButton = document.querySelector(".plus-btn");
addButton.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");

  // 建立五個小元素
  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("list", "opt");
  newInput1.setAttribute("placeholder", "class category");
  newInput1.setAttribute("class", "class-type");

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.setAttribute("placeholder", "class number");
  newInput2.setAttribute("class", "class-number");

  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.setAttribute("placeholder", "credit");
  newInput3.setAttribute("class", "class-credit");
  newInput3.addEventListener("change", () => {
    setGpa();
  });

  // here is the select tag
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  //製作垃圾桶按鈕
  let newButton = document.createElement("button");
  newButton.classList.add("trash-button"); // 加入類別時可用classList.add()
  let newItag = document.createElement("i");
  newItag.setAttribute("class", "fas fa-trash"); // 也可以用setAttribute
  newButton.appendChild(newItag);

  newButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        setGpa();
      }
    );
  });

  newSelect.addEventListener("change", (e) => {
    setGpa();
    changeColor(e.target); // e.target 就是select
  });

  newDiv.append(newInput1);
  newDiv.append(newInput2);
  newDiv.append(newInput3); // 把元素放進div中
  newDiv.append(newSelect);
  newDiv.append(newButton);
  newForm.append(newDiv); // 把div 放進form 中
  document.querySelector(".all-input").appendChild(newForm); // 把新表格放入對的位置
  newForm.style.animation = "scaleUp 0.5s ease forwards";
});

let allTrashButton = document.querySelectorAll(".trash-button");
allTrashButton.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.classList.add("remove");
    //透過向parent 找到包含該trash button 的form
  });
});

allTrashButton.forEach((trash) => {
  let form = trash.parentElement.parentElement;
  form.addEventListener("transitionend", (e) => {
    e.target.remove();
    setGpa();
  });
});

//排序演算法
let button1 = document.querySelector(".sortDessending");
let button2 = document.querySelector(".sortAscending");
button1.addEventListener("click", () => {
  handleSorting("descending");
});
button2.addEventListener("click", () => {
  handleSorting("ascending");
});

function handleSorting(direction) {
  let graders = document.querySelectorAll("div.grader");
  let objectArray = []; //透過建立 Array儲存可以用的form
  for (i = 0; i < graders.length; i++) {
    let class_name = graders[i].children[0].value; // Class-name
    let class_number = graders[i].children[1].value; // Class-catagory
    let class_credit = graders[i].children[2].value;
    let class_grade = graders[i].children[3].value;
    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grade == ""
      )
    ) {
      let class_object = {
        class_name,
        class_number,
        class_credit,
        class_grade,
      }; // 透過語法將上面所宣告的內容變成物件屬性
      objectArray.push(class_object);
    }
  }

  for (let i = 0; i < objectArray.length; i++) {
    objectArray[i].class_grade_number = convertor(objectArray[i].class_grade); //使用新屬性避免影響原先的屬性
  }

  objectArray = mergeSort(objectArray); // 將前面儲存的form以重新排序的方式放回 ObjectArray
  if (direction == "descending") {
    objectArray.reverse(); // 從由大到小變成由小到大
  }
  console.log(objectArray);

  // 根據ObjjectArray 更新網頁
  let allInput = document.querySelector(".all-input");
  allInput.innerHTML = "";
  for (i = 0; i < objectArray.length; i++) {
    allInput.innerHTML += `<form>
    <div class="grader">
      <input
        type="text"
        placeholder="class category"
        class="class-type"
        list="opt"
        value = ${objectArray[i].class_name}
      /><!--
            --><input
        type="text"
        placeholder="class number"
        class="class-number"
        value = ${objectArray[i].class_number}
      /><!--
            --><input
        type="number"
        placeholder="credit"
        class="class-credit"
        min="0"
        max="6"
        value = ${objectArray[i].class_credit}
      />
      <select name="select" class="select">
        <option value=""></option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="D-">D-</option>
        <option value="F">F</option>
        
      </select>
      <button class="trash-button">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </form>`; // 修改 HTML標籤
  }

  // 因select 無法用value直接更改，使用JS更改
  graders = document.querySelectorAll("div.grader"); // 重新選擇
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = objectArray[i].class_grade; //透過ObjectArray直接修改
  }

  // select 事件監聽
  let allSelects = document.querySelectorAll("select");
  allSelects.forEach((select) => {
    changeColor(select);
    select.addEventListener("change", (e) => {
      changeColor(e.target);
      setGpa();
    });
  });

  // credit 事件監聽
  let allCredits = document.querySelectorAll(".class-credit");
  allCredits.forEach((credit) => {
    credit.addEventListener("change", (e) => {
      setGpa();
    });
  });

  // 垃圾桶事件監聽
  let allTrash = document.querySelectorAll(".trash_button");
  allTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.style.animation =
        "scaleDown 0.5s ease forwards";
      e.target.parentElement.parentElement.addEventListener(
        "animationend",
        (e) => {
          e.target.remove();
          setGpa();
        }
      );
    });
  });
}

function merge(a1, a2) {
  // a1表示objectArray
  let result = [];
  let i = 0;
  let j = 0;

  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number < a2[j.class_grade_number]) {
      result.push(a1[i]);
      i++;
    } else {
      result.push(a2[j]);
      j++;
    }
  }
  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  } else if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let right = arr.slice(middle, arr.length);
    let left = arr.slice(0, middle);

    console.log(merge(mergeSort(left), mergeSort(right)));
    return merge(mergeSort(left), mergeSort(right));
  }
}
