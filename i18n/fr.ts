export const fr = {
  header: {
    title: "FarmXplore 🌱🌍",
    subtitle: "Un projet du NASA Space Apps Challenge",
  },
  footer: {
    copyright: "© 2024 FarmXplore. Tous droits réservés.",
  },
  guide: {
    levelSelection: "Choisis un défi pour commencer !",
    mission: "Lis bien l'objectif de ta mission.",
    learning: "Absorbe bien ces connaissances avant le quiz !",
    quiz: "C'est l'heure de tester tes connaissances !",
    score: "Beau travail ! Voici ton score.",
  },
  levelSelection: {
    title: "Sélectionnez un Défi",
    description: "Relevez les défis de l'agriculture moderne. Choisissez un scénario pour tester vos connaissances et vos compétences décisionnelles face aux catastrophes naturelles, avec des données simulées de la NASA.",
  },
  levels: {
    drought: {
      title: "Les Plaines Arides",
      description: "Gérez une ferme lors d'une grave sécheresse en utilisant des données réelles d'humidité du sol de la NASA.",
      context: "Les données satellite du Moniteur de Sécheresse de la NASA indiquent que votre région connaît une sécheresse extrême (D3). L'humidité du sol est à un niveau historiquement bas.",
      subMissions: [
        { title: "Mission 1 : Analyser les Données", objective: "Identifiez le site agricole avec la plus faible humidité du sol sur la carte de données interactive." },
        { title: "Mission 2 : Stratégie de Culture", objective: "Sélectionnez des cultures résistantes à la sécheresse adaptées à la disponibilité actuelle en eau." },
        { title: "Mission 3 : Irrigation Intelligente", objective: "Appliquez un plan d'irrigation goutte-à-goutte simulé pour conserver chaque goutte d'eau." },
      ],
      quizTopic: "Les signes de la sécheresse agricole et les stratégies de gestion de l'eau basées sur des données réelles d'humidité du sol",
      reward: {
        badgeName: "Agriculteur Analytique",
      },
    },
    flood: {
      title: "La Rivière en Crue",
      description: "Protégez vos cultures et votre sol d'une inondation dévastatrice.",
      context: "Le système mondial de surveillance des inondations de la NASA montre une forte probabilité de débordement de la rivière dans votre région dans les 48 prochaines heures. Vos champs sont en zone à haut risque.",
      subMissions: [
        { title: "Mission 1 : Identifier les Zones à Risque", objective: "Utilisez la carte de terrain 3D pour localiser les zones les plus vulnérables à l'inondation à venir." },
        { title: "Mission 2 : Sécuriser les Biens", objective: "Choisissez les bonnes actions pour protéger l'équipement et le bétail de l'inondation." },
        { title: "Mission 3 : Construire des Défenses", objective: "Placez 5 sacs de sable à des endroits stratégiques pour créer une barrière et protéger vos cultures principales." },
      ],
      quizTopic: "Techniques de prévention des inondations, d'atténuation des dommages et de drainage du sol",
      reward: {
        badgeName: "Gestionnaire d'Inondation",
      },
    },
    heatwave: {
      title: "La Vallée Brûlée par le Soleil",
      description: "Survivez à une canicule extrême pour éviter la perte de récoltes et assurer le bien-être des animaux.",
      context: "Les données d'anomalie de température de la NASA prévoient une vague de chaleur prolongée avec des températures dépassant de 10°C la moyenne. Cela présente un risque élevé de stress thermique pour les cultures.",
      subMissions: [
        { title: "Mission 1 : Vérification de la Vulnérabilité", objective: "Identifiez lesquelles de vos cultures sont les plus sensibles à la chaleur extrême." },
        { title: "Mission 2 : Mesures de Protection", objective: "Choisissez et appliquez les meilleures techniques de protection, comme des toiles d'ombrage et un arrosage ciblé." },
        { title: "Mission 3 : Adapter les Horaires", objective: "Planifiez les travaux agricoles et l'irrigation pendant les heures les plus fraîches de la journée pour minimiser la perte d'eau et le stress thermique." },
      ],
      quizTopic: "Méthodes d'adaptation des cultures et des pratiques agricoles aux conditions de chaleur extrême",
      reward: {
        badgeName: "Défenseur de la Chaleur",
      },
    },
    sustainability: {
      title: "Le Gérant Durable",
      description: "Mettez en œuvre des pratiques agricoles durables de NASA Acres pour assurer la santé des sols à long terme.",
      context: "La recherche de NASA Acres met en évidence la baisse de la matière organique du sol. Votre ferme doit adopter des pratiques durables comme la rotation des cultures et les cultures de couverture pour inverser cette tendance.",
      subMissions: [
        { title: "Mission 1 : Analyse de la Santé du Sol", objective: "Analysez les données de la ferme pour identifier les zones à faible matière organique." },
        { title: "Mission 2 : Plan de Rotation des Cultures", objective: "Concevez un plan de rotation pluriannuel pour reconstituer naturellement les nutriments du sol." },
        { title: "Mission 3 : Mettre en place des Cultures de Couverture", objective: "Sélectionnez et plantez des cultures de couverture pour prévenir l'érosion et bâtir un sol plus sain." },
      ],
      quizTopic: "Principes de l'agriculture durable, incluant la rotation des cultures, les cultures de couverture et la santé des sols",
      reward: {
        badgeName: "Gardien du Sol",
      },
    },
    'food-security': {
      title: "Le Gardien Mondial",
      description: "Utilisez les données de NASA Harvest pour faire face à une pénurie alimentaire régionale en prévoyant les rendements.",
      context: "Les données de NASA Harvest indiquent une pénurie alimentaire imminente dans une région voisine. La production de votre ferme est essentielle à l'approvisionnement alimentaire régional.",
      subMissions: [
        { title: "Mission 1 : Analyse des Prévisions de Rendement", objective: "Interprétez les cartes de rendement satellite pour prédire les déficits de production régionaux." },
        { title: "Mission 2 : Optimiser la Récolte", objective: "Ajustez votre calendrier de récolte pour maximiser la production et préparer la distribution." },
        { title: "Mission 3 : Planifier la Distribution", objective: "Utilisez les données logistiques pour planifier les itinéraires de livraison les plus efficaces pour aider la région affectée." },
      ],
      quizTopic: "Le rôle des données satellite dans la sécurité alimentaire mondiale, la prévision des rendements et la réponse humanitaire",
      reward: {
        badgeName: "Héros de la Récolte",
      },
    },
  },
  dataLabels: {
    soilMoisture: "Humidité du Sol",
    avgSoilMoisture: "Humidité Moyenne du Sol",
    minMoisture: "Humidité Minimale",
    maxMoisture: "Humidité Maximale",
    siteCount: "Sites Analysés",
    avgRainfall: "Précipitations Moyennes",
    maxRainfall: "Précipitations Maximales",
    sandbagsPlaced: "Sacs de sable placés",
    rainfallForecast: "Prévisions de Pluie",
    reservoirLevel: "Niveau du Réservoir",
    floodRisk: "Risque d'Inondation",
    riverLevel: "Niveau de la Rivière",
    soilSaturation: "Saturation du Sol",
    temperatureAnomaly: "Anomalie de Température",
    evaporationRate: "Taux d'Évaporation",
    cropStressIndex: "Indice de Stress des Cultures",
    soilOrganicMatter: "Matière Organique du Sol",
    cropDiversityIndex: "Indice de Diversité des Cultures",
    waterRetention: "Rétention d'Eau",
    urgencyLevel: "Niveau d'Urgence",
    storageSurplus: "Excédent de Stockage",
    logisticsReadiness: "Préparation Logistique",
  },
  missionView: {
    objectiveLabel: "Votre Objectif",
    startLearning: "Accéder au Briefing",
    nextMission: "Mission Suivante",
    readAloudAria: "Lire le briefing de la mission à voix haute",
    dataFeed: "Flux de Données Simulées de la NASA :",
    yourObjective: "Votre Objectif",
    validateSelection: "Valider la Sélection",
    hints: {
      drought_1: "Indice : La couleur des plots correspond à leur niveau d'humidité. Trouvez le plus sec !",
      flood_1: "Indice : La couleur des plots correspond à la quantité de pluie. Trouvez la zone la plus à risque !",
    }
  },
  quiz: {
    unknownError: "Une erreur inconnue est survenue.",
    optionsLabel: "Les options sont",
    correct: "Correct !",
    incorrect: "Incorrect",
    correctAnswerIs: "La bonne réponse est",
    loadingTitle: "Génération de votre quiz de mission...",
    loadingSubtitle: "Veuillez patienter, préparation de votre évaluation.",
    errorTitle: "Erreur lors de la génération du quiz",
    noQuestions: "Aucune question disponible pour cette mission.",
    questionLabel: "Question",
    scoreLabel: "Score",
    nextQuestion: "Question Suivante",
    finishMission: "Terminer la Mission",
  },
  score: {
    title: "Mission Terminée !",
    rewardUnlocked: "Récompense Débloquée",
    finalScore: "Score Final :",
    messageExcellent: "Excellent travail, Agriculteur Expert ! Vos connaissances sont exceptionnelles.",
    messageGood: "Bon travail ! Vous avez une solide compréhension des défis.",
    messageImprovement: "Il y a une marge d'amélioration. Continuez à apprendre pour maîtriser ces défis !",
    returnButton: "Retour aux Défis",
  },
  learning: {
    title: "Briefing de Connaissances",
    subtitle: "Lisez ce briefing pour vous préparer au quiz à venir. Ces informations sont cruciales pour votre mission.",
    loadingTitle: "Génération du matériel d'apprentissage...",
    loadingSubtitle: "Veuillez patienter, nos experts préparent votre briefing.",
    errorTitle: "Erreur lors de la génération du briefing",
    unknownError: "Une erreur inconnue est survenue lors de la génération du contenu d'apprentissage.",
    readAloudAria: "Lire le briefing à voix haute",
    startQuizButton: "Je suis prêt ! Commencer le Quiz",
  },
  leaderboard: {
    title: "Meilleurs Scores",
    noScores: "Aucun score enregistré pour le moment.",
  },
  crops: {
    sorghum: {
      name: "Sorgho",
      description: "Une céréale robuste qui prospère dans des conditions arides."
    },
    lentils: {
      name: "Lentilles",
      description: "Une légumineuse avec une bonne tolérance à la sécheresse."
    },
    corn: {
      name: "Maïs",
      description: "Une céréale populaire qui nécessite beaucoup d'eau."
    },
    rice: {
      name: "Riz",
      description: "Une culture très gourmande en eau, très vulnérable à la sécheresse."
    }
  },
  irrigation: {
    drip: {
      name: "Irrigation Goutte-à-goutte",
      description: "Fournit l'eau directement aux racines, minimisant l'évaporation."
    },
    sprinkler: {
      name: "Système d'Aspersion",
      description: "Pulvérise l'eau sur une grande surface, mais une partie est perdue par le vent et l'évaporation."
    },
    surface: {
      name: "Inondation de Surface",
      description: "Inonde tout le champ. Peu efficace et peut causer un engorgement du sol."
    }
  },
  floodActions: {
    move_tractors: "Déplacer les tracteurs sur la colline",
    leave_livestock: "Laisser le bétail dans l'étable",
    move_livestock: "Emmener les animaux au pâturage supérieur",
    barricade_barn: "Barricader les portes de la grange",
  },
  dataQuiz: {
    title: "Défi Données",
    loading: "Génération du quiz de données...",
    continue: "Continuer la mission",
    q_driest_site: "D'après les données, quel site était le plus sec (humidité du sol la plus basse) ?",
    q_lowest_value: "Quelle était la valeur d'humidité la plus basse approximative enregistrée (en m³/m³) ?"
  }
};