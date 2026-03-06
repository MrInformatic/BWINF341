//Ein Feld
function Tile(){
    //Typ des Feldes(0:Wand,1:Gras)
    this.type = 0;
    //Variable für die Vaxelanalyse und das Pathfinding
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

