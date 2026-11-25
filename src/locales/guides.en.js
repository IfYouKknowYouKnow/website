// English copy for the city guides. Each language has a file with exactly the same
// shape (guides.de.js, guides.fr.js, guides.it.js). src/cityGuides.js combines this
// copy with the query configuration for each city, so no wording lives there.
//
// Functions receive the city's display name in this language (see `cities`).

// Shared wording for a category guide ("Restaurants in Zurich"). A language that needs
// different grammar per category can write each `topic` out in full instead.
const categoryTopic = (plural, lower, eyebrowNoun, ctaTitle) => (city) => ({
  title: `${plural} in ${city}`,
  seoTitle: `${plural} in ${city}: Local Tips & Top Picks`,
  eyebrow: `${city} ${eyebrowNoun} guide`,
  intro: `Looking for ${lower} in ${city}? Start with five places the YouKnow community saves and recommends, each with its address and the vibe it suits, then explore the full ${city} map in the free app.`,
  metaDescription: `${plural} in ${city} recommended by the YouKnow community: five top picks with addresses and vibe tags. Find more local tips in the free app.`,
  sectionTitle: `Five ${city} ${lower} to try`,
  sectionIntro: `These picks are ranked by real save activity in YouKnow. They are a preview of the ${lower} on the community map, and the list changes as people share new finds.`,
  ctaTitle,
  ctaBody: `Discover more ${lower} in ${city} on YouKnow, recommended by friends and curators you trust.`,
  ctaLabel: `Discover more ${city} ${lower} on YouKnow`,
})

const categoryFaq = (lower) => (city) => ({
  question: `Where can I find good ${lower} in ${city}?`,
  answer: `Start with the five ${lower} on this page, ranked by how often the YouKnow community has saved them in ${city}. The free YouKnow app has the wider ${city} map, where you can filter by category and vibe, see what friends and curators recommend and save your own list.`,
})

