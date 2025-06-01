# Rapport : Diagramme de Classes - Système de Gestion de Stock

## 1. Introduction
Ce document présente le diagramme de classes pour un système de gestion de stock basé sur la stack MEAN (MongoDB, Express.js, Angular, Node.js).

## 2. Aperçu du Système
Le système permet de gérer :
- Les produits et catégories
- Les niveaux de stock et mouvements
- Les utilisateurs et permissions
- La génération de rapports automatisés

## 3. Diagramme de Classes

### 3.1 Code Mermaid
```mermaid
classDiagram
    class Utilisateur {
        +id: ObjectId
        +nom: String
        +email: String
        +motDePasse: String
        +role: String
        +s'authentifier()
        +gérerProduits()
        +gérerStock()
        +générerRapports()
    }

    class Produit {
        +id: ObjectId
        +nom: String
        +description: String
        +prix: Number
        +codeBarre: String
        +image: String
        +créer()
        +lire()
        +mettreÀJour()
        +supprimer()
    }

    class Catégorie {
        +id: ObjectId
        +nom: String
        +description: String
    }

    class Stock {
        +id: ObjectId
        +quantité: Number
        +emplacement: String
        +seuilAlerte: Number
        +dernièreMiseÀJour: Date
        +vérifierNiveau()
        +mettreÀJour()
        +alerterSiSeuil()
    }

    class MouvementStock {
        +id: ObjectId
        +quantité: Number
        +type: String
        +date: Date
        +enregistrer()
        +annuler()
    }

    class Rapport {
        +id: ObjectId
        +titre: String
        +dateGénération: Date
        +type: String
        +contenu: Object
        +générer()
        +exporter()
        +envoyer()
    }

    Produit "1" --> "1" Catégorie : catégorie
    Stock "1" --> "1" Produit : produit
    MouvementStock "n" --> "1" Produit : produit
    MouvementStock "n" --> "1" Utilisateur : utilisateur
    Rapport "n" --> "1" Utilisateur : créateur
