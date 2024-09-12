### Procédure de remplissage de la base

#### Contexte et Objectif

L'objectif est de parser les données des csv données:
- activity
- enterprise
- branch
- address
- establishement
- code
- conctact
- demomination
et de traiter les données (clean des données, remplacement etc). Pour ensuite merges tous les csv ensembles et ensuite l'inserer en base.
Attention il est important de suivre un ordre précis.



#### traitement des données

- node createJsonLangFR.js 
filtrage des données pour avoir uniquement les information en français et les structures.

- node createJsonBranch.js
permet de parser les données et rajouter les denomination, les addresses.

- node createJsonEstablishment.js
permet de parser les données et rajouter les denomination, addresses, activités, contacts

- node createJsonEntreprise.js
permet de parser les données et rajouter les denomination, addresses, activités, contacts


#### merges des données

- node mergeData.js
permet de concatener toutes les données dans un seul fichiers avec la bonne structure

- node codetodescription.js
rajoute les dernieres informations manquantes au csv, code et et langue.


#### Insertions en base

- node JSONtoDB.js
