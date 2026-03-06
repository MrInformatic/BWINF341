//Der Renderer zeichnet die GUI(Graphical user interface)
function Renderer(worldsizex,worldsizey,ctx){
    //Erstellt einen WorldRenderer, der die Welt von Kassiopeia zeichnet mit der übergebenen Weltgröße (20x10 Felder) 
    this.worldrenderer = new WorldRenderer(worldsizex,worldsizey);
    //Bilder der Werkzeuge
    this.Open = new Image();
    this.Scan = new Image();
    this.PathFinding = new Image();
    this.Grass = new Image();
    this.Kassiopeia = new Image();
    this.Wall = new Image();
    //Das jeweils aktive Werkzeug
    this.selectedtool = 0;
    //Der 2D-Context des Canvas
    this.ctx = ctx;
    
    //Initialisierung
    //Lädt die Bilder der Werkzeuge
    this.Open.src = "./Assets/Tools/Open.png";
    this.Scan.src = "./Assets/Tools/Scan.png";
    this.PathFinding.src = "./Assets/Tools/PathFinding.png";
    this.Grass.src = "./Assets/Tools/Grass.png";
    this.Kassiopeia.src = "./Assets/Tools/Kassiopeia.png";
    this.Wall.src = "./Assets/Tools/Wall.png";
    
    //Zeichnet die Werkzeugleiste
    this.render = function(){
        //Zeichnet den Werkzeugleistenhintergrund
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.beginPath();
        for(var i=0;i<10;i++){
            this.ctx.moveTo(i*100,0);
            this.ctx.lineTo(i*100,100);
            this.ctx.lineTo(i*100+100,100);
            this.ctx.lineTo(i*100+100,0);
            this.ctx.lineTo(i*100,0);
        }
        this.ctx.closePath();
        this.ctx.fill();
        //Zeichnet das Kästchen des gerade aktiven Werkzeugs blau
        this.ctx.fillStyle = '#0080FF';
        this.ctx.beginPath();
        this.ctx.moveTo(0+this.selectedtool*100,0);
        this.ctx.lineTo(100+this.selectedtool*100,0);
        this.ctx.lineTo(100+this.selectedtool*100,100);
        this.ctx.lineTo(0+this.selectedtool*100,100);
        this.ctx.closePath();
        this.ctx.fill();
        //Zeichnet einen Rahmen um jedes Werkzeug
        this.ctx.strokeStyle = '#000000';
        this.ctx.beginPath();
        for(var i=0;i<10;i++){
            this.ctx.moveTo(i*100,0);
            this.ctx.lineTo(i*100,100);
            this.ctx.lineTo(i*100+100,100);
            this.ctx.lineTo(i*100+100,0);
            this.ctx.lineTo(i*100,0);
        }
        this.ctx.closePath();
        this.ctx.stroke();
        //Zeichnet die einzelnen Werkzeuge
        this.ctx.drawImage(this.Grass,25,25); 
        this.ctx.drawImage(this.Wall,125,25); 
        this.ctx.drawImage(this.Kassiopeia,225,25); 
        this.ctx.drawImage(this.Open,325,25); 
        this.ctx.drawImage(this.Scan,425,25); 
        this.ctx.drawImage(this.PathFinding,525,25);
        //Zeichnet die Welt
        this.worldrenderer.render(ctx);
    }
    
    //Verarbeitet Mouse-Events
    this.mouse = function(x,y) {
        //Wird genutzt, um zu identifizieren, ob eine Alert(Meldung) Dialog geöffnet wurde
        var hasalert = false;
        //Verarbeite nur Mouse-Events, wenn die Welt sich gerade blockiert hat 
        if(!this.worldrenderer.world.blocked){
            //Nur wenn die Maus innerhalb der Werkzeugleiste ist
            if(y<100){
                //Berechnet das neu makierte Werkzeug
                var newselectedtool = Math.floor(x/100);
                //Schaut nach, ob es nötig ist, die Werkzeugleiste zu aktualisieren
                if(this.selectedtool != newselectedtool){
                    //Bringt die Welt in einen bearbeitbaren Zustand
                    if(this.selectedtool==4){
                        this.worldrenderer.world.scanreset();
                    }
                    if(this.selectedtool==5){
                        this.worldrenderer.world.findreset();
                    }
                    //Aktualisiert die Werkzeugleiste
                    this.selectedtool = newselectedtool;
                    //Zeichnet die aktualisierte Werkzeugleiste
                    this.render();
                    //Führt Funktionen der neu markierten Werkzeuge aus
                    switch(this.selectedtool){
                        case 3:
                            //Scrollt in den Bereich zum Öffnen von Leveln
                            document.getElementById("open").scrollIntoView();
                            break;
                        case 4:
                            //Junioraufgabe 2
                            this.worldrenderer.world.scan(this,true);
                            hasalert = true;
                            break;
                        case 5:
                            //Aufagbe 1
                            this.worldrenderer.world.find(this,true);
                            hasalert = true;
                            break;
                    }
                }
            }
        }
        //Verarbeitet Mouse-Events im WorldRenderer
        this.worldrenderer.mouse(x,y,this.selectedtool);
        //Gibt zurück, ob Alert-Fenster geöffnet wurden
        return hasalert;
    }
    
    //Setzt den Canvas-2D-Context
    this.setctx = function(ctx){
        this.ctx = ctx;
        this.worldrenderer.setctx(ctx);
    }
}


