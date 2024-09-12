// Les données JSON simulées
export const  data_enterprise = [
  {
    "_id": {
      "$oid": "66e2b563cae1ce0fc790dd6c"
    },
    "EnterpriseNumber": "0787.277.635",
    "Status": "Actif",
    "JuridicalSituation": "Situation normale",
    "TypeOfEnterprise": "1",
    "JuridicalForm": "",
    "JuridicalFormCAC": null,
    "StartDate": "09-06-2022",
    "Establishment": [
      {
        "EstablishmentNumber": "2.332.057.370",
        "StartDate": "09-06-2022",
        "EnterpriseNumber": "0787.277.635",
        "Activity": [
          {
            "ActivityGroup": "Activités",
            "NaceVersion": "2008",
            "NaceCode": "Transports routiers de fret, sauf services de déménagement",
            "Classification": "Activité principale"
          },
          {
            "ActivityGroup": "Activités",
            "NaceVersion": "2008",
            "NaceCode": "Autres activités de poste et de courrier",
            "Classification": "Activité principale"
          },
          {
            "ActivityGroup": "Activités",
            "NaceVersion": "2008",
            "NaceCode": "Levée, acheminement et distribution de lettres, colis et paquets par des entr. autres que l'admininistration postale nationale. Il peut être fait appel à un seul ou à plusieurs modes de transp.",
            "Classification": "Activité principale"
          },
          {
            "ActivityGroup": "Activités",
            "NaceVersion": "2008",
            "NaceCode": "Autres activités de soutien aux entreprises n.c.a.",
            "Classification": "Activité principale"
          }
        ],
        "Contact": [],
        "Denominations": [
          {
            "Language": "français",
            "TypeOfDenomination": "Dénomination commerciale",
            "Denomination": "Deliveroo / Uber Eats"
          }
        ],
        "TypeOfAddress": "Unité d'établissement",
        "CountryNL": "",
        "CountryFR": "",
        "Zipcode": "1853",
        "MunicipalityNL": "Grimbergen",
        "MunicipalityFR": "Grimbergen",
        "StreetNL": "Romeinsesteenweg",
        "StreetFR": "Romeinsesteenweg",
        "HouseNumber": "358",
        "Box": "",
        "ExtraAddressInfo": "",
        "DateStrikingOff": ""
      }
    ],
    "Branch": [],
    "Activity": [
      {
        "ActivityGroup": "Activités TVA",
        "NaceVersion": "2008",
        "NaceCode": "Transports routiers de fret, sauf services de déménagement",
        "Classification": "Activité principale"
      },
      {
        "ActivityGroup": "Activités TVA",
        "NaceVersion": "2008",
        "NaceCode": "Autres activités de poste et de courrier",
        "Classification": "Activité secondaire"
      },
      {
        "ActivityGroup": "Activités TVA",
        "NaceVersion": "2008",
        "NaceCode": "Autres activités de soutien aux entreprises n.c.a.",
        "Classification": "Activité secondaire"
      }
    ],
    "Contact": [],
    "Denominations": [
      {
        "Language": "inconnu",
        "TypeOfDenomination": "Dénomination",
        "Denomination": "Nasrat, Sami"
      }
    ]
  },
]

export const data_activity = [
  { label: 'Activités TVA', value: 'Activités TVA' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];