//Anzahl der Flaschen
var Bottlescount;
//Anzahl der Behälter
var Canistercount;
//Fassungsvermögen der Behälter
var Canister;

//Rechnet die Anzahl an Möglichkeiten, die Behälter mit Flaschen zu befüllen, aus
function divide(){
    //Stellt eine Liste der Summen der Kapazitäten der nachfolgenden 
    //Behälter für jeden Behälter bereit.
    Canistersum = new Array(Canister.length);
    //Gehe alle Behälter rückwärts durch
    for(var i=Canister.length-1;i>0;i--){
        Canistersum[i-1] = 0;
        //Gehe alle Behälter vom aktuellen zum letzten Behälter vorwärts durch
        for(var n=i;n<Canister.length;n++){
            //Addiere zur Liste der Summe der Kapazitäten der nachfolgenden 
            //Behälter für den aktuellen Behälter(Schleife eins) die Kapazität 
            //des aktuellen Behälters (Schleife zwei)
            Canistersum[i-1] += Canister[n];
        }
    }
    //Setzt die Summe der Kapazitäten der nachfolgenden 
    //Behälter für letzten Behälter auf 0, da auf diesen keine Behälter mehr folgen
    Canistersum[Canister.length-1] = 0;
    //Erzeugt eine Liste, die die Anzahl der Möglichkeiten, einen Behälter zu befüllen,
    //für einen bestimmten Behälter, dessen Befüllmöglichkeiten man schon kennt, angibt, welche so lang ist, dass
    //die Möglichkeiten zum Befüllen von 0 bis zur Anzahl der verfügbaren Flaschen reicht
    var oppold = new Array(Bottlescount+1);
    //Erzeugt eine Liste, die die Anzahl der Möglichkeiten einen Behälter zu befüllen,
    //für einen bestimmten Behälter, dessen Befüllmöglichkeiten man noch nicht kennt, angibt, die so lang ist, dass
    //die Möglichkeiten zum Befüllen von 0 bis zur Anzahl der verfügbaren Flaschen reicht
    var oppnew = new Array(Bottlescount+1);
    //Geht alle Befüllmöglichkeiten durch (von 0 bis Anzahl der verfügbaren Flaschen)
    for(var i=0;i<Bottlescount+1;i++){
        //Wenn die aktuelle Befüllmenge nicht in den letzten Behälter passt
        if(i>Canister[Canister.length-1]){
            //Dann ist die Anzahl der Möglichkeiten undefiniert (siehe Doku)
            oppold[i] = null;
        }
        //Anderenfalls
        else{
            //Ist die Anzahl der Möglichkeiten 1, da wir
            //wissen, dass es beim letzten Behälter nur eine Möglichkeit
            //des Befüllens gibt, egal wie viele Flaschen übrig bleiben,
            //weil der letzte Behälter alle übrig gebliebenen Flaschen aufnehmen
            //muss, da es keine nachfolgenden Behälter mehr gibt (siehe Doku)
            oppold[i] = 1;
        }
    }
    //Gehe allen Behälter vom Vorletzten zum Zweiten durch
    for(var i=Canister.length-2;i>=1;i--){
        //Gehe alle Befüllmöglichkeiten durch (von 0 bis Anzahl an verfügbaren Flaschen)
        for(var n=0;n<Bottlescount+1;n++){
            //Rechne die minimale Befüllmenge des aktuellen Behälters aus
            var min = Math.max(0,n-Canistersum[i]);
            //Rechne die maximale Befüllmenge des aktuellen Behälters aus
            var max = Math.min(Canister[i],n);
            //Falls die maximale größer oder gleich der minimalen Befüllmenge ist
            if(min<=max){
                //Berechne die Anzahl der Befüllmöglichkeiten für den
                //aktuellen Behälter für die
                //Anzahl n an übrig gebliebenen Flaschen (siehe Doku)
                oppnew[n] = 0; 
                for(var t=min;t<=max;t++){ 
                    oppnew[n] += oppold[n-t];
                }
            }
            //Anderenfalls gibt es keine Möglichkeiten
            else{
                oppnew[n] = null;
            }
        }
        //Kopiere die Liste der neu berechneten Werte in die der alten Werte
        oppold = oppnew;
        //Erzeuge die Liste der neu berechneten Werte neu
        oppnew = new Array(Bottlescount+1);;
    }
    //Berechne die minimale Befüllmenge des ersten Behälters für die Anzahl der verfügbaren Flaschen
    //als Anzahl der übriggebliebenen Flaschen, da am Anfang alle verfügbaren Flaschen
    //übrig sind
    var min = Math.max(0,Bottlescount-Canistersum[0]);
    //Berechne die maximale Befüllmenge des ersten Behälters für die Anzahl der verfügbaren Flaschen
    //als Anzahl der übriggebliebenen Flaschen
    var max = Math.min(Canister[0],Bottlescount);
    //Berechne die Anzahl der Befüllmöglichkeiten für den
    //ersten Behälter für die Anzahl der verfügbaren Flaschen
    //als Anzahl der übriggebliebenen Flaschen (siehe Doku)
    oppnew[Bottlescount] = 0; 
    for(var t=min;t<=max;t++){
        oppnew[Bottlescount] += oppold[Bottlescount-t];
    }
    //Gib das Ergebnis zurück
    return oppnew[Bottlescount];
}

