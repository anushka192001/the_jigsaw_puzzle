class PuzzleStructure {
    constructor() {
        this.count;
        this.drawMachine;
        this.blankElement;
        this.puzzleTable = [];  
        this.puzzleNumbers = [];
        this.puzzlePositions = [];
        this.shuffling = false;
        this.numbersVis = false;
        this.endGame = false;
        this.timerObj = new Timer();
    }

    CreatePuzzle(count) {
        clearInterval(this.drawMachine)
        countMoves.innerHTML = "0"
        currentSize = count
        this.endGame = false;
        this.numbersVis = false;
        this.puzzleTable = [];
        this.puzzleNumbers = [];
        this.puzzlePositions = [];
        this.count = count;
        arena.innerHTML = "";
        for (let i = 0; i < this.count; i++) {
            this.puzzleTable.push([]);
            for (let j = 0; j < this.count; j++) {
                if (i != this.count - 1 || j != this.count - 1) {
                    let div = document.createElement("div");
                    div.classList.add("puzzle")
                    div.style.backgroundImage = "url('./img/image" + imgIndex + ".jpg')";
                    div.style.backgroundPosition = -(600 / this.count) * i + "px " + -(600 / this.count) * j + "px";
                    div.style.width = 600 / this.count + "px";
                    div.style.height = 600 / this.count + "px";
                    div.style.left = (600 / this.count) * i + "px";
                    div.style.top = (600 / this.count) * j + "px";
                    this.puzzlePositions.push([(600 / this.count) * i, (600 / this.count) * j])
                    div.dataset.number = j * this.count + i;
                    div.addEventListener("click", (e) => {
                        if (this.endGame == false) {
                            let x, y;
                            for(let k = 0; k<this.puzzleTable.length; k++){
                                if(this.puzzleTable[k].indexOf(e.target) != -1){
                                    x = this.puzzlePositions[(k * this.count) + this.puzzleTable[k].indexOf(e.target)][0] / (600/this.count);
                                    y = this.puzzlePositions[(k * this.count) + this.puzzleTable[k].indexOf(e.target)][1] / (600/this.count);
                                }
                            }
                            this.MovePuzzle(e.target, x, y);
                        }
                    })
                    arena.appendChild(div);
                    this.puzzleTable[i].push(div);
                    this.puzzleNumbers.push(i * this.count + j);
                } else {
                    this.blankElement = { x: j, y: i }
                    this.puzzleTable[i].push(null);
                    this.puzzleNumbers.push(null);
                    this.puzzlePositions.push([(600 / this.count) * i, (600 / this.count) * j]);
                }
            }
        }
        this.Draw();
    }

    MovePuzzle(element, x, y) {
        if (Math.abs((this.blankElement.x - x)) + Math.abs((this.blankElement.y - y)) == 1) {
            let directX = 0;
            let directY = 0;
            if (this.blankElement.x != x) {
                directX = Math.sign(this.blankElement.x - x);
                directY = 0;
            } else {
                directX = 0;
                directY = Math.sign(this.blankElement.y - y);
            }
            let speed = 10;
            let road = 600 / this.count;
            let time = 100;
            let count = time / speed;
            let indexSlide = 0;
            let win = true;
            let startPos;
            for(let k = 0; k<this.puzzleTable.length; k++){
                if(this.puzzleTable[k].indexOf(element) != -1){
                    startPos = this.puzzlePositions[(k * this.count) + this.puzzleTable[k].indexOf(element)]
                }
            }
            let slide = setInterval(() => {
                element.style.left = element.offsetLeft + (road / count) * directX + "px";
                element.style.top = element.offsetTop + (road / count) * directY + "px";
                indexSlide++;
                if (indexSlide == count) {
                    clearInterval(slide);
                    this.puzzleTable[this.blankElement.x][this.blankElement.y] = element;
                    this.puzzleTable[x][y] = null;
                    this.puzzleNumbers[this.blankElement.x * this.count + this.blankElement.y] = this.puzzleNumbers[x * this.count + y]
                    this.puzzleNumbers[x * this.count + y] = null
                    this.blankElement.x = x;
                    this.blankElement.y = y;
                    element.style.left = startPos[0] + road * directX + "px"
                    element.style.top = startPos[1] + road * directY + "px"
                    for (let i = 0; i < this.puzzleNumbers.length - 1; i++) {
                        if (this.puzzleNumbers[i] != i) {
                            win = false
                        }
                    }
                    if (win == true) {
                        setTimeout(() => {
                            let div = document.createElement("div");
                            div.classList.add("puzzle")
                            div.style.backgroundImage = "url('./img/image" + currentImgIndex + ".png')";
                            div.style.backgroundPosition = -(600 / this.count) * this.blankElement.x + "px " + -(600 / this.count) * this.blankElement.y + "px";
                            div.style.width = 600 / this.count + "px";
                            div.style.height = 600 / this.count + "px";
                            div.style.left = (600 / this.count) * this.blankElement.x + "px";
                            div.style.top = (600 / this.count) * this.blankElement.y + "px";
                            this.puzzleTable[this.blankElement.x][this.blankElement.y] = div
                            arena.appendChild(div);
                            for (let i = 0; i < this.puzzleTable.length; i++) {
                                for (let j = 0; j < this.puzzleTable[i].length; j++) {
                                    this.puzzleTable[i][j].style.cursor = "default"
                                    this.puzzleTable[i][j].classList.remove("puzzleAfter");
                                    this.puzzleTable[i][j].style.border = "none";
                                }
                            }
                            this.endGame = true;
                            setTimeout(() => {
                                this.timerObj.StopTimer(this.count);
                            }, 10)
                        }, 10)
                    }
                }
            }, speed);
            countMoves.innerHTML = (parseInt(countMoves.innerHTML) + 1).toString();
        }
    }

    Draw() {
        let drawCount = this.count * this.count * 10
        let drawIndex = 0
        let actionToSelected = "";
        this.timerObj.NewTimer();
        this.drawMachine = setInterval(() => {
            if (drawIndex == drawCount) {
                clearInterval(this.drawMachine);
                this.timerObj.StartTimer();
                shuffling = false;
            } else {
                let targets = []
                targets.push({ x: this.blankElement.x - 1, y: this.blankElement.y, action: "x-" })
                targets.push({ x: this.blankElement.x + 1, y: this.blankElement.y, action: "x+" })
                targets.push({ x: this.blankElement.x, y: this.blankElement.y - 1, action: "y-" })
                targets.push({ x: this.blankElement.x, y: this.blankElement.y + 1, action: "y+" })
                for (let i = targets.length - 1; i >= 0; i--) {
                    if (targets[i].x < 0 || targets[i].x > this.count - 1 || targets[i].y < 0 || targets[i].y > this.count - 1 || targets[i].action == actionToSelected) {
                        targets.splice(i, 1)
                    }
                }
                let puzzleIndex = Math.floor(Math.random() * targets.length);
                let puzzleCoordinates = targets[puzzleIndex]
                let targetPuzzle = this.puzzleTable[puzzleCoordinates.x][puzzleCoordinates.y]
                if (targets[puzzleIndex].action[1] == "+") {
                    actionToSelected = targets[puzzleIndex].action[0] + "-"
                } else {
                    actionToSelected = targets[puzzleIndex].action[0] + "+"
                }
                targetPuzzle.style.left = this.blankElement.x * (600 / this.count) + "px";
                targetPuzzle.style.top = this.blankElement.y * (600 / this.count) + "px";
                this.puzzleTable[this.blankElement.x][this.blankElement.y] = targetPuzzle;
                this.puzzleTable[puzzleCoordinates.x][puzzleCoordinates.y] = null;
                this.puzzleNumbers[this.blankElement.x * this.count + this.blankElement.y] = this.puzzleNumbers[puzzleCoordinates.x * this.count + puzzleCoordinates.y]
                this.puzzleNumbers[puzzleCoordinates.x * this.count + puzzleCoordinates.y] = null
                this.blankElement.x = puzzleCoordinates.x;
                this.blankElement.y = puzzleCoordinates.y;
                drawIndex++
            }
        }, 15);
    }

    ShowNumbers() {
        if (this.endGame == false) {
            if (this.numbersVis == false) {
                this.numbersVis = true;
            } else {
                this.numbersVis = false;
            }
            for (let i = 0; i < currentSize; i++) {
                for (let j = 0; j < currentSize; j++) {
                    if (this.puzzleTable[i][j] != null) {
                        if (this.numbersVis == true) {
                            this.puzzleTable[i][j].classList.add("puzzleAfter")
                        } else {
                            this.puzzleTable[i][j].classList.remove("puzzleAfter");
                        }
                    }
                }
            }
        }
    }
}


