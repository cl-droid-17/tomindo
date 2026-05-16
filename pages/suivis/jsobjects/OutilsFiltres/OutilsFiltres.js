export default {
  filtrerDonnees: () => {
    const organismeChoisi = filtre_organ.selectedOptionValue;
    const rechercheTexte = data_table.searchText.toLowerCase();
    const modeTodoSeulement = switch_todo.isSwitchedOn;

    // 1. On filtre les données comme avant
    let donneesFiltrees = SelectQuery.data.filter(row => {
      const okOrgan = !organismeChoisi || row.organ === organismeChoisi;
      const okSearch = !rechercheTexte || 
                 row.organ?.toLowerCase().includes(rechercheTexte) || 
                 row.titre?.toLowerCase().includes(rechercheTexte);
      const okStatus = !modeTodoSeulement || row.isdone === false || row.isdone === null || row.isdone === "false";

      return okOrgan && okSearch && okStatus;
    });

    // 2. On définit si un filtre est actif
    // (On considère un filtre actif si un organisme est choisi ou s'il y a du texte de recherche)
    const estFiltre = (organismeChoisi && organismeChoisi !== "") || (rechercheTexte && rechercheTexte !== "") || modeTodoSeulement;

    // 3. On applique le tri dynamique
    return donneesFiltrees.sort((a, b) => {
      if (estFiltre) {
        // Tri par date (dat_hre) ASC si on a filtré
        return new Date(a.dat_hre) - new Date(b.dat_hre);
      } else {
        // Tri par priorité (pr) ASC par défaut
        return a.pr - b.pr;
      }
    });
  }
}