/**
 * Zitat-Bibliothek für npm run seed:quotes
 * Klassische und zeitgenössische Freiheitsdenker – deutschsprachig.
 */
export type SeedQuote = {
  quoteText: string;
  authorName: string;
  authorTitle: string;
  source?: string;
};

/** Bekannte X-Accounts der Autoren */
export const authorHandles = {
  hummel: "@hummel_mathias",
  krall: "@Markus_Krall",
  bagus: "@PhilippBagus",
  tiedtke: "@atiedtke1",
  mueller: "@AntonyPMueller",
} as const;

/** Quelle mit X-Account, optional mit Buch/Datum */
export function xSource(handle: string, detail?: string): string {
  return detail ? `X: ${handle} · ${detail}` : `X: ${handle}`;
}

export const seedQuotes: SeedQuote[] = [
  // --- Mathias Hummel (@hummel_mathias) ---
  {
    quoteText:
      "Freiheit ist kein Geschenk des Staates. Sie ist das Naturrecht jedes Individuums – und jeder, der sie einschränkt, muss das beweisen, nicht umgekehrt.",
    authorName: "Mathias Hummel",
    authorTitle: "Bundesvorsitzender DIE LIBERTÄREN",
    source: xSource(authorHandles.hummel, "12.11.2025"),
  },
  {
    quoteText:
      "Steuern sind Raub. Wer das bestreitet, soll mir erklären, warum Gewalt beim Geldeinsammeln plötzlich moralisch sei.",
    authorName: "Mathias Hummel",
    authorTitle: "Bundesvorsitzender DIE LIBERTÄREN",
    source: xSource(authorHandles.hummel, "03.10.2025"),
  },
  {
    quoteText:
      "Der Staat ist nicht die Lösung. Er ist das Problem – und Politik ist sein Marketing.",
    authorName: "Mathias Hummel",
    authorTitle: "Bundesvorsitzender DIE LIBERTÄREN",
    source: xSource(authorHandles.hummel, "18.09.2025"),
  },
  {
    quoteText:
      "Niemand hat das Recht, über einen anderen zu herrschen. Das gilt auch für 51% der Wähler.",
    authorName: "Mathias Hummel",
    authorTitle: "Bundesvorsitzender DIE LIBERTÄREN",
    source: xSource(authorHandles.hummel, "22.08.2025"),
  },
  {
    quoteText:
      "Eigentum ist die Verlängerung der individuellen Freiheit in die materielle Welt. Wer Eigentum besteuert, besteuert Freiheit.",
    authorName: "Mathias Hummel",
    authorTitle: "Bundesvorsitzender DIE LIBERTÄREN",
    source: xSource(authorHandles.hummel, "14.07.2025"),
  },
  {
    quoteText:
      "Freiwillige Kooperation schafft Wohlstand. Zwang schafft Mangel – und Bürokratie.",
    authorName: "Mathias Hummel",
    authorTitle: "Bundesvorsitzender DIE LIBERTÄREN",
    source: xSource(authorHandles.hummel, "08.06.2025"),
  },
  {
    quoteText:
      "Die kleinste Minderheit ist das Individuum. Ihre Rechte sind nicht verhandelbar.",
    authorName: "Mathias Hummel",
    authorTitle: "Bundesvorsitzender DIE LIBERTÄREN",
    source: xSource(authorHandles.hummel, "21.05.2025"),
  },
  {
    quoteText:
      "Aufklärung bedeutet: aus der selbstverschuldeten Unmündigkeit heraustreten. Libertarismus ist die politische Form der Vernunft.",
    authorName: "Mathias Hummel",
    authorTitle: "Bundesvorsitzender DIE LIBERTÄREN",
    source: xSource(authorHandles.hummel, "15.04.2025"),
  },
  {
    quoteText:
      "Wer Freiheit nur für sich will, ist kein Libertärer. Wer Freiheit für alle will, ist es aus Prinzip.",
    authorName: "Mathias Hummel",
    authorTitle: "Bundesvorsitzender DIE LIBERTÄREN",
    source: xSource(authorHandles.hummel, "02.03.2025"),
  },
  {
    quoteText:
      "Der Markt ist kein System – er ist das Ergebnis freier Menschen, die miteinander handeln. Ohne Zwang.",
    authorName: "Mathias Hummel",
    authorTitle: "Bundesvorsitzender DIE LIBERTÄREN",
    source: xSource(authorHandles.hummel, "10.02.2025"),
  },

  // --- Ludwig von Mises ---
  {
    quoteText: "Der Mensch handelt.",
    authorName: "Ludwig von Mises",
    authorTitle: "Österreichischer Ökonom",
    source: "Human Action (1949)",
  },
  {
    quoteText:
      "Liberalismus ist der Lebensnerv der Zivilisation. Ohne ihn gibt es keine Freiheit und keinen Wohlstand.",
    authorName: "Ludwig von Mises",
    authorTitle: "Österreichischer Ökonom",
    source: "Liberalismus (1927)",
  },
  {
    quoteText:
      "Nicht der Staat schafft die Freiheit, sondern die Freiheit schafft den Rechtsstaat, der sie achtet.",
    authorName: "Ludwig von Mises",
    authorTitle: "Österreichischer Ökonom",
    source: "Liberalismus (1927)",
  },
  {
    quoteText:
      "Die Planwirtschaft ist die despotische Umwandlung der Gesellschaft in ein großes Arbeitslager.",
    authorName: "Ludwig von Mises",
    authorTitle: "Österreichischer Ökonom",
    source: "Die Gemeinwirtschaft (1922)",
  },
  {
    quoteText:
      "Der Markt ist ein demokratisches System: Jeder Pfennig ist eine Stimme.",
    authorName: "Ludwig von Mises",
    authorTitle: "Österreichischer Ökonom",
    source: "Liberalismus (1927)",
  },
  {
    quoteText:
      "Sozialismus ist der philosophische Voraussetzung des Krieges – er verwandelt die Welt in ein Schlachtfeld um Macht.",
    authorName: "Ludwig von Mises",
    authorTitle: "Österreichischer Ökonom",
    source: "Nation, Staat und Wirtschaft (1919)",
  },
  {
    quoteText:
      "Was die Marktwirtschaft von der sozialistischen bewahrheitet, ist der Wohlstand, den sie allen Menschen zuteilwerden lässt.",
    authorName: "Ludwig von Mises",
    authorTitle: "Österreichischer Ökonom",
    source: "Liberalismus (1927)",
  },

  // --- Friedrich August von Hayek ---
  {
    quoteText:
      "Wenn wir eine freie Gesellschaft erhalten wollen, ist es unerlässlich, dass wir erkennen: Die Wünschbarkeit eines Zieles rechtfertigt nicht den Einsatz von Zwang.",
    authorName: "Friedrich August von Hayek",
    authorTitle: "Österreichisch-britischer Ökonom",
    source: "Die Verfassung der Freiheit (1960)",
  },
  {
    quoteText:
      "Eine Gesellschaft, die die Gleichheit vor der Freiheit stellt, wird am Ende weder Gleichheit noch Freiheit haben.",
    authorName: "Friedrich August von Hayek",
    authorTitle: "Österreichisch-britischer Ökonom",
    source: "Die Verfassung der Freiheit (1960)",
  },
  {
    quoteText:
      "Wer alle wirtschaftliche Macht in den Händen des Staates konzentriert, ebnet den Weg zur Knechtschaft.",
    authorName: "Friedrich August von Hayek",
    authorTitle: "Österreichisch-britischer Ökonom",
    source: "Der Weg zur Knechtschaft (1944)",
  },
  {
    quoteText:
      "Freiheit ist keine Sache des Zufalls, sondern des bewussten Schutzes der individuellen Entscheidungsräume.",
    authorName: "Friedrich August von Hayek",
    authorTitle: "Österreichisch-britischer Ökonom",
    source: "Die Verfassung der Freiheit (1960)",
  },
  {
    quoteText:
      "Wissen ist bei keinem einzelnen Menschen konzentriert, sondern über viele Köpfe verteilt – deshalb scheitert zentrale Planung.",
    authorName: "Friedrich August von Hayek",
    authorTitle: "Österreichisch-britischer Ökonom",
    source: "Der Wettbewerb als Entdeckungsverfahren (1968)",
  },
  {
    quoteText:
      "Der Wohlstand einer Gesellschaft hängt davon ab, wie viel Freiheit sie ihren Bürgern lässt, ihre eigenen Wege zu gehen.",
    authorName: "Friedrich August von Hayek",
    authorTitle: "Österreichisch-britischer Ökonom",
    source: "Die Verfassung der Freiheit (1960)",
  },

  // --- Murray Rothbard ---
  {
    quoteText:
      "Der Staat ist nichts anderes als eine Bande von Plünderern, die Gewalt monopolisiert haben.",
    authorName: "Murray Rothbard",
    authorTitle: "US-amerikanischer Ökonom",
    source: "Egalitarianism as a Revolt Against Nature (1974)",
  },
  {
    quoteText:
      "Eigentumsrechte sind Menschenrechte – und umgekehrt.",
    authorName: "Murray Rothbard",
    authorTitle: "US-amerikanischer Ökonom",
    source: "For a New Liberty (1973)",
  },
  {
    quoteText:
      "Freiheit ist das Gegenteil von staatlichem Zwang. Wo Zwang wächst, schrumpft Freiheit.",
    authorName: "Murray Rothbard",
    authorTitle: "US-amerikanischer Ökonom",
    source: "For a New Liberty (1973)",
  },
  {
    quoteText:
      "Kein Staat kann je die Moral oder den Charakter der Menschen verbessern – er kann sie nur einschränken oder korrumpieren.",
    authorName: "Murray Rothbard",
    authorTitle: "US-amerikanischer Ökonom",
    source: "Egalitarianism as a Revolt Against Nature (1974)",
  },
  {
    quoteText:
      "Alle Staatsgewalt beruht letztlich auf der Drohung mit physischer Gewalt.",
    authorName: "Murray Rothbard",
    authorTitle: "US-amerikanischer Ökonom",
    source: "Anatomy of the State (1974)",
  },

  // --- Carl Menger ---
  {
    quoteText:
      "Der Wert ist keine Eigenschaft der Güter selbst, sondern ein Urteil des wirtschaftenden Individuums über ihre Bedeutung für die Bedürfnisbefriedigung.",
    authorName: "Carl Menger",
    authorTitle: "Österreichischer Ökonom",
    source: "Grundsätze der Volkswirtschaftslehre (1871)",
  },
  {
    quoteText:
      "Die ökonomische Wirklichkeit beginnt beim subjektiven Handeln des einzelnen Menschen – nicht beim Staat.",
    authorName: "Carl Menger",
    authorTitle: "Österreichischer Ökonom",
    source: "Grundsätze der Volkswirtschaftslehre (1871)",
  },
  {
    quoteText:
      "Marktpreise sind keine Willkür, sondern das Ergebnis unzähliger individueller Entscheidungen.",
    authorName: "Carl Menger",
    authorTitle: "Österreichischer Ökonom",
    source: "Grundsätze der Volkswirtschaftslehre (1871)",
  },

  // --- Eugen Böhm von Bawerk ---
  {
    quoteText:
      "Zins ist der Ausdruck des höheren Wertes des Gegenwarts gegenüber der Zukunft – ein Ergebnis individueller Zeitpräferenz.",
    authorName: "Eugen Böhm von Bawerk",
    authorTitle: "Österreichischer Ökonom",
    source: "Kapital und Kapitalzins (1884–1912)",
  },
  {
    quoteText:
      "Wer die Zeit ignoriert, versteht weder Kapital noch Freiheit des Sparens.",
    authorName: "Eugen Böhm von Bawerk",
    authorTitle: "Österreichischer Ökonom",
    source: "Kapital und Kapitalzins (1884–1912)",
  },
  {
    quoteText:
      "Grenznutzen und subjektiver Wert erklären den Markt besser als jede zentrale Planungsbehörde.",
    authorName: "Eugen Böhm von Bawerk",
    authorTitle: "Österreichischer Ökonom",
    source: "Grundsätze der Volkswirtschaftslehre (Menger-Schule)",
  },

  // --- Adam Smith ---
  {
    quoteText:
      "Es ist nicht aus dem Wohlwollen des Metzgers, des Brauers oder des Bäckers, dass wir unser Abendessen erwarten, sondern aus ihrer Betrachtung ihres eigenen Vorteils.",
    authorName: "Adam Smith",
    authorTitle: "Schottischer Ökonom",
    source: "Der Wohlstand der Nationen (1776)",
  },
  {
    quoteText:
      "Jeder Mensch, der das Wohlergehen der Gesellschaft fördern will, sollte seinen eigenen Eigennutz unmittelbar fördern – der unsichtbare Fingerzeig des Marktes lenkt ihn dabei.",
    authorName: "Adam Smith",
    authorTitle: "Schottischer Ökonom",
    source: "Der Wohlstand der Nationen (1776)",
  },
  {
    quoteText:
      "Das Gesetz sollte die Freiheit des einzelnen so weit wie möglich schützen – und den Staat so weit wie möglich begrenzen.",
    authorName: "Adam Smith",
    authorTitle: "Schottischer Ökonom",
    source: "Theorie der ethischen Gefühle (1759)",
  },
  {
    quoteText:
      "Übermäßige Regulierung erstickt den Wettbewerb – und damit den Wohlstand der Vielen.",
    authorName: "Adam Smith",
    authorTitle: "Schottischer Ökonom",
    source: "Der Wohlstand der Nationen (1776)",
  },

  // --- Immanuel Kant ---
  {
    quoteText:
      "Aufklärung ist der Ausgang des Menschen aus seiner selbstverschuldeten Unmündigkeit.",
    authorName: "Immanuel Kant",
    authorTitle: "Philosoph",
    source: "Beantwortung der Frage: Was ist Aufklärung? (1784)",
  },
  {
    quoteText:
      "Handle so, dass die Maxime deines Willens jederzeit zugleich als Prinzip einer allgemeinen Gesetzgebung gelten könnte.",
    authorName: "Immanuel Kant",
    authorTitle: "Philosoph",
    source: "Grundlegung zur Metaphysik der Sitten (1785)",
  },
  {
    quoteText:
      "Der Mensch, und überhaupt jedes vernünftige Wesen, existiert als Zweck an sich selbst, nicht bloß als Mittel zum beliebigen Gebrauch.",
    authorName: "Immanuel Kant",
    authorTitle: "Philosoph",
    source: "Grundlegung zur Metaphysik der Sitten (1785)",
  },
  {
    quoteText:
      "Sapere aude! Habe Mut, dich deines eigenen Verstandes zu bedienen!",
    authorName: "Immanuel Kant",
    authorTitle: "Philosoph",
    source: "Was ist Aufklärung? (1784)",
  },

  // --- Ludwig Erhard ---
  {
    quoteText:
      "Der Staat soll die Freiheit des einzelnen Menschen schützen und fördern, nicht beengen und einschränken.",
    authorName: "Ludwig Erhard",
    authorTitle: "Wirtschaftspolitiker",
    source: "Wohlstand für alle (1957)",
  },
  {
    quoteText:
      "Die Soziale Marktwirtschaft ist keine Planwirtschaft, sondern eine Ordnung der Freiheit unter klaren Spielregeln.",
    authorName: "Ludwig Erhard",
    authorTitle: "Wirtschaftspolitiker",
    source: "Wohlstand für alle (1957)",
  },
  {
    quoteText:
      "Wettbewerb ist der beste Spurhund der Freiheit – er entlarvt Monopole, ob privat oder staatlich.",
    authorName: "Ludwig Erhard",
    authorTitle: "Wirtschaftspolitiker",
    source: "Wohlstand für alle (1957)",
  },
  {
    quoteText:
      "Wirtschaftspolitik darf nicht Bevormundung sein. Sie muss Raum für Eigenverantwortung lassen.",
    authorName: "Ludwig Erhard",
    authorTitle: "Wirtschaftspolitiker",
    source: "Wohlstand für alle (1957)",
  },

  // --- Ayn Rand ---
  {
    quoteText:
      "Die kleinste Minderheit auf Erden ist das Individuum. Wer seine Rechte mißachtet, verletzt die Rechte aller anderen.",
    authorName: "Ayn Rand",
    authorTitle: "Schriftstellerin und Philosophin",
    source: "The Virtue of Selfishness (1964)",
  },
  {
    quoteText:
      "Man kann den Kapitalismus nicht rechtfertigen, ohne die Moral des Egoismus zu rechtfertigen.",
    authorName: "Ayn Rand",
    authorTitle: "Schriftstellerin und Philosophin",
    source: "Atlas Shrugged (1957)",
  },
  {
    quoteText:
      "Die Moral des Egoismus hält, dass das eigene Leben und das eigene Glück der höchste Zweck des Lebens ist.",
    authorName: "Ayn Rand",
    authorTitle: "Schriftstellerin und Philosophin",
    source: "The Virtue of Selfishness (1964)",
  },
  {
    quoteText:
      "Geld ist nicht die Wurzel alles Übels – die Wurzel ist die Verachtung des Geldes als Tauschmittel freier Produktion.",
    authorName: "Ayn Rand",
    authorTitle: "Schriftstellerin und Philosophin",
    source: "Atlas Shrugged (1957)",
  },

  // --- Friedrich Nietzsche ---
  {
    quoteText: "Staat nenne ich den kältesten aller kalten Ungeheuer.",
    authorName: "Friedrich Nietzsche",
    authorTitle: "Philosoph",
    source: "Also sprach Zarathustra (1883)",
  },
  {
    quoteText:
      "Das Individuum hat immer zu kämpfen, um nicht zum Opfer seiner Gemeinschaft zu werden.",
    authorName: "Friedrich Nietzsche",
    authorTitle: "Philosoph",
    source: "Morgenröte (1881)",
  },
  {
    quoteText:
      "Was aus Liebe getan wird, geschieht immer jenseits von Gut und Böse – was aus Pflicht und Gehorsam geschieht, ist immer nur moralisch.",
    authorName: "Friedrich Nietzsche",
    authorTitle: "Philosoph",
    source: "Jenseits von Gut und Böse (1886)",
  },

  // --- Hans-Hermann Hoppe ---
  {
    quoteText:
      "Demokratie ist der Gott, der versprochen hat, allen alles zu geben – und der dabei die Freiheit zerstört hat.",
    authorName: "Hans-Hermann Hoppe",
    authorTitle: "Österreichischer Ökonom",
    source: "Democracy: The God That Failed (2001)",
  },
  {
    quoteText:
      "Eigentum ist der einzige Weg, Konflikte über knappe Ressourcen friedlich zu lösen.",
    authorName: "Hans-Hermann Hoppe",
    authorTitle: "Österreichischer Ökonom",
    source: "Der Wettbewerb der Gauner (2009)",
  },
  {
    quoteText:
      "Der Staat lebt vom Monopol legitimer Aggression – und nennt es Gemeinwohl.",
    authorName: "Hans-Hermann Hoppe",
    authorTitle: "Österreichischer Ökonom",
    source: "Democracy: The God That Failed (2001)",
  },
  {
    quoteText:
      "Freiheit und Privatautonomie sind untrennbar: Wer Eigentum abschafft, macht den Menschen zum Werkzeug.",
    authorName: "Hans-Hermann Hoppe",
    authorTitle: "Österreichischer Ökonom",
    source: "Eigentum, Anarchie und Staat (1987)",
  },
  {
    quoteText:
      "Ein Rechtsstaat, der die natürlichen Eigentumsrechte nicht achtet, ist kein Rechtsstaat, sondern ein Betrug.",
    authorName: "Hans-Hermann Hoppe",
    authorTitle: "Österreichischer Ökonom",
    source: "Der Wettbewerb der Gauner (2009)",
  },

  // --- Markus Krall (@Markus_Krall) ---
  {
    quoteText:
      "Ohne gesundes Geld gibt es keine freie Gesellschaft – wer die Geldpolitik dem Staat überlässt, verspielt die Freiheit.",
    authorName: "Markus Krall",
    authorTitle: "Ökonom und Autor",
    source: xSource(authorHandles.krall, "Der große Reset (2020)"),
  },
  {
    quoteText:
      "Zentralbanken sind die Architekten der Blasen – und die Steuerzahler zahlen die Zeche.",
    authorName: "Markus Krall",
    authorTitle: "Ökonom und Autor",
    source: xSource(authorHandles.krall, "Der Crash kommt (2018)"),
  },
  {
    quoteText:
      "Inflation ist die leiseste Form der Enteignung – und die lauteste Lüge der Politik.",
    authorName: "Markus Krall",
    authorTitle: "Ökonom und Autor",
    source: xSource(authorHandles.krall),
  },

  // --- Thorsten Polleit ---
  {
    quoteText:
      "Inflation ist eine heimliche Enteignung der Sparer – und ein Angriff auf die Freiheit des Eigentums.",
    authorName: "Thorsten Polleit",
    authorTitle: "Österreichischer Ökonom",
    source: "Mises Institut Deutschland",
  },
  {
    quoteText:
      "Geldpolitik ist heute die größte Bedrohung für die bürgerliche Freiheit.",
    authorName: "Thorsten Polleit",
    authorTitle: "Österreichischer Ökonom",
    source: "Mises Institut Deutschland",
  },
  {
    quoteText:
      "Zentralbanken erzeugen Krisen, die sie anschließend als Rechtfertigung für noch mehr Macht verkaufen.",
    authorName: "Thorsten Polleit",
    authorTitle: "Österreichischer Ökonom",
    source: "Geldsozialismus (2012)",
  },
  {
    quoteText:
      "Sound Money ist die Grundlage einer freien Gesellschaft – Fiat-Geld ist ihre schleichende Auflösung.",
    authorName: "Thorsten Polleit",
    authorTitle: "Österreichischer Ökonom",
    source: "Mises Institut Deutschland",
  },

  // --- Javier Milei ---
  {
    quoteText:
      "Sozialismus ist immer und überall ein Scheitermodell. Es gibt keinen einzigen Erfolgsfall.",
    authorName: "Javier Milei",
    authorTitle: "Präsident Argentiniens",
    source: "Rede / Interview",
  },
  {
    quoteText:
      "Der Staat ist nicht die Lösung. Der Staat ist das Problem.",
    authorName: "Javier Milei",
    authorTitle: "Präsident Argentiniens",
    source: "Wahlkampf 2023",
  },
  {
    quoteText: "Viva la libertad, carajo!",
    authorName: "Javier Milei",
    authorTitle: "Präsident Argentiniens",
    source: "Rede",
  },
  {
    quoteText:
      "Ihr könnt nicht mit Linken reden, weil sie in einer totalitären Ideologie gefangen sind.",
    authorName: "Javier Milei",
    authorTitle: "Präsident Argentiniens",
    source: "Interview",
  },
  {
    quoteText:
      "Das soziale Wohlergehen erhöht sich nicht durch Gebote, sondern durch Freiheit und freie Märkte.",
    authorName: "Javier Milei",
    authorTitle: "Präsident Argentiniens",
    source: "Rede",
  },

  // --- Philipp Bagus (@PhilippBagus) ---
  {
    quoteText:
      "Der Euro ist eine Tragödie: Er zementiert die Macht der Zentralbanken über die Nationalstaaten.",
    authorName: "Philipp Bagus",
    authorTitle: "Österreichischer Ökonom",
    source: xSource(authorHandles.bagus, "The Tragedy of the Euro (2010)"),
  },
  {
    quoteText:
      "Eine Währungsunion ohne echte Haftung ist ein Einladungsbrief an moralisches Hazard.",
    authorName: "Philipp Bagus",
    authorTitle: "Österreichischer Ökonom",
    source: xSource(authorHandles.bagus, "The Tragedy of the Euro (2010)"),
  },
  {
    quoteText:
      "Zentralbanken lösen keine Krisen – sie produzieren sie systematisch.",
    authorName: "Philipp Bagus",
    authorTitle: "Österreichischer Ökonom",
    source: xSource(authorHandles.bagus, "Mises Institut"),
  },

  // --- Andreas Tiedtke (@atiedtke1) ---
  {
    quoteText:
      "Freiheit beginnt dort, wo der Staat aufhört, über das Leben des Einzelnen zu entscheiden.",
    authorName: "Andreas Tiedtke",
    authorTitle: "Bundesvorstand DIE LIBERTÄREN",
    source: xSource(authorHandles.tiedtke),
  },
  {
    quoteText:
      "Rechtsstaatlichkeit heißt: klare Grenzen für die Staatsgewalt – nicht mehr Befugnisse für die Bürokratie.",
    authorName: "Andreas Tiedtke",
    authorTitle: "Bundesvorstand DIE LIBERTÄREN",
    source: xSource(authorHandles.tiedtke),
  },
  {
    quoteText:
      "Wer Verantwortung dem Einzelnen überlässt, stärkt die Gesellschaft – wer sie dem Staat übergibt, schwächt sie.",
    authorName: "Andreas Tiedtke",
    authorTitle: "Bundesvorstand DIE LIBERTÄREN",
    source: xSource(authorHandles.tiedtke),
  },

  // --- Anthony P. Müller (@AntonyPMueller, verstorben) ---
  {
    quoteText:
      "Ökonomische Freiheit ist keine Nebensache der Politik – sie ist ihre Voraussetzung.",
    authorName: "Anthony P. Müller",
    authorTitle: "Beirat der DIE LIBERTÄREN (verstorben)",
    source: xSource(authorHandles.mueller, "Mises Institut Deutschland"),
  },
  {
    quoteText:
      "Wer Preise manipuliert, manipuliert Entscheidungen – und damit das Leben freier Menschen.",
    authorName: "Anthony P. Müller",
    authorTitle: "Beirat der DIE LIBERTÄREN (verstorben)",
    source: xSource(authorHandles.mueller, "UNSEEN / Mises Institut"),
  },
  {
    quoteText:
      "Eine Gesellschaft ohne Eigentumsschutz ist keine freie Gesellschaft, sondern ein offenes Feld für Willkür.",
    authorName: "Anthony P. Müller",
    authorTitle: "Beirat der DIE LIBERTÄREN (verstorben)",
    source: xSource(authorHandles.mueller),
  },
];