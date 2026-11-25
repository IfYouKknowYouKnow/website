// German copy for the city guides. Same shape as guides.en.js; see that file for how it is used.
//
// Functions receive the city's German display name (see `cities`).

// Shared wording for a category guide ("Restaurants in Zürich"). German nouns keep their
// capital letter, so the plural label is used throughout.
const categoryTopic = (plural, eyebrowNoun, ctaTitle) => (city) => ({
  title: `${plural} in ${city}`,
  seoTitle: `${plural} in ${city}: Lokale Tipps & Top-Adressen`,
  eyebrow: `${eyebrowNoun}-Guide ${city}`,
  intro: `Du suchst ${plural} in ${city}? Starte mit fünf Orten, die die YouKnow-Community speichert und empfiehlt, jeweils mit Adresse und passendem Vibe. Die ganze Karte von ${city} entdeckst du dann in der kostenlosen App.`,
  metaDescription: `${plural} in ${city}, empfohlen von der YouKnow-Community: fünf Top-Adressen mit Adresse und Vibe-Tags. Mehr lokale Tipps findest du in der kostenlosen App.`,
  sectionTitle: `Fünf ${plural} in ${city} zum Ausprobieren`,
  sectionIntro: `Diese Auswahl richtet sich danach, wie oft die Orte in YouKnow tatsächlich gespeichert werden. Sie ist ein Vorgeschmack auf die ${plural} auf der Community-Karte, und die Liste ändert sich, sobald Leute neue Entdeckungen teilen.`,
  ctaTitle,
  ctaBody: `Entdecke auf YouKnow mehr ${plural} in ${city}, empfohlen von Freunden und Kuratoren, denen du vertraust.`,
  ctaLabel: `Mehr ${plural} in ${city} auf YouKnow entdecken`,
})

const categoryFaq = (plural) => (city) => ({
  question: `Wo finde ich gute ${plural} in ${city}?`,
  answer: `Starte mit den fünf ${plural} auf dieser Seite, sortiert danach, wie oft die YouKnow-Community sie in ${city} gespeichert hat. In der kostenlosen YouKnow-App findest du die ganze Karte von ${city}: Dort filterst du nach Kategorie und Vibe, siehst, was Freunde und Kuratoren empfehlen, und speicherst deine eigene Liste.`,
})

