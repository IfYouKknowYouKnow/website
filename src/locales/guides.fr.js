// French copy for the city guides. Same shape as guides.en.js; src/cityGuides.js combines it with each city's query configuration.
//
// Functions receive the city's French display name (see `cities`). All six cities take "à".

// Shared wording for a category guide ("Restaurants à Zurich"). The four categories are
// masculine plurals that take "des", "de bons" and "d’autres", so one template fits them all.
const categoryTopic = (plural, lower, ctaTitle) => (city) => ({
  title: `${plural} à ${city}`,
  seoTitle: `${plural} à ${city} : les bonnes adresses des locaux`,
  eyebrow: `Guide des ${lower} de ${city}`,
  intro: `Tu cherches des ${lower} à ${city} ? Commence par cinq lieux que la communauté YouKnow enregistre et recommande, chacun avec son adresse et l’ambiance à laquelle il se prête, puis explore toute la carte de ${city} dans l’app gratuite.`,
  metaDescription: `${plural} à ${city} recommandés par la communauté YouKnow : cinq coups de cœur avec adresse et tags d’ambiance. Plus de conseils de locaux dans l’app gratuite.`,
  sectionTitle: `Cinq ${lower} à tester à ${city}`,
  sectionIntro: `Cette sélection est classée selon les enregistrements réels dans YouKnow. C’est un aperçu des ${lower} présents sur la carte de la communauté, et la liste évolue à mesure que de nouvelles trouvailles sont partagées.`,
  ctaTitle,
  ctaBody: `Découvre d’autres ${lower} à ${city} sur YouKnow, recommandés par des amis et des curateurs de confiance.`,
  ctaLabel: `Découvrir d’autres ${lower} à ${city} sur YouKnow`,
})

const categoryFaq = (lower) => (city) => ({
  question: `Où trouver de bons ${lower} à ${city} ?`,
  answer: `Commence par les cinq ${lower} de cette page, classés selon le nombre de fois où la communauté YouKnow les a enregistrés à ${city}. L’app gratuite YouKnow contient la carte complète de ${city} : tu peux y filtrer par catégorie et par ambiance, voir ce que recommandent tes amis et des curateurs, et enregistrer ta propre liste.`,
})

// What a city's main guide covers, with and without hotels.
const HUB_KINDS = {
  true: { title: 'Restaurants, bars, cafés et hôtels', list: 'restaurants, bars, cafés et hôtels' },
  false: { title: 'Restaurants, bars et cafés', list: 'restaurants, bars et cafés' },
}

