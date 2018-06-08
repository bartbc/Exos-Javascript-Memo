/**
 * Created by Marine et Chris on 06/06/18.
 */
// Déclarations des variables globales---------------------------------------------------------------------------------
var cartes=['Dardevil', 'DrStrange', 'Ghost-Rider', 'Hulk', 'HumanTorch', 'ScarletWitch', 'Spiderman', 'thor', 'Vision'];
    var position=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    var cheminBase='./img/';
    var cpt=0, stockCarte='', stockClasse=''; tempo=''; ctrlDoublonClic='';
    var carteMasquee='card';
    var tempVisu=1500;// tempo vision couple cartes
    carteAleatoire(); // appel de la fonction principale

// FONCTIONS---------------------------------------------------------------------------------------------------
function carteAleatoire() {// choisir aléatoirement une carte, l'affecter sur 2 positions et supprimer ces valeurs des tableaux 
    nbCartes=cartes.length; 
    while (nbCartes>0) {//boucle sur le nombre de doublons de cartes choisi
        var valTirage=Math.floor(Math.random()*nbCartes);
        var carteChoisie=cartes[valTirage];
        cartes.splice(valTirage,1)//retire la carte des disponibles
        nbCartes--;// décrémente la boucle
        //----------choisir aléatoirement une position, la supprimer du tableau  et ajoute les events click
        nbPosition=position.length;
        for (i=0; i<2; i++) {//2 représente le couple de carte
            var posTirage=Math.floor(Math.random()*nbPosition);
            var posChoisie=position[posTirage];//recupere la position dans le tableau
            position.splice(posTirage,1);//retire la position des disponibles
            var el=document.getElementsByClassName('pos_'+posChoisie+'')[0]
            el.alt=carteChoisie;;// on stocke le nom de la carte dans le alt
            console.log(carteChoisie+' : '+posChoisie)//!!!!! POUR TEST !!!!!   
            el.addEventListener('click', recupEvent);//ajout eventlistener click et récup l'évenement via la fonction
            nbPosition--; // décrémente la boucle
        }// ---------------------------------------------------------
    }
}
function recupEvent() {// ajoute les events à toutes les images  
    cpt++;//Compte et controle le nombre d'event clics
    
    //supression BUG double clic sur 1ere img ----------------
    if (this.className==ctrlDoublonClic) {
        if (cpt>1) {
            cpt--;
        };
    }
    // -------------------------------------------------------
    if (cpt<=2 ) {
        var imgSelect=this.alt;//recupere le nom de l'image (via le alt)
        var classeCible=this.className;//recupere le nom de la classe de l'image (=sa position)   
        document.getElementsByClassName(classeCible)[0].src=cheminBase+imgSelect+'.jpg';//rend la carte visble
        ctrlDoublonClic=this.className//-------------- pour debug doubles-clics --------------
        if (cpt==2) {
            tempo=window.setTimeout(controle, tempVisu, imgSelect, classeCible);//tempo sur l'appel de la fonction controle/ les 2 arguments necessaires à la fonction sont passés à la fin / tempVisu est défini en varglobale en début de code
        } else {
            controle(imgSelect, classeCible)// on controle sans timeout
        };
    } else {//bloque le nbr d'image à 2 differentes
        //supression BUG double clic sur 2eme img ----------------
        if (this.className==ctrlDoublonClic) {
            if (cpt>2) {
                cpt--;
            };
        } else {
    // -------------------------------------------------------//AJOUTER : SAUF SI MATCH !!!!
    // ### Bonus
    // Mettre en place un chronomètre pour obliger l'utilisateur à réussir le jeu dans un temps imparti.
    // Permettre à l'utilisateur de recommencer le jeu quand il a finit.   
        alert('Action interdite : 2 cartes sont déjà visibles') 
        }
    }
}
function controle (imgSelect, classeCible) {            
    if (cpt==1) {//on memorise la 1ere carte
        stockCarte=imgSelect;
        stockClasse=classeCible;
    } else {
        if (stockCarte!==imgSelect) {//controle de la concordance des cartes ==> on masque ou on supprime le listener
            document.getElementsByClassName(stockClasse)[0].src=cheminBase+carteMasquee+'.jpg';  
            document.getElementsByClassName(classeCible)[0].src=cheminBase+carteMasquee+'.jpg';  
        } else {//desactive listener sur les cartes
            document.getElementsByClassName(stockClasse)[0].removeEventListener('click', recupEvent);
            document.getElementsByClassName(classeCible)[0].removeEventListener('click', recupEvent);
        }
        cpt=0;//reinit compteur apres suprresion des cartes visbles
    };
 }