export default {
  // Display names. The place database is always queried with the English name.
  cities: { zurich: 'Zürich', geneva: 'Genf', berlin: 'Berlin', milan: 'Mailand', paris: 'Paris', tokyo: 'Tokio' },

  // Search title and description for a city's main guide.
  hubMeta: (city, hasHotels) => ({
    title: hasHotels ? `Restaurants, Bars, Cafés & Hotels in ${city}` : `Restaurants, Bars & Cafés in ${city}`,
    description: `Lokale Tipps für ${city}: ${hasHotels ? 'Restaurants, Bars, Cafés und Hotels' : 'Restaurants, Bars und Cafés'}, empfohlen von der YouKnow-Community. Fünf Top-Adressen als Vorschau, mehr in der kostenlosen App.`,
  }),

  cityFaq: (city) => [
    {
      question: `Woher kommen diese Empfehlungen für ${city}?`,
      answer: `Von echten Orten, die in YouKnow gespeichert und empfohlen wurden. Der öffentliche Guide zeigt fünf Beispiele; in der App findest du die ganze Community-Karte von ${city}.`,
    },
    {
      question: 'Arbeitet YouKnow mit Sternebewertungen?',
      answer: 'Nein. Bei YouKnow geht es um Empfehlungen von Freunden, lokalen Communitys, Creators und Menschen, deren Geschmack du vertraust – nicht um anonyme Sternebewertungen.',
    },
    {
      question: `Kann ich meine eigenen Orte in ${city} speichern?`,
      answer: 'Ja. In YouKnow kannst du Orte speichern, auf deiner Karte ordnen und Listen mit Freunden oder deiner Community teilen.',
    },
  ],

  // Main guides ranked by community recommendations (Milan, Paris, Tokyo).
  communityHub: (city) => ({
    title: `${city} entdecken wie ein Local`,
    eyebrow: 'YouKnow City Guide',
    intro: `Deine nächste Entdeckung in ${city} beginnt bei Menschen, die gute Orte kennen. Entdecke fünf der meistempfohlenen Spots der YouKnow-Community und finde weitere in der App.`,
    sectionTitle: `Top-Tipps in ${city}`,
    sectionIntro: `Fünf Orte, sortiert nach Community-Empfehlungen; bei Gleichstand entscheidet, wie oft sie gespeichert wurden. Das ist ein kleiner Ausschnitt der ganzen Karte von ${city}, und die Reihenfolge ändert sich, sobald die Community neue Entdeckungen teilt.`,
    ctaTitle: 'Fünf gute Orte. Eine ganze Stadt zum Entdecken.',
    ctaBody: `Entdecke mehr Empfehlungen für ${city} von Freunden und Kuratoren, denen du vertraust. Speichere deine Favoriten und bau dir in YouKnow deine eigene Karte.`,
    ctaLabel: `Mehr von ${city} auf YouKnow entdecken`,
  }),

  // Category guides: restaurants, bars, cafés and hotels in every city.
  kinds: {
    restaurants: {
      plural: 'Restaurants',
      topic: categoryTopic('Restaurants', 'Restaurant', 'Fünf Tische für den Anfang. Eine ganze Stadt zum Probieren.'),
      choosing: (city) => ({ title: `So findest du das richtige Restaurant in ${city}`, body: `Starte mit dem Plan, nicht mit einer Punktzahl. Ein schnelles Mittagessen, ein langes Abendessen mit Freunden und ein Tisch für einen besonderen Anlass verlangen nach unterschiedlichen Orten. Jede Empfehlung in YouKnow behält Kategorie, Adresse und Vibe-Tags. So suchst du in ${city} nicht nur danach, was auf der Karte steht, sondern auch danach, wie sich ein Essen anfühlen soll.` }),
      faq: categoryFaq('Restaurants'),
    },
    bars: {
      plural: 'Bars',
      topic: categoryTopic('Bars', 'Bar', 'Fünf Bars für den Anfang. Der Rest ist auf der Karte.'),
      choosing: (city) => ({ title: `So findest du die richtige Bar in ${city}`, body: `Ein erster Drink, ein später Absacker und eine Nacht rund um Musik sind verschiedene Pläne. Vibe-Tags wie lebhaft, intim oder gut für Gruppen helfen dir, in ${city} die Bar zu finden, die zum Abend passt, und nicht die mit den meisten Bewertungen.` }),
      faq: categoryFaq('Bars'),
    },
    cafes: {
      plural: 'Cafés',
      topic: categoryTopic('Cafés', 'Café', 'Lust auf mehr?'),
      choosing: (city) => ({ title: `So wählst du ein Café in ${city}`, body: `Das richtige Café hängt vom Moment ab: ein schneller Espresso, ein gemütliches Frühstück, eine Stunde arbeiten oder ein Treffen mit Freunden. YouKnow behält diesen Kontext direkt bei der Adresse. So verrät dir eine Café-Empfehlung für ${city}, wofür sich der Ort eignet, und nicht nur, dass er jemandem gefallen hat.` }),
      faq: categoryFaq('Cafés'),
    },
    hotels: {
      plural: 'Hotels',
      topic: categoryTopic('Hotels', 'Hotel', 'Unterkunft gefunden? Dann finde jetzt, wo du isst.'),
      choosing: (city) => ({ title: `So wählst du ein Hotel in ${city}`, body: `Eine Hotelempfehlung von jemandem, dessen Geschmack du vertraust, sagt mehr als eine Sternekategorie. In YouKnow liegen Hotels auf derselben Karte wie die Restaurants, Cafés und Bars drumherum. So siehst du, was zu Fuss erreichbar ist, und hast für deine nächste Reise eine Shortlist für ${city} parat.` }),
      faq: categoryFaq('Hotels'),
    },
  },

  // Everything below is plain text: hand-written copy for specific cities.
  // hubs: main guides for Zurich, Geneva and Berlin.
  // communitySections: editorial sections for Milan, Paris and Tokyo.
  // zurichTopics: Zurich's mood guides, plus its original café and bar guides.
  // localContext: the neighbourhood paragraph on each category guide.
  hubs: {
    zurich: {
      title: "Zürich entdecken wie ein Local",
      eyebrow: "YouKnow City Guide",
      intro: "Du suchst Restaurants, Cafés, Bars und Geheimtipps in Zürich? Starte mit fünf echten Orten, die die YouKnow-Community gespeichert und empfohlen hat.",
      sectionTitle: "Orte für den Einstieg in Zürich",
      sectionIntro: "Diese fünf Community-Tipps sind danach sortiert, wie oft sie in YouKnow tatsächlich gespeichert wurden. Sie sind ein guter Vorgeschmack, aber nicht die ganze Karte von Zürich.",
      ctaTitle: "Lust auf die ganze Liste?",
      ctaBody: "In YouKnow findest du weitere Restaurant-, Café- und Bar-Empfehlungen in ganz Zürich, kuratiert und gespeichert von Menschen aus der Community.",
      ctaLabel: "Mehr Orte in Zürich auf YouKnow entdecken",
      contentSections: [
        {
          title: "Zürich abseits der bekannten Adressen entdecken",
          body: "Starte mit dem Kontext, nicht mit einem allgemeinen Ranking. Eine Empfehlung für einen ruhigen Kaffee passt zu einem anderen Plan als ein Drink auf der Dachterrasse oder ein entspanntes Abendessen. YouKnow bringt diese Signale auf einer lebendigen Karte zusammen, geprägt von Menschen, die die Orte tatsächlich gespeichert haben."
        },
        {
          title: "Warum Empfehlungen von Menschen, denen du vertraust, anders sind",
          body: "Anonyme Bewertungen pressen jeden Besuch in eine einzige Zahl. Eine Empfehlung von Freunden, lokalen Kuratoren oder einer Community bewahrt das Nützliche: wem der Ort gefallen hat, wofür er sich eignet und warum er zu deinen Plänen in Zürich passen könnte."
        }
      ]
    },
    geneva: {
      title: "Genf entdecken wie ein Local",
      eyebrow: "YouKnow City Guide",
      intro: "Du suchst Restaurants, Cafés, Bars und Geheimtipps in Genf? Starte mit fünf echten Orten, die die YouKnow-Community gespeichert und empfohlen hat.",
      sectionTitle: "Orte für den Einstieg in Genf",
      sectionIntro: "Diese fünf Community-Tipps sind danach sortiert, wie oft sie in YouKnow tatsächlich gespeichert wurden. Sie sind ein guter Vorgeschmack, aber nicht die ganze Karte von Genf.",
      ctaTitle: "Lust auf die ganze Liste?",
      ctaBody: "In YouKnow findest du weitere Restaurant-, Café- und Bar-Empfehlungen in ganz Genf, kuratiert und gespeichert von Menschen aus der Community.",
      ctaLabel: "Mehr Orte in Genf auf YouKnow entdecken",
      contentSections: [
        {
          title: "Genf abseits der bekannten Adressen entdecken",
          body: "Starte mit dem Plan, nicht mit einem allgemeinen Ranking. Ein entspanntes Café am See, ein intimes Abendessen und eine lebhafte Bar passen zu unterschiedlichen Momenten. YouKnow behält diese nützlichen Signale bei den Empfehlungen der Menschen, die die Orte gespeichert haben."
        },
        {
          title: "Warum Community-Empfehlungen nützlichen Kontext liefern",
          body: "Anonyme Bewertungen verdichten jeden Besuch auf eine einzige Zahl. Empfehlungen von Freunden, lokalen Kuratoren und Communitys bewahren, wofür sich ein Ort eignet und warum er zu deinen Plänen in Genf passen könnte."
        }
      ]
    },
    berlin: {
      title: "Berlin entdecken wie ein Local",
      eyebrow: "YouKnow City Guide",
      intro: "Du suchst Restaurants, Cafés, Bars und Geheimtipps in Berlin? Starte mit fünf echten Orten, die die YouKnow-Community gespeichert und empfohlen hat.",
      sectionTitle: "Orte für den Einstieg in Berlin",
      sectionIntro: "Diese fünf Community-Tipps sind danach sortiert, wie oft sie in YouKnow tatsächlich gespeichert wurden. Sie sind ein guter Vorgeschmack, aber nicht die ganze Karte von Berlin.",
      ctaTitle: "Lust auf die ganze Liste?",
      ctaBody: "In YouKnow findest du weitere Restaurant-, Café- und Bar-Empfehlungen in ganz Berlin, kuratiert und gespeichert von Menschen aus der Community.",
      ctaLabel: "Mehr Orte in Berlin auf YouKnow entdecken",
      contentSections: [
        {
          title: "Berlin abseits der bekannten Adressen entdecken",
          body: "Berlin ändert sich von Block zu Block und von Plan zu Plan. Wenn du bei Atmosphäre, Kategorie und Empfehlungen deines Vertrauens ansetzt, findest du leichter das Kiezcafé, das Restaurant fürs Abendessen oder die Bar für späte Stunden, die zum Moment passt."
        },
        {
          title: "Warum lokaler Kontext in einer so vielfältigen Stadt zählt",
          body: "Eine einzelne Bewertung kann nicht erklären, ob ein Ort zu einem ruhigen Morgen, einem unkomplizierten Essen in der Gruppe oder einer langen Nacht passt. YouKnow hält die gespeicherten Orte der Community und die Vibe-Signale zusammen, damit Empfehlungen nützlich bleiben."
        }
      ]
    }
  },

  communitySections: {
    milan: [
      {
        title: "Vom Kaffeestopp bis zum langen Abendessen",
        body: "Ein Stopp für Gebäck, ein Aperitivo und ein Abendessen mit Freunden verlangen jeweils etwas anderes. Starte mit den Orten, die die Community empfiehlt, und finde dann mit Kategorien und Vibe-Tags den Spot in Mailand, der zu deinem Plan passt."
      },
      {
        title: "Führe deine eigene Mailand-Shortlist",
        body: "Speichere die Orte, die du ausprobieren willst, neben denen, die du schon liebst. Folge Freunden und Kuratoren, deren Geschmack zu deinem passt, und behalte ihre Empfehlungen für Mailand gesammelt auf deiner Karte."
      }
    ],
    paris: [
      {
        title: "Finde dein Paris",
        body: "Ein Bistro im Viertel, eine Weinbar und ein Kaffee mit Freunden ergeben jeweils einen anderen Tag. Community-Empfehlungen geben dir einen Ausgangspunkt, mit Adressen und Vibe-Tags, die dir bei der Wahl helfen."
      },
      {
        title: "Gute Adressen teilt man am besten",
        body: "Sammle die Orte in Paris, von denen du hörst, an einem Platz. Speichere die Empfehlung von Freunden, folge Kuratoren, denen du vertraust, und teile deine eigenen Entdeckungen, wenn jemand fragt, wohin es gehen soll."
      }
    ],
    tokyo: [
      {
        title: "Mach Platz für mehr als Abendessen",
        body: "Auf der Community-Karte von Tokio findest du Orte zum Essen, Trinken und Entdecken. Starte mit diesen Empfehlungen und folge dann den Kategorien und Vibe-Tags, die zu dem Tag oder der Nacht passen, die dir vorschwebt."
      },
      {
        title: "Mach aus Empfehlungen eine Tokio-Karte",
        body: "Bring die Orte, von denen deine Freunde erzählen, und die Kuratoren, denen du folgst, in einer Shortlist zusammen. Halte deine Wunschorte in YouKnow bereit und gib die Orte weiter, die du am Ende liebst."
      }
    ]
  },

  zurichTopics: {
    bars: {
      title: "Bars in Zürich",
      seoTitle: "Bars in Zürich: Lokale Tipps & Top-Adressen",
      eyebrow: "Bar-Guide Zürich",
      intro: "Du suchst eine Bar in Zürich? Starte mit fünf echten Orten, die die YouKnow-Community gespeichert und empfohlen hat.",
      sectionTitle: "Fünf Bars in Zürich zum Ausprobieren",
      sectionIntro: "Diese Auswahl ist ein Vorgeschmack auf die Bars und Orte für einen Drink auf der Community-Karte.",
      ctaTitle: "Die Nacht endet nicht hier.",
      ctaBody: "Entdecke mehr Bars in Zürich auf YouKnow.",
      ctaLabel: "Mehr Bars in Zürich auf YouKnow entdecken",
      contentSections: [
        {
          title: "Die richtige Art von Bar in Zürich finden",
          body: "Ein Drink auf der Dachterrasse, eine lebhafte Bar für die Gruppe und ein ruhiger Ort für ein Glas Wein beantworten unterschiedliche Fragen. YouKnow verbindet Kategorien mit echten Vibe-Tags, damit du bei der Art von Abend ansetzen kannst, die du dir wünschst."
        },
        {
          title: "Warum lokale Bar-Empfehlungen Kontext brauchen",
          body: "Nützliche Empfehlungen erklären mehr als nur, ob jemandem ein Ort gefallen hat. Atmosphäre, Anlass und die gespeicherten Orte der Community machen aus einer langen Liste von Zürcher Bars eine kleinere Auswahl, die zur Nacht passt."
        }
      ]
    },
    cafes: {
      title: "Cafés in Zürich",
      seoTitle: "Cafés in Zürich: Lokale Tipps & Top-Adressen",
      eyebrow: "Café-Guide Zürich",
      intro: "Du suchst guten Kaffee in Zürich? Starte mit fünf echten Café-Empfehlungen, gespeichert von der YouKnow-Community.",
      sectionTitle: "Fünf Cafés in Zürich für den Anfang",
      sectionIntro: "Diese öffentliche Auswahl ist ein kleiner Vorgeschmack auf die Cafés auf der YouKnow-Karte.",
      ctaTitle: "Lust auf mehr?",
      ctaBody: "Finde mehr Cafés in ganz Zürich auf YouKnow.",
      ctaLabel: "Mehr Cafés in Zürich auf YouKnow entdecken",
      contentSections: [
        {
          title: "Das passende Zürcher Café für den Moment",
          body: "Das richtige Café hängt vom Plan ab: ein schneller Espresso, ein Frühstück ohne Eile, ein Platz zum Arbeiten oder ein Ort, um Freunde zu treffen. Community-Tags in YouKnow halten diesen Kontext neben Adresse und Kategorie sichtbar."
        },
        {
          title: "Kaffee-Empfehlungen jenseits einer pauschalen Bewertung",
          body: "Eine Bewertung sagt wenig über die Atmosphäre oder darüber, zu wem ein Café passt. Gespeicherte Empfehlungen und beschreibende Signale machen es leichter, einen Ort zu wählen, der zur Tageszeit und zu dem Erlebnis passt, das du suchst."
        }
      ]
    },
    "cosy-restaurants": {
      title: "Gemütliche Restaurants in Zürich",
      eyebrow: "Zürich nach Vibe",
      intro: "Du suchst ein gemütliches Abendessen in Zürich? Hier sind fünf Restaurant-Treffer aus der YouKnow-Community für den Anfang, ausgewählt danach, wie oft sie im Filter für gemütliche Restaurants tatsächlich gespeichert wurden.",
      sectionTitle: "Fünf gemütliche Orte in Zürich zum Ausprobieren",
      sectionIntro: "Jeder Ort unten ist eine echte YouKnow-Empfehlung, mit Kategorie, Adresse, Beschreibung und den Vibe-Angaben, die aktuell auf der Community-Karte verfügbar sind.",
      ctaTitle: "Wir haben 5 ausgewählt. Auf YouKnow gibt es mehr.",
      ctaBody: "Entdecke mehr gemütliche Restaurants in Zürich in der App.",
      ctaLabel: "Mehr gemütliche Restaurants auf YouKnow entdecken",
      contentSections: [
        {
          title: "Was macht ein Restaurant gemütlich?",
          body: "Bei einem gemütlichen Restaurant geht es weniger um eine formale Punktzahl als um Kontext: warme Atmosphäre, angenehme Gespräche, herzlicher Service und ein Raum, der zu einem Abendessen ohne Eile passt. YouKnow behält diese Vibe-Signale direkt beim Ort, damit du danach suchen kannst, wie sich ein Abend anfühlen soll."
        },
        {
          title: "Wo du in Zürich gemütliche Restaurants findest",
          body: "Zürichs einladendste Adressen fürs Abendessen verteilen sich über das Zentrum und die umliegenden Viertel, von Altstadtstuben über entspannte Terrassen bis zu Café-Restaurants in der Nachbarschaft. Die Adresse bei jeder Empfehlung hilft dir, den Ort in der Stadt einzuordnen, bevor du die ganze Karte in YouKnow öffnest."
        },
        {
          title: "Restaurants nach Vibe statt nach Bewertung finden",
          body: "Eine einzelne Bewertung verrät dir nicht, ob ein Ort zu einem ruhigen Date, einem lebhaften Abendessen in der Gruppe oder einem unkomplizierten Essen unter der Woche passt. Die Suche nach Vibe liefert diesen fehlenden Kontext und lässt Empfehlungen von Menschen, denen du vertraust, die eigentliche Arbeit machen."
        }
      ]
    },
    "date-night": {
      title: "Date Night in Zürich",
      eyebrow: "Zürich nach Vibe",
      intro: "Du planst eine Date Night in Zürich? Hier sind fünf echte Orte, die in YouKnow Community-Tags wie date-tauglich oder romantisch tragen.",
      sectionTitle: "Fünf Tipps für die Date Night in Zürich",
      sectionIntro: "Nutze diese Community-Empfehlungen als Ausgangspunkt und entdecke dann die ganze Karte in der App.",
      ctaTitle: "Finde den richtigen Ort für euch zwei.",
      ctaBody: "Entdecke mehr Date-Night-Empfehlungen in Zürich auf YouKnow.",
      ctaLabel: "Mehr Orte für die Date Night auf YouKnow entdecken",
      contentSections: [
        {
          title: "Eine Date Night in Zürich nach Atmosphäre planen",
          body: "Die beste Wahl hängt davon ab, ob der Abend nach vertrauten Gesprächen, einem lebhaften Raum, einem Abendessen oder Drinks verlangt. Tags wie date-tauglich und romantisch geben jeder Empfehlung den Kontext, den ein einzelner Beliebtheitswert nicht liefern kann."
        },
        {
          title: "Von der ersten Idee zur ganzen Karte",
          body: "Mit den fünf öffentlichen Tipps bekommst du ein Gefühl für die Bandbreite. In YouKnow vergleichst du dann weitere Community-Empfehlungen und speicherst die Orte, die zu deinem Plan passen."
        }
      ]
    },
    "hidden-gems": {
      title: "Geheimtipps in Zürich",
      eyebrow: "Zürich abseits der bekannten Adressen",
      intro: "Du suchst mehr als die bekannten Zürcher Adressen? Starte mit fünf echten Orten aus der Community, die in YouKnow als Geheimtipp oder lokaler Favorit getaggt sind.",
      sectionTitle: "Fünf lokale Tipps in Zürich",
      sectionIntro: "Diese echten Einträge sind ein kleiner Ausschnitt der ganzen Zürich-Karte der Community.",
      ctaTitle: "Unter der Oberfläche gibt es noch mehr.",
      ctaBody: "Entdecke mehr lokale Empfehlungen in ganz Zürich auf YouKnow.",
      ctaLabel: "Mehr Geheimtipps in Zürich auf YouKnow entdecken",
      contentSections: [
        {
          title: "Wann fühlt sich ein Ort in Zürich wie ein lokaler Fund an?",
          body: "Ein lokaler Fund definiert sich nicht allein dadurch, dass ihn kaum jemand kennt. Oft ist es ein Ort, an den Menschen zurückkehren, den sie für Freunde speichern oder für eine bestimmte Stimmung schätzen. Community-Signale machen diesen Kontext sichtbar, ohne ein allgemeingültiges Geheimtipp-Ranking zu erfinden."
        },
        {
          title: "Entdecke mehr als die fünf öffentlichen Tipps",
          body: "Diese fünf Empfehlungen zeigen, welche Art von lokalem Kontext es auf YouKnow gibt. In der App liegt die ganze Karte von Zürich, auf der du weitere gespeicherte Orte nach Kategorie, Personen und Vibe entdecken kannst."
        }
      ]
    }
  },

  localContext: {
    zurich: {
      restaurants: {
        title: "Wo du in Zürich essen gehst, Viertel für Viertel",
        body: "Zürich bringt auf kleinem Raum viel Abwechslung unter. Im Kreis 4 und Kreis 5, rund um die Langstrasse und Zürich West, spielt sich ein grosser Teil der neueren, unkomplizierteren Gastronomie ab. Die Altstadt auf beiden Seiten der Limmat bewahrt die traditionellen Stuben und Zunfthäuser, und das Seefeld und das Seeufer eignen sich bei schönem Wetter für ein langes Mittagessen. Auch die vegetarische Küche hat hier tiefe Wurzeln: Das Haus Hiltl serviert sie seit 1898."
      },
      bars: {
        title: "Wo du in Zürich ausgehst",
        body: "Die Langstrasse im Kreis 4 ist das Herz des Zürcher Nachtlebens, die Gassen des Niederdorfs sind gesäumt von kleinen Altstadtbars, und Zürich West mischt Bars mit Clubs und Konzertlokalen. Im Sommer werden die See- und Flussbäder zu Open-Air-Bars, sobald die Badegäste nach Hause gegangen sind."
      },
      cafes: {
        title: "Wo du in Zürich guten Kaffee findest",
        body: "Specialty Coffee hat sich weit über das Zentrum hinaus verbreitet. Die Kreise 3, 4 und 5 sind voller Nachbarschaftscafés, das Niederdorf hat Altstadtterrassen, und das Seefeld ist wie gemacht für einen langsamen Morgen in Seenähe."
      },
      hotels: {
        title: "Wo du in Zürich übernachtest",
        body: "Wo du wohnst, prägt das Zürich, das du siehst. Von der Altstadt und den Strassen rund um die Bahnhofstrasse erreichst du den See und den Hauptbahnhof zu Fuss. Kreis 4 und Kreis 5 tauschen Ruhe gegen Nachtleben, Galerien und späte Abendessen, während Seefeld und Enge nah am Wasser liegen. Die Stadt ist kompakt und die Trams fahren häufig, kein Viertel ist also weit von den anderen entfernt."
      }
    },
    geneva: {
      restaurants: {
        title: "Wo du in Genf essen gehst, Viertel für Viertel",
        body: "Genf ist klein genug, um es zu Fuss zu durchqueren, und jede Seite isst anders. Pâquis, in Bahnhofsnähe, ist das internationalste Viertel, dicht besetzt mit asiatischen, afrikanischen und nahöstlichen Küchen. Eaux-Vives am linken Ufer mischt Bistros mit neueren Eröffnungen, Plainpalais und Jonction sind jünger und unkomplizierter, und Carouge, eine kurze Tramfahrt südlich, wirkt wie ein eigenes Dorf mit Terrassen und kleinen Gaststuben."
      },
      bars: {
        title: "Wo du in Genf ausgehst",
        body: "Die Rue de l’École-de-Médecine in Plainpalais ist die klassische Barmeile der Stadt. In Eaux-Vives und Pâquis findest du Cocktail- und Naturweinbars, Carouge eignet sich für ein Glas ohne Eile, und im Sommer füllen sich das Seeufer und die Ufer der Rhône bei Jonction mit Open-Air-Buvetten."
      },
      cafes: {
        title: "Wo du in Genf guten Kaffee findest",
        body: "Altstadtplätze wie die Place du Bourg-de-Four sind wie gemacht für einen Kaffee auf der Terrasse. Carouge hat Tea-Rooms und Pâtisserien, in Eaux-Vives und Plainpalais liegen die neueren Specialty-Coffee-Adressen, und die Buvetten am Seeufer sind für die Tage, an denen die Aussicht wichtiger ist als die Röstung."
      },
      hotels: {
        title: "Wo du in Genf übernachtest",
        body: "Die Grandhotels säumen den See an beiden Ufern. Die Strassen rund um den Bahnhof Cornavin sind praktisch für kurze Aufenthalte, während du in Eaux-Vives und Carouge eher in einer Wohngegend wohnst. Die Listen der Community reichen auch über die Stadtgrenze hinaus, zu Dörfern am See und in die nahe Landschaft. Gut zu wissen, wenn du es ruhiger magst und Genf trotzdem schnell erreichen willst."
      }
    },
    berlin: {
      restaurants: {
        title: "Wo du in Berlin essen gehst, Kiez für Kiez",
        body: "In Berlin gibt es nicht das eine Zentrum zum Essen. Kreuzberg und Neukölln haben die dichteste Mischung, von türkischen Grills und vietnamesischen Küchen bis zu Naturwein-Bistros. Mitte und Prenzlauer Berg tendieren zu gepflegten Kiezrestaurants, und Charlottenburg bewahrt die Klassiker West-Berlins, mit der Kantstrasse, die für ihre asiatischen Restaurants bekannt ist."
      },
      bars: {
        title: "Wo du in Berlin ausgehst",
        body: "Berliner Bars haben lange offen und nehmen sich selbst nicht zu ernst. Kreuzberg und Neukölln sind voller Eckkneipen, Weinbars und Cocktailbars, alle zu Fuss voneinander erreichbar. Friedrichshain ist voller und lauter, und in Schöneberg und Charlottenburg findest du die klassischen Cocktailbars. Im Sommer gehören Kanalufer und Biergärten zur Nacht dazu."
      },
      cafes: {
        title: "Wo du in Berlin guten Kaffee findest",
        body: "Specialty Coffee ist in Berlin leicht zu finden, mit Cafés quer durch Kreuzberg, Neukölln, Mitte und Prenzlauer Berg. Viele sind zugleich Frühstücks- und Brunchlokale, manche ein Arbeitsplatz für den Nachmittag, und etliche backen ihre Kuchen selbst."
      },
      hotels: {
        title: "Wo du in Berlin übernachtest",
        body: "Wer in Berlin ein Hotel wählt, wählt vor allem einen Kiez. Mitte liegt zentral für Museen und Sehenswürdigkeiten. Charlottenburg, rund um Zoo und Kurfürstendamm, bietet West-Berliner Ruhe, und in Kreuzberg und Friedrichshain bist du nah an Restaurants, Bars und Clubs. Die Stadt ist gross, darum zählt die Nähe zu einer U-Bahn- oder S-Bahn-Linie mehr als eine Lage mittendrin."
      }
    },
    milan: {
      restaurants: {
        title: "Wo du in Mailand essen gehst, Viertel für Viertel",
        body: "Mailand isst in seinen Vierteln. Navigli und Porta Genova sind rund um die Kanäle lebhaft, Brera hat elegante Speisesäle an Kopfsteinpflastergassen, und in Isola und Porta Venezia haben viele neuere Bistros und Küchen mit Weinfokus eröffnet. In der ganzen Stadt servieren traditionelle Trattorien nach wie vor die Mailänder Klassiker: Risotto alla milanese, Cotoletta und Ossobuco."
      },
      bars: {
        title: "Wohin in Mailand für Aperitivo und Drinks",
        body: "Der Aperitivo ist eine Mailänder Institution, und in der Stunde vor dem Abendessen zeigen sich die Bars der Stadt von ihrer besten Seite. An den Navigli-Kanälen ist am meisten los, Brera und Porta Venezia sind gut für Cocktails, Isola hat eine entspannte Szene mit Nachbarschaftsgefühl, und historische Enotheken schenken in der ganzen Stadt Wein glasweise aus."
      },
      cafes: {
        title: "Kaffeekultur in Mailand",
        body: "Kaffee ist in Mailand traditionell eine schnelle Sache: ein Espresso am Tresen der Bar um die Ecke. Neben diesem Ritual findest du historische Pasticcerien mit Tea-Room und immer mehr Specialty-Coffee-Shops, in denen man sich hinsetzt und eine Weile bleibt."
      },
      hotels: {
        title: "Wo du in Mailand übernachtest",
        body: "Im Modeviertel und in den Strassen rund um den Dom liegen die grossen Adressen. Brera ist zentral, aber ruhiger, Navigli passt zu Abenden an den Kanälen, und Porta Nuova und die Gegend um den Bahnhof Centrale sind praktisch für Züge und Geschäftsreisen. Während der Design Week und der Modewochen sind die Zimmer früh ausgebucht, es lohnt sich also, eine Shortlist parat zu haben."
      }
    },
    paris: {
      restaurants: {
        title: "Wo du in Paris essen gehst, Viertel für Viertel",
        body: "Paris belohnt alle, die wissen, wo sie suchen müssen. Das 10. und 11. Arrondissement, vom Canal Saint-Martin Richtung Oberkampf und Bastille, sind das Herz der modernen Bistro- und Naturweinszene. Das Marais mischt alte Institutionen mit Neueröffnungen, Saint-Germain bewahrt die klassischen Brasserien, und in Montmartre und Pigalle findest du Nachbarschaftslokale abseits der grossen Sehenswürdigkeiten."
      },
      bars: {
        title: "Wo du in Paris ausgehst",
        body: "Weinbars und Caves à manger gibt es im 10. und 11. Arrondissement überall, und Cocktailbars ballen sich im Marais und rund um Pigalle. Ein Glas auf einer Terrasse am späten Nachmittag ist eine Pariser Gewohnheit, die sich in jedem Arrondissement zu übernehmen lohnt."
      },
      cafes: {
        title: "Zwei Arten von Cafés in Paris",
        body: "Das traditionelle Pariser Café mit Zinktresen und Terrassenstühlen mit Blick zur Strasse steht neben einer neueren Generation von Specialty-Coffee-Shops, viele davon im 10. und 11. Arrondissement und im Marais. Das eine ist dafür da, der Stadt beim Vorbeiziehen zuzusehen. Das andere für den Kaffee."
      },
      hotels: {
        title: "Wo du in Paris übernachtest",
        body: "Das Arrondissement zählt genauso viel wie das Hotel. Das Marais und Saint-Germain liegen zentral und lassen sich gut zu Fuss erkunden, Montmartre und Pigalle haben kleinere Boutique-Adressen und Dorfcharakter, und im 8. Arrondissement und in den Strassen rund um die Place Vendôme stehen die Palasthotels. Im 10. und 11. bist du den neueren Restaurants und Bars am nächsten."
      }
    },
    tokyo: {
      restaurants: {
        title: "Wo du in Tokio essen gehst, Viertel für Viertel",
        body: "Tokio ist eine Stadt der Spezialisten: ein Tresen, an dem es nur Tonkatsu, Udon, Ramen oder Yakitori gibt, oft mit einer Handvoll Plätzen. Shibuya und Shinjuku haben eine hohe Dichte an Izakayas, Ginza hat die formellen Tresen, und Viertel wie Shimokitazawa, Nakameguro und Koenji haben eine lokalere, entspanntere Szene. Viele kleine Lokale nehmen nur Gäste mit Reservierung, es lohnt sich also, sie vor der Reise zu speichern."
      },
      bars: {
        title: "Wo du in Tokio ausgehst",
        body: "Bars in Tokio sind oft winzig: ein Tresen, ein paar Hocker und eine Person dahinter. Golden Gai in Shinjuku packt Dutzende davon in ein paar Gassen, Ginza ist für klassische Cocktailbars bekannt, und Shibuya und Shimokitazawa mischen Live-Musik-Lokale, Listening Bars und Stehbars. Bei Izakayas verschwimmt die Grenze zwischen Bar und Abendessen."
      },
      cafes: {
        title: "Zwei Arten von Cafés in Tokio",
        body: "Zwei Cafékulturen teilen sich die Stadt: das Kissaten, ein Kaffeehaus alter Schule mit handgefiltertem Kaffee und dickem Toast, und eine neuere Welle von Specialty-Röstereien und Matcha-Bars. Beide findest du von Ginza über Shibuya und Koenji bis Kagurazaka, oft in einem oberen Stockwerk oder in einer ruhigen Seitenstrasse."
      }
    }
  },
}
