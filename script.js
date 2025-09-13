//your code here
//your code here
const imageContainer = document.querySelector("section")
const resetBtn = document.getElementById("reset")
const verifyBtn = document.getElementById("verify")
const message = document.getElementById("para")

function shuffleArray(arr) {
  let array = arr.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let selectedImages = []
function suffleImages(){
	selectedImages = [];
	verifyBtn.hidden = true;
	resetBtn.hidden = true;
	message.hidden = true;
	const shuffle = shuffleArray(Array.from(imageContainer.children))
	imageContainer.innerHTML = "";
	
	for(let ele of shuffle){
		imageContainer.append(ele)
	}
}
suffleImages()

function actionOnImageClick(event){
	selectedImages = []
	message.hidden = true;
	const ele = event.target;
	const nodeName = ele.nodeName
	let selectedCount = 0;
	Array.from(imageContainer.children).forEach(ele => {
		ele.classList.contains("selected") && selectedCount++;

	})
	if(nodeName === "IMG"){
		if(selectedCount === 2){
			if(ele.classList.contains("selected")) ele.classList.remove("selected")
		} else ele.classList.toggle("selected");
	}
	selectedCount = 0;
	Array.from(imageContainer.children).forEach(ele => {
		if(ele.classList.contains("selected")) {
			selectedImages.push(ele)
			selectedCount++
		};
	})

	if(selectedCount >=1){
		resetBtn.hidden = false;
	}else {
		resetBtn.hidden = true;
	}
	if(selectedCount >1 && selectedCount <=2){
		verifyBtn.hidden = false;
	}else {
		verifyBtn.hidden = true;
	}
}

function verifyFn(){
	const ele1Class = selectedImages[0].classList.toString()
	const ele2Class = selectedImages[1].classList.toString()
	message.hidden = false;
	console.log("click")
	if(ele1Class === ele2Class){
		message.innerHTML = "You are a human. Congratulations!"
	} else{
		message.innerHTML = "We can't verify you as a human. You selected the non-identical tiles."
	}
}
function resetFn(){
	Array.from(imageContainer.children).forEach(ele => {
		ele.classList.remove("selected") 
	})
	suffleImages()
}

imageContainer.addEventListener("click", actionOnImageClick)
verifyBtn.addEventListener("click",verifyFn)
resetBtn.addEventListener("click",resetFn)