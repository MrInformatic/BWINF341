//Die Futterquelle der Ameisen
function Food(amount,posx,posy){
    //Anzahl der Futterportionen der Futterquelle
    this.amount = amount;
    //Die Position der Futterquelle
    this.posx = Math.floor(posx);
    this.posy = Math.floor(posy);
}

//Die Ameise
function Ant(posx,posy){
    //Die Position der Ameise
    this.posx = Math.floor(posx);
    this.posy = Math.floor(posy);
    //Gibt an, ob die Ameise Essen transportiert
    this.food = false;
}

//Der Simulator
function World(sizex,sizey,a_count,f_count,f_amount,p_duration){
    //Erstellt die Ameisen
    this.ants = new Array(a_count);
    //Erstellt die Futterquellen
    this.food = new Array(f_count);
    //Setzt die Position des Nests
    this.nestx = sizex/2;
    this.nesty = sizey/2;
    //Erstellt das Feld 
    this.pheromon = new Array(sizex);
    //Setzt die Größe der Simulationswelt
    this.sizex = sizex;
    this.sizey = sizey;
    //Die Aktualisierungsgeschwindigkeit
    this.p_duration = p_duration;

    //Initialisierung
    //Erstellt und verteilt alle Futterquellen zufällig in der Welt
    for(var i=0;i<f_count;i++){
        this.food[i] = new Food(f_amount,Math.random()*sizex,Math.random()*sizey);
    }
    //Erstellt und positioniert alle Ameisen im Nest
    for(var i=0;i<a_count;i++){
        this.ants[i] = new Ant(this.nestx,this.nesty);
    }
    //Setzt die Pheromonkonzentration aller Felder auf 0
    for(var x=0;x<sizex;x++){
        this.pheromon[x] = new Array(sizey);
        for(var y=0;y<sizey;y++){
            this.pheromon[x][y] = 0.0;
        }
    }

    //Simuliert einen Simulationsschritt
    this.step = function(self){
        //Gibt die Pheromonkonzentration der umliegenden Felder an
        var p_dir = new Array(4);
        //Gibt die Distanz der umliegenden Felder zum Nest an
        var n_dist = new Array(4);
        //Gibt die Felder mit der höchsten Pheromonkonzentration an
        var p_dir_max_dir = new Array(4);
        //Geht alle Ameisen durch
        for(var i=0;i<self.ants.length;i++){
            //Wenn die aktuelle Ameise Futter trägt
            if(self.ants[i].food){
                //Wenn die aktuelle Ameise auf dem Nestfeld steht
                if(self.ants[i].posx==self.nestx&&self.ants[i].posy==self.nesty){
                    //Legt die aktuelle Ameise ihr Essen ab
                    self.ants[i].food = false;
                }
                //Wenn die aktuelle Ameise noch nicht auf dem Nestfeld steht
                else{
                    //Erhöhe die Pheromonkonzentration des Feldes, auf dem die aktuelle Ameise steht
                    self.pheromon[self.ants[i].posx][self.ants[i].posy]++;
                    //Verringere die Pheromonkonzentration des Feldes, auf dem die 
                    //aktuelle Ameise steht, nach der vorgegebenen Verdunstungsdauer
                    setTimeout(function(pheromon,x,y){
                        pheromon[x][y]--;
                    },self.updatespeed*self.p_duration,self.pheromon,self.ants[i].posx,self.ants[i].posy);
                    //Berechnet die Distanzen der umliegenden Felder der aktuellen
                    //Ameise zum Nest mit dem Satz des Pythagoras
                    n_dist[0] = Math.sqrt(Math.pow(Math.abs(self.nestx-(self.ants[i].posx+1)),2)+Math.pow(Math.abs(self.nesty-(self.ants[i].posy)),2));
                    n_dist[1] = Math.sqrt(Math.pow(Math.abs(self.nestx-(self.ants[i].posx-1)),2)+Math.pow(Math.abs(self.nesty-(self.ants[i].posy)),2));
                    n_dist[2] = Math.sqrt(Math.pow(Math.abs(self.nestx-(self.ants[i].posx)),2)+Math.pow(Math.abs(self.nesty-(self.ants[i].posy+1)),2));
                    n_dist[3] = Math.sqrt(Math.pow(Math.abs(self.nestx-(self.ants[i].posx)),2)+Math.pow(Math.abs(self.nesty-(self.ants[i].posy-1)),2));
                    //Gehe auf das benachbarte Feld der aktuellen Ameise mit der
                    //kleinsten Distanz zum Nest
                    switch(n_dist.indexOf(Math.min.apply(Math,n_dist))){
                        //Das Feld rechts neben der aktuellen Ameise hat die kleinste Distanz
                        //zum Nest
                        case 0:
                            //Aktuelle Ameise geht nach rechts
                            self.ants[i].posx++;
                            break;
                        //Das Feld links neben der aktuellen Ameise hat die kleinste Distanz
                        //zum Nest
                        case 1:
                            //Aktuelle Ameise geht nach links
                            self.ants[i].posx--;
                            break;
                        //Das Feld unter der aktuellen Ameise hat die kleinste Distanz
                        //zum Nest
                        case 2:
                            //Aktuelle Ameise geht nach unten
                            self.ants[i].posy++;
                            break;
                        //Das Feld über der aktuellen Ameise hat die kleinste Distanz
                        //zum Nest
                        case 3:
                            //Aktuelle Ameise geht nach oben
                            self.ants[i].posy--;
                            break;
                    }
                }
            }
            //Wenn die aktuelle Ameise kein Essen trägt
            else{
                //Gibt an, ob und auf welcher Futterquelle die aktuelle Ameise steht 
                var foodid = this.antonfood(self,self.ants[i]);
                //Wenn die aktuelle Ameise auf einer Futterquelle steht
                if(foodid>=0){
                    //Nimmt die aktuelle Ameise eine Portion Futter
                    self.ants[i].food = true;
                    //Und die Futterportionen der Futterquelle, auf der die aktuelle
                    //Ameise steht, wird um eins verringert
                    this.food[foodid].amount--;
                }
                //Wenn die aktuelle Ameise auf keiner Futterquelle steht
                else{
                    //Gibt die Pheromonkonzentration der umliegenden Felder an
                    //Wenn das Feld rechts neben der aktuellen Ameise in der Simulationswelt liegt
                    if(self.ants[i].posx+1<self.pheromon.length){
                        //Gib dessen Pheromonkonzentration an
                        p_dir[0] = self.pheromon[self.ants[i].posx+1][self.ants[i].posy];
                    }
                    //Wenn das Feld rechts neben der aktuellen Ameise nicht in der Simulationswelt liegt
                    else{
                        //Dann ist die Pheromonkonzentration dieses Feldes -1
                        p_dir[0] = -1;
                    }
                    //Wenn das Feld links neben der aktuellen Ameise in der Simulationswelt liegt
                    if(self.ants[i].posx-1>0){
                        //Gib dessen Pheromonkonzentration an
                        p_dir[1] = self.pheromon[self.ants[i].posx-1][self.ants[i].posy];
                    }
                    //Wenn das Feld links neben der aktuellen Ameise nicht in der Simulationswelt liegt
                    else{
                        //Dann ist die Pheromonkonzentration dieses Feldes -1
                        p_dir[1] = -1;
                    }
                    //Wenn das Feld unter der aktuellen Ameise in der Simulationswelt liegt
                    if(self.ants[i].posy+1<self.pheromon[self.ants[i].posx].length){
                        //Gib dessen Pheromonkonzentration an
                        p_dir[2] = self.pheromon[self.ants[i].posx][self.ants[i].posy+1];
                    }
                    //Wenn das Feld unter der aktuellen Ameise nicht in der Simulationswelt liegt
                    else{
                        //Dann ist die Pheromonkonzentration dieses Feldes -1
                        p_dir[2] = -1;
                    }
                    //Wenn das Feld über der aktuellen Ameise in der Simulationswelt liegt
                    if(self.ants[i].posy-1>0){
                        //Gib dessen Pheromonkonzentration an
                        p_dir[3] = self.pheromon[self.ants[i].posx][self.ants[i].posy-1];
                    }
                    //Wenn das Feld über der aktuellen Ameise nicht in der Simulationswelt liegt
                    else{
                        //Dann ist die Pheromonkonzentration dieses Feldes -1
                        p_dir[3] = -1;
                    }
                    //Gibt die maximale Pheromonkonzentration der umliegenden Felder 
                    //der aktuelle Ameise an
                    var p_dir_max = Math.max.apply(Math,p_dir);
                    //Wenn die maximale Pheromonkonzentration der umliegenden Felder 
                    //der aktuelle Ameise 0 beträgt 
                    if(p_dir_max==0){
                        //Die aktuelle Ameise geht in eine beliebige Richtung
                        switch(Math.floor(Math.random()*4)){
                            //Rechts
                            case 0:
                                //Wenn das Feld rechts neben der aktuellen Ameise in der Simulationswelt liegt
                                if(self.ants[i].posx+1<self.sizex){
                                    //Geht die aktuelle Ameise auf dieses Feld
                                    self.ants[i].posx++;
                                }
                                break;
                            //Links
                            case 1:
                                //Wenn das Feld links neben der aktuellen Ameise in der Simulationswelt liegt
                                if(self.ants[i].posx-1>0){
                                    //Geht die aktuelle Ameise auf dieses Feld
                                    self.ants[i].posx--;
                                }
                                break;
                            //Unten
                            case 2:
                                //Wenn das Feld unter der aktuellen Ameise in der Simulationswelt liegt
                                if(self.ants[i].posy+1<self.sizey){
                                    //Geht die aktuelle Ameise auf dieses Feld
                                    self.ants[i].posy++;
                                }
                                break;
                            //Oben
                            case 3:
                                //Wenn das Feld über der aktuellen Ameise in der Simulationswelt liegt
                                if(self.ants[i].posy-1>0){
                                    //Geht die aktuelle Ameise auf dieses Feld
                                    self.ants[i].posy--;
                                }
                                break;
                        }
                    }
                    //Wenn Pheromon auf den umliegenden Feldern der aktuelle Ameise vorhanden ist
                    else{
                        //Zählt, wieviele der umliegenden Felder der aktuellen Ameise
                        //die höchste Pheromonkonzentration haben
                        var p_dir_max_count = p_dir.countOfindexesOf(p_dir_max)
                        //Wenn nur eins der umliegenden Felder der aktuellen Ameise
                        //die höchste Pheromonkonzentration hat
                        if(p_dir_max_count==1){
                            //Gehe auf dieses Feld
                            switch(p_dir.indexOf(p_dir_max)){
                                //Rechts
                                case 0:
                                    //Die aktuelle Ameise geht nach rechts
                                    self.ants[i].posx++;
                                    break;
                                //Links
                                case 1:
                                    //Die aktuelle Ameise geht nach links
                                    self.ants[i].posx--;
                                    break;
                                //Unten
                                case 2:
                                    //Die aktuelle Ameise geht nach unten
                                    self.ants[i].posy++;
                                    break;
                                //Oben
                                case 3:
                                    //Die aktuelle Ameise geht nach oben
                                    self.ants[i].posy--;
                                    break;
                            }
                        }
                        //Wenn mehrere der umliegenden Felder der aktuellen Ameise
                        //die höchste Pheromonkonzentration hat
                        else{
                            //Gibt die Richtungen, in denen die Felder mit den höchsten 
                            //Pheromonkonzentration liegen, an
                            var p_dir_max_dir = p_dir.indexesOf(p_dir_max,p_dir_max_count);
                            //Gibt die Distanzn der Felder zum Nest mit der 
                            //höchsten Pheromonkonzentration an
                            var p_dir_max_dir_dist = new Array(p_dir_max_count);  
                            //Berechnet die Distanzn der Felder zum Nest mit der höchsten 
                            //Pheromonkonzentration
                            //Geht alle Richtungen, in denen die Felder mit den höchsten 
                            //Pheromonkonzentration liegen, durch
                            for(var n=0;n<p_dir_max_count;n++){
                                //Berechnet die Distanz vom Feld, auf dem die aktuellen Ameise steht,
                                //zum Nest in der aktuellen Richtung 
                                switch(p_dir_max_dir[n]){
                                    //Rechts
                                    case 0:
                                        //Berechnet die Distanz vom Feld rechts neben der aktuellen Ameise zum Nest 
                                        p_dir_max_dir_dist[n] = Math.sqrt(Math.pow(Math.abs(self.nestx-(self.ants[i].posx+1)),2)+Math.pow(Math.abs(self.nesty-(self.ants[i].posy)),2));
                                        break;
                                    //Links
                                    case 1:
                                        //Berechnet die Distanz vom Feld links neben der aktuellen Ameise zum Nest 
                                        p_dir_max_dir_dist[n] = Math.sqrt(Math.pow(Math.abs(self.nestx-(self.ants[i].posx-1)),2)+Math.pow(Math.abs(self.nesty-(self.ants[i].posy)),2));
                                        break;
                                    //Unten
                                    case 2:
                                        //Berechnet die Distanz vom Feld unter der aktuellen Ameise zum Nest 
                                        p_dir_max_dir_dist[n] = Math.sqrt(Math.pow(Math.abs(self.nestx-(self.ants[i].posx)),2)+Math.pow(Math.abs(self.nesty-(self.ants[i].posy+1)),2));
                                        break;
                                    //Oben
                                    case 3:
                                        //Berechnet die Distanz vom Feld über der aktuellen Ameise zum Nest 
                                        p_dir_max_dir_dist[n] = Math.sqrt(Math.pow(Math.abs(self.nestx-(self.ants[i].posx)),2)+Math.pow(Math.abs(self.nesty-(self.ants[i].posy-1)),2));
                                        break;
                                }
                            }
                            //Die aktuelle Ameise geht in die Richtung des Felds mit 
                            //der höchsten Pheromonkonzentration und der größten Distanz
                            //zum Nest
                            switch(p_dir_max_dir[p_dir_max_dir_dist.indexOf(Math.max.apply(Math,p_dir_max_dir_dist))]){
                                //Rechts
                                case 0:
                                    //Die aktuelle Ameise geht nach rechts
                                    self.ants[i].posx++;
                                    break;
                                //Links
                                case 1:
                                    //Die aktuelle Ameise geht nach links
                                    self.ants[i].posx--;
                                    break;
                                //Unten
                                case 2:
                                    //Die aktuelle Ameise geht nach unten
                                    self.ants[i].posy++;
                                    break;
                                //Oben
                                case 3:
                                    //Die aktuelle Ameise geht nach oben
                                    self.ants[i].posy--;
                                    break;
                            }
                        }
                    }
                }
            }
        }
        //Geht alle Futterquellen durch
        for(var i=0;i<this.food.length;i++){
            //Wenn die aktuelle Futterquelle keine Futterportionen hat
            if(this.food[i].amount<=0){
                //Entferne diese aus der Simulation
                this.food.splice(i,1);
            }
        }
    }

    //Gibt zurück, ob und auf welcher Futterquelle, eine Ameise(ant) steht
    this.antonfood = function(self,ant){
        //Geht alle Futterquellen durch
        for(var i=0;i<self.food.length;i++){
            //Wenn die Position der Ameise mit der Position der aktuellen Futterquelle 
            //übereinstimmt, dann gebe den Index dieser Futterquelle zurück
            if(ant.posx==self.food[i].posx&&ant.posy==self.food[i].posy){
                return i;
            }
        }
        //Wenn die Ameise auf keiner Futterquelle steht, dann gebe -1 als keine Futterquelle
        //zurück
        return -1;
    }

    //Zählt die Anzahl der Werte in einer Array, die mit Value übereinstimmen
    Array.prototype.countOfindexesOf = function(value){
        //Ein Zähler
        var result = 0; 
        //Geht alle Elemente der Array durch
        for(var i=0;i<this.length;i++){
            //Wenn das aktuelle Element der Array mit Value übereinstimmt
            if(this[i]==value){
                //Dann erhöhe den Zähler um eins
                result++;
            }
        }
        //Gebe das Ergebnis des Zählers zurück
        return result;
    }

    //Gibt alle Elemente zurück, die mit Value übereinstimmen. Count ist die Anzahl
    //der Elemente der Ergebnis-Array
    Array.prototype.indexesOf = function(value,count){
        //Die Ergebnis-Array
        var result = new Array(count);
        //Gibt an, wieviele Elemente sich in der Ergebnis-Array befinden
        var n = 0;
        //Geht alle Elemente der Array durch
        for(var i=0;i<this.length;i++){
            //Wenn das aktuelle Element mit Value übereinstimmt
            if(this[i]==value){
                //Dann füge es zur Ergebnis-Array hinzu
                result[n] = i;
                //Und sage, dass sich ein Element mehr in der Ergebnis-Array befindet
                n++;
            }
        }
        //Gebe die Ergebnis-Array zurück
        return result;
    }
}