class Timer {
    constructor() {
        this.timerInterval;
        this.numbersTable = [];
        this.displaysNumbers = [];
        this.numTable = []
    }

    NewTimer() {
        clearInterval(this.timerInterval);
        timerDiv.innerHTML = "";
        this.numbersTable = [];
        this.displaysNumbers = [];
        for (let i = 0; i < 10; i++) {
            let img = document.createElement("img");
            img.src = "./img/numbers/" + i + ".png";
            this.numbersTable.push(img);
        }
        for (let i = 0; i < 9; i++) {
            let img = document.createElement("img");
            img.src = this.numbersTable[0].src
            timerDiv.appendChild(img)
            this.displaysNumbers.push(img)
            if (i == 1 || i == 3) {
                let img = document.createElement("img");
                img.src = "./img/numbers/colon.png";
                timerDiv.appendChild(img)
                this.displaysNumbers.push(img)
            } else if (i == 5) {
                let img = document.createElement("img");
                img.src = "./img/numbers/dot.png";
                timerDiv.appendChild(img)
                this.displaysNumbers.push(img)
            }
        }
    }

    StartTimer() {
        clearInterval(this.timerInterval);
        let start = Date.now();
        this.timerInterval = setInterval(() => {
            let now = Date.now()
            let difference = now - start
            let hours = Math.floor(difference / (1000 * 60 * 60)) % 24
            let minutes = Math.floor(difference / (1000 * 60)) % 60
            let seconds = Math.floor(difference / 1000) % 60
            let miliseconds = difference % 1000
            this.numTable = [
                Math.floor(hours / 10),
                Math.floor(hours % 10),
                "colon",
                Math.floor(minutes / 10),
                Math.floor(minutes % 10),
                "colon",
                Math.floor(seconds / 10),
                Math.floor(seconds % 10),
                "dot",
                Math.floor(miliseconds / 100),
                Math.floor((miliseconds % 100) / 10),
                Math.floor((miliseconds % 100) % 10)
            ]
            for (let i = 0; i < this.displaysNumbers.length; i++) {
                if (this.numTable[i] != "colon" && this.numTable[i] != "dot") {
                    this.displaysNumbers[i].src = this.numbersTable[this.numTable[i]].src
                }
            }
        }, 1000 / 60)
    }

