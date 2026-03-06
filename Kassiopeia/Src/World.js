//Die Welt von Kassiopeia
function World(sizex,sizey){
    //Die Felder der Welt
    this.tiles;
    //Die Größe der Welt 
    this.sizex = sizex;
    this.sizey = sizey;
    //Die Position von Kassiopeia
    this.Kassiopeiax = -1;
    this.Kassiopeiay = -1;
    //Gibt an, ob die Welt sich blockiert hat
    this.blocked = false;
    
    //Initialisierung
    //Erzeugt viele Wandfelder
    this.tiles = new Array(this.sizex);
    for(var x=0;x<this.sizex;x++){
        this.tiles[x] = new Array(this.sizey);
        for(var y=0;y<this.sizey;y++){
            this.tiles[x][y] = new Tile();
        }
    }   
    
    //Zählt die Anzahl der Grasfelder
    this.count = function(){
        //Zähler
        var count = 0;
        //Geht alle Felder durch
        for(var x=0;x<this.sizex;x++){
            for(var y=0;y<this.sizey;y++){
                //Erhöht den Zähler um 1, wenn das aktuelle Feld ein Grasfeld ist
                if(this.tiles[x][y].type == 1){
                    count = count+1;
                }
            }
        }
        //Gibt die Anzahl der Grasfelder zurück
        return count;
    }
    
    //Setzt die Welt auf ihren Anfangszustand zurück
    this.reset = function(){
        //Geht alle Felder durch
        for(var x=0;x<this.sizex;x++){
            for(var y=0;y<this.sizey;y++){
                //Setzt das aktuelle Feld zurück
                this.tiles[x][y].type = 0;
                this.tiles[x][y].wasthere = false;
            }
        }
    }
    
    //Bringt die Welt nach der Voxelanalyse in einen bearbeitbaren Zustand
    this.scanreset = function(){
        for(var x=0;x<this.sizex;x++){
            for(var y=0;y<this.sizey;y++){
                if(this.tiles[x][y].type == 2){
                    this.tiles[x][y].type = 1;
                }
                this.tiles[x][y].wasthere = false;
            }
        }
    }
    
    //Bringt die Welt nach dem Pathfinding in einen bearbeitbaren Zustand
    this.findreset = function(){
        for(var x=0;x<this.sizex;x++){
            for(var y=0;y<this.sizey;y++){
                if(this.tiles[x][y].type == 2){
                    this.tiles[x][y].type = 1;
                }
                if(this.tiles[x][y].type == 3){
                    this.tiles[x][y].type = 1;
                }
                this.tiles[x][y].wasthere = false;
            }
        }
    }
    
    //Junioraufgabe 2 (Voxelanalyse)
    this.scan = function(renderer,shouldalert){
        //Nur wenn Kassiopeia schon in die Welt gesetzt wurde
        if(this.Kassiopeiax != -1&&this.Kassiopeiay != -1){
            //Zählt, wie viele Grasfelder es gibt
            var count = this.count();
            //Erstellt eine Liste, in der alle für Kassiopeia erreichbaren Positionen
            //gespeichert werden
            var scanstack = [];
            //Füge die Position von Kassiopeia zur Liste hinzu
            scanstack.push(new Vector2I(this.Kassiopeiax,this.Kassiopeiay));
            //Sagt, dass Kassiopeia auf dem Feld war, auf welchem sie jetzt steht
            this.tiles[this.Kassiopeiax][this.Kassiopeiay].wasthere = true;
            //Gibt an, ob in diesem Durchlauf der Schleife etwas Produktives gemacht wurde
            var posible = false;
            //Die Schleife
            do{
                //Es wurde noch nichts Produktives gemacht
                posible = false;
                //Geht alle Positionen, die wir kennen und Kassiopeia erreichen kann, durch
                for(var i=0;i<scanstack.length;i++){
                    try{
                        //Nur wenn das Feld rechts neben dem aktuellen Feld noch nicht
                        //in der Liste ist
                        if(!this.tiles[scanstack[i].x+1][scanstack[i].y].wasthere){
                            //Nur wenn das Feld rechts neben dem aktuellen Feld ein
                            //Grasfeld ist
                            if(this.tiles[scanstack[i].x+1][scanstack[i].y].type == 1){
                                //Sage, dass das Feld rechts neben dem aktuellen Feld 
                                //in der Liste ist
                                this.tiles[scanstack[i].x+1][scanstack[i].y].wasthere = true;
                                //Füge das Feld rechts neben dem aktuellen Feld in
                                //die Liste ein
                                scanstack.push(new Vector2I(scanstack[i].x+1,scanstack[i].y));
                                //Es wurde etwas gemacht
                                posible = true;
                            }
                        }
                    }catch(e){}
                    try{
                        //Nur wenn das Feld links neben dem aktuellen Feld noch nicht
                        //in der Liste ist
                        if(!this.tiles[scanstack[i].x-1][scanstack[i].y].wasthere){
                            //Nur wenn das Feld links neben dem aktuellen Feld ein
                            //Grasfeld ist
                            if(this.tiles[scanstack[i].x-1][scanstack[i].y].type == 1){
                                //Sage, dass das Feld links neben dem aktuellen Feld 
                                //in der Liste ist
                                this.tiles[scanstack[i].x-1][scanstack[i].y].wasthere = true;
                                //Füge das Feld links neben den aktuellen Feld in
                                //die Liste ein
                                scanstack.push(new Vector2I(scanstack[i].x-1,scanstack[i].y));
                                //Es wurde etwas gemacht
                                posible = true;
                            }
                        }
                    }catch(e){}
                    try{
                        //Nur wenn das Feld unter dem aktuellen Feld noch nicht
                        //in der Liste ist
                        if(!this.tiles[scanstack[i].x][scanstack[i].y+1].wasthere){
                            //Nur wenn das Feld unter dem aktuellen Feld ein
                            //Grasfeld ist
                            if(this.tiles[scanstack[i].x][scanstack[i].y+1].type == 1){
                                //Sage, dass das Feld unter dem aktuellen Feld 
                                //in der Liste ist
                                this.tiles[scanstack[i].x][scanstack[i].y+1].wasthere = true;
                                //Füge das Feld unter dem aktuellen Feld in
                                //die Liste ein
                                scanstack.push(new Vector2I(scanstack[i].x,scanstack[i].y+1));
                                //Es wurde etwas gemacht
                                posible = true;
                            }
                        }
                    }catch(e){}
                    try{
                        //Nur wenn das Feld über dem aktuellen Feld noch nicht
                        //in der Liste ist
                        if(!this.tiles[scanstack[i].x][scanstack[i].y-1].wasthere){
                            //Nur wenn das Feld über dem aktuellen Feld ein
                            //Grasfeld ist
                            if(this.tiles[scanstack[i].x][scanstack[i].y-1].type == 1){
                                //Sage, dass das Feld über dem aktuellen Feld 
                                //in der Liste ist
                                this.tiles[scanstack[i].x][scanstack[i].y-1].wasthere = true;
                                //Füge das Feld über dem aktuellen Feld in
                                //die Liste ein
                                scanstack.push(new Vector2I(scanstack[i].x,scanstack[i].y-1));
                                //Es wurde etwas gemacht
                                posible = true;
                            }
                        }
                    }catch(e){}
                }
            //Durchlaufe die Schleife nur noch einmal, wenn etwas Produktives gemacht wurde.
            }while(posible)
            //Visualisiere diesen Vorgang
            this.visuallizescan(scanstack,renderer,this.tiles,scanstack.length>=count,shouldalert);
            //Gebe das Ergebnis zurück (wenn die Anzahl der Grasfelder, die Kassiopeia 
            //erreicht, gleich der Gesamtanzahl an Grasfeldern ist, dann erreicht
            //Kassiopeia alle Grasfelder)
            return new function(){this.result = scanstack.length>=count,this.wait = scanstack.length*100+500};
        }
        //Gibt "false" zurück, weil Kassiopeia noch nicht in die Welt gesetzt wurde
        return false;
    }
    
    //Visualisiert den Vorgang der Voxelanalyse (zur Junioraufgabe 2)
    this.visuallizescan = function(scanstack,renderer,tiles,result,shouldalert){
        //Die Welt blockiert sich, damit der Benutzer während der Visualisierung keine
        //anderen GUI(Graphical user interface) Elemente benutzen kann
        this.blocked = true;
        //Geht die Liste der von Kassiopeia ereichbaren Grasfelder durch
        for(var i=0;i<scanstack.length;i++){
            //Verfärbt das aktuelle Feld nach einiger Zeit
            setTimeout(function(tile){
                tile.type = 2;
                renderer.render();
            },100*i,tiles[scanstack[i].x][scanstack[i].y]);
        }
        var self = this;
        //Gibt nach einiger Zeit das Ergebnis in einen Allert-Dialog aus
        setTimeout(function(result){  
            if(shouldalert){
                if(result){
                    alert("Kassiopeia erreicht alle Grasfelder.");
                }else{
                    alert("Kassiopeia erreicht nicht alle Grasfelder.");
                }
            }
            //Gebe die Welt wieder frei für Benutzerinteraktionen
            self.blocked = false;
        },100*scanstack.length,result);
    }
    
    //Aufgabe 1(Pathfinding)
    this.find = function(renderer,shouldalert){
        //Nur wenn Kassiopeia schon in die Welt gesetzt wurde
        if(this.Kassiopeiax != -1&&this.Kassiopeiay != -1){
            //Schaut nach, ob Kassiopeia alle Grasfelder erreicht
            var scan = this.scan(renderer,false);
            //Wenn Kassiopeia alle Grasfelder erreichen kann
            if(scan.result){
                var self = this;
                setTimeout(function(){
                    //Bringt die Welt in einen bearbeitbaren Zustand
                    self.scanreset();
                    //Zeichnet die aktualisierte Welt
                    renderer.render();
                    //Zählt, wie viele Grasfelder es gibt
                    var count = self.count();
                    //Erzeugt ein Feld, welches den Weg als Richtungen angibt (0:Osten,1:Westen,2:Süden,3:Norden)
                    var way = new Array(count-1);
                    //Gibt die Länge des Weges an
                    var pos = 0;         
                    //Gibt die Position des Scanners an
                    var posk = new Vector2I(self.Kassiopeiax,self.Kassiopeiay);
                    //Sagt, dass der Scaner auf dem Feld, auf welches der Scanner zeigt, schon war
                    self.tiles[posk.x][posk.y].wasthere = true;
                    //Visualisiert das Pathfinding
                    self.tiles[posk.x][posk.y].type = 3;
                    //Setzt die Richtungen des Weges
                    for(var i=0;i<way.length;i++){
                        way[i] = 0;
                    }
                    //Gibt an, ob in diesem Durchlauf der Schleife der Scanner bewegt wurde
                    var wasgo = false;
                    //Gibt an, ob in diesem Durchlauf der Schleife etwas Produktives gemacht wurde
                    var posible = false;
                    //Gibt an, in den wievielten Durchlauf der Schleife man sich befindet
                    var i = 0;
                    //Die Schleife
                    do{
                        //Der Scanner hat sich noch nicht bewegt
                        wasgo = false;
                        //Es wurde noch nichts Produktives gemacht
                        posible = false;
                        //Probiere Richtung
                        switch(way[pos]){
                            //Osten
                            case 0:
                                //Nur wenn das Feld rechts neben dem Feld, auf welches der Scanner 
                                //zeigt, noch nicht besucht wurde und keine Wand ist 
                                //und der Scanner noch nicht bewegt wurde
                                if(!self.tiles[posk.x+1][posk.y].wasthere&&self.tiles[posk.x+1][posk.y].type != 0&&!wasgo){
                                    //Bewege den Scanner um eins nach rechts
                                    posk.x++;
                                    //Sagt, dass der Scanner auf dem Feld, auf welches der Scanner zeigt, schon war   
                                    self.tiles[posk.x][posk.y].wasthere = true;
                                    //Verlängere den Weg um eins
                                    pos++;
                                    //Sagt, dass der Scanner bewegt wurde
                                    wasgo = true;
                                    //Erhöhe den Schleifendurchlaufszähler um eins
                                    i++;
                                    //Visualisiert den Verlauf des PathFinding
                                    setTimeout(function(tile){
                                        tile.type = 3;
                                        renderer.render();
                                    },100*i,self.tiles[posk.x][posk.y]);
                                }
                                //Anderenfalls
                                else{
                                    //Probiere eine andere Richtung
                                    way[pos]++;
                                    //Der Scanner hat sich nur bewegt, wenn die Richtung 
                                    //kleiner als 4 ist, da 4 als Richtung nicht definiert ist 
                                    wasgo = way[pos]<4;
                                }
                                //Es wurde etwas Produktives gemacht
                                posible = true;
                                break;
                            //Westen
                            case 1:
                                //Nur wenn das Feld links neben dem Feld, auf welches der Scanner 
                                //zeigt, noch nicht besucht wurde und keine Wand ist 
                                //und der Scanner noch nicht bewegt wurde
                                if(!self.tiles[posk.x-1][posk.y].wasthere&&self.tiles[posk.x-1][posk.y].type != 0&&!wasgo){
                                    //Bewege den Scanner um eins nach links
                                    posk.x--;
                                    //Sagt, dass der Scanner auf dem Feld, auf welches der Scanner zeigt, schon war 
                                    self.tiles[posk.x][posk.y].wasthere = true;
                                    //Verlängere den Weg um eins
                                    pos++;
                                    //Sagt, dass der Scanner bewegt wurde
                                    wasgo = true;
                                    //Erhöhe den Schleifendurchlaufszähler um eins
                                    i++;
                                    //Visualisiert den Verlauf des PathFinding
                                    setTimeout(function(tile){
                                        tile.type = 3;
                                        renderer.render();
                                    },100*i,self.tiles[posk.x][posk.y]);
                                }
                                //Anderenfalls
                                else{
                                    //Probiere eine andere Richtung
                                    way[pos]++;
                                    //Der Scanner hat sich nur bewegt, wenn die Richtung 
                                    //kleiner als 4 ist, da 4 als Richtung nicht definiert ist 
                                    wasgo = way[pos]<4;
                                }
                                //Es wurde etwas Produktives gemacht
                                posible = true;
                                break;
                            //Süden
                            case 2:
                                //Nur wenn das Feld unter dem Feld, auf welches der Scanner 
                                //zeigt, noch nicht besucht wurde und keine Wand ist 
                                //und der Scanner noch nicht bewegt wurde
                                if(!self.tiles[posk.x][posk.y+1].wasthere&&self.tiles[posk.x][posk.y+1].type != 0&&!wasgo){
                                    //Bewege den Scanner um eins nach unten
                                    posk.y++;
                                    //Sagt, dass der Scanner auf dem Feld, auf welches der Scanner zeigt, schon war
                                    self.tiles[posk.x][posk.y].wasthere = true;
                                    //Verlängere den Weg um eins
                                    pos++;
                                    //Sagt, dass der Scanner bewegt wurde
                                    wasgo = true;
                                    //Erhöhe den Schleifendurchlaufszähler um eins
                                    i++;
                                    //Visualisiert den Verlauf des PathFinding
                                    setTimeout(function(tile){
                                        tile.type = 3;
                                        renderer.render();
                                    },100*i,self.tiles[posk.x][posk.y]);
                                }
                                //Anderenfalls
                                else{
                                    //Probiere eine andere Richtung
                                    way[pos]++;
                                    //Der Scanner hat sich nur bewegt, wenn die Richtung 
                                    //kleiner als 4 ist, da 4 als Richtung nicht definiert ist 
                                    wasgo = way[pos]<4;
                                }
                                //Es wurde etwas Produktives gemacht
                                posible = true;
                                break;
                            //Norden
                            case 3:
                                //Nur wenn das Feld über dem Feld, auf welches der Scanner 
                                //zeigt, noch nicht besucht wurde und keine Wand ist 
                                //und der Scanner noch nicht bewegt wurde
                                if(!self.tiles[posk.x][posk.y-1].wasthere&&self.tiles[posk.x][posk.y-1].type != 0&&!wasgo){
                                    //Bewege den Scanner um eins nach oben
                                    posk.y--;
                                    //Sagt, dass der Scanner auf dem Feld, auf welches der Scanner zeigt, schon war  
                                    self.tiles[posk.x][posk.y].wasthere = true;
                                    //Verlängere den Weg um eins
                                    pos++;
                                    //Sagt, dass der Scanner bewegt wurde
                                    wasgo = true;
                                    //Erhöhe den Schleifendurchlaufszähler um eins
                                    i++;
                                    //Visualisiert den Verlauf des PathFinding
                                    setTimeout(function(tile){
                                        tile.type = 3;
                                        renderer.render();
                                    },100*i,self.tiles[posk.x][posk.y]);
                                }
                                //Anderenfalls
                                else{
                                    //Probiere eine andere Richtung
                                    way[pos]++;
                                    //Der Scanner hat sich nur bewegt, wenn die Richtung 
                                    //kleiner als 4 ist, da 4 als Richtung nicht definiert ist 
                                    wasgo = way[pos]<4;
                                }
                                //Es wurde etwas Produktives gemacht
                                posible = true;
                                break;
                        }
                        //Nur wenn sich der Scanner nicht bewegt hat
                        if(!wasgo){
                            //Der Scanner kommt von
                            switch(way[pos-1]){
                                //Osten
                                case 0:
                                    //Sagt, dass auf dem Feld, auf welches der Sanner zeigt, der Scanner jetzt nicht mehr ist
                                    self.tiles[posk.x][posk.y].wasthere = false;
                                    //Erhöhe den Schleifendurchlaufszähler um eins
                                    i++;
                                    //Visualisiert den Verlauf des Pathfinding
                                    setTimeout(function(tile){
                                        tile.type = 1;
                                        renderer.render();
                                    },100*i,self.tiles[posk.x][posk.y]);
                                    //Geht einen Schritt nach links zurück
                                    posk.x--;
                                    //Verwischt die Spuren des Scanners und 
                                    way[pos] = 0;
                                    //Verkürzt die Länge des Weges um eins
                                    pos--;
                                    //Probiert bei der jetzt aktuellen Position eine
                                    //andere Richtung
                                    way[pos]++;
                                    //Es wurde etwas Produktives gemacht
                                    posible = true;
                                    break;
                                //Westen
                                case 1:
                                    //Sagt, dass auf dem Feld, auf welches der Sanner zeigt, der Scanner jetzt nicht mehr ist
                                    self.tiles[posk.x][posk.y].wasthere = false;
                                    //Erhöhe den Schleifendurchlaufszähler um eins
                                    i++;
                                    //Visualisiert den Verlauf des Pathfinding
                                    setTimeout(function(tile){
                                        tile.type = 1;
                                        renderer.render();
                                    },100*i,self.tiles[posk.x][posk.y]);
                                    //Geht einen Schritt nach rechts zurück
                                    posk.x++;
                                    //Verwischt die Spuren des Scanners und 
                                    way[pos] = 0;
                                    //Verkürzt die Länge des Weges um eins
                                    pos--;
                                    //Probiert bei der jetzt aktuellen Position eine
                                    //andere Richtung
                                    way[pos]++;
                                    //Es wurde etwas Produktives gemacht
                                    posible = true;
                                    break;
                                //Süden
                                case 2:
                                    //Sagt, dass auf dem Feld, auf welches der Sanner zeigt, der Scanner jetzt nicht mehr ist
                                    self.tiles[posk.x][posk.y].wasthere = false;
                                    //Erhöhe den Schleifendurchlaufszähler um eins
                                    i++;
                                    //Visualisiert den Verlauf des Pathfinding
                                    setTimeout(function(tile){
                                        tile.type = 1;
                                        renderer.render();
                                    },100*i,self.tiles[posk.x][posk.y]);
                                    //Geht einen Schritt nach oben zurück
                                    posk.y--;
                                    //Verwischt die Spuren des Scanners und 
                                    way[pos] = 0;
                                    //Verkürzt die Länge des Weges um eins
                                    pos--;
                                    //Probiert bei der jetzt aktuellen Position eine
                                    //andere Richtung
                                    way[pos]++;
                                    //Es wurde etwas Produktives gemacht
                                    posible = true;
                                    break;
                                //Norden
                                case 3:
                                    //Sagt, dass auf dem Feld, auf welches der Sanner zeigt, der Scanner jetzt nicht mehr ist
                                    self.tiles[posk.x][posk.y].wasthere = false;
                                    //Erhöhe den Schleifendurchlaufszähler um eins
                                    i++;
                                    //Visualisiert den Verlauf des Pathfinding
                                    setTimeout(function(tile){
                                        tile.type = 1;
                                        renderer.render();
                                    },100*i,self.tiles[posk.x][posk.y]);
                                    //Geht einen Schritt nach unten zurück
                                    posk.y++;
                                    //Verwischt die Spuren des Scanners und 
                                    way[pos] = 0;
                                    //Verkürzt die Länge des Weges um eins
                                    pos--;
                                    //Probiert bei der jetzt aktuellen Position eine
                                    //andere Richtung
                                    way[pos]++;
                                    //Es wurde etwas Produktives gemacht
                                    posible = true;
                                    break;
                            }
                        }
                    //Durchlaufe die Schleife nur noch einmal, wenn etwas Produktives gemacht wurde
                    //und die Länge des Weges kleiner ist als die Anzahl der
                    //Grasfelder
                    }while(posible&&pos+1<count)
                    //Wandelt die Richtungen in Positionen um
                    var findstack = [];
                    if(pos+1>=count){
                        var posk = new Vector2I(self.Kassiopeiax,self.Kassiopeiay);
                        //Verlauf der Positionen
                        findstack = new Array(count);
                        //Füge die Anfangsposition von Kassiopeia hinzu
                        findstack[0] = new Vector2I(posk.x,posk.y);
                        //Gehe alle Richtungen durch
                        for(var n=1;n<way.length+1;n++){
                            switch(way[n-1]){
                                //Osten
                                case 0:
                                    //Verschiebe nach rechts
                                    posk.x++;
                                    //Füge die neue Position zum Verlauf hinzu
                                    findstack[n] = new Vector2I(posk.x,posk.y);
                                    break;
                                //Westen
                                case 1:
                                    //Verschiebe nach links
                                    posk.x--;
                                    //Füge die neue Position zum Verlauf hinzu
                                    findstack[n] = new Vector2I(posk.x,posk.y);
                                    break;
                                //Süden
                                case 2:
                                    //Verschiebe nach unten
                                    posk.y++;
                                    //Füge die neue Position zum Verlauf hinzu
                                    findstack[n] = new Vector2I(posk.x,posk.y);
                                    break;
                                //Norden
                                case 3:
                                    //Verschiebe nach oben
                                    posk.y--;
                                    //Füge die neue Position zum Verlauf hinzu
                                    findstack[n] = new Vector2I(posk.x,posk.y);
                                    break;
                            }
                        }
                    }
                    //Visualisiere wie Kassiopeia den Weg entlangläuft
                    setTimeout(function(findstack,resultstack,renderer,result){
                        self.visuallizefind(findstack,resultstack,renderer,result,self,shouldalert);
                    },i*100+500,findstack,way,renderer,pos+1>=count);
                    //Gebe das Ergebnis zurück (wenn die Länge des Verlaufs des Weges von Kassiopeia 
                    //gleich die gesamte Anzahl an Grasfeldern ist, dann erreicht
                    //Kassiopeia alle Grasfelder, ohne ein schon überlaufenes Grasfeld
                    //noch einmal zu überlaufen)
                    return pos+1>=count;
                },scan.wait);
            }
            //Wenn Kassiopeia nicht alle Grasfelder erreicht, gebe eine Fehlermeldung 
            //in einen Alert-Dialog aus
            else{
                if(shouldalert){
                    setTimeout(function(){
                        alert("Kassiopeia erreicht nicht alle Grassfelder.");
                    },scan.wait);
                }
            }
        }
        //Gibt "false" zurück, weil Kassiopeia noch nicht in die Welt gesetzt wurde
        return false;
    }
    
    //Visualisiere wie Kassiopeia den Weg entlangläuft
    this.visuallizefind = function(findstack,resultstack,renderer,result,self,shouldalert){
        //Die Welt blockiert sich, damit der Benutzer während der Visualisierung keine
        //anderen GUI(Graphical user interface) Elemente benutzen kann
        this.blocked = true;
        //Bringt die Welt in einen bearbeitbaren Zustand
        setTimeout(function(){
            self.findreset();
            renderer.render();
        },500);
        //Geht den Verlaufs des Weges durch
        for(var i=0;i<findstack.length;i++){
            //Verfärbt das aktuelle Feld nach einiger Zeit und verschiebe Kassiopeia auf dieses Feld
            setTimeout(function(tile,x,y){
                tile.type = 3;
                self.Kassiopeiax = x;
                self.Kassiopeiay = y;
                renderer.render();
            },500*(i+1),this.tiles[findstack[i].x][findstack[i].y],findstack[i].x,findstack[i].y);
        }
        //Gibt nach einiger Zeit das Ergebnis in einem Allert-Dialog aus
        setTimeout(function(result){    
            if(shouldalert){
                //Wandle die Bewegung Kassiopeias in Text um
                var resulttext = "";
                for(var i=0;i<resultstack.length;i++){
                    switch(resultstack[i]){
                        case 0:resulttext = resulttext+"O";break;
                        case 1:resulttext = resulttext+"W";break;
                        case 2:resulttext = resulttext+"S";break;
                        case 3:resulttext = resulttext+"N";break;
                    }
                }
                //Gebe das Ergebnis in einem Allert-Dialog aus
                if(result){
                    alert("Kassiopeia erreicht alle Grasfelder, ohne eins doppelt überqueren zu müssen.\n("+resulttext+")");
                }else{
                    alert("Kassiopeia erreicht alle Grasfelder, aber nicht ohne eins doppelt überqueren zu müssen.");
                }
            }
            //Gebe die Welt wieder frei für Benutzerinteraktionen
            self.blocked = false;
        },500*(findstack.length+1),result);
    }
}


