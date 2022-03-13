nbil = "";
abcdefu = "";
left_wrist_y = 0;
right_wrist_y = 0;
left_wrist_x = 0;
right_wrist_x = 0;
left_wrist_score = 0;
right_wrist_score = 0;
songStatus = "";



function preload() {
    nbil = loadSound("nbil.mp3");
    abcdefu = loadSound("abcdefu.mp3");
}


function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenetmodel = ml5.poseNet(video, modelloaded);
    posenetmodel.on("pose", getresults);
}

function draw() {

    image(video, 0, 0, 600, 500);
    stroke("blue");
    fill("blue");
    songStatus = nbil.isPalying();

    if (left_wrist_score > 0.2) {
        circle(left_wrist_x, left_wrist_y, 25);
        abcdefu.stop();


        if (songStatus == false) {
            nbil.play();
            document.getElementById("songName").innerHTML = "never been in love is playing";
        }
    }

    songStatus = abcdefu.isPalying();

    if (right_wrist_score > 0.2) {
        circle(right_wrist_x, right_wrist_y, 25);
        nbil.stop();


        if (songStatus == true) {
            abcdefu.play();
            document.getElementById("songName").innerHTML = "abcdefu is playing";
        }
    }
}

function modelloaded() {
    console.log("model has loaded");
}

function getresults(arrayresults) {
    if (arrayresults.length > 0) {
        console.log(arrayresults);
        right_wrist_y = arrayresults[0].pose.rightWrist.y;
        left_wrist_y = arrayresults[0].pose.leftWrist.y;
        left_wrist_x = arrayresults[0].pose.leftWrist.x;
        right_wrist_x = arrayresults[0].pose.rightWrist.x;
        left_wrist_score = arrayresults[0].pose.keypoints[9].score;
        right_wrist_score = arrayresults[0].pose.keypoints[10].score;
    }
}