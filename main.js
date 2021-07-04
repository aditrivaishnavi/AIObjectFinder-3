status = "";
objects = [];

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}
function draw() {
    image(video, 0, 0, 480, 380);

    if(status != "") {
        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
    
    if(objects[i].label == input_box) {
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("object_found_or_not_found").innerHTML = "Object Mentioned Found";
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance("Object Mentioned Found");
        synth.speak(utterThis);
    }
    else {
        document.getElementById("object_found_or_not_found").innerHTML = "Object Mentioned Not Found";
    }
   }
  }
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";

    input_box = document.getElementById("navigationTextbox").value;
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}
function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}