    StopTimer() {
        clearInterval(this.timerInterval)
        let scoreTime = ""
        for (let i = 0; i < this.numTable.length; i++) {
            if (this.numTable[i] == "colon") {
                scoreTime += ":"
            } else if (this.numTable[i] == "dot") {
                scoreTime += "."
            } else {
                scoreTime += this.numTable[i]
            }
        }
        CustomAlerts.winAlert(scoreTime)
    }
}


class Slider {
    static MoveImg(slideDirect) {
        let i = 0
        let count = 90;
        let time = 500;
        let speed = time / count;
        let road = 180 / count;
        let move = slideDirect * road
        let startPos = (imgIndex * -180) + (180 * slideDirect)
        let imgDiv = document.getElementById("images")
        let imgSliding = setInterval(() => {
            if (i == count) {
                clearInterval(imgSliding)
                if (imgIndex == 0) {
                    imgDiv.style.left = (-180 * imgCount) + "px"
                    imgIndex = imgCount
                } else if (imgIndex == imgCount + 1) {
                    imgDiv.style.left = "-180px"
                    imgIndex = 1
                }
                imgSlideBool = false;
            } else {
                startPos = startPos - move
                imgDiv.style.left = startPos + "px"
                i++;
            }
        }, speed)
    }
}


class CustomAlerts {
    static winAlert(scoreTime) {
        let blackScreen = document.createElement("div");
        blackScreen.classList.add("blackScreen");

        let mainAlertDiv = document.createElement("div");
        mainAlertDiv.classList.add("mainAlertDiv", "winAlert");

        let infoDiv = document.createElement("div");
        infoDiv.classList.add("infoDiv");
        infoDiv.innerHTML = "Congratulations!<br>You win in " + scoreTime;
        mainAlertDiv.appendChild(infoDiv);

        let inputName = document.createElement("input");
        inputName.type = "text";
        inputName.id = "inputName";
        inputName.placeholder = "Your name"
        inputName.maxLength = "20";
        inputName.autocomplete = "off";
        mainAlertDiv.appendChild(inputName);

        let submitBtn = document.createElement("button");
        submitBtn.id = "submitBtn";
        submitBtn.innerHTML = "Submit!";
        submitBtn.addEventListener("click", () => {
            if (inputName.value.length != 0) {
                nickname = inputName.value;
                document.body.removeChild(blackScreen);
                document.body.removeChild(mainAlertDiv);
                cookieInstance.CheckAddTimeToCookie(nickname, scoreTime, parseInt(countMoves.innerHTML), currentSize);
            }
        })
        mainAlertDiv.appendChild(submitBtn);
        document.body.appendChild(mainAlertDiv);
        document.body.appendChild(blackScreen);
    }