export default {
  // Display names. The place database is always queried with the English name.
  cities: { zurich: 'Zurich', geneva: 'Geneva', berlin: 'Berlin', milan: 'Milan', paris: 'Paris', tokyo: 'Tokyo' },

  // Search title and description for a city's main guide.
  hubMeta: (city, hasHotels) => ({
    title: hasHotels ? `${city} Restaurants, Bars, Cafés & Hotels` : `${city} Restaurants, Bars & Cafés`,
    description: `Local tips for ${city}: ${hasHotels ? 'restaurants, bars, cafés and hotels' : 'restaurants, bars and cafés'} recommended by the YouKnow community. Preview five top picks and discover more in the free app.`,
  }),

  cityFaq: (city) => [
    {
      question: `Where do these ${city} recommendations come from?`,
      answer: `They come from real places saved and recommended in YouKnow. The public guide shows five examples; the app contains the wider ${city} community map.`,
    },
    {
      question: 'Does YouKnow use star ratings?',
      answer: 'No. YouKnow is built around recommendations from friends, local communities, creators and people whose taste you trust rather than anonymous star ratings.',
    },
    {
      question: `Can I save my own ${city} places?`,
      answer: 'Yes. In YouKnow you can save places, organise them on your map and share lists with friends or your community.',
    },
  ],

  // Main guides ranked by community recommendations (Milan, Paris, Tokyo).
  communityHub: (city) => ({
    title: `Discover ${city} Like a Local`,
    eyebrow: 'YouKnow city guide',
    intro: `Your next ${city} find starts with people who know a good place. Explore five of the most recommended spots from the YouKnow community, then find more in the app.`,
    sectionTitle: `Top picks in ${city}`,
    sectionIntro: `Five places ranked by community recommendations, with saves breaking ties. This is a small preview of the wider ${city} map; rankings update as the community shares new finds.`,
    ctaTitle: 'Five good places. A whole city to explore.',
    ctaBody: `Discover more ${city} recommendations from friends and curators you trust. Save your favourites and build your own map in YouKnow.`,
    ctaLabel: `Explore more of ${city} on YouKnow`,
  }),

  // Category guides: restaurants, bars, cafés and hotels in every city.
  kinds: {
    restaurants: {
      plural: 'Restaurants',
      topic: categoryTopic('Restaurants', 'restaurants', 'restaurant', 'Five tables to start with. A whole city to taste.'),
      choosing: (city) => ({ title: `How to choose a restaurant in ${city}`, body: `Start with the plan rather than a score. A quick lunch, a long dinner with friends and a table for a special occasion call for different places. Every recommendation in YouKnow keeps its category, address and vibe tags, so you can search ${city} for how a meal should feel as well as what is on the menu.` }),
      faq: categoryFaq('restaurants'),
    },
    bars: {
      plural: 'Bars',
      topic: categoryTopic('Bars', 'bars', 'bar', 'Five bars to start with. The rest are on the map.'),
      choosing: (city) => ({ title: `Finding the right bar in ${city}`, body: `A first drink, a late one and a night built around music are different plans. Vibe tags such as lively, intimate or good for groups make it easier to pick the ${city} bar that fits the evening, rather than the one with the most reviews.` }),
      faq: categoryFaq('bars'),
    },
    cafes: {
      plural: 'Cafés',
      topic: categoryTopic('Cafés', 'cafés', 'café', 'Want to keep exploring?'),
      choosing: (city) => ({ title: `Choosing a café in ${city}`, body: `The right café depends on the moment: a quick espresso, a slow breakfast, somewhere to work for an hour or a place to meet a friend. YouKnow keeps that context next to the address, so a ${city} café recommendation tells you what the place is good for, not only that someone liked it.` }),
      faq: categoryFaq('cafés'),
    },
    hotels: {
      plural: 'Hotels',
      topic: categoryTopic('Hotels', 'hotels', 'hotel', 'Found a place to stay? Now find where to eat.'),
      choosing: (city) => ({ title: `Choosing a hotel in ${city}`, body: `A hotel recommendation from someone whose taste you trust says more than a star category. In YouKnow, hotels sit on the same map as the restaurants, cafés and bars around them, so you can see what is within walking distance and keep a ${city} shortlist ready for your next trip.` }),
      faq: categoryFaq('hotels'),
    },
  },

  // Everything below is plain text: hand-written copy for specific cities.
  // hubs: main guides for Zurich, Geneva and Berlin.
  // communitySections: editorial sections for Milan, Paris and Tokyo.
  // zurichTopics: Zurich's mood guides, plus its original café and bar guides.
  // localContext: the neighbourhood paragraph on each category guide.
  hubs: {
    zurich: {
      title: "Discover Zurich Like a Local",
      eyebrow: "YouKnow city guide",
      intro: "Looking for restaurants, cafés, bars and hidden gems in Zurich? Start with five real places saved and recommended by the YouKnow community.",
      sectionTitle: "Places to start with in Zurich",
      sectionIntro: "These five community picks are ranked using real save activity in YouKnow. They are a useful preview, not the full Zurich map.",
      ctaTitle: "Want the full list?",
      ctaBody: "YouKnow contains more restaurant, café and bar recommendations across Zurich, curated and saved by people in the community.",
      ctaLabel: "Discover more places in Zurich on YouKnow",
      contentSections: [
        {
          title: "How to discover Zurich beyond the obvious places",
          body: "Start with context, not a generic ranking. A recommendation for a quiet coffee serves a different plan from a rooftop drink or a relaxed dinner. YouKnow brings those signals together on a living map shaped by people who actually saved the places."
        },
        {
          title: "Why recommendations from people you trust are different",
          body: "Anonymous ratings flatten every visit into one number. A recommendation from a friend, local curator or community keeps the useful part: who liked the place, what it suits and why it may fit your own plans in Zurich."
        }
      ]
    },
    geneva: {
      title: "Discover Geneva Like a Local",
      eyebrow: "YouKnow city guide",
      intro: "Looking for restaurants, cafés, bars and hidden gems in Geneva? Start with five real places saved and recommended by the YouKnow community.",
      sectionTitle: "Places to start with in Geneva",
      sectionIntro: "These five community picks are ranked using real save activity in YouKnow. They are a useful preview, not the full Geneva map.",
      ctaTitle: "Want the full list?",
      ctaBody: "YouKnow contains more restaurant, café and bar recommendations across Geneva, curated and saved by people in the community.",
      ctaLabel: "Discover more places in Geneva on YouKnow",
      contentSections: [
        {
          title: "How to discover Geneva beyond the obvious places",
          body: "Start with the plan rather than a generic ranking. A relaxed lakeside café, an intimate dinner and a lively bar serve different moments. YouKnow keeps those useful signals attached to recommendations from people who saved the places."
        },
        {
          title: "Why community recommendations add useful context",
          body: "Anonymous ratings compress every visit into one number. Recommendations from friends, local curators and communities preserve what a place suits and why it may fit your own plans in Geneva."
        }
      ]
    },
    berlin: {
      title: "Discover Berlin Like a Local",
      eyebrow: "YouKnow city guide",
      intro: "Looking for restaurants, cafés, bars and hidden gems in Berlin? Start with five real places saved and recommended by the YouKnow community.",
      sectionTitle: "Places to start with in Berlin",
      sectionIntro: "These five community picks are ranked using real save activity in YouKnow. They are a useful preview, not the full Berlin map.",
      ctaTitle: "Want the full list?",
      ctaBody: "YouKnow contains more restaurant, café and bar recommendations across Berlin, curated and saved by people in the community.",
      ctaLabel: "Discover more places in Berlin on YouKnow",
      contentSections: [
        {
          title: "How to discover Berlin beyond the obvious places",
          body: "Berlin changes block by block and plan by plan. Starting with atmosphere, category and trusted recommendations makes it easier to find a neighbourhood café, dinner spot or late-night bar that fits the moment."
        },
        {
          title: "Why local context matters in a city this varied",
          body: "A single rating cannot explain whether a place suits a quiet morning, a casual group meal or a night out. YouKnow keeps community saves and vibe signals together so recommendations remain useful."
        }
      ]
    }
  },

  communitySections: {
    milan: [
      {
        title: "From a coffee stop to a long dinner",
        body: "A pastry stop, an aperitivo and a dinner with friends all call for something different. Start with the places the community recommends, then use categories and vibe tags to find the Milan spot that fits your plan."
      },
      {
        title: "Keep your own Milan shortlist",
        body: "Save the places you want to try alongside the ones you already love. Follow friends and curators whose taste matches yours, and keep their Milan recommendations together on your map."
      }
    ],
    paris: [
      {
        title: "Find your kind of Paris",
        body: "A neighbourhood bistro, a wine bar and a coffee with a friend each make a different kind of day. Community recommendations give you a starting point, with addresses and vibe tags to help you choose."
      },
      {
        title: "Good addresses are better shared",
        body: "Keep the Paris places you hear about in one place. Save a friend’s recommendation, follow a curator you trust and share your own finds when someone asks where to go."
      }
    ],
    tokyo: [
      {
        title: "Make room for more than dinner",
        body: "The Tokyo community map includes places to eat, drink and explore. Start with these recommendations, then follow the categories and vibe tags that fit the kind of day or night you have in mind."
      },
      {
        title: "Turn recommendations into a Tokyo map",
        body: "Bring the places your friends mention and the curators you follow into one shortlist. Keep your want-to-go spots ready in YouKnow, then pass on the places you end up loving."
      }
    ]
  },

  zurichTopics: {
    bars: {
      title: "Bars in Zurich",
      seoTitle: "Bars in Zurich: Local Tips & Top Picks",
      eyebrow: "Zurich bar guide",
      intro: "Looking for a bar in Zurich? Start with five real places saved and recommended by the YouKnow community.",
      sectionTitle: "Five Zurich bars to try",
      sectionIntro: "These picks preview the bars and drinking spots available on the community map.",
      ctaTitle: "The night does not end here.",
      ctaBody: "Discover more bars in Zurich on YouKnow.",
      ctaLabel: "Discover more Zurich bars on YouKnow",
      contentSections: [
        {
          title: "Finding the right kind of bar in Zurich",
          body: "A rooftop drink, a lively group bar and a quiet wine spot answer different questions. YouKnow combines categories with real vibe tags so you can start with the kind of evening you want."
        },
        {
          title: "Why local bar recommendations need context",
          body: "Useful recommendations explain more than whether someone liked a place. Atmosphere, occasion and community saves help turn a long list of Zurich bars into a smaller set that fits the night."
        }
      ]
    },
    cafes: {
      title: "Cafés in Zurich",
      seoTitle: "Cafés in Zurich: Local Tips & Top Picks",
      eyebrow: "Zurich café guide",
      intro: "Looking for coffee in Zurich? Start with five real café recommendations saved by the YouKnow community.",
      sectionTitle: "Five Zurich cafés to start with",
      sectionIntro: "These public picks are a small preview of the cafés available on the YouKnow map.",
      ctaTitle: "Want to keep exploring?",
      ctaBody: "Find more cafés across Zurich on YouKnow.",
      ctaLabel: "Discover more Zurich cafés on YouKnow",
      contentSections: [
        {
          title: "Choosing a Zurich café for the moment",
          body: "The right café depends on the plan: a quick espresso, an unhurried breakfast, a place to work or somewhere to meet a friend. Community tags in YouKnow keep that context visible alongside the address and category."
        },
        {
          title: "Coffee recommendations beyond a generic rating",
          body: "A rating says little about atmosphere or who a café suits. Saved recommendations and descriptive signals make it easier to choose a place that fits the time of day and the experience you want."
        }
      ]
    },
    "cosy-restaurants": {
      title: "Cosy Restaurants in Zurich",
      eyebrow: "Zurich by vibe",
      intro: "Looking for a cosy dinner in Zurich? Here are five restaurant matches from the YouKnow community to start with, selected using real saves within the cosy restaurant filter.",
      sectionTitle: "Five cosy Zurich places to try",
      sectionIntro: "Each place below is a real YouKnow recommendation with the category, address, description and vibe metadata currently available in the community map.",
      ctaTitle: "We picked 5. There are more on YouKnow.",
      ctaBody: "Explore more cosy restaurants in Zurich in the app.",
      ctaLabel: "Discover more cosy restaurants on YouKnow",
      contentSections: [
        {
          title: "What makes a restaurant feel cosy?",
          body: "A cosy restaurant is less about a formal score and more about context: warm atmosphere, comfortable conversation, welcoming service and the kind of room that suits an unhurried dinner. YouKnow keeps those vibe signals attached to the place so you can search for how an evening should feel."
        },
        {
          title: "Where to find cosy restaurants in Zurich",
          body: "Zurich’s most inviting dinner spots are spread across the centre and its surrounding neighbourhoods, from old-town rooms to relaxed terraces and local café-restaurants. The address on every recommendation helps you place it in the city before opening the full map in YouKnow."
        },
        {
          title: "Finding restaurants by vibe instead of rating",
          body: "A single rating cannot tell you whether a place is right for a quiet date, a lively group dinner or an easy weeknight meal. Searching by vibe adds that missing context and lets recommendations from people you trust do the useful work."
        }
      ]
    },
    "date-night": {
      title: "Date Night Places in Zurich",
      eyebrow: "Zurich by vibe",
      intro: "Planning a date night in Zurich? Here are five real places matched with date-friendly or romantic community tags in YouKnow.",
      sectionTitle: "Five Zurich date-night picks",
      sectionIntro: "Use these community recommendations as a starting point, then explore the wider map in the app.",
      ctaTitle: "Find the right place for the two of you.",
      ctaBody: "Explore more date-night recommendations in Zurich on YouKnow.",
      ctaLabel: "Discover more date-night places on YouKnow",
      contentSections: [
        {
          title: "Planning a Zurich date night by atmosphere",
          body: "The best choice depends on whether the evening calls for intimate conversation, a lively room, dinner or drinks. Date-friendly and romantic tags give each recommendation the context a single popularity score cannot."
        },
        {
          title: "From a first idea to the full map",
          body: "Use the five public picks to understand the range, then continue in YouKnow to compare more community recommendations and save the places that suit your own plan."
        }
      ]
    },
    "hidden-gems": {
      title: "Hidden Gems in Zurich",
      eyebrow: "Zurich beyond the obvious",
      intro: "Looking beyond the obvious Zurich addresses? Start with five real community places tagged as hidden gems or local favourites in YouKnow.",
      sectionTitle: "Five local Zurich picks",
      sectionIntro: "These real records are a small preview of the community’s wider Zurich map.",
      ctaTitle: "There is more beneath the surface.",
      ctaBody: "Discover more local recommendations across Zurich on YouKnow.",
      ctaLabel: "Discover more Zurich hidden gems on YouKnow",
      contentSections: [
        {
          title: "What makes a Zurich place feel like a local find?",
          body: "A local find is not defined by obscurity alone. It is often a place people return to, save for friends or value for a particular mood. Community signals help surface that context without inventing a universal hidden-gem ranking."
        },
        {
          title: "Explore beyond the five public picks",
          body: "These five recommendations show the kind of local context available on YouKnow. The app keeps the wider Zurich map, where more saved places can be explored by category, people and vibe."
        }
      ]
    }
  },

  localContext: {
    zurich: {
      restaurants: {
        title: "Where to eat in Zurich, by neighbourhood",
        body: "Zurich packs a lot of range into a compact city. Kreis 4 and Kreis 5, around Langstrasse and Zürich West, are where much of the newer, more casual dining happens. The old town on both sides of the Limmat keeps the traditional rooms and guild houses, and Seefeld and the lakefront suit a long lunch when the weather is good. Vegetarian cooking has deep roots here too: Haus Hiltl has been serving it since 1898."
      },
      bars: {
        title: "Where to go out in Zurich",
        body: "Langstrasse in Kreis 4 is the heart of Zurich nightlife, the lanes of the Niederdorf are lined with small old-town bars, and Zürich West mixes bars with clubs and concert venues. In summer the lake and river baths turn into open-air bars once the swimmers have gone home."
      },
      cafes: {
        title: "Where to find good coffee in Zurich",
        body: "Specialty coffee has spread well beyond the centre. Kreis 3, 4 and 5 are full of neighbourhood cafés, the Niederdorf has old-town terraces, and Seefeld is made for a slow morning near the lake."
      },
      hotels: {
        title: "Where to stay in Zurich",
        body: "Where you stay shapes the Zurich you see. The old town and the streets around Bahnhofstrasse put you within walking distance of the lake and the main station. Kreis 4 and Kreis 5 trade quiet for nightlife, galleries and late dinners, while Seefeld and Enge sit close to the water. The city is compact and the trams are frequent, so no neighbourhood is far from the others."
      }
    },
    geneva: {
      restaurants: {
        title: "Where to eat in Geneva, by neighbourhood",
        body: "Geneva is small enough to cross on foot, and each side eats differently. Pâquis, near the station, is the most international quarter, dense with Asian, African and Middle Eastern kitchens. Eaux-Vives on the left bank mixes bistros with newer openings, Plainpalais and Jonction are younger and more casual, and Carouge, a short tram ride south, feels like a village of its own with terraces and small dining rooms."
      },
      bars: {
        title: "Where to go out in Geneva",
        body: "Rue de l’École-de-Médecine in Plainpalais is the city’s classic bar street. Eaux-Vives and Pâquis have cocktail and natural-wine spots, Carouge is good for an unhurried glass, and in summer the lakeside and the banks of the Rhône at Jonction fill up with open-air buvettes."
      },
      cafes: {
        title: "Where to find good coffee in Geneva",
        body: "Old-town squares such as Place du Bourg-de-Four are made for terrace coffee. Carouge has tea rooms and pâtisseries, Eaux-Vives and Plainpalais have the newer specialty-coffee addresses, and the lakefront buvettes are for the days when the view matters more than the roast."
      },
      hotels: {
        title: "Where to stay in Geneva",
        body: "The grand hotels line the lake on both banks. The streets around Cornavin station are practical for short stays, while Eaux-Vives and Carouge make more residential bases. Community lists also reach beyond the city limits, to villages along the lake and the countryside nearby, which is worth knowing if you want a quieter stay within easy reach of Geneva."
      }
    },
    berlin: {
      restaurants: {
        title: "Where to eat in Berlin, by neighbourhood",
        body: "There is no single centre for eating in Berlin. Kreuzberg and Neukölln have the densest mix, from Turkish grills and Vietnamese kitchens to natural-wine bistros. Mitte and Prenzlauer Berg lean towards polished neighbourhood restaurants, and Charlottenburg keeps the West Berlin classics, with Kantstrasse known for its Asian restaurants."
      },
      bars: {
        title: "Where to go out in Berlin",
        body: "Berlin bars stay open late and take themselves lightly. Kreuzberg and Neukölln are full of corner pubs, wine bars and cocktail rooms within walking distance of one another. Friedrichshain is busier and louder, and Schöneberg and Charlottenburg have the classic cocktail bars. In summer, canal banks and beer gardens become part of the night."
      },
      cafes: {
        title: "Where to find good coffee in Berlin",
        body: "Specialty coffee is easy to find in Berlin, with cafés spread across Kreuzberg, Neukölln, Mitte and Prenzlauer Berg. Many double as breakfast and brunch places, some as a workspace for the afternoon, and plenty bake their own cakes."
      },
      hotels: {
        title: "Where to stay in Berlin",
        body: "Choosing a Berlin hotel is mostly choosing a neighbourhood. Mitte is central for museums and sights. Charlottenburg, around the Zoo and Kurfürstendamm, offers West Berlin calm, and Kreuzberg and Friedrichshain put you close to restaurants, bars and clubs. The city is large, so staying near a U-Bahn or S-Bahn line matters more than staying in the middle."
      }
    },
    milan: {
      restaurants: {
        title: "Where to eat in Milan, by neighbourhood",
        body: "Milan eats in its neighbourhoods. Navigli and Porta Genova are lively around the canals, Brera has elegant dining rooms on cobbled streets, and Isola and Porta Venezia are where many newer bistros and wine-led kitchens have opened. Across the city, traditional trattorie still serve the Milanese classics: risotto alla milanese, cotoletta and ossobuco."
      },
      bars: {
        title: "Where to go for aperitivo and drinks in Milan",
        body: "Aperitivo is a Milanese institution, and the hour before dinner is when the city’s bars are at their best. The Navigli canals are the busiest stretch, Brera and Porta Venezia are good for cocktails, Isola has a relaxed neighbourhood scene, and historic enoteche pour wine by the glass all over the city."
      },
      cafes: {
        title: "Coffee culture in Milan",
        body: "Coffee in Milan is traditionally fast: an espresso at the counter of a neighbourhood bar. Alongside that ritual you will find historic pasticcerie with tea rooms and a growing number of specialty coffee shops where people sit down and stay a while."
      },
      hotels: {
        title: "Where to stay in Milan",
        body: "The fashion district and the streets around the Duomo have the grand addresses. Brera is central but quieter, Navigli suits evenings by the canals, and Porta Nuova and the area around Centrale station are practical for trains and business. Rooms fill early during Design Week and the fashion weeks, so it helps to keep a shortlist ready."
      }
    },
    paris: {
      restaurants: {
        title: "Where to eat in Paris, by neighbourhood",
        body: "Paris rewards knowing where to look. The 10th and 11th arrondissements, from Canal Saint-Martin towards Oberkampf and Bastille, are the heart of the modern bistro and natural-wine scene. The Marais mixes old institutions with new openings, Saint-Germain keeps the classic brasseries, and Montmartre and Pigalle have neighbourhood tables away from the main sights."
      },
      bars: {
        title: "Where to go out in Paris",
        body: "Wine bars and caves à manger are everywhere in the 10th and 11th arrondissements, and cocktail bars cluster in the Marais and around Pigalle. A glass on a terrace at the end of the afternoon is a Paris habit worth adopting in any arrondissement."
      },
      cafes: {
        title: "Two kinds of Paris café",
        body: "The traditional Paris café, with its zinc counter and terrace chairs facing the street, sits alongside a newer generation of specialty coffee shops, many of them in the 10th and 11th arrondissements and the Marais. The first is for watching the city go by. The second is for the coffee."
      },
      hotels: {
        title: "Where to stay in Paris",
        body: "The arrondissement matters as much as the hotel. The Marais and Saint-Germain are central and walkable, Montmartre and Pigalle have smaller boutique addresses and a village feel, and the 8th and the streets around Place Vendôme hold the palace hotels. The 10th and 11th put you nearest to the newer restaurants and bars."
      }
    },
    tokyo: {
      restaurants: {
        title: "Where to eat in Tokyo, by neighbourhood",
        body: "Tokyo is a city of specialists: a counter that serves only tonkatsu, udon, ramen or yakitori, often with a handful of seats. Shibuya and Shinjuku have a high density of izakaya, Ginza has the formal counters, and neighbourhoods such as Shimokitazawa, Nakameguro and Koenji have a more local, relaxed scene. Many small places are reservation-only, so it is worth saving them ahead of a trip."
      },
      bars: {
        title: "Where to go out in Tokyo",
        body: "Tokyo bars are often tiny: a counter, a few stools and one person behind the bar. Golden Gai in Shinjuku packs dozens of them into a few alleys, Ginza is known for classic cocktail bars, and Shibuya and Shimokitazawa mix live music venues, listening bars and standing bars. Izakaya blur the line between a bar and dinner."
      },
      cafes: {
        title: "Two kinds of Tokyo café",
        body: "Two café cultures share the city: the kissaten, an old-style coffee house with hand-dripped coffee and thick toast, and a newer wave of specialty roasters and matcha bars. Both can be found from Ginza to Shibuya, Koenji and Kagurazaka, often on an upper floor or a quiet back street."
      }
    }
  },
}
