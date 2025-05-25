export class Contact {
    nom: string;
    prenom: string;
    adresse: string;
    mail: string;
    rpps: string;
    siret: string;
    telephone: string;

    constructor(
        nom: string,
        prenom: string,
        adresse: string,
        mail: string,
        telephone: string,
        rpps: string,
        siret: string
    ) {
        this.nom = nom;
        this.telephone = telephone;
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
        return `${this.getFullName()} - ${this.mail}`;
    }
}
