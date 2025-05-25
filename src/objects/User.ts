export class User {
    id: string;
    nom: string;
    prenom: string;
    adresse: string;
    mail: string;
    rpps: string;
    siret: string;

    constructor(
        id: string,
        nom: string,
        prenom: string,
        adresse: string,
        mail: string,
        rpps: string,
        siret: string
    ) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.mail = mail;
        this.rpps = rpps;
        this.siret = siret;
    }

    getFullName(): string {
        return `${this.prenom} ${this.nom}`;
    }

    toString(): string {
        return `${this.getFullName()} (${this.id}) - ${this.mail}`;
    }
}