    static ShowRanking() {
        let currentImgCookie = null;
        let cookieList = cookieInstance.GetCookiesList();
        for (let i = 0; i < cookieList.length; i++) {
            if (imgIndex == cookieList[i].name) {
                currentImgCookie = cookieList[i]
                break;
            }
        }

        let blackScreen = document.createElement("div");
        blackScreen.classList.add("blackScreen");

        let mainAlertDiv = document.createElement("div");
        mainAlertDiv.classList.add("mainAlertDiv", "rankingAlert");

        let infoDivRanking = document.createElement("div");
        infoDivRanking.id = "infoDivRanking";

        let titleRanking = document.createElement("div")
        titleRanking.id = "titleRanking";
        titleRanking.innerHTML = "Ranking TOP 10"
        infoDivRanking.appendChild(titleRanking)

        let infoImgRanking = document.createElement("div");
        infoImgRanking.id = "infoImgRanking";
        let titles = ["Doreamon", "Bill Gates", "Arijit Singh", "Minions","Cute Ghosts","Dora","IIT kharagpur"] 

        let imgRanking = document.createElement("img")
        imgRanking.id = "imgRanking";
        imgRanking.src = "./img/image" + imgIndex + ".jpg";
        infoImgRanking.appendChild(imgRanking);

        infoImgRanking.innerHTML += "<br>" + titles[imgIndex - 1]
        infoDivRanking.appendChild(infoImgRanking)

        let modeButtonsDiv = document.createElement("div");
        modeButtonsDiv.id = "modeButtonsDiv";

        let btnList = [3, 4, 5, 6]
        for (let i = 0; i < btnList.length; i++) {
            let button = document.createElement("button");
            button.classList.add("btn", "white");
            button.innerHTML = btnList[i].toString() + "x" + btnList[i].toString()
            button.addEventListener("click", () => {
                let mode = "m" + btnList[i].toString()
                rankingTable.innerHTML = ""
                for (let i = 0; i < 10; i++) {
                    if (i == 0) {
                        rankingTable.innerHTML = "<tr><th>Pos.</th><th>Name</th><th>Moves</th><th>Time</th></tr>"
                    }
                    let name = "--------------------";
                    let moves = "_____"
                    let time = "__:__:__.___";
                    if (currentImgCookie != null) {
                        if (currentImgCookie.value[mode] != undefined) {
                            if (i < currentImgCookie.value[mode].length) {
                                name = currentImgCookie.value[mode][i][0];
                                time = currentImgCookie.value[mode][i][1];
                                moves = currentImgCookie.value[mode][i][2];
                            }
                        }
                    }
                    rankingTable.innerHTML += "<tr><td>" + (i + 1) + ".</td>\
                    <td>"+ name + "</td>\
                    <td>"+ moves + "</td>\
                    <td>"+ time + "</td></tr>"
                }
            })
            modeButtonsDiv.appendChild(button)
        }
        infoDivRanking.appendChild(modeButtonsDiv);
        mainAlertDiv.appendChild(infoDivRanking);

        let rankingTable = document.createElement("table")
        rankingTable.id = "rankingTable";
        mainAlertDiv.appendChild(rankingTable)

        let closeAlertBtn = document.createElement("div")
        closeAlertBtn.classList.add("closeAlertBtn");
        closeAlertBtn.innerHTML = "&#10006;";
        closeAlertBtn.addEventListener("click", () => {
            document.body.removeChild(blackScreen)
            document.body.removeChild(mainAlertDiv)
        })
        mainAlertDiv.appendChild(closeAlertBtn);

        document.body.appendChild(mainAlertDiv);
        document.body.appendChild(blackScreen);
    }
}

