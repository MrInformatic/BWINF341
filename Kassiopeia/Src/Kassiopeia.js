//Hier passiert die Magie
//Erstelle einen Renderer(Zeichner), der das Gui(Graphical user interface) und die 
//Welt von Kassiopeia zeichnet, mit der Weltgröße von 20x10 Feldern(tiles)
var renderer = new Renderer(20,10,null);
//Ist wahr, wenn die Maus gedrückt ist
var mouseIsDown = false;
//Der Canvas-2D-Context
var ctx;

//Wird aufgerufen wenn das Dokument geladen ist.
function onload(){
    //Holt das Canvas-Element und lässt sich den 2D-Context geben
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    //Übergibt den Renderer den 2D-Context des Canvas-Elementes
    renderer.setctx(ctx);
    //Wird aufgerufen, wenn die Maus losgelassen wird
    document.body.addEventListener('mouseup', function(evt) {
        //Sagt, dass die Maus losgelassen wird 
        mouseIsDown = false;
    }, false);
    //Wird aufgerufen, wenn die Maus auf dem Canvas-Element gedrückt wird
    canvas.addEventListener('mousedown', function(evt) {
        //Sagt, dass die Maus gedrückt wird
        mouseIsDown = true;
        //Verarbeitet das Maus-Event
        mouse(evt);
    }, false);
    //Wird aufgerufen, wenn die Maus über das Canvas-Element bewegt wird
    canvas.addEventListener('mousemove', function(evt) {
        //Immer wenn die Maus auf dem Canvas-Element gedrückt ist und über das Canvas-Element bewegt
        //wird, soll das Mouse-Event verarbeitet werden.
        if(!mouseIsDown) return;
        mouse(evt);
    }, false);
    //Registriert einen Listener, der beim Öffnen einer Datei die Funktion open() aufruft
    document.getElementById("file").addEventListener("change",open, false);
    //Wartet bis alle Bilder geladen sind und Zeichnet(Rendert) die GUI
    //und die Welt in das Canvas-Element
    setTimeout(function(){
        renderer.render(ctx);
    },500);
}

//Verarbeitet die Mouse-Events
function mouse(evt) {
    //Fragt die Größe und Position des Canvas-Elements ab
    var rect = canvas.getBoundingClientRect();
    //Zieht die Position des Canvas-Elements von der Position des Mauszeigers ab,
    //um die tatsächliche Position der Maus auf dem Canvas-Elements zu beckommen
    var mousex = evt.clientX - rect.left;
    var mousey = evt.clientY - rect.top;
    //Wenn der Renderer beim Verarbeiten der Mausposition true zurückgibt z.B. wenn
    //ein Alert(Meldung) Fenster geöffnet wurde, wird die Maus automatisch losgelassen, weil
    //es sonst zu bugs kommt
    if(renderer.mouse(mousex,mousey)){
        mouseIsDown = false;
    }
}

