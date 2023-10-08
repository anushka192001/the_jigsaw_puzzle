var size = [window.width, window.height]
var shuffling = false;
var imgCount = 7;
var imgIndex = 1;
var currentImgIndex = 1;  
var imgSlideBool = false;
var nickname;
var currentSize;
var cookieInstance = new Cookies()
let puzzle = new PuzzleStructure()

var headerDiv = document.createElement("div");
headerDiv.id = "headerDiv";

var menuDiv = document.createElement("div");
menuDiv.id = "menuDiv";

var gameDiv = document.createElement("div");
gameDiv.id = "gameDiv";

var imgSlider = document.createElement("div");
imgSlider.id = "imgSlider";

var footerDiv = document.createElement("div");
footerDiv.id = "footerDiv";


// Header
var header = document.createElement("div");
header.id = "header";
header.innerHTML = "PUZZLE";
headerDiv.appendChild(header);


// menuDiv->imgSlider & interactionDiv
//menuDiv start

/*Image Slider*/
var leftArrow = document.createElement("span")
leftArrow.classList.add("arrow")
leftArrow.innerHTML = "	&#8592;";
leftArrow.addEventListener("click", () => {
    if(imgSlideBool == false){
        imgSlideBool = true
        imgIndex--;
        Slider.MoveImg(-1)
    }
})
imgSlider.appendChild(leftArrow)

var borderImg = document.createElement("div");
borderImg.id = "borderImg";

var images = document.createElement("div");
images.id = "images";
for (let i = 1; i<=imgCount; i++){
    if(i == 1){
        let img = document.createElement("img");
        img.classList.add("slideImg");
        img.src = "./img/image"+imgCount+".jpg";
        images.appendChild(img)
    }
    let img = document.createElement("img");
    img.classList.add("slideImg");
    img.src = "./img/image"+i+".jpg";
    images.appendChild(img)
    if(i == imgCount){
        let img = document.createElement("img");
        img.classList.add("slideImg");
        img.src = "./img/image1.jpg";
        images.appendChild(img)
    }
}
borderImg.appendChild(images)

imgSlider.appendChild(borderImg);
var rightArrow = document.createElement("span")
rightArrow.classList.add("arrow")
rightArrow.innerHTML = "&#8594;";
rightArrow.addEventListener("click", () => {
    if(imgSlideBool == false){
        imgSlideBool = true
        imgIndex++;
        Slider.MoveImg(1)
    }
})
imgSlider.appendChild(rightArrow)
menuDiv.appendChild(imgSlider);


/* Interaction Container */
var interactionDiv = document.createElement("div");
interactionDiv.id = "interactionDiv";

// Left
var leftSideDiv = document.createElement("div");
leftSideDiv.id = "leftSideDiv";

var rankingBtn = document.createElement("button");
rankingBtn.id = "rankingBtn";
rankingBtn.innerHTML = "Ranking"
rankingBtn.addEventListener("click", () => {
    cookieInstance.ReadCookie();
    CustomAlerts.ShowRanking();
})
leftSideDiv.appendChild(rankingBtn)
var numbersBtn = document.createElement("button");
numbersBtn.id = "numbersBtn";
numbersBtn.innerHTML = "Numbers"
numbersBtn.addEventListener("click", () => {
    puzzle.ShowNumbers();
})
leftSideDiv.appendChild(numbersBtn)

interactionDiv.appendChild(leftSideDiv);

// Middle
var baseElementsDiv = document.createElement("div");
baseElementsDiv.id = "baseElementsDiv";

var buttonsModeDiv = document.createElement("div");
buttonsModeDiv.id = "buttonsModeDiv";

var buttonsVal = [3, 4, 5, 6]
for(let i = 0; i<buttonsVal.length; i++){
    var button = document.createElement("button");
    button.classList.add("btn", "white");
    button.innerHTML = buttonsVal[i] + "x" + buttonsVal[i]
    button.addEventListener("click", () => {
        if(shuffling == false && imgSlideBool == false){
            currentImgIndex = imgIndex;
            shuffling = true;
            puzzle.CreatePuzzle(buttonsVal[i]);
        }
    })
    buttonsModeDiv.appendChild(button);
}
baseElementsDiv.appendChild(buttonsModeDiv)

var timerDiv = document.createElement("div");
timerDiv.id = "timerDiv";
baseElementsDiv.appendChild(timerDiv);
interactionDiv.appendChild(baseElementsDiv)

// Right
var rightSideDiv = document.createElement("div");
rightSideDiv.id = "rightSideDiv";

var labelMoves = document.createElement("label");
labelMoves.id = "labelMoves";
labelMoves.innerHTML = "Moves:"
rightSideDiv.appendChild(labelMoves);

var countMoves = document.createElement("div");
countMoves.id = "countMoves";
countMoves.innerHTML = "0"
rightSideDiv.appendChild(countMoves);

interactionDiv.appendChild(rightSideDiv);

menuDiv.appendChild(interactionDiv)

// MenuDiv end



/* Game Container */
var arena = document.createElement("div");
arena.id = "arena";
gameDiv.appendChild(arena);



/* Footer Container */
var socials = document.createElement("div");
socials.id = "socials";

var facebook = document.createElement('a');
facebook.id = "facebook";
var link1 = document.createTextNode("Facebook");
facebook.appendChild(link1);
facebook.href = "https://www.facebook.com/profile.php?id=100007441088302";
facebook.target = "__blank";

var twitter = document.createElement('a');
twitter.id = "twitter";
var link2 = document.createTextNode("Twitter");
twitter.appendChild(link2);
twitter.href = "#";
twitter.target = "__blank";

var instagram = document.createElement('a');
instagram.id = "instagram";
var link3 = document.createTextNode("Instagram");
instagram.appendChild(link3);
instagram.href = "https://www.instagram.com/anushkasingh1606/";
instagram.target = "__blank";

socials.appendChild(facebook);
socials.appendChild(twitter);
socials.appendChild(instagram);
footerDiv.appendChild(socials);



document.body.appendChild(headerDiv);
document.body.appendChild(menuDiv);
document.body.appendChild(gameDiv);
document.body.appendChild(footerDiv);

cookieInstance.ReadCookie();