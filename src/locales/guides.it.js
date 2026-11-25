// Italian copy for the city guides. Same shape as guides.en.js; src/cityGuides.js combines it with each city's query configuration.
//
// Functions receive the city's Italian display name (see `cities`). All six take "a": a Zurigo, a Milano…

// Shared wording for a category guide ("Ristoranti a Zurigo"). The four categories are all
// masculine plural and only their articles differ (i ristoranti, i bar, i caffè, gli hotel),
// so each one passes the article forms it needs: `ai` ("ai" / "agli") and `dei` ("dei" / "degli").
const categoryTopic = (plural, lower, { ai, dei }, ctaTitle) => (city) => ({
  title: `${plural} a ${city}`,
  seoTitle: `${plural} a ${city}: i migliori indirizzi e consigli`,
  eyebrow: `Guida ${ai} ${lower} di ${city}`,
  intro: `Cerchi ${lower} a ${city}? Parti da cinque posti che la community di YouKnow salva e consiglia, ognuno con il suo indirizzo e l’atmosfera per cui è adatto, poi esplora tutta la mappa di ${city} nell’app gratuita.`,
  metaDescription: `${plural} a ${city} consigliati dalla community di YouKnow: cinque posti top con indirizzo e tag di atmosfera. Trova altri consigli locali nell’app gratuita.`,
  sectionTitle: `Cinque ${lower} da provare a ${city}`,
  sectionIntro: `Questa selezione è ordinata in base ai salvataggi reali su YouKnow. È un’anteprima ${dei} ${lower} presenti sulla mappa della community, e la lista cambia man mano che le persone condividono nuove scoperte.`,
  ctaTitle,
  ctaBody: `Scopri altri ${lower} a ${city} su YouKnow, consigliati da amici e curatori di cui ti fidi.`,
  ctaLabel: `Scopri altri ${lower} a ${city} su YouKnow`,
})

const categoryFaq = (lower) => (city) => ({
  question: `Dove trovo buoni ${lower} a ${city}?`,
  answer: `Parti dai cinque ${lower} di questa pagina, ordinati in base a quante volte la community di YouKnow li ha salvati a ${city}. Nell’app gratuita YouKnow trovi la mappa completa di ${city}: puoi filtrare per categoria e atmosfera, vedere cosa consigliano amici e curatori e salvare la tua lista.`,
})