export default {
  // Display names. The place database is always queried with the English name.
  cities: { zurich: 'Zurich', geneva: 'Genève', berlin: 'Berlin', milan: 'Milan', paris: 'Paris', tokyo: 'Tokyo' },

  // Search title and description for a city's main guide.
  hubMeta: (city, hasHotels) => ({
    title: `${HUB_KINDS[Boolean(hasHotels)].title} à ${city}`,
    description: `Bonnes adresses à ${city} : ${HUB_KINDS[Boolean(hasHotels)].list} recommandés par la communauté YouKnow. Cinq coups de cœur en aperçu, et bien d’autres dans l’app gratuite.`,
  }),

  cityFaq: (city) => [
    {
      question: `D’où viennent ces recommandations à ${city} ?`,
      answer: `Elles viennent de vrais lieux enregistrés et recommandés dans YouKnow. Le guide public en montre cinq exemples ; l’app contient la carte complète de la communauté à ${city}.`,
    },
    {
      question: 'YouKnow utilise-t-il des notes en étoiles ?',
      answer: 'Non. YouKnow repose sur les recommandations d’amis, de communautés locales, de créateurs et de personnes dont tu apprécies les goûts, plutôt que sur des notes anonymes en étoiles.',
    },
    {
      question: `Puis-je enregistrer mes propres adresses à ${city} ?`,
      answer: 'Oui. Dans YouKnow, tu peux enregistrer des lieux, les organiser sur ta carte et partager des listes avec tes amis ou ta communauté.',
    },
  ],

  // Main guides ranked by community recommendations (Milan, Paris, Tokyo).
  communityHub: (city) => ({
    title: `Découvre ${city} comme un local`,
    eyebrow: 'Guide de ville YouKnow',
    intro: `Ta prochaine trouvaille à ${city} commence avec des gens qui connaissent les bonnes adresses. Explore cinq des lieux les plus recommandés par la communauté YouKnow, puis trouves-en d’autres dans l’app.`,
    sectionTitle: `Les coups de cœur à ${city}`,
    sectionIntro: `Cinq lieux classés selon les recommandations de la communauté, les enregistrements départageant les ex æquo. Ce n’est qu’un petit aperçu de la carte de ${city} ; le classement évolue à mesure que la communauté partage de nouvelles trouvailles.`,
    ctaTitle: 'Cinq bonnes adresses. Toute une ville à explorer.',
    ctaBody: `Découvre d’autres recommandations à ${city}, de la part d’amis et de curateurs de confiance. Enregistre tes coups de cœur et crée ta propre carte dans YouKnow.`,
    ctaLabel: `Explorer davantage ${city} sur YouKnow`,
  }),

  // Category guides: restaurants, bars, cafés and hotels in every city.
  kinds: {
    restaurants: {
      plural: 'Restaurants',
      topic: categoryTopic('Restaurants', 'restaurants', 'Cinq tables pour commencer. Toute une ville à goûter.'),
      choosing: (city) => ({ title: `Comment choisir un restaurant à ${city}`, body: `Pars de ton envie plutôt que d’une note. Un repas de midi sur le pouce, une longue soirée à table entre amis et un repas pour une grande occasion n’appellent pas les mêmes adresses. Dans YouKnow, chaque recommandation garde sa catégorie, son adresse et ses tags d’ambiance : tu peux donc chercher à ${city} selon l’atmosphère que tu veux donner au repas, et pas seulement selon ce qu’il y a au menu.` }),
      faq: categoryFaq('restaurants'),
    },
    bars: {
      plural: 'Bars',
      topic: categoryTopic('Bars', 'bars', 'Cinq bars pour commencer. Les autres sont sur la carte.'),
      choosing: (city) => ({ title: `Trouver le bon bar à ${city}`, body: `Un premier verre, un dernier verre et une soirée rythmée par la musique sont des plans différents. Des tags d’ambiance comme « animé », « intime » ou « idéal en groupe » aident à choisir, à ${city}, le bar qui colle à la soirée plutôt que celui qui cumule le plus d’avis.` }),
      faq: categoryFaq('bars'),
    },
    cafes: {
      plural: 'Cafés',
      topic: categoryTopic('Cafés', 'cafés', 'Envie de continuer à explorer ?'),
      choosing: (city) => ({ title: `Choisir un café à ${city}`, body: `Le bon café dépend du moment : un espresso rapide, un petit-déjeuner sans se presser, un endroit où travailler une heure ou un lieu pour retrouver un ami. YouKnow garde ce contexte à côté de l’adresse : une recommandation de café à ${city} te dit donc à quoi le lieu se prête, et pas seulement qu’il a plu à quelqu’un.` }),
      faq: categoryFaq('cafés'),
    },
    hotels: {
      plural: 'Hôtels',
      topic: categoryTopic('Hôtels', 'hôtels', 'Tu as trouvé où dormir ? Trouve maintenant où manger.'),
      choosing: (city) => ({ title: `Choisir un hôtel à ${city}`, body: `Un hôtel recommandé par quelqu’un dont tu apprécies les goûts en dit plus qu’un nombre d’étoiles. Dans YouKnow, les hôtels figurent sur la même carte que les restaurants, les cafés et les bars qui les entourent : tu vois ce qui est accessible à pied et tu gardes une shortlist à ${city} prête pour ton prochain voyage.` }),
      faq: categoryFaq('hôtels'),
    },
  },

  // Everything below is plain text: hand-written copy for specific cities.
  // hubs: main guides for Zurich, Geneva and Berlin.
  // communitySections: editorial sections for Milan, Paris and Tokyo.
  // zurichTopics: Zurich's mood guides, plus its original café and bar guides.
  // localContext: the neighbourhood paragraph on each category guide.
  hubs: {
    zurich: {
      title: "Découvre Zurich comme un local",
      eyebrow: "Guide de ville YouKnow",
      intro: "Tu cherches des restaurants, des cafés, des bars et des pépites cachées à Zurich ? Commence par cinq vrais lieux enregistrés et recommandés par la communauté YouKnow.",
      sectionTitle: "Des adresses pour commencer à Zurich",
      sectionIntro: "Ces cinq choix de la communauté sont classés selon les enregistrements réels dans YouKnow. C’est un bon aperçu, pas la carte complète de Zurich.",
      ctaTitle: "Envie de la liste complète ?",
      ctaBody: "YouKnow contient d’autres recommandations de restaurants, de cafés et de bars partout à Zurich, sélectionnées et enregistrées par les membres de la communauté.",
      ctaLabel: "Découvrir d’autres adresses à Zurich sur YouKnow",
      contentSections: [
        {
          title: "Comment découvrir Zurich au-delà des adresses évidentes",
          body: "Pars du contexte, pas d’un classement générique. Une recommandation pour un café au calme ne répond pas au même besoin qu’un verre sur un rooftop ou un dîner décontracté. YouKnow réunit ces signaux sur une carte vivante, façonnée par les personnes qui ont réellement enregistré ces lieux."
        },
        {
          title: "Pourquoi les recommandations de personnes de confiance sont différentes",
          body: "Les notes anonymes réduisent chaque visite à un seul chiffre. La recommandation d’un ami, d’un curateur local ou d’une communauté garde l’essentiel : qui a aimé le lieu, à quoi il se prête et pourquoi il pourrait convenir à tes propres plans à Zurich."
        }
      ]
    },
    geneva: {
      title: "Découvre Genève comme un local",
      eyebrow: "Guide de ville YouKnow",
      intro: "Tu cherches des restaurants, des cafés, des bars et des pépites cachées à Genève ? Commence par cinq vrais lieux enregistrés et recommandés par la communauté YouKnow.",
      sectionTitle: "Des adresses pour commencer à Genève",
      sectionIntro: "Ces cinq choix de la communauté sont classés selon les enregistrements réels dans YouKnow. C’est un bon aperçu, pas la carte complète de Genève.",
      ctaTitle: "Envie de la liste complète ?",
      ctaBody: "YouKnow contient d’autres recommandations de restaurants, de cafés et de bars partout à Genève, sélectionnées et enregistrées par les membres de la communauté.",
      ctaLabel: "Découvrir d’autres adresses à Genève sur YouKnow",
      contentSections: [
        {
          title: "Comment découvrir Genève au-delà des adresses évidentes",
          body: "Pars de ton envie plutôt que d’un classement générique. Un café détendu au bord du lac, un dîner intime et un bar animé correspondent à des moments différents. YouKnow garde ces signaux utiles attachés aux recommandations des personnes qui ont enregistré les lieux."
        },
        {
          title: "Pourquoi les recommandations de la communauté apportent un contexte utile",
          body: "Les notes anonymes compressent chaque visite en un seul chiffre. Les recommandations d’amis, de curateurs locaux et de communautés conservent ce à quoi un lieu se prête et pourquoi il pourrait convenir à tes propres plans à Genève."
        }
      ]
    },
    berlin: {
      title: "Découvre Berlin comme un local",
      eyebrow: "Guide de ville YouKnow",
      intro: "Tu cherches des restaurants, des cafés, des bars et des pépites cachées à Berlin ? Commence par cinq vrais lieux enregistrés et recommandés par la communauté YouKnow.",
      sectionTitle: "Des adresses pour commencer à Berlin",
      sectionIntro: "Ces cinq choix de la communauté sont classés selon les enregistrements réels dans YouKnow. C’est un bon aperçu, pas la carte complète de Berlin.",
      ctaTitle: "Envie de la liste complète ?",
      ctaBody: "YouKnow contient d’autres recommandations de restaurants, de cafés et de bars partout à Berlin, sélectionnées et enregistrées par les membres de la communauté.",
      ctaLabel: "Découvrir d’autres adresses à Berlin sur YouKnow",
      contentSections: [
        {
          title: "Comment découvrir Berlin au-delà des adresses évidentes",
          body: "Berlin change d’un pâté de maisons à l’autre, et d’une envie à l’autre. Partir de l’atmosphère, de la catégorie et de recommandations de confiance aide à trouver le café de quartier, la table du soir ou le bar de fin de soirée qui colle au moment."
        },
        {
          title: "Pourquoi le contexte local compte dans une ville aussi variée",
          body: "Une simple note ne dit pas si un lieu convient à une matinée tranquille, à un repas décontracté en groupe ou à une soirée dehors. YouKnow réunit les enregistrements de la communauté et les signaux d’ambiance pour que les recommandations restent utiles."
        }
      ]
    }
  },

  communitySections: {
    milan: [
      {
        title: "De la pause café au long dîner",
        body: "Une pause pâtisserie, un aperitivo et un dîner entre amis n’appellent pas la même adresse. Commence par les lieux que la communauté recommande, puis sers-toi des catégories et des tags d’ambiance pour trouver, à Milan, l’endroit qui correspond à ton envie."
      },
      {
        title: "Garde ta propre shortlist à Milan",
        body: "Enregistre les adresses que tu veux tester à côté de celles que tu aimes déjà. Suis les amis et les curateurs dont les goûts rejoignent les tiens, et réunis leurs recommandations à Milan sur ta carte."
      }
    ],
    paris: [
      {
        title: "Trouve ton Paris à toi",
        body: "Un bistrot de quartier, un bar à vin et un café avec un ami donnent chacun une journée différente. Les recommandations de la communauté t’offrent un point de départ, avec des adresses et des tags d’ambiance pour t’aider à choisir."
      },
      {
        title: "Les bonnes adresses, ça se partage",
        body: "Garde au même endroit les lieux parisiens dont on te parle. Enregistre la recommandation d’un ami, suis un curateur de confiance et partage tes propres trouvailles quand on te demande où aller."
      }
    ],
    tokyo: [
      {
        title: "Fais de la place à plus qu’un dîner",
        body: "La carte de la communauté à Tokyo réunit des lieux où manger, boire un verre et explorer. Commence par ces recommandations, puis suis les catégories et les tags d’ambiance qui correspondent à la journée ou à la soirée que tu as en tête."
      },
      {
        title: "Transforme les recommandations en une carte de Tokyo",
        body: "Réunis dans une seule shortlist les lieux dont parlent tes amis et ceux des curateurs que tu suis. Garde tes envies prêtes dans YouKnow, puis fais tourner les adresses que tu as fini par adorer."
      }
    ]
  },

  zurichTopics: {
    bars: {
      title: "Bars à Zurich",
      seoTitle: "Bars à Zurich : les bonnes adresses des locaux",
      eyebrow: "Guide des bars de Zurich",
      intro: "Tu cherches un bar à Zurich ? Commence par cinq vrais lieux enregistrés et recommandés par la communauté YouKnow.",
      sectionTitle: "Cinq bars à tester à Zurich",
      sectionIntro: "Cette sélection donne un aperçu des bars et des lieux où boire un verre présents sur la carte de la communauté.",
      ctaTitle: "La nuit ne s’arrête pas ici.",
      ctaBody: "Découvre d’autres bars à Zurich sur YouKnow.",
      ctaLabel: "Découvrir d’autres bars à Zurich sur YouKnow",
      contentSections: [
        {
          title: "Trouver le bon type de bar à Zurich",
          body: "Un verre sur un rooftop, un bar animé pour sortir en groupe et une adresse tranquille pour un verre de vin répondent à des questions différentes. YouKnow associe les catégories à de vrais tags d’ambiance pour que tu puisses partir du genre de soirée dont tu as envie."
        },
        {
          title: "Pourquoi les recommandations de bars ont besoin de contexte",
          body: "Une recommandation utile dit plus que le simple fait que quelqu’un a aimé un lieu. L’atmosphère, l’occasion et les enregistrements de la communauté aident à réduire une longue liste de bars zurichois à quelques adresses qui collent à la soirée."
        }
      ]
    },
    cafes: {
      title: "Cafés à Zurich",
      seoTitle: "Cafés à Zurich : les bonnes adresses des locaux",
      eyebrow: "Guide des cafés de Zurich",
      intro: "Envie d’un bon café à Zurich ? Commence par cinq vraies recommandations de cafés enregistrées par la communauté YouKnow.",
      sectionTitle: "Cinq cafés pour commencer à Zurich",
      sectionIntro: "Ces choix publics sont un petit aperçu des cafés présents sur la carte YouKnow.",
      ctaTitle: "Envie de continuer à explorer ?",
      ctaBody: "Trouve d’autres cafés partout à Zurich sur YouKnow.",
      ctaLabel: "Découvrir d’autres cafés à Zurich sur YouKnow",
      contentSections: [
        {
          title: "Choisir un café à Zurich selon le moment",
          body: "Le bon café dépend du programme : un espresso rapide, un petit-déjeuner sans se presser, un endroit où travailler ou un lieu pour retrouver un ami. Dans YouKnow, les tags de la communauté gardent ce contexte visible, à côté de l’adresse et de la catégorie."
        },
        {
          title: "Des recommandations de cafés qui vont plus loin qu’une note",
          body: "Une note en dit peu sur l’atmosphère d’un café ou sur les personnes à qui il convient. Les recommandations enregistrées et les signaux descriptifs aident à choisir un lieu adapté au moment de la journée et à l’expérience que tu cherches."
        }
      ]
    },
    "cosy-restaurants": {
      title: "Restaurants cosy à Zurich",
      eyebrow: "Zurich selon l’ambiance",
      intro: "Envie d’un dîner cosy à Zurich ? Voici, pour commencer, cinq restaurants proposés par la communauté YouKnow, sélectionnés à partir des enregistrements réels dans le filtre « restaurant cosy ».",
      sectionTitle: "Cinq adresses cosy à tester à Zurich",
      sectionIntro: "Chaque lieu ci-dessous est une vraie recommandation YouKnow, avec la catégorie, l’adresse, la description et les informations d’ambiance actuellement disponibles sur la carte de la communauté.",
      ctaTitle: "Nous en avons choisi 5. Il y en a d’autres sur YouKnow.",
      ctaBody: "Explore d’autres restaurants cosy à Zurich dans l’app.",
      ctaLabel: "Découvrir d’autres restaurants cosy sur YouKnow",
      contentSections: [
        {
          title: "Qu’est-ce qui rend un restaurant cosy ?",
          body: "Un restaurant cosy tient moins à une note officielle qu’au contexte : une atmosphère chaleureuse, un cadre où l’on discute à l’aise, un service accueillant et le genre de salle qui se prête à un dîner sans se presser. YouKnow garde ces signaux d’ambiance attachés au lieu, pour que tu puisses chercher selon l’atmosphère que tu veux donner à ta soirée."
        },
        {
          title: "Où trouver des restaurants cosy à Zurich",
          body: "Les tables les plus accueillantes de Zurich se répartissent entre le centre et les quartiers qui l’entourent, des salles de la vieille ville aux terrasses détendues et aux cafés-restaurants de quartier. L’adresse indiquée sur chaque recommandation t’aide à la situer dans la ville avant d’ouvrir la carte complète dans YouKnow."
        },
        {
          title: "Trouver un restaurant selon l’ambiance plutôt que la note",
          body: "Une simple note ne dit pas si un lieu convient à un tête-à-tête au calme, à un dîner animé en groupe ou à un repas tout simple en semaine. Chercher par ambiance apporte ce contexte manquant et laisse les recommandations de personnes de confiance faire le travail utile."
        }
      ]
    },
    "date-night": {
      title: "Soirée à deux à Zurich : les bonnes adresses",
      eyebrow: "Zurich selon l’ambiance",
      intro: "Tu prépares une soirée à deux à Zurich ? Voici cinq vrais lieux associés dans YouKnow à des tags de la communauté comme « idéal à deux » ou « romantique ».",
      sectionTitle: "Cinq adresses pour une soirée à deux à Zurich",
      sectionIntro: "Sers-toi de ces recommandations de la communauté comme point de départ, puis explore la carte complète dans l’app.",
      ctaTitle: "Trouve l’endroit parfait pour ta soirée à deux.",
      ctaBody: "Explore d’autres recommandations pour une soirée à deux à Zurich sur YouKnow.",
      ctaLabel: "Découvrir d’autres adresses pour une soirée à deux sur YouKnow",
      contentSections: [
        {
          title: "Préparer une soirée à deux à Zurich selon l’atmosphère",
          body: "Le meilleur choix dépend de ce que demande la soirée : une conversation intime, une salle animée, un repas ou simplement un verre. Les tags « idéal à deux » et « romantique » donnent à chaque recommandation le contexte qu’un simple score de popularité ne peut pas offrir."
        },
        {
          title: "De la première idée à la carte complète",
          body: "Sers-toi des cinq choix publics pour te faire une idée de l’éventail, puis continue dans YouKnow pour comparer d’autres recommandations de la communauté et enregistrer les lieux qui conviennent à ton propre plan."
        }
      ]
    },
    "hidden-gems": {
      title: "Pépites cachées à Zurich",
      eyebrow: "Zurich hors des sentiers battus",
      intro: "Envie de sortir des adresses évidentes à Zurich ? Commence par cinq vrais lieux que la communauté a tagués « pépite cachée » ou « coup de cœur local » dans YouKnow.",
      sectionTitle: "Cinq adresses de locaux à Zurich",
      sectionIntro: "Ces vraies fiches sont un petit aperçu de la carte complète de la communauté à Zurich.",
      ctaTitle: "Sous la surface, il y a bien plus.",
      ctaBody: "Découvre d’autres recommandations locales partout à Zurich sur YouKnow.",
      ctaLabel: "Découvrir d’autres pépites cachées à Zurich sur YouKnow",
      contentSections: [
        {
          title: "Qu’est-ce qui fait d’un lieu zurichois une trouvaille de local ?",
          body: "Une trouvaille de local ne se définit pas seulement par sa discrétion. C’est souvent un endroit où l’on revient, que l’on garde pour ses amis ou que l’on apprécie pour une humeur précise. Les signaux de la communauté font ressortir ce contexte, sans inventer un classement universel des pépites cachées."
        },
        {
          title: "Explore au-delà des cinq choix publics",
          body: "Ces cinq recommandations montrent le type de contexte local disponible sur YouKnow. L’app contient la carte complète de Zurich, où d’autres lieux enregistrés s’explorent par catégorie, par personne et par ambiance."
        }
      ]
    }
  },

  localContext: {
    zurich: {
      restaurants: {
        title: "Où manger à Zurich, quartier par quartier",
        body: "Zurich concentre une grande diversité dans une ville compacte. Les Kreis 4 et 5, autour de la Langstrasse et de Zürich West, accueillent une bonne partie de la restauration la plus récente et la plus décontractée. La vieille ville, sur les deux rives de la Limmat, garde les salles traditionnelles et les maisons de corporations, tandis que Seefeld et les bords du lac se prêtent à un long repas de midi quand il fait beau. La cuisine végétarienne a aussi des racines profondes ici : Haus Hiltl en sert depuis 1898."
      },
      bars: {
        title: "Où sortir à Zurich",
        body: "La Langstrasse, dans le Kreis 4, est le cœur de la vie nocturne zurichoise, les ruelles du Niederdorf sont bordées de petits bars de vieille ville, et Zürich West mêle bars, clubs et salles de concert. En été, les bains du lac et de la rivière se transforment en bars à ciel ouvert une fois les baigneurs rentrés chez eux."
      },
      cafes: {
        title: "Où boire un bon café à Zurich",
        body: "Le café de spécialité s’est répandu bien au-delà du centre. Les Kreis 3, 4 et 5 regorgent de cafés de quartier, le Niederdorf a ses terrasses de vieille ville, et Seefeld est fait pour une matinée tranquille près du lac."
      },
      hotels: {
        title: "Où dormir à Zurich",
        body: "Le quartier où tu loges façonne le Zurich que tu vois. La vieille ville et les rues autour de la Bahnhofstrasse te placent à quelques minutes à pied du lac et de la gare centrale. Les Kreis 4 et 5 échangent le calme contre la vie nocturne, les galeries et les dîners tardifs, tandis que Seefeld et Enge sont tout proches de l’eau. La ville est compacte et les trams sont fréquents : aucun quartier n’est loin des autres."
      }
    },
    geneva: {
      restaurants: {
        title: "Où manger à Genève, quartier par quartier",
        body: "Genève est assez petite pour se traverser à pied, et chaque rive a sa façon de manger. Les Pâquis, près de la gare, forment le quartier le plus international, riche en cuisines d’Asie, d’Afrique et du Moyen-Orient. Les Eaux-Vives, sur la rive gauche, mêlent bistrots et adresses plus récentes, Plainpalais et la Jonction sont plus jeunes et plus décontractés, et Carouge, à quelques minutes de tram vers le sud, a des airs de village à part, avec ses terrasses et ses petites salles."
      },
      bars: {
        title: "Où sortir à Genève",
        body: "La rue de l’École-de-Médecine, à Plainpalais, est la rue des bars classique de la ville. Les Eaux-Vives et les Pâquis ont leurs adresses de cocktails et de vins nature, Carouge se prête à un verre sans se presser, et en été les bords du lac et les rives du Rhône à la Jonction se remplissent de buvettes en plein air."
      },
      cafes: {
        title: "Où boire un bon café à Genève",
        body: "Les places de la vieille ville, comme la place du Bourg-de-Four, sont faites pour un café en terrasse. Carouge a ses tea-rooms et ses pâtisseries, les Eaux-Vives et Plainpalais réunissent les adresses plus récentes de café de spécialité, et les buvettes du bord du lac sont pour les jours où la vue compte plus que la torréfaction."
      },
      hotels: {
        title: "Où dormir à Genève",
        body: "Les grands hôtels bordent le lac sur les deux rives. Les rues autour de la gare Cornavin sont pratiques pour un court séjour, tandis que les Eaux-Vives et Carouge offrent un point de chute plus résidentiel. Les listes de la communauté dépassent aussi les limites de la ville, jusqu’aux villages le long du lac et à la campagne voisine : bon à savoir si tu cherches un séjour plus calme, tout près de Genève."
      }
    },
    berlin: {
      restaurants: {
        title: "Où manger à Berlin, quartier par quartier",
        body: "À Berlin, il n’y a pas un centre unique où manger. Kreuzberg et Neukölln offrent le mélange le plus dense, des grills turcs et des cuisines vietnamiennes aux bistrots à vins nature. Mitte et Prenzlauer Berg penchent vers des restaurants de quartier soignés, et Charlottenburg garde les classiques de Berlin-Ouest, avec la Kantstrasse connue pour ses restaurants asiatiques."
      },
      bars: {
        title: "Où sortir à Berlin",
        body: "Les bars berlinois ferment tard et ne se prennent pas au sérieux. Kreuzberg et Neukölln regorgent de bistrots de quartier, de bars à vin et de bars à cocktails, à quelques pas les uns des autres. Friedrichshain est plus animé et plus bruyant, et Schöneberg et Charlottenburg ont les bars à cocktails classiques. En été, les berges des canaux et les Biergarten font partie de la soirée."
      },
      cafes: {
        title: "Où boire un bon café à Berlin",
        body: "Le café de spécialité se trouve facilement à Berlin, avec des adresses réparties entre Kreuzberg, Neukölln, Mitte et Prenzlauer Berg. Beaucoup servent aussi le petit-déjeuner et le brunch, certaines font office d’espace de travail l’après-midi, et bon nombre préparent leurs propres gâteaux."
      },
      hotels: {
        title: "Où dormir à Berlin",
        body: "Choisir un hôtel à Berlin, c’est surtout choisir un quartier. Mitte est central pour les musées et les monuments. Charlottenburg, autour du Zoo et du Kurfürstendamm, offre le calme de Berlin-Ouest, et Kreuzberg et Friedrichshain te rapprochent des restaurants, des bars et des clubs. La ville est grande : loger près d’une ligne de U-Bahn ou de S-Bahn compte plus que loger au centre."
      }
    },
    milan: {
      restaurants: {
        title: "Où manger à Milan, quartier par quartier",
        body: "Milan mange dans ses quartiers. Navigli et Porta Genova s’animent autour des canaux, Brera aligne des salles élégantes dans ses rues pavées, et c’est à Isola et à Porta Venezia qu’ont ouvert beaucoup de bistrots récents et de tables tournées vers le vin. Partout en ville, les trattorie traditionnelles servent encore les classiques milanais : risotto alla milanese, cotoletta et ossobuco."
      },
      bars: {
        title: "Où prendre l’aperitivo et boire un verre à Milan",
        body: "L’aperitivo est une institution milanaise, et c’est dans l’heure qui précède le repas du soir que les bars de la ville sont au meilleur de leur forme. Les canaux des Navigli sont le secteur le plus animé, Brera et Porta Venezia sont parfaits pour les cocktails, Isola a une scène de quartier détendue, et des enoteche historiques servent le vin au verre dans toute la ville."
      },
      cafes: {
        title: "La culture du café à Milan",
        body: "À Milan, le café se boit traditionnellement vite : un espresso au comptoir d’un bar de quartier. À côté de ce rituel, tu trouveras des pasticcerie historiques avec salon de thé et un nombre croissant de coffee shops de spécialité où l’on s’assoit et où l’on prend son temps."
      },
      hotels: {
        title: "Où dormir à Milan",
        body: "Le quartier de la mode et les rues autour du Duomo réunissent les grandes adresses. Brera est central mais plus calme, Navigli convient aux soirées au bord des canaux, et Porta Nuova et les alentours de la gare Centrale sont pratiques pour le train et les affaires. Les chambres se remplissent tôt pendant la Design Week et les semaines de la mode : mieux vaut garder une shortlist sous la main."
      }
    },
    paris: {
      restaurants: {
        title: "Où manger à Paris, quartier par quartier",
        body: "Paris récompense ceux qui savent où chercher. Les 10e et 11e arrondissements, du canal Saint-Martin vers Oberkampf et Bastille, sont le cœur de la scène des bistrots modernes et des vins nature. Le Marais mêle vieilles institutions et nouvelles adresses, Saint-Germain garde les brasseries classiques, et Montmartre et Pigalle ont leurs tables de quartier à l’écart des grands sites."
      },
      bars: {
        title: "Où sortir à Paris",
        body: "Les bars à vin et les caves à manger sont partout dans les 10e et 11e arrondissements, et les bars à cocktails se concentrent dans le Marais et autour de Pigalle. Un verre en terrasse en fin d’après-midi est une habitude parisienne à adopter dans n’importe quel arrondissement."
      },
      cafes: {
        title: "Les deux visages du café parisien",
        body: "Le café parisien traditionnel, avec son comptoir en zinc et ses chaises de terrasse tournées vers la rue, côtoie une nouvelle génération de coffee shops de spécialité, dont beaucoup se trouvent dans les 10e et 11e arrondissements et dans le Marais. Le premier, c’est pour regarder la ville passer. Le second, c’est pour le café."
      },
      hotels: {
        title: "Où dormir à Paris",
        body: "L’arrondissement compte autant que l’hôtel. Le Marais et Saint-Germain sont centraux et se parcourent à pied, Montmartre et Pigalle ont de plus petites adresses de charme et une ambiance de village, et le 8e et les rues autour de la place Vendôme abritent les palaces. Les 10e et 11e sont ceux qui te rapprochent le plus des nouveaux restaurants et bars."
      }
    },
    tokyo: {
      restaurants: {
        title: "Où manger à Tokyo, quartier par quartier",
        body: "Tokyo est une ville de spécialistes : un comptoir qui ne sert que du tonkatsu, des udon, des ramen ou des yakitori, souvent avec une poignée de places. Shibuya et Shinjuku ont une forte densité d’izakaya, Ginza a les comptoirs les plus formels, et des quartiers comme Shimokitazawa, Nakameguro et Koenji offrent une scène plus locale et plus détendue. Beaucoup de petites adresses ne fonctionnent que sur réservation : autant les enregistrer avant un voyage."
      },
      bars: {
        title: "Où sortir à Tokyo",
        body: "Les bars de Tokyo sont souvent minuscules : un comptoir, quelques tabourets et une seule personne derrière le bar. Golden Gai, à Shinjuku, en concentre des dizaines dans quelques ruelles, Ginza est connu pour ses bars à cocktails classiques, et Shibuya et Shimokitazawa mêlent salles de concert, listening bars et bars où l’on boit debout. Les izakaya brouillent la frontière entre le bar et le dîner."
      },
      cafes: {
        title: "Les deux visages du café à Tokyo",
        body: "Deux cultures du café se partagent la ville : le kissaten, café à l’ancienne avec son café filtre préparé à la main et ses épaisses tranches de pain grillé, et une nouvelle vague de torréfacteurs de spécialité et de bars à matcha. On trouve les deux de Ginza à Shibuya, Koenji et Kagurazaka, souvent à l’étage ou dans une petite rue tranquille."
      }
    }
  },
}
