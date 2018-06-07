/**
 * Created by Marine et Chris on 06/06/18.
 */
// listes des cartes et des positions
window.onload= () => { 
    var cartes=['Dardevil', 'DrStrange', 'Ghost-Rider', 'Hulk', 'HumanTorch', 'ScarletWitch', 'Spiderman', 'thor', 'Vision'];
    var position=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    var cheminBase='./img/';
    choixCarteAleatoire();
};
function choixCarteAleatoire() {
    // choisir aléatoirement une carte et la supprimer du tableau  
    nbCartes=cartes.length; 
    while (nbCartes>0) {
        var valTirage=Math.floor(Math.random()*nbCartes);
        var carteChoisie=cartes[valTirage];
        posAleatoire(2);
        //retire la carte des disponibles
        cartes.splice(valTirage,1)
        //console.log(carteChoisie);
        nbCartes--;
}
function posAleatoire(nbr) {
    // choisir aléatoirement une position et la supprimer du tableau  
    nbPosition=position.length;
    //console.log(nbPosition);
    for (i=0; i<nbr; i++) {
        var posTirage=Math.floor(Math.random()*nbPosition);
        var posChoisie=position[posTirage];
        //retire la position des disponibles
        position.splice(posTirage,1);
        console.log('carte choisi '+carteChoisie+': en position '+posChoisie+'');
        document.getElementsByClassName('pos_'+posChoisie+'')[0].src=cheminBase+carteChoisie+'.jpg';
        nbPosition--;
    }   
}
