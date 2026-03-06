//Anzahl der Flaschen
var Bottlescount;
//Anzahl der Behälter
var Canistercount;
//Fassungsvermögen der Behälter
var Canister;

//Wird aufgerufen, wenn das Dokument geladen ist
function onload(){
    //Registriert einen Listener, der beim Öffnen einer Datei die Funktion open() aufruft
    document.getElementById("file").addEventListener("change",open, false);
}

//Öffnet ein Beispiel
function open(evt){
    //Lässt sich die ausgesuchte Datei(File) geben
    var file = evt.target.files[0];
    //Erstellt einen FileReader zum lesen der Datei
    var reader = new FileReader();
    //Wenn die Beispieldatei geladen wird
    reader.onload = function(res) { 
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
        //Ließt aus der ersten Zeile die Anzahl der Flaschen aus
        Bottlescount = parseInt(lines[0]);
        //Ließt aus der zweiten Zeile die Anzahl der Behälter aus
        Canistercount = parseInt(lines[1]);
        //Gibt die Kapazität der Behälter an
        Canister = [];
        //Markiert Lehrzeichen in der dritten Zeile
        breaks = lines[2].replace(/ /g,"/");
        for(var i=0;i<breaks.length;i++){
            //Wenn das aktuelle Zeichen kein Lehrzeichen ist, merke dir das Zeichen
            if(breaks[i]!="/"){
                line += breaks[i];
                
            }
            //Wenn das aktuelle Zeichen ein Lehrzeichen ist, wandle die gemerkten Zeichen
            //in eine Zahl um und füge sie zu den Kapazitäten der Behälter hinzu.
            if(breaks[i]=="/" || i==breaks.length-1){
                Canister.push(parseInt(line));
                line = "";
            }
            
        }
        //Rechne die Anzahl an Möglichkeiten, die Behälter mit Flaschen zu befüllen, aus
        divide();
    }
    //Öffnet die Datei
    reader.readAsText(file);
}

//Wird aufgerufen, wenn Eingaben im Textfeld bestätigt wurden
function Submit(){
    //Ließt das Textfeld aus
    var result = new String(document.getElementById("Text").value);
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
        if(breaks[i]=="/" || i==breaks.length-1){
            lines.push(new String(line));
            line = "";
        }
    }
    //Ließt aus der ersten Zeile die Anzahl der Flaschen aus
    Bottlescount = parseInt(lines[0]);
    //Ließt aus der zweiten Zeile die Anzahl der Behälter aus
    Canistercount = parseInt(lines[1]);
    //Gibt die Kapazität der Behälter an
    Canister = [];
    //Markiert Lehrzeichen in der dritten Zeile
    breaks = lines[2].replace(/ /g,"/");
    for(var i=0;i<breaks.length;i++){
        //Wenn das aktuelle Zeichen kein Lehrzeichen ist, merke dir das Zeichen
        if(breaks[i]!="/"){
            line += breaks[i];

        }
        //Wenn das aktuelle Zeichen ein Lehrzeichen ist, wandle dir die gemerkten Zeichen
        //in eine Zahl um und füge sie zu den Kapazitäten der Behälter hinzu.
        if(breaks[i]=="/" || i==breaks.length-1){
            Canister.push(parseInt(line));
            line = "";
        }

    }
    //Rechne die Anzahl an Möglichkeiten, die Behälter mit Flaschen zu befüllen, aus
    divide();
}

//Berechnet die Anzahl an Möglichkeiten, die Behälter mit Flaschen zu befüllen
function divide(){
    //Stellt eine Liste der Summen der Kapazitäten der nachfolgenden 
    //Behälter für jeden Behälter bereit
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
    //Gibt das Resultat per HTML aus
    var result = document.getElementById("result");
    result.innerHTML = "";
    //Erzeugt einen neuen Abschnitt
    var article = document.createElement("article");
    result.appendChild(article);
    //Erzeugt eine Überschrift
    var h2 = document.createElement("h2");
    h2.innerHTML = "Ergebnis";
    article.appendChild(h2);
    //Gibt die Anzahl an Flaschen an
    var Bottleslabel = document.createElement("p");
    Bottleslabel.innerHTML = "Es sind "+Bottlescount+" Flaschen zu verteilen.";
    article.appendChild(Bottleslabel);
    //Gibt die einzelnen Behälter und ihr Fassungsvermögen aus
    for(var i=0;i<Canister.length;i++){
        var Canisterlabel = document.createElement("p");
        Canisterlabel.innerHTML = "Behälter "+(i+1)+". Fassungsvermögen : "+Canister[i];
        article.appendChild(Canisterlabel);
    }
    //Gibt das Ergebnis aus
    var answer = document.createElement("p");
    answer.innerHTML = "Es gibt "+oppnew[Bottlescount]+" Möglichkeiten, die Flaschen auf die Behälter zu verteilen.";
    article.appendChild(answer);
}