class Cookies {
    constructor() {
        this.imagesCookieList = []
    }
    SetCookie(name, value) {
        this.imagesCookieList.push({
            name: parseInt(name[name.length - 1]),
            value: JSON.parse(decodeURIComponent(value))
        })
    }

    ReadCookie() {
        this.imagesCookieList = [];
        let cookies = document.cookie
        cookies = cookies.split("; ");
        for (let i = 0; i < cookies.length; i++) {
            cookies[i] = cookies[i].split("=")
            if (cookies[i][0].includes("image")) {
                cookieInstance.SetCookie(cookies[i][0], cookies[i][1])
            }
        }
    }

    CheckAddTimeToCookie(name, time, moves, size) {
        let stringMode = "m" + size
        let added = false
        for (let i = 0; i < this.imagesCookieList.length; i++) {
            if (currentImgIndex == this.imagesCookieList[i].name) {
                added = true
                if (this.imagesCookieList[i].value[stringMode] != undefined) {
                    let canAdd = false;
                    let index = 0
                    if (this.imagesCookieList[i].value[stringMode].length < 10) {
                        var before10 = true
                        canAdd = true
                        index = this.imagesCookieList[i].value[stringMode].length
                    } else {
                        var before10 = false
                    }
                    for (let j = 0; j < this.imagesCookieList[i].value[stringMode].length; j++) {
                        if (time <= this.imagesCookieList[i].value[stringMode][j][1]) {
                            canAdd = true;
                            if(time == this.imagesCookieList[i].value[stringMode][j][1]){
                                for(let k = j; k < this.imagesCookieList[i].value[stringMode].length; k++){
                                    if(parseInt(moves) < parseInt(this.imagesCookieList[i].value[stringMode][k][2])){
                                        index = k
                                        break;
                                    } else {
                                        index = k+1
                                        if(index > 9){
                                            canAdd = false;
                                            break;
                                        } else if(index > this.imagesCookieList[i].value[stringMode].length - 1){
                                            break
                                        }
                                        if(this.imagesCookieList[i].value[stringMode][index][1] != time){
                                            break;
                                        }
                                    }
                                }
                            } else {
                                index = j
                            }
                            break;
                        }
                    }
                    if (canAdd == true) {
                        if (before10) {
                            this.imagesCookieList[i].value[stringMode].push([0, 0])
                        }
                        for (let j = this.imagesCookieList[i].value[stringMode].length - 1; j >= index; j--) {
                            if (j != index) {
                                this.imagesCookieList[i].value[stringMode][j][0] = this.imagesCookieList[i].value[stringMode][j - 1][0]
                                this.imagesCookieList[i].value[stringMode][j][1] = this.imagesCookieList[i].value[stringMode][j - 1][1]
                                this.imagesCookieList[i].value[stringMode][j][2] = this.imagesCookieList[i].value[stringMode][j - 1][2]
                            } else {
                                this.imagesCookieList[i].value[stringMode][j][0] = name
                                this.imagesCookieList[i].value[stringMode][j][1] = time
                                this.imagesCookieList[i].value[stringMode][j][2] = moves
                            }
                        }
                    }
                } else {
                    this.imagesCookieList[i].value[stringMode] = [[name, time, moves]]
                }
            }
        }
        if (added == false) {
            let val = JSON.stringify({ [stringMode]: [[name, time, moves]] })
            this.SetCookie("image" + imgIndex, val)
        }
        this.RenewCookie();
    }

    RenewCookie() {
        let date = new Date();
        date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * 365)
        for (let i = 0; i < this.imagesCookieList.length; i++) {
            let val = encodeURIComponent(JSON.stringify(this.imagesCookieList[i].value))
            document.cookie = "image" + this.imagesCookieList[i].name + "=" + val + "; expires=" + date.toUTCString();
        }
    }

    GetCookiesList() {
        return this.imagesCookieList;
    }
}