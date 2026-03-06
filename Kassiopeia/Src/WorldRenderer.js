//Der WorldRenderer zeichnet die Welt von Kassiopeia
function WorldRenderer(worldsizex,worldsizey,ctx){
    //Die Welt
    this.world = new World(worldsizex,worldsizey,ctx);
    //Bild von Kassiopeia
    this.Kassiopeia = new Image();
    //Bilder der Felder
    this.Grass = new Image();
    this.Wall = new Image();
    this.PathFinding = new Image();
    this.Scan = new Image();
    //Der Canvas-2D-Context
    this.ctx = ctx;
    
    //Initialisierung
    //Lädt Bilder
    this.Grass.src = "./Assets/Tile/Grass.png";
    this.Wall.src = "./Assets/Tile/Wall.png";
    this.Kassiopeia.src = "./Assets/Tile/Kassiopeia.png";
    this.PathFinding.src = "./Assets/Tile/PathFinding.png";
    this.Scan.src = "./Assets/Tile/Scan.png";
    
    //Zeichnet die Welt
    this.render = function(){
        //Geht alle Felder(tiles) der Welt durch
        for(var x=0;x<this.world.sizex;x++){
            for(var y=0;y<this.world.sizey;y++){
                //Zeichnet das aktuelle Feld
                switch(this.world.tiles[x][y].type){
                    case 0:
                        this.ctx.drawImage(this.Wall,50*x,50*y+100); 
                        break;
                    case 1:
                        this.ctx.drawImage(this.Grass,50*x,50*y+100); 
                        break;
                    case 2:
                        this.ctx.drawImage(this.Scan,50*x,50*y+100); 
                        break;
                    case 3:
                        this.ctx.drawImage(this.PathFinding,50*x,50*y+100);
                        break;
                }
            }
        }
        //Zeichnet Kassiopeia
        this.ctx.drawImage(this.Kassiopeia,this.world.Kassiopeiax*50,this.world.Kassiopeiay*50+100);
    }
    
    //Verarbeitet Mouse-Events
    this.mouse = function(x,y,mode) {
        //Nur wenn die Maus innerhalb der Welt ist
        if(y>100){
            //Berechnet das markierte Feld
            var tilex = Math.floor(x/50);
            var tiley = Math.floor((y-100)/50);
            //Nur wenn man im Zeichen Modus ist 
            if(mode==0||mode==1){
                if(this.world.tiles[tilex][tiley].type != 1-mode){
                   //Setzt das markierte Feld auf Wand oder Gras
                   this.world.tiles[tilex][tiley].type = 1-mode;
                   //Zeichnet die Aktualisierung
                   this.render();
                }
            }
            //Nur im Kassiopeiapositionierungsmodus
            if(mode==2){
                //Nur wenn das markierte Feld ein Grasfeld ist
                if(this.world.tiles[tilex][tiley].type==1){
                    //Schaut nach, ob es nötig ist, Kassiopeias Position zu aktualisieren
                    if(this.world.Kassiopeiax!=tilex||this.world.Kassiopeiay!=tiley){
                        //Aktualisiert Kassiopeias Position
                        this.world.Kassiopeiax = tilex;
                        this.world.Kassiopeiay = tiley;
                        //Zeichnet die Aktualisierung
                        this.render();
                    }
                }
            }
        }
    }
    
    //Setzt den Canvas-2D-Context
    this.setctx = function(ctx){
        this.ctx = ctx;
    }
}


