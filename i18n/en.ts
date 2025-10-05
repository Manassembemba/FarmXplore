export const en = {
  header: {
    title: "FarmXplore 🌱🌍",
    subtitle: "A NASA Space Apps Challenge Project",
  },
  footer: {
    copyright: "© 2024 FarmXplore. All rights reserved.",
  },
  guide: {
    levelSelection: "Choose a challenge to start!",
    mission: "Read your mission objective carefully.",
    learning: "Soak up the knowledge before the quiz!",
    quiz: "Time to test your knowledge!",
    score: "Great job! Here is your score.",
  },
  levelSelection: {
    title: "Select a Challenge",
    description: "Face the challenges of modern farming. Choose a scenario to test your knowledge and decision-making skills against natural disasters powered by simulated NASA data.",
  },
  levels: {
    drought: {
      title: "The Parched Plains",
      description: "Manage a farm through a severe drought using real NASA soil moisture data.",
      context: "Satellite data from NASA's Drought Monitor indicates your region is experiencing extreme drought (D3). Soil moisture is at an all-time low.",
      subMissions: [
        { title: "Mission 1: Analyze the Data", objective: "Identify the agricultural site with the lowest soil moisture on the interactive data map." },
        { title: "Mission 2: Crop Strategy", objective: "Select drought-resistant crops suitable for the current water availability." },
        { title: "Mission 3: Smart Irrigation", objective: "Apply a simulated drip irrigation plan to conserve every drop of water." },
      ],
      quizTopic: "The signs of agricultural drought and effective water management strategies based on real soil moisture data",
      reward: {
        badgeName: "Data-Driven Farmer",
      },
    },
    flood: {
      title: "The Rising River",
      description: "Protect your crops and soil from a devastating flood event.",
      context: "NASA's Global Flood Monitoring system shows a high probability of river overflow in your area within the next 48 hours. Your fields are in a high-risk zone.",
      subMissions: [
        { title: "Mission 1: Identify Risk Zones", objective: "Use the 3D terrain map to pinpoint areas most vulnerable to the coming flood." },
        { title: "Mission 2: Secure Assets", objective: "Choose the correct actions to protect farm equipment and livestock from the flood." },
        { title: "Mission 3: Build Defenses", objective: "Place 5 sandbags in strategic locations to create a barrier and protect your main crops." },
      ],
      quizTopic: "Techniques for flood prevention, damage mitigation, and soil drainage",
      reward: {
        badgeName: "Flood Manager",
      },
    },
    heatwave: {
      title: "The Sunscorched Valley",
      description: "Navigate an extreme heatwave to prevent crop failure and ensure animal welfare.",
      context: "NASA's temperature anomaly data projects a prolonged heatwave with temperatures soaring 10°C above average. This poses a high risk of heat stress for crops.",
      subMissions: [
        { title: "Mission 1: Vulnerability Check", objective: "Identify which of your crops are most sensitive to extreme heat." },
        { title: "Mission 2: Protective Measures", objective: "Choose and apply the best protection techniques, such as shade cloths and targeted watering." },
        { title: "Mission 3: Adapt Schedules", objective: "Plan farm work and irrigation schedules for the cooler parts of the day to minimize water loss and heat stress." },
      ],
      quizTopic: "Methods for adapting crops and farming practices to extreme heat conditions",
      reward: {
        badgeName: "Heat Defender",
      },
    },
    sustainability: {
      title: "The Sustainable Steward",
      description: "Implement sustainable farming practices from NASA Acres to ensure long-term soil health.",
      context: "NASA Acres research highlights declining soil organic matter. Your farm must adopt sustainable practices like crop rotation and cover cropping to reverse this trend.",
      subMissions: [
        { title: "Mission 1: Soil Health Analysis", objective: "Analyze farm data to identify areas with poor soil organic matter." },
        { title: "Mission 2: Crop Rotation Plan", objective: "Design a multi-year crop rotation plan to naturally replenish soil nutrients." },
        { title: "Mission 3: Implement Cover Crops", objective: "Select and plant cover crops to prevent erosion and build healthier soil." },
      ],
      quizTopic: "Principles of sustainable agriculture, including crop rotation, cover crops, and soil health",
      reward: {
        badgeName: "Soil Guardian",
      },
    },
    'food-security': {
      title: "The Global Guardian",
      description: "Use NASA Harvest data to address a regional food shortage by forecasting yields.",
      context: "Data from NASA Harvest indicates an impending food shortage in a neighboring region. Your farm's production is critical to the regional food supply.",
      subMissions: [
        { title: "Mission 1: Yield Forecast Analysis", objective: "Interpret satellite yield maps to predict regional production shortfalls." },
        { title: "Mission 2: Optimize Harvest", objective: "Adjust your harvest schedule to maximize output and prepare for distribution." },
        { title: "Mission 3: Plan Distribution", objective: "Use logistics data to plan the most efficient delivery routes to aid the affected region." },
      ],
      quizTopic: "The role of satellite data in global food security, yield forecasting, and humanitarian response",
      reward: {
        badgeName: "Harvest Hero",
      },
    },
  },
  dataLabels: {
    soilMoisture: "Soil Moisture",
    avgSoilMoisture: "Average Soil Moisture",
    minMoisture: "Minimum Moisture",
    maxMoisture: "Maximum Moisture",
    siteCount: "Sites Analyzed",
    avgRainfall: "Average Rainfall",
    maxRainfall: "Maximum Rainfall",
    sandbagsPlaced: "Sandbags Placed",
    rainfallForecast: "Rainfall Forecast",
    reservoirLevel: "Reservoir Level",
    floodRisk: "Flood Risk",
    riverLevel: "River Level",
    soilSaturation: "Soil Saturation",
    temperatureAnomaly: "Temperature Anomaly",
    evaporationRate: "Evaporation Rate",
    cropStressIndex: "Crop Stress Index",
    soilOrganicMatter: "Soil Organic Matter",
    cropDiversityIndex: "Crop Diversity Index",
    waterRetention: "Water Retention",
    urgencyLevel: "Urgency Level",
    storageSurplus: "Storage Surplus",
    logisticsReadiness: "Logistics Readiness",
  },
  missionView: {
    objectiveLabel: "Your Objective",
    startLearning: "Proceed to Briefing",
    nextMission: "Next Mission",
    readAloudAria: "Read mission briefing aloud",
    dataFeed: "Simulated NASA Data Feed:",
    yourObjective: "Your Objective",
    validateSelection: "Validate Selection",
    hints: {
      drought_1: "Hint: The color of the plots corresponds to their moisture level. Find the driest one!",
      flood_1: "Hint: The color of the plots corresponds to the rainfall amount. Find the area most at risk!",
    }
  },
  quiz: {
    unknownError: "An unknown error occurred.",
    optionsLabel: "The options are",
    correct: "Correct!",
    incorrect: "Incorrect",
    correctAnswerIs: "The correct answer is",
    loadingTitle: "Generating Your Mission Quiz...",
    loadingSubtitle: "Please wait, preparing your assessment.",
    errorTitle: "Error Generating Quiz",
    noQuestions: "No questions available for this mission.",
    questionLabel: "Question",
    scoreLabel: "Score",
    nextQuestion: "Next Question",
    finishMission: "Finish Mission",
  },
  score: {
    title: "Mission Complete!",
    rewardUnlocked: "Reward Unlocked",
    finalScore: "Final Score:",
    messageExcellent: "Excellent work, Expert Farmer! Your knowledge is outstanding.",
    messageGood: "Good job! You have a solid understanding of the challenges.",
    messageImprovement: "There's room for improvement. Keep learning to master these challenges!",
    returnButton: "Return to Challenges",
  },
  learning: {
    title: "Knowledge Briefing",
    subtitle: "Read this briefing to prepare for the upcoming quiz. This information is crucial for your mission.",
    loadingTitle: "Generating Learning Material...",
    loadingSubtitle: "Please wait, our experts are preparing your briefing.",
    errorTitle: "Error Generating Briefing",
    unknownError: "An unknown error occurred while generating the learning content.",
    readAloudAria: "Read briefing aloud",
    startQuizButton: "I'm Ready! Start Quiz",
  },
  leaderboard: {
    title: "High Scores",
    noScores: "No scores recorded yet.",
  },
  crops: {
    sorghum: {
      name: "Sorghum",
      description: "A hardy cereal grain that thrives in arid conditions."
    },
    lentils: {
      name: "Lentils",
      description: "A pulse crop with good drought tolerance."
    },
    corn: {
      name: "Corn",
      description: "A popular grain that requires significant water."
    },
    rice: {
      name: "Rice",
      description: "A water-intensive crop, very vulnerable to drought."
    }
  },
  irrigation: {
    drip: {
      name: "Drip Irrigation",
      description: "Delivers water directly to the root zone, minimizing evaporation."
    },
    sprinkler: {
      name: "Sprinkler System",
      description: "Sprays water over a large area, but some is lost to wind and evaporation."
    },
    surface: {
      name: "Surface Flooding",
      description: "Floods the entire field. Inefficient and can lead to waterlogging."
    }
  },
  floodActions: {
    move_tractors: "Move tractors to the hill",
    leave_livestock: "Leave livestock in the barn",
    move_livestock: "Move livestock to upper pasture",
    barricade_barn: "Barricade the barn doors",
  },
  dataQuiz: {
    title: "Data Challenge",
    loading: "Generating data quiz...",
    continue: "Continue Mission",
    q_driest_site: "Based on the data, which site was the driest (lowest soil moisture)?",
    q_lowest_value: "What was the approximate lowest moisture value recorded (in m³/m³)"
  }
};