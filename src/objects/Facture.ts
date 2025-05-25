import { Contact } from './Contact'
import { User } from './User'

export class Facture {
    numero: string;
    auteur: User;
    dateFacture: Date;
    titulaire: Contact;
    sommeBrut: number;
    taux: number;
    sommeRecu: number;
    dateDebutRempla: Date;
    dateFinRempla: Date;

    constructor(
        numero: string,
        auteur: User,
        dateFacture: Date,
        titulaire: Contact,
        sommeBrut: number,
        taux: number,
        sommeRecu: number,
        dateDebutRempla: Date,
        dateFinRempla: Date
    ) {
        this.numero = numero;
        this.auteur = auteur;
        this.dateFacture = dateFacture;
        this.titulaire = titulaire;
        this.sommeBrut = sommeBrut;
        this.taux = taux;
        this.sommeRecu = sommeRecu;
        this.dateDebutRempla = dateDebutRempla;
        this.dateFinRempla = dateFinRempla;
    }

    getTitulaireFullName(): string {
        return `${this.titulaire.prenom} ${this.titulaire.nom}`;
    }

    toString(): string {
        return `Facture ${this.numero} - ${this.getTitulaireFullName()} - ${this.sommeRecu}€ reçus`;
    }
}
