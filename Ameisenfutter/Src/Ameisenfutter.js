//Die Welt, in der die Ameisen simuliert werden, ist 500x500 Einheiten groß, hat 100 Ameisen,
//hat 5 Futterqellen mit jeweils 50 Futterportionen und einer Verdunstungsdauer von
//2500 Simulationsschritten für das Pheromon
world = new World(500,500,100,5,50,2500,null,2);

//Wird aufgerufen, wenn das Dokument geladen ist
function onload(){
    //Setzt den Canvas-2D-Context des Canvas-Element
    world.ctx = document.getElementById("canvas").getContext("2d");
    //Setzt die Aktualisierungsgeschwindigkeit und startet die Simulation
    world.setupdatespeed(2);
}

//Setzt die Aktualisierungsgeschwindigkeit
function setspeed(value){
    world.setupdatespeed(value);
}

//Wendet neue Einstellungen für die Simulationswelt an
function update(event){
    //Holt die neuen Einstellungen für die Simulationswelt
    var form = event.target;
    var sizex = form.elements["sizex"].value;
    var sizey = form.elements["sizey"].value;
    var a_count = form.elements["a_count"].value;
    var f_count = form.elements["f_count"].value;
    var f_amount = form.elements["f_amount"].value;
    var p_duration = form.elements["p_duration"].value;
    var updatespeed = world.updatespeed;
    //Holt das Canvas-Element
    var canvas = document.getElementById("canvas");
    //Passt die Größe auf die Größe der Simulationswelt an
    canvas.width = sizex*2;
    canvas.height = sizey*2;
    //Stoppt die Simulation
    world.clear();
    //Entfernt die alte Simulationswelt
    delete world;
    //Erstellt eine neue Simulationswelt mit den neuen Einstellungen
    world = new World(sizex,sizey,a_count,f_count,f_amount,p_duration,canvas.getContext("2d"),2);
    //Setzt die Aktualisierungsgeschwindigkeit und startet die Simulation
    world.setupdatespeed(updatespeed);
    return false;
}

//Räumt auf
function onunload(){
    //Stoppt die Simulation
    world.clear();
    //Entfernt die Simulationswelt
    delete world;
}

