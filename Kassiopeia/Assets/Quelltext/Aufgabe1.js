//Ein Feld
function Tile(){
    //Typ des Feldes(0:Wand,1:Gras)
    this.type = 0;
    //Variable für die Voxelanalyse und das Pathfinding
    this.wasthere = false;
}

//Objekt zur Positionsangabe
function Vector2I(x,y){
    this.x = x;
    this.y = y;
}

//Die Welt von Kassiopeia
function World(sizex,sizey,Kassiopeiax,Kassiopeiay,tiles){
    //Die Felder der Welt
    this.tiles = tiles;
    //Die Position von Kassiopeia
    this.Kassiopeiax = Kassiopeiax;
    this.Kassiopeiay = Kassiopeiay;
    //Die Größe der Welt 
    this.sizex = sizex;
    this.sizey = sizey;

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

    //Aufgabe 1(Pathfinding)
    this.find = function(){
        //Nur wenn Kassiopeia schon in die Welt gesetzt wurde
        if(this.Kassiopeiax != -1&&this.Kassiopeiay != -1){
            //Schaut nach, ob Kassiopeia alle Grasfelder erreicht
            var scan = this.scan();
            //Wenn Kassiopeia alle Grasfelder erreichen kann
            if(scan){
                //Zählt, wie viele Grasfelder es gibt
                var count = this.count();
                //Erzeugt ein Feld, welches den Weg als Richtungen angibt (0:Osten,1:Westen,2:Süden,3:Norden)
                var way = new Array(count-1);
                //Gibt die Länge des Weges an
                var pos = 0;         
                //Gibt die Position des Scanners an
                var posk = new Vector2I(this.Kassiopeiax,this.Kassiopeiay);
                //Sagt, dass der Scaner auf dem Feld auf welches der Scanner zeigt, schon war  
                this.tiles[posk.x][posk.y].wasthere = true;
                //Setzt die Richtungen des Weges
                for(var i=0;i<way.length;i++){
                    way[i] = 0;
                }
                //Gibt an, ob in diesem Durchlauf der Schleife der Scanner bewegt wurde
                var wasgo = false;
                //Gibt an, ob in diesem Durchlauf der Schleife etwas Produktives gemacht wurde
                var posible = false;
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
                            if(!this.tiles[posk.x+1][posk.y].wasthere&&this.tiles[posk.x+1][posk.y].type != 0&&!wasgo){
                                //Bewege den Scanner um eins nach rechts
                                posk.x++;
                                //Sagt, dass der Scaner auf dem Feld, auf welches der Scanner zeigt, schon war  
                                this.tiles[posk.x][posk.y].wasthere = true;
                                //Verlängere den Weg um eins
                                pos++;
                                //Sagt, dass der Scanner bewegt wurde
                                wasgo = true;
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
                            //Nur, wenn das Feld links neben dem Feld, auf welches der Scanner 
                            //zeigt, noch nicht besucht wurde und keine Wand ist 
                            //und der Scanner noch nicht bewegt wurde
                            if(!this.tiles[posk.x-1][posk.y].wasthere&&this.tiles[posk.x-1][posk.y].type != 0&&!wasgo){
                                //Bewege den Scanner um eins nach links
                                posk.x--;
                                //Sagt, dass der Scaner auf dem Feld, auf welches der Scanner zeigt, schon war  
                                this.tiles[posk.x][posk.y].wasthere = true;
                                //Verlängere den Weg um eins
                                pos++;
                                //Sagt, dass der Scanner bewegt wurde
                                wasgo = true;
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
                            if(!this.tiles[posk.x][posk.y+1].wasthere&&this.tiles[posk.x][posk.y+1].type != 0&&!wasgo){
                                //Bewege den Scanner um eins nach unten
                                posk.y++;
                                //Sagt, dass der Scaner auf dem Feld, auf welches der Scanner zeigt, schon war  
                                this.tiles[posk.x][posk.y].wasthere = true;
                                //Verlängere den Weg um eins
                                pos++;
                                //Sagt, dass der Scanner bewegt wurde
                                wasgo = true;
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
                            if(!this.tiles[posk.x][posk.y-1].wasthere&&this.tiles[posk.x][posk.y-1].type != 0&&!wasgo){
                                //Bewege den Scanner um eins nach oben
                                posk.y--;
                                //Sagt, dass der Scaner auf dem Feld, auf welches der Scanner zeigt, schon war  
                                this.tiles[posk.x][posk.y].wasthere = true;
                                //Verlängere den Weg um eins
                                pos++;
                                //Sagt, dass der Scanner bewegt wurde
                                wasgo = true;
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
                    //Nur, wenn sich der Scanner nicht bewegt hat
                    if(!wasgo){
                        //Der Scanner kommt von 
                        switch(way[pos-1]){
                            //Osten
                            case 0:
                                //Sagt, dass auf dem Feld, auf welches der Sanner zeigt, der Scanner jetzt nicht mehr ist
                                this.tiles[posk.x][posk.y].wasthere = false;
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
                                this.tiles[posk.x][posk.y].wasthere = false;
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
                                this.tiles[posk.x][posk.y].wasthere = false;
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
                                this.tiles[posk.x][posk.y].wasthere = false;
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
                //Gebe das Ergebnis zurück (wenn die Länge des Verlaufs des Weges von Kassiopeia 
                //gleich die gesamte Anzahl an Grasfeldern ist, dann erreicht
                //Kassiopeia alle Grasfelder ohne ein schon überlaufenes Grasfeld
                //noch einmal zu überlaufen)
                return pos+1>=count;
            }
        }
        //Gibt "false" zurück, weil Kassiopeia noch nicht in die Welt gesetzt wurde
        return false;
    }
    
    //Junioraufgabe 2 (Voxelanalyse)
    this.scan = function(){
        //Nur wenn Kassiopeia schon in die Welt gesetzt wurde
        if(this.Kassiopeiax != -1&&this.Kassiopeiay != -1){
            //Zählt, wie viele Grasfelder es gibt
            var count = this.count();
            //Erstellt eine Liste, in der alle für Kassiopeia erreichbaren Positionen
            //gespeichert werden
            var scanstack = [];
            //Füge die Position von Kassiopeia zur Liste hinzu
            scanstack.push(new Vector2I(this.Kassiopeiax,this.Kassiopeiay));
            //Sagt, dass Kassiopeia auf dem Feld war, auf welchen sie jetzt steht
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
            //Gebe das Ergebnis zurück (wenn die Anzahl der Grasfelder, die Kassiopeia 
            //erreicht, gleich der Gesamtanzahl an Grasfeldern ist, dann erreicht
            //Kassiopeia alle Grasfelder)
            return scanstack.length>=count;
        }
        //Gibt "false" zurück, weil Kassiopeia noch nicht in die Welt gesetzt wurde
        return false;
    }
}