//Öffnet ein Level
function open(evt){
    //Lässt sich den ausgesuchten Datei(File) geben
    var file = evt.target.files[0];
    //Erstellt ein FileReader zum Lesen der Datei
    var reader = new FileReader();
    //Wenn die Level-Datei geladen wird
    reader.onload = function(res) { 
        //Resettet die Welt, da es sonst beim Öffnen zu unschönen Überlagerugen 
        //der vorherigen Welt kommt
        renderer.worldrenderer.world.reset();
        //Macht aus einem String mehrere Strings, indem er den String an Zeilenumbrüchen 
        //zerschneidet
        var lines = [];
        var line = "";
        //Markiert Zeilenumbrüche
        var breaks = reader.result.replace(/(?:\r\n|\r|\n)/g,"/");
        //Geht alle Zeichen des Strings durch
        for(var i=0;i<breaks.length;i++){
            //Wenn das aktuelle Zeichen kein Zeilenumbruch ist, merke dir das Zeichen
            if(breaks[i]!="/"){
                line += breaks[i];
            }
            //Wenn das aktuelle Zeichen ein Zeilenumbruch ist, merke dir die gemerkten Zeichen
            //in einem neuen String als neue Zeile
            else{
                lines.push(new String(line));
                line = "";
            }
        }
        //Geht alle Zeilen Durch
        for(var x=1;x<lines.length;x++){
            //Gehe alle Zeichen der Zeile durch
            for(var y=0;y<lines[x].length;y++){
                //Wenn das aktuelle Zeichen ein "#" Zeichen ist, setze das zu dem Zeichen
                //passende Feld als ein Wandfeld
                if(lines[x][y] == "#"){
                    renderer.worldrenderer.world.tiles[y][x-1].type = 0;      
                }
                //Wenn das aktuelle Zeichen ein Leerzeichen ist, setze das zu dem Zeichen
                //passende Feld als ein Grasfeld
                if(lines[x][y] == " "){
                    renderer.worldrenderer.world.tiles[y][x-1].type = 1;
                }
                //Wenn das aktuelle Zeichen ein "K" ist, setze das zu dem Zeichen
                //passende Feld als ein Grasfeld und setze auf dieses Feld Kassiopeia.
                if(lines[x][y] == "K"){
                    renderer.worldrenderer.world.tiles[y][x-1].type = 1;
                    renderer.worldrenderer.world.Kassiopeiax = y;
                    renderer.worldrenderer.world.Kassiopeiay = x-1;
                }
            }
        }
        //Aktualisiere das Canvas-Element, indem du das GUI und die Welt neu zeichnest
        renderer.render();
    };
    //Öffnet die Datei
    reader.readAsText(file);
}

//Wird aufgerufen wenn Eingaben im Textfeld bestätigt wurden
function Submit(){
    //Liest das Textfeld aus
    var result = new String(document.getElementById("Text").value);
    //Resettet die Welt, da es sonst beim Öffnen zu unschönen Überlagerugen 
    //der vorherigen Welt kommt
    renderer.worldrenderer.world.reset();
    //Macht aus einem String mehrere Strings, indem er den String an Zeilenumbrüchen 
    //zerschneidet
    var lines = [];
    var line = "";
    //Markiert Zeilenumbrüche
    var breaks = result.replace(/(?:\r\n|\r|\n)/g,"/");
    //Geht alle Zeichen des Strings durch
    for(var i=0;i<breaks.length;i++){
        //Wenn das aktuelle Zeichen kein Zeilenumbruch ist, merke dir das Zeichen
        if(breaks[i]!="/"){
            line += breaks[i];
        }
        //Wenn das aktuelle Zeichen ein Zeilenumbruch ist, merke dir die gemerkten Zeichen
        //in einem neuen String als neue Zeile
        else{
            lines.push(new String(line));
            line = "";
        }
    }
    //Geht alle Zeilen durch
    for(var x=1;x<lines.length;x++){
        //Gehe alle Zeichen der Zeile durch
        for(var y=0;y<lines[x].length;y++){
            //Wenn das aktuelle Zeichen ein "#" Zeichen ist, setze das zu dem Zeichen
            //passende Feld als ein Wandfeld
            if(lines[x][y] == "#"){
                renderer.worldrenderer.world.tiles[y][x-1].type = 0;      
            }
            //Wenn das aktuelle Zeichen ein Leerzeichen ist, setze das zu dem Zeichen
            //passende Feld als ein Grasfeld
            if(lines[x][y] == " "){
                renderer.worldrenderer.world.tiles[y][x-1].type = 1;
            }
            //Wenn das aktuelle Zeichen ein "K" ist, setze das zu dem Zeichen
            //passende Feld als ein Grasfeld und setze auf dieses Feld Kassiopeia.
            if(lines[x][y] == "K"){
                renderer.worldrenderer.world.tiles[y][x-1].type = 1;
                renderer.worldrenderer.world.Kassiopeiax = y;
                renderer.worldrenderer.world.Kassiopeiay = x-1;
            }
        }
    }
    //Aktualisiere das Canvas-Element, indem du das GUI und die Welt neu zeichnest
    renderer.render();
}