export default {
  // Display names. The place database is always queried with the English name.
  cities: { zurich: "Zurigo", geneva: "Ginevra", berlin: "Berlino", milan: "Milano", paris: "Parigi", tokyo: "Tokyo" },

  // Search title and description for a city's main guide.
  hubMeta: (city, hasHotels) => ({
    title: hasHotels ? `Ristoranti, bar, caffè e hotel a ${city}` : `Ristoranti, bar e caffè a ${city}`,
    description: `Consigli locali per ${city}: ${hasHotels ? "ristoranti, bar, caffè e hotel" : "ristoranti, bar e caffè"} scelti dalla community di YouKnow. Scopri cinque dei posti più amati e trovane altri nell’app gratuita.`,
  }),

  cityFaq: (city) => [
    {
      question: `Da dove arrivano questi consigli su ${city}?`,
      answer: `Arrivano da posti reali, salvati e consigliati su YouKnow. La guida pubblica mostra cinque esempi; nell’app trovi la mappa completa di ${city} costruita dalla community.`,
    },
    {
      question: "YouKnow usa le valutazioni a stelle?",
      answer: "No. YouKnow si basa sui consigli di amici, community locali, creator e persone di cui ti fidi, non su stelline anonime.",
    },
    {
      question: `Posso salvare i miei posti a ${city}?`,
      answer: "Sì. Su YouKnow puoi salvare posti, organizzarli sulla tua mappa e condividere liste con gli amici o con la tua community.",
    },
  ],

  // Main guides ranked by community recommendations (Milan, Paris, Tokyo).
  communityHub: (city) => ({
    title: `Scopri ${city} come chi ci vive`,
    eyebrow: "Guida YouKnow alla città",
    intro: `La tua prossima scoperta a ${city} parte da chi i bei posti li conosce. Esplora cinque dei posti più consigliati dalla community di YouKnow, poi trovane altri nell’app.`,
    sectionTitle: `I più consigliati a ${city}`,
    sectionIntro: `Cinque posti ordinati in base ai consigli della community; a parità, contano i salvataggi. È una piccola anteprima della mappa completa di ${city}: la classifica si aggiorna man mano che la community condivide nuove scoperte.`,
    ctaTitle: "Cinque bei posti. Una città intera da esplorare.",
    ctaBody: `Scopri altri consigli su ${city} da amici e curatori di cui ti fidi. Salva i tuoi preferiti e costruisci la tua mappa su YouKnow.`,
    ctaLabel: `Esplora il resto di ${city} su YouKnow`,
  }),

  // Category guides: restaurants, bars, cafés and hotels in every city.
  kinds: {
    restaurants: {
      plural: "Ristoranti",
      topic: categoryTopic("Ristoranti", "ristoranti", { ai: "ai", dei: "dei" }, "Cinque tavole per cominciare. Una città intera da assaggiare."),
      choosing: (city) => ({ title: `Come scegliere un ristorante a ${city}`, body: `Parti dal programma, non da un punteggio. Un pranzo veloce, una lunga cena con gli amici e un tavolo per un’occasione speciale chiedono posti diversi. Su YouKnow ogni consiglio conserva categoria, indirizzo e tag di atmosfera, così a ${city} puoi cercare in base a come vuoi che sia il pasto, oltre che a cosa c’è nel menu.` }),
      faq: categoryFaq("ristoranti"),
    },
    bars: {
      plural: "Bar",
      topic: categoryTopic("Bar", "bar", { ai: "ai", dei: "dei" }, "Cinque bar per cominciare. Gli altri sono sulla mappa."),
      choosing: (city) => ({ title: `Trovare il bar giusto a ${city}`, body: `Il primo drink, l’ultimo della serata e una notte costruita intorno alla musica sono programmi diversi. Tag di atmosfera come «vivace», «intimo» o «ideale per gruppi» aiutano a scegliere a ${city} il bar adatto alla serata, non quello con più recensioni.` }),
      faq: categoryFaq("bar"),
    },
    cafes: {
      plural: "Caffè",
      topic: categoryTopic("Caffè", "caffè", { ai: "ai", dei: "dei" }, "Vuoi continuare a esplorare?"),
      choosing: (city) => ({ title: `Scegliere un caffè a ${city}`, body: `Il caffè giusto dipende dal momento: un espresso veloce, una colazione con calma, un posto dove lavorare per un’ora o dove incontrare un amico. YouKnow tiene questo contesto accanto all’indirizzo: così un consiglio su un caffè di ${city} ti dice per cosa è adatto il posto, non solo che a qualcuno è piaciuto.` }),
      faq: categoryFaq("caffè"),
    },
    hotels: {
      plural: "Hotel",
      topic: categoryTopic("Hotel", "hotel", { ai: "agli", dei: "degli" }, "Trovato dove dormire? Ora trova dove mangiare."),
      choosing: (city) => ({ title: `Scegliere un hotel a ${city}`, body: `Il consiglio di una persona di cui ti fidi dice più di una categoria a stelle. Su YouKnow gli hotel stanno sulla stessa mappa dei ristoranti, dei caffè e dei bar che li circondano: vedi cosa è raggiungibile a piedi e tieni pronta una lista per ${city} in vista del prossimo viaggio.` }),
      faq: categoryFaq("hotel"),
    },
  },

  // Everything below is plain text: hand-written copy for specific cities.
  // hubs: main guides for Zurich, Geneva and Berlin.
  // communitySections: editorial sections for Milan, Paris and Tokyo.
  // zurichTopics: Zurich's mood guides, plus its original café and bar guides.
  // localContext: the neighbourhood paragraph on each category guide.
  hubs: {
    zurich: {
      title: "Scopri Zurigo come chi ci vive",
      eyebrow: "Guida YouKnow alla città",
      intro: "Cerchi ristoranti, caffè, bar e chicche nascoste a Zurigo? Parti da cinque posti reali salvati e consigliati dalla community di YouKnow.",
      sectionTitle: "Posti da cui partire a Zurigo",
      sectionIntro: "Questi cinque posti scelti dalla community sono ordinati in base ai salvataggi reali su YouKnow. Sono un’anteprima utile, non l’intera mappa di Zurigo.",
      ctaTitle: "Vuoi la lista completa?",
      ctaBody: "Su YouKnow trovi altri consigli su ristoranti, caffè e bar in tutta Zurigo, selezionati e salvati dalle persone della community.",
      ctaLabel: "Scopri altri posti a Zurigo su YouKnow",
      contentSections: [
        {
          title: "Come scoprire Zurigo oltre i soliti posti",
          body: "Parti dal contesto, non da una classifica generica. Un consiglio per un caffè tranquillo risponde a un programma diverso da un drink su un rooftop o da una cena rilassata. YouKnow riunisce questi segnali su una mappa viva, plasmata da chi quei posti li ha salvati davvero."
        },
        {
          title: "Perché i consigli delle persone di cui ti fidi sono diversi",
          body: "Le valutazioni anonime appiattiscono ogni visita in un numero. Il consiglio di un amico, di un curatore locale o di una community conserva la parte utile: a chi è piaciuto il posto, per cosa è adatto e perché potrebbe fare al caso tuo a Zurigo."
        }
      ]
    },
    geneva: {
      title: "Scopri Ginevra come chi ci vive",
      eyebrow: "Guida YouKnow alla città",
      intro: "Cerchi ristoranti, caffè, bar e chicche nascoste a Ginevra? Parti da cinque posti reali salvati e consigliati dalla community di YouKnow.",
      sectionTitle: "Posti da cui partire a Ginevra",
      sectionIntro: "Questi cinque posti scelti dalla community sono ordinati in base ai salvataggi reali su YouKnow. Sono un’anteprima utile, non l’intera mappa di Ginevra.",
      ctaTitle: "Vuoi la lista completa?",
      ctaBody: "Su YouKnow trovi altri consigli su ristoranti, caffè e bar in tutta Ginevra, selezionati e salvati dalle persone della community.",
      ctaLabel: "Scopri altri posti a Ginevra su YouKnow",
      contentSections: [
        {
          title: "Come scoprire Ginevra oltre i soliti posti",
          body: "Parti dal programma, non da una classifica generica. Un caffè rilassato in riva al lago, una cena intima e un bar vivace rispondono a momenti diversi. YouKnow tiene questi segnali utili legati ai consigli di chi quei posti li ha salvati."
        },
        {
          title: "Perché i consigli della community aggiungono contesto utile",
          body: "Le valutazioni anonime comprimono ogni visita in un numero. I consigli di amici, curatori locali e community conservano per cosa è adatto un posto e perché potrebbe fare al caso tuo a Ginevra."
        }
      ]
    },
    berlin: {
      title: "Scopri Berlino come chi ci vive",
      eyebrow: "Guida YouKnow alla città",
      intro: "Cerchi ristoranti, caffè, bar e chicche nascoste a Berlino? Parti da cinque posti reali salvati e consigliati dalla community di YouKnow.",
      sectionTitle: "Posti da cui partire a Berlino",
      sectionIntro: "Questi cinque posti scelti dalla community sono ordinati in base ai salvataggi reali su YouKnow. Sono un’anteprima utile, non l’intera mappa di Berlino.",
      ctaTitle: "Vuoi la lista completa?",
      ctaBody: "Su YouKnow trovi altri consigli su ristoranti, caffè e bar in tutta Berlino, selezionati e salvati dalle persone della community.",
      ctaLabel: "Scopri altri posti a Berlino su YouKnow",
      contentSections: [
        {
          title: "Come scoprire Berlino oltre i soliti posti",
          body: "Berlino cambia da un isolato all’altro e da un programma all’altro. Partire da atmosfera, categoria e consigli fidati rende più facile trovare un caffè di quartiere, un posto per cena o un bar per la tarda serata adatto al momento."
        },
        {
          title: "Perché il contesto locale conta in una città così varia",
          body: "Un singolo voto non può dirti se un posto è adatto a una mattina tranquilla, a un pranzo informale in gruppo o a una serata fuori. YouKnow tiene insieme i salvataggi della community e i segnali di atmosfera, così i consigli restano utili."
        }
      ]
    }
  },

  communitySections: {
    milan: [
      {
        title: "Dalla pausa caffè a una lunga cena",
        body: "Una sosta in pasticceria, un aperitivo e una cena tra amici chiedono ognuno qualcosa di diverso. Parti dai posti consigliati dalla community, poi usa categorie e tag di atmosfera per trovare a Milano il posto adatto al tuo programma."
      },
      {
        title: "Tieni la tua lista di Milano",
        body: "Salva i posti che vuoi provare accanto a quelli che ami già. Segui amici e curatori con gusti simili ai tuoi e tieni insieme sulla tua mappa i loro consigli su Milano."
      }
    ],
    paris: [
      {
        title: "Trova la tua Parigi",
        body: "Un bistrot di quartiere, un wine bar e un caffè con un amico fanno ognuno una giornata diversa. I consigli della community ti danno un punto di partenza, con indirizzi e tag di atmosfera per aiutarti a scegliere."
      },
      {
        title: "I buoni indirizzi sono più belli se condivisi",
        body: "Tieni in un unico posto i locali di Parigi di cui senti parlare. Salva il consiglio di un amico, segui un curatore di cui ti fidi e condividi le tue scoperte quando qualcuno ti chiede dove andare."
      }
    ],
    tokyo: [
      {
        title: "Non solo cena: fai spazio al resto",
        body: "La mappa di Tokyo costruita dalla community include posti dove mangiare, bere ed esplorare. Parti da questi consigli, poi segui le categorie e i tag di atmosfera adatti al tipo di giornata o di serata che hai in mente."
      },
      {
        title: "Trasforma i consigli in una mappa di Tokyo",
        body: "Riunisci in un’unica lista i posti di cui parlano i tuoi amici e i curatori che segui. Tieni pronti su YouKnow i posti da provare, poi passa parola su quelli che finisci per amare."
      }
    ]
  },

  zurichTopics: {
    bars: {
      title: "Bar a Zurigo",
      seoTitle: "Bar a Zurigo: i migliori indirizzi e consigli",
      eyebrow: "Guida ai bar di Zurigo",
      intro: "Cerchi un bar a Zurigo? Parti da cinque posti reali salvati e consigliati dalla community di YouKnow.",
      sectionTitle: "Cinque bar da provare a Zurigo",
      sectionIntro: "Questa selezione è un’anteprima dei bar e dei locali dove bere qualcosa presenti sulla mappa della community.",
      ctaTitle: "La serata non finisce qui.",
      ctaBody: "Scopri altri bar a Zurigo su YouKnow.",
      ctaLabel: "Scopri altri bar a Zurigo su YouKnow",
      contentSections: [
        {
          title: "Trovare il tipo di bar giusto a Zurigo",
          body: "Un drink su un rooftop, un bar vivace per un gruppo e un posto tranquillo per un bicchiere di vino rispondono a domande diverse. YouKnow combina le categorie con veri tag di atmosfera, così puoi partire dal tipo di serata che vuoi."
        },
        {
          title: "Perché i consigli sui bar locali hanno bisogno di contesto",
          body: "Un consiglio utile spiega più del semplice fatto che un posto è piaciuto a qualcuno. Atmosfera, occasione e salvataggi della community aiutano a trasformare una lunga lista di bar di Zurigo in una selezione più piccola, adatta alla serata."
        }
      ]
    },
    cafes: {
      title: "Caffè a Zurigo",
      seoTitle: "Caffè a Zurigo: i migliori indirizzi e consigli",
      eyebrow: "Guida ai caffè di Zurigo",
      intro: "Cerchi un buon caffè a Zurigo? Parti da cinque caffè consigliati davvero, salvati dalla community di YouKnow.",
      sectionTitle: "Cinque caffè da cui partire a Zurigo",
      sectionIntro: "Questi consigli pubblici sono una piccola anteprima dei caffè presenti sulla mappa di YouKnow.",
      ctaTitle: "Vuoi continuare a esplorare?",
      ctaBody: "Trova altri caffè in tutta Zurigo su YouKnow.",
      ctaLabel: "Scopri altri caffè a Zurigo su YouKnow",
      contentSections: [
        {
          title: "Scegliere a Zurigo il caffè giusto per il momento",
          body: "Il caffè giusto dipende dal programma: un espresso veloce, una colazione senza fretta, un posto dove lavorare o dove incontrare un amico. I tag della community su YouKnow tengono questo contesto in vista, accanto a indirizzo e categoria."
        },
        {
          title: "Consigli sul caffè, oltre il solito voto",
          body: "Un voto dice poco dell’atmosfera o di chi si troverà bene in un caffè. Consigli salvati e segnali descrittivi rendono più facile scegliere un posto adatto all’ora del giorno e all’esperienza che cerchi."
        }
      ]
    },
    "cosy-restaurants": {
      title: "Ristoranti accoglienti a Zurigo",
      eyebrow: "Zurigo per atmosfera",
      intro: "Cerchi una cena accogliente a Zurigo? Ecco cinque ristoranti della community di YouKnow da cui partire, selezionati in base ai salvataggi reali nel filtro dei ristoranti accoglienti.",
      sectionTitle: "Cinque posti accoglienti da provare a Zurigo",
      sectionIntro: "Ogni posto qui sotto è un vero consiglio di YouKnow, con la categoria, l’indirizzo, la descrizione e i dati sull’atmosfera oggi disponibili nella mappa della community.",
      ctaTitle: "Ne abbiamo scelti 5. Su YouKnow ce ne sono altri.",
      ctaBody: "Esplora altri ristoranti accoglienti a Zurigo nell’app.",
      ctaLabel: "Scopri altri ristoranti accoglienti su YouKnow",
      contentSections: [
        {
          title: "Che cosa rende accogliente un ristorante?",
          body: "Un ristorante accogliente dipende meno da un punteggio formale e più dal contesto: atmosfera calda, conversazione a proprio agio, servizio ospitale e una sala adatta a una cena senza fretta. YouKnow tiene questi segnali di atmosfera legati al posto, così puoi cercare in base a come vuoi che sia la serata."
        },
        {
          title: "Dove trovare ristoranti accoglienti a Zurigo",
          body: "I posti più invitanti di Zurigo per cena sono sparsi tra il centro e i quartieri intorno, dalle sale del centro storico alle terrazze rilassate e ai caffè-ristoranti di quartiere. L’indirizzo su ogni consiglio ti aiuta a collocarlo in città prima di aprire la mappa completa su YouKnow."
        },
        {
          title: "Trovare ristoranti per atmosfera invece che per voto",
          body: "Un singolo voto non può dirti se un posto è giusto per un appuntamento tranquillo, una cena vivace in gruppo o un pasto semplice in settimana. Cercare per atmosfera aggiunge il contesto che manca e lascia il lavoro utile ai consigli delle persone di cui ti fidi."
        }
      ]
    },
    "date-night": {
      title: "Posti romantici a Zurigo per una serata a due",
      eyebrow: "Zurigo per atmosfera",
      intro: "Stai organizzando una serata a due a Zurigo? Ecco cinque posti reali che su YouKnow hanno tag della community come «ideale per un appuntamento» o «romantico».",
      sectionTitle: "Cinque posti a Zurigo per una serata a due",
      sectionIntro: "Usa questi consigli della community come punto di partenza, poi esplora la mappa completa nell’app.",
      ctaTitle: "Trova il posto giusto per voi due.",
      ctaBody: "Esplora altri consigli per una serata a due a Zurigo su YouKnow.",
      ctaLabel: "Scopri altri posti per una serata a due su YouKnow",
      contentSections: [
        {
          title: "Organizzare una serata a due a Zurigo partendo dall’atmosfera",
          body: "La scelta migliore dipende da cosa chiede la serata: una conversazione intima, una sala vivace, una cena o un drink. I tag «ideale per un appuntamento» e «romantico» danno a ogni consiglio il contesto che un semplice punteggio di popolarità non può dare."
        },
        {
          title: "Dalla prima idea alla mappa completa",
          body: "Usa i cinque consigli pubblici per farti un’idea della varietà, poi continua su YouKnow per confrontare altri consigli della community e salvare i posti adatti al tuo programma."
        }
      ]
    },
    "hidden-gems": {
      title: "Posti segreti a Zurigo: le chicche locali",
      eyebrow: "Zurigo oltre i soliti posti",
      intro: "Vuoi andare oltre i soliti indirizzi di Zurigo? Parti da cinque posti reali della community che su YouKnow hanno il tag «chicca nascosta» o «amato in zona».",
      sectionTitle: "Cinque chicche locali a Zurigo",
      sectionIntro: "Queste schede reali sono una piccola anteprima della mappa di Zurigo, ben più ampia, costruita dalla community.",
      ctaTitle: "Sotto la superficie c’è di più.",
      ctaBody: "Scopri altri consigli locali in tutta Zurigo su YouKnow.",
      ctaLabel: "Scopri altre chicche nascoste di Zurigo su YouKnow",
      contentSections: [
        {
          title: "Che cosa rende un posto di Zurigo una vera scoperta locale?",
          body: "Una scoperta locale non è tale solo perché è poco conosciuta. Spesso è un posto in cui si torna, che si salva per gli amici o che si apprezza per un certo stato d’animo. I segnali della community aiutano a far emergere questo contesto senza inventare una classifica universale delle chicche nascoste."
        },
        {
          title: "Esplora oltre i cinque consigli pubblici",
          body: "Questi cinque consigli mostrano il tipo di contesto locale che trovi su YouKnow. Nell’app c’è la mappa completa di Zurigo, dove puoi esplorare altri posti salvati per categoria, persone e atmosfera."
        }
      ]
    }
  },

  localContext: {
    zurich: {
      restaurants: {
        title: "Dove mangiare a Zurigo, quartiere per quartiere",
        body: "Zurigo racchiude una grande varietà in una città compatta. Nel Kreis 4 e nel Kreis 5, intorno alla Langstrasse e a Zürich West, si concentra buona parte della ristorazione più nuova e informale. Il centro storico, sulle due sponde della Limmat, conserva le sale tradizionali e le case delle corporazioni, mentre Seefeld e il lungolago sono perfetti per un lungo pranzo quando fa bel tempo. Anche la cucina vegetariana qui ha radici profonde: Haus Hiltl la serve dal 1898."
      },
      bars: {
        title: "Dove uscire la sera a Zurigo",
        body: "La Langstrasse, nel Kreis 4, è il cuore della vita notturna di Zurigo, i vicoli del Niederdorf sono pieni di piccoli bar del centro storico e Zürich West mescola bar, club e sale da concerto. D’estate i bagni sul lago e sul fiume si trasformano in bar all’aperto, una volta che i bagnanti sono tornati a casa."
      },
      cafes: {
        title: "Dove trovare un buon caffè a Zurigo",
        body: "Lo specialty coffee si è diffuso ben oltre il centro. I Kreis 3, 4 e 5 sono pieni di caffè di quartiere, il Niederdorf ha le terrazze del centro storico e Seefeld è fatto apposta per una mattina lenta vicino al lago."
      },
      hotels: {
        title: "Dove dormire a Zurigo",
        body: "Il quartiere in cui alloggi decide quale Zurigo vedrai. Dal centro storico e dalle vie intorno alla Bahnhofstrasse raggiungi a piedi il lago e la stazione centrale. Il Kreis 4 e il Kreis 5 scambiano la tranquillità con vita notturna, gallerie e cene fino a tardi, mentre Seefeld ed Enge sono vicini all’acqua. La città è compatta e i tram passano spesso, quindi nessun quartiere è lontano dagli altri."
      }
    },
    geneva: {
      restaurants: {
        title: "Dove mangiare a Ginevra, quartiere per quartiere",
        body: "Ginevra è abbastanza piccola da attraversarla a piedi, e su ogni sponda si mangia in modo diverso. Pâquis, vicino alla stazione, è il quartiere più internazionale, fitto di cucine asiatiche, africane e mediorientali. Eaux-Vives, sulla riva sinistra, mescola bistrot e nuove aperture, Plainpalais e Jonction sono più giovani e informali, e Carouge, a un breve tragitto in tram verso sud, sembra un paese a sé, con terrazze e piccole sale."
      },
      bars: {
        title: "Dove uscire la sera a Ginevra",
        body: "Rue de l’École-de-Médecine, a Plainpalais, è la classica via dei bar della città. A Eaux-Vives e a Pâquis trovi cocktail bar e locali di vini naturali, Carouge è l’ideale per un bicchiere senza fretta e d’estate il lungolago e le rive del Rodano a Jonction si riempiono di buvette all’aperto."
      },
      cafes: {
        title: "Dove trovare un buon caffè a Ginevra",
        body: "Le piazze del centro storico, come Place du Bourg-de-Four, sono fatte per un caffè in terrazza. Carouge ha sale da tè e pasticcerie, Eaux-Vives e Plainpalais hanno gli indirizzi più recenti di specialty coffee, e le buvette del lungolago sono per i giorni in cui la vista conta più della tostatura."
      },
      hotels: {
        title: "Dove dormire a Ginevra",
        body: "I grand hotel si affacciano sul lago, su entrambe le rive. Le vie intorno alla stazione di Cornavin sono pratiche per i soggiorni brevi, mentre Eaux-Vives e Carouge sono basi più residenziali. Le liste della community arrivano anche oltre i confini della città, nei villaggi lungo il lago e nella campagna vicina: buono a sapersi se cerchi un soggiorno più tranquillo a poca distanza da Ginevra."
      }
    },
    berlin: {
      restaurants: {
        title: "Dove mangiare a Berlino, quartiere per quartiere",
        body: "A Berlino non esiste un unico centro per mangiare. Kreuzberg e Neukölln hanno il mix più fitto, dalle griglierie turche e dalle cucine vietnamite ai bistrot di vini naturali. Mitte e Prenzlauer Berg puntano su ristoranti di quartiere curati, e Charlottenburg conserva i classici di Berlino Ovest, con la Kantstrasse nota per i suoi ristoranti asiatici."
      },
      bars: {
        title: "Dove uscire la sera a Berlino",
        body: "I bar di Berlino restano aperti fino a tardi e non si prendono troppo sul serio. Kreuzberg e Neukölln sono pieni di pub d’angolo, wine bar e cocktail bar a pochi passi l’uno dall’altro. Friedrichshain è più affollato e rumoroso, mentre Schöneberg e Charlottenburg hanno i cocktail bar classici. D’estate le rive dei canali e i Biergarten entrano a far parte della serata."
      },
      cafes: {
        title: "Dove trovare un buon caffè a Berlino",
        body: "A Berlino lo specialty coffee si trova facilmente, con caffè sparsi tra Kreuzberg, Neukölln, Mitte e Prenzlauer Berg. Molti sono anche posti da colazione e da brunch, alcuni diventano uno spazio di lavoro per il pomeriggio e tanti preparano le proprie torte."
      },
      hotels: {
        title: "Dove dormire a Berlino",
        body: "Scegliere un hotel a Berlino significa soprattutto scegliere un quartiere. Mitte è centrale per musei e monumenti. Charlottenburg, intorno allo Zoo e al Kurfürstendamm, offre la calma di Berlino Ovest, mentre Kreuzberg e Friedrichshain ti mettono vicino a ristoranti, bar e club. La città è grande: stare vicino a una linea di U-Bahn o S-Bahn conta più che stare in centro."
      }
    },
    milan: {
      restaurants: {
        title: "Dove mangiare a Milano, quartiere per quartiere",
        body: "Milano mangia nei suoi quartieri. Navigli e Porta Genova sono vivaci intorno ai canali, Brera ha sale eleganti lungo vie acciottolate, e a Isola e Porta Venezia hanno aperto molti dei nuovi bistrot e delle cucine che mettono il vino al centro. In tutta la città le trattorie tradizionali servono ancora i classici milanesi: risotto alla milanese, cotoletta e ossobuco."
      },
      bars: {
        title: "Dove andare per l’aperitivo e un drink a Milano",
        body: "L’aperitivo è un’istituzione milanese, e l’ora prima di cena è quella in cui i bar della città danno il meglio. I Navigli sono la zona più animata, Brera e Porta Venezia sono ottime per i cocktail, Isola ha un’atmosfera rilassata, di quartiere, e le enoteche storiche servono vino al calice in tutta la città."
      },
      cafes: {
        title: "La cultura del caffè a Milano",
        body: "A Milano il caffè è per tradizione veloce: un espresso al banco del bar di quartiere. Accanto a questo rito trovi pasticcerie storiche con sala da tè e un numero crescente di specialty coffee shop, dove ci si siede e ci si ferma un po’."
      },
      hotels: {
        title: "Dove dormire a Milano",
        body: "Il quartiere della moda e le vie intorno al Duomo hanno gli indirizzi più prestigiosi. Brera è centrale ma più tranquilla, i Navigli sono adatti alle serate lungo i canali, e Porta Nuova e la zona della Stazione Centrale sono pratiche per treni e affari. Durante la Design Week e le settimane della moda le camere si riempiono presto, quindi conviene avere una lista pronta."
      }
    },
    paris: {
      restaurants: {
        title: "Dove mangiare a Parigi, quartiere per quartiere",
        body: "Parigi premia chi sa dove guardare. Il 10° e l’11° arrondissement, dal Canal Saint-Martin verso Oberkampf e la Bastille, sono il cuore della scena dei bistrot moderni e dei vini naturali. Il Marais mescola vecchie istituzioni e nuove aperture, Saint-Germain conserva le brasserie classiche, e Montmartre e Pigalle hanno tavole di quartiere lontane dalle attrazioni principali."
      },
      bars: {
        title: "Dove uscire la sera a Parigi",
        body: "Wine bar e caves à manger sono ovunque nel 10° e nell’11° arrondissement, mentre i cocktail bar si concentrano nel Marais e intorno a Pigalle. Un bicchiere in terrazza a fine pomeriggio è un’abitudine parigina da adottare in qualsiasi arrondissement."
      },
      cafes: {
        title: "I due volti dei caffè di Parigi",
        body: "Il caffè parigino tradizionale, con il bancone di zinco e le sedie in terrazza rivolte verso la strada, convive con una nuova generazione di specialty coffee shop, molti dei quali nel 10° e nell’11° arrondissement e nel Marais. Il primo è per guardare la città che passa. Il secondo è per il caffè."
      },
      hotels: {
        title: "Dove dormire a Parigi",
        body: "L’arrondissement conta quanto l’hotel. Il Marais e Saint-Germain sono centrali e si girano a piedi, Montmartre e Pigalle hanno boutique hotel più piccoli e un’aria da villaggio, e l’8° e le vie intorno a Place Vendôme ospitano i «palace», i grandi hotel di lusso. Il 10° e l’11° ti mettono più vicino ai ristoranti e ai bar più nuovi."
      }
    },
    tokyo: {
      restaurants: {
        title: "Dove mangiare a Tokyo, quartiere per quartiere",
        body: "Tokyo è una città di specialisti: un bancone che serve solo tonkatsu, udon, ramen o yakitori, spesso con una manciata di posti. Shibuya e Shinjuku hanno un’alta densità di izakaya, Ginza ha i banconi più formali, e quartieri come Shimokitazawa, Nakameguro e Koenji hanno una scena più locale e rilassata. Molti piccoli locali accettano solo su prenotazione, quindi vale la pena salvarli prima del viaggio."
      },
      bars: {
        title: "Dove uscire la sera a Tokyo",
        body: "I bar di Tokyo sono spesso minuscoli: un bancone, qualche sgabello e una sola persona dietro al banco. Il Golden Gai, a Shinjuku, ne stipa decine in pochi vicoli, Ginza è nota per i cocktail bar classici, e Shibuya e Shimokitazawa mescolano locali di musica dal vivo, listening bar e standing bar. Gli izakaya sfumano il confine tra un bar e una cena."
      },
      cafes: {
        title: "I due volti dei caffè di Tokyo",
        body: "Due culture del caffè convivono in città: il kissaten, la caffetteria vecchio stile con caffè filtrato a mano e toast alti, e una nuova ondata di torrefazioni specialty e matcha bar. Le trovi entrambe da Ginza a Shibuya, a Koenji e a Kagurazaka, spesso a un piano alto o in una tranquilla via secondaria."
      }
    }
  },
}
