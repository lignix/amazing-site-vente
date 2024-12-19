# Site de Vente - Particulier à Particulier

Ce projet est une plateforme de vente d'objets entre particuliers, développée en **Spring Boot** (backend) et **React** (frontend).

## Contributeurs

Charles Bouvier - 304
Oleg Hiegel - 303

## Spécifications fonctionnelles :
1. Inscription : elle permet à toute personne souhaitant vendre des objets de se créer un compte en
indiquant son login et son mot de passe ainsi que sa ville de résidence. Le login est un identifiant
de gestion.
2. Mise en vente d’un objet : elle permet à toute personne authentifiée d’enregistrer des objets à
vendre. Elle indiquera pour cela un descriptif court de l’objet et son prix de mise en vente.
L’application attribue automatiquement un numéro d’enregistrement à l’objet.
3. Recherche d’objets par mots-clés : elle permet à toute personne de rechercher les objets mis en
vente par mots-clés. Seuls les objets non vendus doivent être affichés.
4. Enregistrement de la vente d’un objet : elle permet aux propriétaires d’enregistrer la vente de
leurs objets.
5. Calcul du chiffre d’affaires : elle permet à l’administrateur du site de consulter le chiffre d’affaires
réalisé. Le site perçoit une commission de 10% sur le montant de chaque vente.
L’application est destinée à des particuliers mais il est tout à fait possible d’en produire une version
pour les professionnels. Dans ce cas, la commission serait calculée différemment et la vente d’objets
devrait inclure la TVA (définie selon la catégorie de l’objet vendu).

## Prérequis

- **Java 17** ou supérieur.
- **Node.js** et **npm**.
- **MySQL**.
- Un IDE comme IntelliJ ou VSCode.

## Installation

### Backend
1. Clonez le dépôt : `git clone https://github.com/lignix/amazing-site-vente.git`
2. Naviguez dans le répertoire backend.
3. Ajoutez `src\main\resources\application.properties` avec vos informations MySQL.
4. Lancez l'application avec `SiteVenteApplication.java`.

### Frontend
1. Naviguez dans `src/main/resources/static`.
2. Installez les dépendances : `npm install`.
3. Lancez le serveur React : `npm run dev`.