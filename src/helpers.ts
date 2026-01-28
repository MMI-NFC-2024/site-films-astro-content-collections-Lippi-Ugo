const formatFR = new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "full",
    })

export function formatDate(date: Date) {
    return formatFR.format(date);
}

export function calculerAge(dateNaissance : Date, dateDeces?: Date): number {
    const dateReference = dateDeces ? new Date(dateDeces) : new Date();
    const naissance = new Date(dateNaissance);
    
    let age = dateReference.getFullYear() - naissance.getFullYear();
    const moisDiff = dateReference.getMonth() - naissance.getMonth();
    
    if (moisDiff < 0 || (moisDiff === 0 && dateReference.getDate() < naissance.getDate())) {
        age--;
    }
    
    return age;
}

export function formatProfessions(professions: string[]): string {
    if (professions.length === 0) return "";
    if (professions.length === 1) return professions[0];
    
    const dernieresProfessions = professions.slice(0, -1).join(", ");
    return dernieresProfessions + " et " + professions[professions.length - 1];
}

export function formatAnnee(date: Date): string {
    return date.getFullYear().toString();
}

export function formatPays(pays: string): string {
    const displayNames = new Intl.DisplayNames(["fr"], { type: "region" });
    return displayNames.of(pays) || pays;
}
