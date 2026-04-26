export default {
  filtrerDonnees: () => {
    // On récupère les 3 états de tes widgets
    const organismeChoisi = filtre_organ.selectedOptionValue;
    const rechercheTexte = data_table.searchText.toLowerCase();
    const modeTodoSeulement = switch_todo.isSwitchedOn;

    // On applique le filtre sur les données de la requête
    return SelectQuery.data.filter(row => {
      
      // Condition 1 : L'organisme correspond (ou rien n'est choisi)
      const okOrgan = !organismeChoisi || row.organ === organismeChoisi;
      
      // Condition 2 : Le texte est présent dans organ ou titre
      const okSearch = !rechercheTexte || 
                       row.organ.toLowerCase().includes(rechercheTexte) || 
                       row.titre.toLowerCase().includes(rechercheTexte);
      
      // Condition 3 : Si le switch est ON, on ne garde que ce qui n'est pas fini
      // (Si le switch est OFF, on laisse tout passer)
      const okStatus = !modeTodoSeulement || row.isdone === false;

      // On ne garde la ligne que si les 3 feux sont au VERT
      return okOrgan && okSearch && okStatus;
    });
  }
}