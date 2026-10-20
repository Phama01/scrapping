import type { Module } from "@/types";

export const modules: Module[] = [
  // ── MODULE 1 ──────────────────────────────────────────────
  {
    number: 1,
    emoji: "🛠️",
    title: "Nettoyage & Préparation du Corpus",
    subtitle: "Charger, inspecter et nettoyer les avis clients",
    durationMin: 35,
    objectives: [
      "Charger un DataFrame Pandas et inspecter sa structure",
      "Détecter et traiter valeurs manquantes et doublons",
      "Nettoyer le texte avec des expressions régulières (re.sub)",
      "Lemmatiser et retirer les stopwords avec spaCy",
    ],
    pythonModules: ["pandas", "re", "spacy", "fr_core_news_sm"],
    lesson: {
      intro:
        "Avant de pouvoir analyser du texte, il faut le rendre exploitable. Les avis clients réels arrivent souvent avec des balises HTML, de la ponctuation, des chiffres, des mots vides et des formes fléchies. Ce module pose les fondations de tout pipeline NLP : charger, inspecter, nettoyer et normaliser.",
      sections: [
        {
          heading: "Pourquoi nettoyer le texte ?",
          body:
            "Un texte brut contient du bruit (HTML, ponctuation, majuscules) qui perturbe les algorithmes. La règle d'or : ramener chaque avis à une suite de mots significatifs et normalisés pour que des mots comme « délicieux » et « Délicieux ! » soient traités de la même façon.",
        },
        {
          heading: "pandas — la table de données",
          body:
            "pandas charge un CSV en DataFrame, une sorte de table Excel en Python. On l'inspecte avec shape (dimensions) et head() (aperçu), on traite les valeurs manquantes avec dropna et on convertit les types avec astype.",
          code:
            "import pandas as pd\ndf = pd.read_csv('avis_restaurants.csv')\nprint(df.shape)   # (24, 5)\nprint(df.head())  # 5 premières lignes",
        },
        {
          heading: "re — expressions régulières",
          body:
            "Le module re permet de rechercher et remplacer du texte par motifs. re.sub(pattern, replacement, text) remplace tout ce qui matche le pattern. On l'utilise pour retirer balises HTML, ponctuation et chiffres en une seule passe.",
          code:
            "import re\ntexte = re.sub(r'<br\\s*/?>', ' ', texte)   # balises\ntexte = re.sub(r'[^a-zàâéè\\s]', ' ', texte)  # non-lettres",
        },
        {
          heading: "spaCy — lemmatisation & stopwords",
          body:
            "spaCy est une bibliothèque NLP qui découpe le texte en tokens. Chaque token possède un lemme (la forme canonique du mot, ex: « mangions » → « manger ») et un flag is_stop indiquant si c'est un mot vide (le, la, de, et…). Filtrer les stopwords et garder les lemmes réduit drastiquement le bruit.",
          code:
            "import spacy\nnlp = spacy.load('fr_core_news_sm')\ndoc = nlp(texte)\nlemmes = [t.lemma_ for t in doc if not t.is_stop and len(t.lemma_) > 2]",
        },
      ],
      keyTakeaway:
        "Un bon nettoyage = données complètes + texte normalisé. C'est l'étape la moins glamour mais la plus déterminante pour la qualité de toute l'analyse qui suit.",
    },
    exercises: [
      {
        id: "1.1",
        moduleNumber: 1,
        number: 1,
        title: "Chargement & Inspection",
        difficulty: 1,
        minutes: 5,
        statement:
          "Chargez le fichier `avis_restaurants.csv` dans un DataFrame Pandas nommé `df`, puis affichez ses dimensions avec `shape` et les 5 premières lignes avec `head()`.",
        hint: {
          label: "Rappel de syntaxe",
          content:
            "import pandas as pd\ndf = pd.read_csv('avis_restaurants.csv')\nprint(df.shape)\nprint(df.head())",
        },
        solution:
          "import pandas as pd\n\n# Chargement du dataset\ndf = pd.read_csv('avis_restaurants.csv')\n\n# Dimensions du DataFrame (lignes, colonnes)\nprint(df.shape)\n\n# Aperçu des 5 premières lignes\nprint(df.head())",
        validation: { pattern: "pd\\.read_csv", flags: "i" },
      },
      {
        id: "1.2",
        moduleNumber: 1,
        number: 2,
        title: "Traitement des Vides & Types",
        difficulty: 2,
        minutes: 6,
        statement:
          "Identifiez les lignes avec un texte d'avis ou une note manquante, supprimez-les avec `dropna`, puis convertissez la colonne `note` en entier avec `astype(int)`.",
        hint: {
          label: "Indice",
          content:
            "Utilisez `subset=['texte','note']` dans dropna pour cibler ces colonnes, puis `df['note'] = df['note'].astype(int)`.",
        },
        solution:
          "# Suppression des lignes avec avis ou note manquants\ndf = df.dropna(subset=['texte', 'note'])\n\n# Conversion de la note en entier\ndf['note'] = df['note'].astype(int)\n\nprint(df.info())",
        validation: { pattern: "dropna.*astype\\(int\\)", flags: "is" },
      },
      {
        id: "1.3",
        moduleNumber: 1,
        number: 3,
        title: "Nettoyage Regex",
        difficulty: 3,
        minutes: 7,
        statement:
          "Écrivez une fonction `nettoyer_texte(texte)` utilisant `re.sub` pour : passer en minuscules, retirer les balises HTML (`<br>`), la ponctuation et les chiffres. Renvoyer le texte nettoyé.",
        hint: {
          label: "Rappel de syntaxe",
          content:
            "re.sub(r'<br\\s*/?>', ' ', texte)  # balises\nre.sub(r'[^a-zàâäéèêëïîôöùûüÿ\\s]', ' ', texte)  # non-lettres",
        },
        solution:
          "import re\n\ndef nettoyer_texte(texte: str) -> str:\n    texte = texte.lower()\n    texte = re.sub(r'<br\\s*/?>', ' ', texte)        # balises HTML\n    texte = re.sub(r'[^a-zàâäéèêëïîôöùûüÿ\\s]', ' ', texte)  # ponctuation + chiffres\n    texte = re.sub(r'\\s+', ' ', texte).strip()       # espaces multiples\n    return texte\n\nprint(nettoyer_texte('Très bon ! <br> 10/10'))",
        validation: { pattern: "re\\.sub.*lower", flags: "is" },
      },
      {
        id: "1.4",
        moduleNumber: 1,
        number: 4,
        title: "Lemmatisation & Stopwords",
        difficulty: 4,
        minutes: 6,
        statement:
          "Utilisez spaCy (`fr_core_news_sm`) pour extraire les lemmes de chaque token, filtrer les stopwords (`token.is_stop`) et ne garder que les mots de plus de 2 lettres.",
        hint: {
          label: "Indice",
          content:
            "import spacy\nnlp = spacy.load('fr_core_news_sm')\ndoc = nlp(texte)\nlemmes = [t.lemma_ for t in doc if not t.is_stop and len(t.lemma_) > 2]",
        },
        solution:
          "import spacy\n\nnlp = spacy.load('fr_core_news_sm')\n\ndef lemmatiser(texte: str) -> list[str]:\n    doc = nlp(texte)\n    lemmes = [\n        token.lemma_\n        for token in doc\n        if not token.is_stop and len(token.lemma_) > 2\n    ]\n    return lemmes\n\nprint(lemmatiser('Les pâtes étaient délicieuses'))",
        validation: { pattern: "is_stop.*lemma_", flags: "is" },
      },
      {
        id: "1.5",
        moduleNumber: 1,
        number: 5,
        title: "Filtrage Avancé & Distribution",
        difficulty: 5,
        minutes: 6,
        statement:
          "Créez une fonction complète de nettoyage appliquée à tout le DataFrame (colonne `texte_clean`), puis calculez la longueur des avis en nombre de mots avec `str.split().str.len()` et affichez sa distribution (`describe()`).",
        hint: {
          label: "Indice",
          content:
            "df['texte_clean'] = df['texte'].apply(nettoyer_texte)\ndf['nb_mots'] = df['texte_clean'].str.split().str.len()\nprint(df['nb_mots'].describe())",
        },
        solution:
          "# Application du nettoyage complet\ndf['texte_clean'] = df['texte'].apply(nettoyer_texte)\n\n# Longueur en nombre de mots\ndf['nb_mots'] = df['texte_clean'].str.split().str.len()\n\n# Distribution statistique\nprint(df['nb_mots'].describe())\nprint('Avis le plus court :', df['nb_mots'].min(), 'mots')\nprint('Avis le plus long :', df['nb_mots'].max(), 'mots')",
        validation: { pattern: "str\\.split\\(\\)\\.str\\.len", flags: "i" },
      },
    ],
  },

  // ── MODULE 2 ──────────────────────────────────────────────
  {
    number: 2,
    emoji: "📊",
    title: "Analyse Descriptive & Visualisation",
    subtitle: "Statistiques, distributions et nuages de mots",
    durationMin: 35,
    objectives: [
      "Calculer indicateurs de tendance (moyenne, médiane)",
      "Compter et trier les fréquences avec value_counts",
      "Comparer les établissements avec groupby",
      "Extraire les mots fréquents avec Counter",
    ],
    pythonModules: ["pandas", "matplotlib.pyplot", "seaborn", "collections.Counter", "wordcloud"],
    lesson: {
      intro:
        "Une fois le corpus nettoyé, l'étape suivante consiste à comprendre les données avant de modéliser quoi que ce soit. L'analyse descriptive révèle les tendances générales : notes moyennes, distributions, comparaisons entre établissements et mots les plus fréquents.",
      sections: [
        {
          heading: "Indicateurs de tendance centrale",
          body:
            "La moyenne (mean) et la médiane (median) résument une distribution. La moyenne est sensible aux extrêmes, la médiane moins. Si l'écart entre les deux est grand, la distribution est asymétrique — c'est déjà une information utile sur la perception client.",
          code:
            "df['note'].mean()     # 3.54\ndf['note'].median()   # 4.0",
        },
        {
          heading: "value_counts & groupby",
          body:
            "value_counts() compte les occurrences de chaque valeur — utile pour voir combien d'avis ont 1, 2, 3, 4 ou 5 étoiles. groupby() regroupe les lignes par catégorie (ex: par restaurant) pour comparer les établissements entre eux.",
          code:
            "df['note'].value_counts().sort_index()\ndf.groupby('restaurant')['note'].mean()",
        },
        {
          heading: "collections.Counter — fréquence des mots",
          body:
            "Counter est un dictionnaire qui compte automatiquement les éléments. most_common(n) renvoie les n éléments les plus fréquents. C'est l'outil le plus simple pour extraire le vocabulaire dominant d'un corpus.",
          code:
            "from collections import Counter\nmots = ' '.join(df['texte_clean']).split()\nCounter(mots).most_common(15)",
        },
        {
          heading: "Visualisation avec seaborn & wordcloud",
          body:
            "Un graphique vaut mille nombres. seaborn produit des graphiques statistiques propres (countplot, barplot). WordCloud génère un nuage de mots où la taille de chaque mot est proportionnelle à sa fréquence — parfait pour une vue d'ensemble du corpus.",
        },
      ],
      keyTakeaway:
        "L'analyse descriptive transforme des données brutes en insights actionnables : quel restaurant est le mieux noté, quels mots reviennent, où se concentrent les insatisfactions.",
    },
    exercises: [
      {
        id: "2.1",
        moduleNumber: 2,
        number: 1,
        title: "Indicateurs de Tendance",
        difficulty: 1,
        minutes: 5,
        statement:
          "Calculez la note moyenne et la note médiane globales de l'ensemble des avis à partir de la colonne `note`.",
        hint: {
          label: "Indice",
          content: "df['note'].mean() et df['note'].median()",
        },
        solution:
          "note_moyenne = df['note'].mean()\nnote_mediane = df['note'].median()\n\nprint(f'Note moyenne : {note_moyenne:.2f}')\nprint(f'Note médiane : {note_mediane}')",
        validation: { pattern: "\\.mean.*\\.median", flags: "is" },
      },
      {
        id: "2.2",
        moduleNumber: 2,
        number: 2,
        title: "Distribution des Notes",
        difficulty: 2,
        minutes: 6,
        statement:
          "Comptez la fréquence de chaque note (de 1 à 5) avec `value_counts()` et triez-les par index avec `sort_index()`.",
        hint: {
          label: "Indice",
          content: "df['note'].value_counts().sort_index()",
        },
        solution:
          "distribution = df['note'].value_counts().sort_index()\nprint(distribution)\n# Index : 1, 2, 3, 4, 5 — valeurs : nb d'avis par note",
        validation: { pattern: "value_counts.*sort_index", flags: "is" },
      },
      {
        id: "2.3",
        moduleNumber: 2,
        number: 3,
        title: "Comparaison par Établissement",
        difficulty: 3,
        minutes: 7,
        statement:
          "Groupez les données par `restaurant` avec `groupby` pour calculer la note moyenne et le nombre total d'avis par établissement.",
        hint: {
          label: "Indice",
          content:
            "df.groupby('restaurant')['note'].agg(['mean','count'])",
        },
        solution:
          "stats_restaurants = df.groupby('restaurant')['note'].agg(\n    note_moyenne='mean',\n    nombre_avis='count'\n).round(2)\n\nprint(stats_restaurants.sort_values('note_moyenne', ascending=False))",
        validation: { pattern: "groupby.*agg", flags: "is" },
      },
      {
        id: "2.4",
        moduleNumber: 2,
        number: 4,
        title: "Fréquence des Mots",
        difficulty: 4,
        minutes: 6,
        statement:
          "Concaténez tous les textes nettoyés (`texte_clean`), séparez en mots, et utilisez `Counter` pour extraire les 15 mots les plus fréquents du corpus.",
        hint: {
          label: "Indice",
          content:
            "from collections import Counter\nmots = ' '.join(df['texte_clean']).split()\nCounter(mots).most_common(15)",
        },
        solution:
          "from collections import Counter\n\n# Concaténation de tout le corpus nettoyé\ncorpus = ' '.join(df['texte_clean'])\nmots = corpus.split()\n\n# Top 15 des mots les plus fréquents\ntop_mots = Counter(mots).most_common(15)\n\nfor mot, count in top_mots:\n    print(f'{mot:<15} {count}')",
        validation: { pattern: "Counter.*most_common", flags: "is" },
      },
      {
        id: "2.5",
        moduleNumber: 2,
        number: 5,
        title: "Visualisation & Nuage de Mots",
        difficulty: 5,
        minutes: 6,
        statement:
          "Générez un graphique à barres avec `seaborn.countplot` montrant la distribution des notes, puis affichez un nuage de mots avec `WordCloud` sur le corpus nettoyé.",
        hint: {
          label: "Indice",
          content:
            "import seaborn as sns, matplotlib.pyplot as plt\nsns.countplot(x='note', data=df)\nfrom wordcloud import WordCloud\nWordCloud().generate(corpus)",
        },
        solution:
          "import seaborn as sns\nimport matplotlib.pyplot as plt\nfrom wordcloud import WordCloud\n\n# Distribution des notes\nplt.figure(figsize=(6,4))\nsns.countplot(x='note', data=df, palette='viridis')\nplt.title('Distribution des notes')\nplt.show()\n\n# Nuage de mots\ncorpus = ' '.join(df['texte_clean'])\nwordcloud = WordCloud(width=800, height=400, background_color='white').generate(corpus)\nplt.figure(figsize=(10,5))\nplt.imshow(wordcloud, interpolation='bilinear')\nplt.axis('off')\nplt.show()",
        validation: { pattern: "countplot.*WordCloud", flags: "is" },
      },
    ],
  },

  // ── MODULE 3 ──────────────────────────────────────────────
  {
    number: 3,
    emoji: "🎭",
    title: "Analyse de Sentiment avec VADER",
    subtitle: "Scorer et catégoriser les avis clients",
    durationMin: 35,
    objectives: [
      "Instancier le SentimentIntensityAnalyzer de NLTK",
      "Calculer le score compound sur du texte brut",
      "Appliquer VADER à tout le DataFrame",
      "Catégoriser et valider les résultats avec une matrice de confusion",
    ],
    pythonModules: ["nltk", "nltk.sentiment.vader.SentimentIntensityAnalyzer"],
    lesson: {
      intro:
        "L'analyse de sentiment consiste à déterminer automatiquement si un texte exprime un avis positif, négatif ou neutre. VADER (Valence Aware Dictionary and sEntiment Reasoner) est un algorithme lexique-based, rapide et sans entraînement — parfait pour des avis courts comme ceux de restaurants.",
      sections: [
        {
          heading: "Qu'est-ce que VADER ?",
          body:
            "VADER est intégré à NLTK. Il utilise un dictionnaire de mots associés à une valence (positivité/négativité) et des règles pour gérer la négation, la ponctuation et les intensificateurs. Pas de machine learning : c'est du calcul basé sur des règles linguistiques.",
        },
        {
          heading: "Le score compound",
          body:
            "polarity_scores() renvoie 4 valeurs : neg, neu, pos (somme = 1) et compound (entre -1 et +1). Le score compound est une synthèse normalisée du sentiment global. C'est la métrique qu'on utilise pour catégoriser.",
          code:
            "from nltk.sentiment.vader import SentimentIntensityAnalyzer\nsia = SentimentIntensityAnalyzer()\nsia.polarity_scores('Repas excellent !')\n# {'neg': 0.0, 'neu': 0.32, 'pos': 0.68, 'compound': 0.7096}",
        },
        {
          heading: "Important : VADER lit le texte brut",
          body:
            "Contrairement à TF-IDF ou au comptage de mots, VADER fonctionne sur le texte NON nettoyé. La ponctuation et les majuscules sont des signaux de sentiment (un « ! » amplifie la positivité). Ne passez donc pas le texte dans votre fonction nettoyer_texte avant VADER.",
        },
        {
          heading: "Catégorisation & validation",
          body:
            "On seuille le compound : ≥ 0.05 → Positif, ≤ -0.05 → Négatif, sinon Neutre. Pour valider, on compare le sentiment prédit avec le sentiment réel déduit de la note (4-5 = Positif, 1-2 = Négatif) via une matrice de confusion et un calcul d'accuracy.",
        },
      ],
      keyTakeaway:
        "VADER est un outil d'analyse de sentiment prêt à l'emploi, sans entraînement. Il excelle sur les textes courts et informels, mais sa précision dépend du domaine — d'où l'importance de le valider contre les notes réelles.",
    },
    exercises: [
      {
        id: "3.1",
        moduleNumber: 3,
        number: 1,
        title: "Initialisation VADER",
        difficulty: 1,
        minutes: 5,
        statement:
          "Importez et instanciez le VADER Sentiment Intensity Analyzer de NLTK. N'oubliez pas le téléchargement du lexique `vader_lexicon`.",
        hint: {
          label: "Indice",
          content:
            "import nltk\nnltk.download('vader_lexicon')\nfrom nltk.sentiment.vader import SentimentIntensityAnalyzer\nsia = SentimentIntensityAnalyzer()",
        },
        solution:
          "import nltk\nnltk.download('vader_lexicon')\nfrom nltk.sentiment.vader import SentimentIntensityAnalyzer\n\nsia = SentimentIntensityAnalyzer()\nprint('VADER initialisé')",
        validation: { pattern: "SentimentIntensityAnalyzer\\(\\)", flags: "i" },
      },
      {
        id: "3.2",
        moduleNumber: 3,
        number: 2,
        title: "Calcul du Score Compound",
        difficulty: 2,
        minutes: 6,
        statement:
          "Appliquez VADER sur un avis individuel (en texte brut) et extrayez la valeur de la clé `compound` du dictionnaire retourné.",
        hint: {
          label: "Indice",
          content:
            "scores = sia.polarity_scores(texte)\ncompound = scores['compound']",
        },
        solution:
          "avis = \"Repas exceptionnel, service impeccable !\"\nscores = sia.polarity_scores(avis)\n\nprint(scores)\n# {'neg': 0.0, 'neu': 0.32, 'pos': 0.68, 'compound': 0.7096}\n\ncompound = scores['compound']\nprint(f'Score compound : {compound}')",
        validation: { pattern: "polarity_scores.*compound", flags: "is" },
      },
      {
        id: "3.3",
        moduleNumber: 3,
        number: 3,
        title: "Application globale",
        difficulty: 3,
        minutes: 7,
        statement:
          "Créez une colonne `score_vader` dans le DataFrame en appliquant VADER sur la colonne des textes bruts et en extrayant le score compound.",
        hint: {
          label: "Indice",
          content:
            "df['score_vader'] = df['texte'].apply(lambda t: sia.polarity_scores(t)['compound'])",
        },
        solution:
          "def score_compound(texte: str) -> float:\n    return sia.polarity_scores(texte)['compound']\n\n# VADER fonctionne sur le texte BRUT (non nettoyé)\ndf['score_vader'] = df['texte'].apply(score_compound)\n\nprint(df[['texte', 'note', 'score_vader']].head())",
        validation: { pattern: "score_vader.*polarity_scores.*compound", flags: "is" },
      },
      {
        id: "3.4",
        moduleNumber: 3,
        number: 4,
        title: "Classification de Sentiment",
        difficulty: 4,
        minutes: 6,
        statement:
          "Écrivez une fonction de segmentation : `compound >= 0.05` → Positif, `compound <= -0.05` → Négatif, sinon Neutre. Appliquez-la dans une colonne `sentiment`.",
        hint: {
          label: "Indice",
          content:
            "def categoriser(c):\n    if c >= 0.05: return 'Positif'\n    elif c <= -0.05: return 'Négatif'\n    else: return 'Neutre'",
        },
        solution:
          "def categoriser_sentiment(compound: float) -> str:\n    if compound >= 0.05:\n        return 'Positif'\n    elif compound <= -0.05:\n        return 'Négatif'\n    else:\n        return 'Neutre'\n\ndf['sentiment'] = df['score_vader'].apply(categoriser_sentiment)\n\nprint(df['sentiment'].value_counts())",
        validation: { pattern: ">=\\s*0\\.05.*-0\\.05", flags: "is" },
      },
      {
        id: "3.5",
        moduleNumber: 3,
        number: 5,
        title: "Matrice de Confusion / Validation",
        difficulty: 5,
        minutes: 6,
        statement:
          "Définissez le sentiment réel à partir des notes (4-5 = Positif, 1-2 = Négatif, 3 = Neutre), puis croisez-le avec le sentiment VADER pour calculer la précision (accuracy) de l'analyse.",
        hint: {
          label: "Indice",
          content:
            "df['sentiment_reel'] = df['note'].apply(lambda n: 'Positif' if n>=4 else ('Négatif' if n<=2 else 'Neutre'))\n(pd.crosstab(df['sentiment_reel'], df['sentiment']))",
        },
        solution:
          "# Sentiment réel déduit de la note\ndef sentiment_reel(note: int) -> str:\n    if note >= 4: return 'Positif'\n    elif note <= 2: return 'Négatif'\n    else: return 'Neutre'\n\ndf['sentiment_reel'] = df['note'].apply(sentiment_reel)\n\n# Matrice de confusion\nmatrice = pd.crosstab(df['sentiment_reel'], df['sentiment'], margins=True)\nprint(matrice)\n\n# Précision (accuracy)\naccuracy = (df['sentiment'] == df['sentiment_reel']).mean()\nprint(f'Précision VADER : {accuracy:.1%}')",
        validation: { pattern: "crosstab.*accuracy|sentiment_reel.*mean", flags: "is" },
      },
    ],
  },

  // ── MODULE 4 ──────────────────────────────────────────────
  {
    number: 4,
    emoji: "🔠",
    title: "Extraction de Thèmes avec TF-IDF",
    subtitle: "Vectoriser le corpus et identifier les mots-clés",
    durationMin: 35,
    objectives: [
      "Instancier un TfidfVectorizer avec filtrage de fréquence",
      "Construire la matrice document-terme (fit_transform)",
      "Extraire le vocabulaire avec get_feature_names_out",
      "Identifier les mots discriminants par document et par restaurant",
    ],
    pythonModules: ["sklearn.feature_extraction.text.TfidfVectorizer"],
    lesson: {
      intro:
        "TF-IDF (Term Frequency — Inverse Document Frequency) est la méthode de référence pour transformer du texte en nombres exploitables. Elle identifie les mots qui caractérisent un document par rapport au reste du corpus — les fameux « mots-clés ».",
      sections: [
        {
          heading: "Le principe TF-IDF",
          body:
            "TF mesure la fréquence d'un mot dans un document. IDF pénalise les mots présents partout (donc peu discriminants). Le produit TF×IDF donne un score élevé aux mots fréquents dans un document mais rares ailleurs — ce sont eux qui définissent le thème.",
          code:
            "# 'pizza' fréquent chez Bella Italia mais rare ailleurs → TF-IDF élevé\n# 'le' présent partout → TF-IDF proche de 0",
        },
        {
          heading: "TfidfVectorizer",
          body:
            "sklearn fournit TfidfVectorizer qui fait tout en une ligne : tokenisation, calcul TF-IDF et construction de la matrice document-terme. max_df et min_df filtrent les mots trop fréquents ou trop rares pour réduire le bruit.",
          code:
            "from sklearn.feature_extraction.text import TfidfVectorizer\nvec = TfidfVectorizer(max_df=0.9, min_df=2)\nmatrice = vec.fit_transform(df['texte_clean'])",
        },
        {
          heading: "La matrice document-terme",
          body:
            "Le résultat est une matrice creuse (sparse matrix) de taille n_documents × n_termes. Chaque cellule contient le score TF-IDF d'un mot dans un document. get_feature_names_out() liste le vocabulaire retenu.",
        },
        {
          heading: "Extracting des thèmes",
          body:
            "Pour identifier le thème d'un document, on extrait les mots aux scores TF-IDF les plus élevés. Pour comparer des établissements, on calcule le score moyen par restaurant — les mots qui se détachent révèlent la spécificité de chaque lieu.",
        },
      ],
      keyTakeaway:
        "TF-IDF transforme le texte en une représentation numérique où les mots discriminants émergent. C'est la base de la classification de documents, du clustering de thèmes et de la recherche d'information.",
    },
    exercises: [
      {
        id: "4.1",
        moduleNumber: 4,
        number: 1,
        title: "Initialisation TF-IDF",
        difficulty: 1,
        minutes: 5,
        statement:
          "Instanciez `TfidfVectorizer` avec les paramètres de filtrage de fréquence `max_df=0.9` et `min_df=2`.",
        hint: {
          label: "Indice",
          content:
            "from sklearn.feature_extraction.text import TfidfVectorizer\nvec = TfidfVectorizer(max_df=0.9, min_df=2)",
        },
        solution:
          "from sklearn.feature_extraction.text import TfidfVectorizer\n\nvectorizer = TfidfVectorizer(max_df=0.9, min_df=2)\nprint('Vectoriseur TF-IDF configuré :')\nprint('  max_df=0.9 (ignore mots présents >90% des docs)')\nprint('  min_df=2   (garde mots présents dans ≥2 docs)')",
        validation: { pattern: "TfidfVectorizer.*max_df.*min_df", flags: "is" },
      },
      {
        id: "4.2",
        moduleNumber: 4,
        number: 2,
        title: "Transformation du Corpus",
        difficulty: 2,
        minutes: 6,
        statement:
          "Ajustez et transformez la colonne `texte_clean` avec `fit_transform` pour obtenir la matrice TF-IDF. Affichez sa `shape`.",
        hint: {
          label: "Indice",
          content:
            "matrice = vectorizer.fit_transform(df['texte_clean'])\nprint(matrice.shape)",
        },
        solution:
          "# Ajustement + transformation du corpus nettoyé\ntfidf_matrix = vectorizer.fit_transform(df['texte_clean'])\n\nprint(f'Matrice TF-IDF : {tfidf_matrix.shape}')\n# (n_documents, n_termes du vocabulaire)",
        validation: { pattern: "fit_transform.*shape", flags: "is" },
      },
      {
        id: "4.3",
        moduleNumber: 4,
        number: 3,
        title: "Vocabulaire & Mots-clés",
        difficulty: 3,
        minutes: 7,
        statement:
          "Extrayez la liste des mots retenus avec `get_feature_names_out()` et vérifiez la taille du vocabulaire.",
        hint: {
          label: "Indice",
          content:
            "vocab = vectorizer.get_feature_names_out()\nprint(len(vocab), vocab[:10])",
        },
        solution:
          "vocabulaire = vectorizer.get_feature_names_out()\n\nprint(f'Taille du vocabulaire : {len(vocabulaire)} mots')\nprint('Exemple de termes :', list(vocabulaire[:10]))\n\n# La taille du vocabulaire correspond à la 2ᵉ dimension de la matrice\nassert len(vocabulaire) == tfidf_matrix.shape[1]",
        validation: { pattern: "get_feature_names_out", flags: "i" },
      },
      {
        id: "4.4",
        moduleNumber: 4,
        number: 4,
        title: "Top Mots par Document",
        difficulty: 4,
        minutes: 6,
        statement:
          "Écrivez une fonction `top_mots_tfidf(index, n=3)` qui extrait les `n` mots ayant le plus fort score TF-IDF pour l'avis situé à `index` dans la matrice.",
        hint: {
          label: "Indice",
          content:
            "ligne = tfidf_matrix[index].toarray()[0]\nindices = ligne.argsort()[::-1][:n]\n[vocabulaire[i] for i in indices]",
        },
        solution:
          "import numpy as np\n\ndef top_mots_tfidf(index: int, n: int = 3) -> list[tuple[str, float]]:\n    ligne = tfidf_matrix[index].toarray()[0]\n    top_indices = ligne.argsort()[::-1][:n]\n    return [(vocabulaire[i], round(ligne[i], 3)) for i in top_indices]\n\n# Test sur l'avis n°0\nprint(top_mots_tfidf(0, n=3))\n# ex. [('repas', 0.42), ('exceptionnel', 0.38), ('service', 0.35)]",
        validation: { pattern: "toarray.*argsort", flags: "is" },
      },
      {
        id: "4.5",
        moduleNumber: 4,
        number: 5,
        title: "Comparaison Thématique",
        difficulty: 5,
        minutes: 6,
        statement:
          "Calculez le score TF-IDF moyen de chaque mot par restaurant pour identifier les termes spécifiques à chaque établissement. Ajoutez une colonne `restaurant` au repérage et utilisez `groupby`.",
        hint: {
          label: "Indice",
          content:
            "df_tfidf = pd.DataFrame(tfidf_matrix.toarray(), columns=vocabulaire)\ndf_tfidf['restaurant'] = df['restaurant'].values\ndf_tfidf.groupby('restaurant').mean().T",
        },
        solution:
          "# DataFrame des scores TF-IDF + colonne restaurant\ndf_tfidf = pd.DataFrame(\n    tfidf_matrix.toarray(),\n    columns=vocabulaire\n)\ndf_tfidf['restaurant'] = df['restaurant'].values\n\n# Score TF-IDF moyen par restaurant\nmoyennes = df_tfidf.groupby('restaurant').mean()\n\n# Top 5 termes par restaurant\nfor resto in moyennes.index:\n    top5 = moyennes.loc[resto].sort_values(ascending=False).head(5)\n    print(f'\\n{resto} :')\n    for mot, score in top5.items():\n        print(f'  {mot:<15} {score:.3f}')",
        validation: { pattern: "groupby.*mean.*sort_values", flags: "is" },
      },
    ],
  },

  // ── MODULE 5 ──────────────────────────────────────────────
  {
    number: 5,
    emoji: "📈",
    title: "KPIs & Pilotage de la Réputation",
    subtitle: "Indicateurs temporels et tableau de bord",
    durationMin: 35,
    objectives: [
      "Convertir et extraire des périodes temporelles avec pd.to_datetime",
      "Suivre l'évolution de la note moyenne par mois",
      "Calculer le CSAT et le ratio d'avis négatifs",
      "Construire un dashboard synthétique multi-KPI",
    ],
    pythonModules: ["pandas", "datetime"],
    lesson: {
      intro:
        "Les KPIs (Key Performance Indicators) transforment l'analyse en pilotage. Plutôt que de regarder des notes isolées, on suit des indicateurs synthétiques dans le temps pour détecter les tendances, alerter sur les dérives et comparer les établissements de façon actionable.",
      sections: [
        {
          heading: "Manipulation temporelle avec pandas",
          body:
            "pd.to_datetime convertit une colonne de dates textuelles en vraies dates. dt.to_period('M') extrait le mois (format 'AAAA-MM'). On peut alors groupby('mois') pour suivre l'évolution des indicateurs dans le temps.",
          code:
            "df['date_avis'] = pd.to_datetime(df['date_avis'])\ndf['mois'] = df['date_avis'].dt.to_period('M')\ndf.groupby('mois')['note'].mean()",
        },
        {
          heading: "CSAT — Customer Satisfaction Score",
          body:
            "Le CSAT est le pourcentage d'avis satisfaits (note ≥ 4). C'est l'indicateur de référence en restauration : un CSAT de 75%+ est considéré comme bon. On le calcule global et par restaurant pour comparer.",
          code:
            "csat = (df['note'] >= 4).mean() * 100",
        },
        {
          heading: "Ratio d'alerte négatif",
          body:
            "Le pourcentage d'avis très négatifs (notes 1-2) est un signal d'alarme. Suivre son évolution mensuelle permet de détecter une dégradation avant qu'elle ne s'aggrave — c'est de la maintenance préventive de la réputation.",
        },
        {
          heading: "Dashboard de synthèse",
          body:
            "Un bon dashboard croise plusieurs KPIs dans une seule vue : note moyenne, CSAT, sentiment VADER moyen et nombre d'avis par restaurant. L'objectif est de donner au décideur une photo complète en un coup d'œil, sans avoir à lire 24 avis individuels.",
        },
      ],
      keyTakeaway:
        "Les KPIs convertissent la donnée brute en pilotage : ils rendent la réputation mesurable, comparable dans le temps et actionnable. C'est le pont entre l'analyse NLP et la prise de décision métier.",
    },
    exercises: [
      {
        id: "5.1",
        moduleNumber: 5,
        number: 1,
        title: "Conversion Temporelle",
        difficulty: 1,
        minutes: 5,
        statement:
          "Convertissez la colonne `date_avis` au format datetime avec `pd.to_datetime`, puis extrayez le mois avec `dt.to_period('M')` dans une colonne `mois`.",
        hint: {
          label: "Indice",
          content:
            "df['date_avis'] = pd.to_datetime(df['date_avis'])\ndf['mois'] = df['date_avis'].dt.to_period('M')",
        },
        solution:
          "# Conversion en datetime\ndf['date_avis'] = pd.to_datetime(df['date_avis'])\n\n# Extraction du mois (format 'AAAA-MM')\ndf['mois'] = df['date_avis'].dt.to_period('M')\n\nprint(df[['date_avis', 'mois']].head())",
        validation: { pattern: "to_datetime.*to_period", flags: "is" },
      },
      {
        id: "5.2",
        moduleNumber: 5,
        number: 2,
        title: "Évolution Temporelle de la Note",
        difficulty: 2,
        minutes: 6,
        statement:
          "Calculez la note moyenne par mois avec `groupby('mois')` pour suivre la tendance globale de la réputation au fil du temps.",
        hint: {
          label: "Indice",
          content:
            "df.groupby('mois')['note'].mean()",
        },
        solution:
          "tendance = df.groupby('mois')['note'].mean().round(2)\n\nprint(tendance)\n# Une série temporelle indexée par mois :\n# 2024-01    3.50\n# 2024-02    3.25\n# 2024-03    4.00\n# 2024-04    4.50",
        validation: { pattern: "groupby.*mois.*mean", flags: "is" },
      },
      {
        id: "5.3",
        moduleNumber: 5,
        number: 3,
        title: "Calcul du CSAT",
        difficulty: 3,
        minutes: 7,
        statement:
          "Calculez le KPI CSAT (% d'avis avec une note de 4 ou 5) global, puis par restaurant avec `groupby`.",
        hint: {
          label: "Indice",
          content:
            "csat = (df['note'] >= 4).mean() * 100\ndf.groupby('restaurant')['note'].apply(lambda s: (s>=4).mean()*100)",
        },
        solution:
          "# CSAT global\ncsat_global = (df['note'] >= 4).mean() * 100\nprint(f'CSAT global : {csat_global:.1f}%')\n\n# CSAT par restaurant\ncsat_par_resto = df.groupby('restaurant')['note'].apply(\n    lambda s: (s >= 4).mean() * 100\n).round(1)\n\nprint(csat_par_resto.sort_values(ascending=False))",
        validation: { pattern: "\\>=\\s*4.*mean.*100", flags: "is" },
      },
      {
        id: "5.4",
        moduleNumber: 5,
        number: 4,
        title: "Ratio d'Alerte Négatif",
        difficulty: 4,
        minutes: 6,
        statement:
          "Calculez le pourcentage d'avis très négatifs (notes 1 et 2) global, puis suivez son évolution mois par mois avec `groupby('mois')`.",
        hint: {
          label: "Indice",
          content:
            "negatif = (df['note'] <= 2).mean() * 100\ndf.groupby('mois')['note'].apply(lambda s: (s<=2).mean()*100)",
        },
        solution:
          "# Ratio d'avis négatifs global\nratio_neg_global = (df['note'] <= 2).mean() * 100\nprint(f'% d'avis négatifs : {ratio_neg_global:.1f}%')\n\n# Évolution mensuelle\nevolution_neg = df.groupby('mois')['note'].apply(\n    lambda s: (s <= 2).mean() * 100\n).round(1)\n\nprint(evolution_neg)",
        validation: { pattern: "\\<=\\s*2.*mean.*100", flags: "is" },
      },
      {
        id: "5.5",
        moduleNumber: 5,
        number: 5,
        title: "Dashboard de Synthèse",
        difficulty: 5,
        minutes: 6,
        statement:
          "Construisez un tableau récapitulatif synthétique croisant Restaurant, Note Moyenne, CSAT (%), Sentiment VADER moyen et Nombre d'avis.",
        hint: {
          label: "Indice",
          content:
            "df.groupby('restaurant').agg(note_moyenne=('note','mean'), csat=('note', lambda s:(s>=4).mean()*100), sentiment=('score_vader','mean'), avis=('note','count'))",
        },
        solution:
          "dashboard = df.groupby('restaurant').agg(\n    note_moyenne=('note', 'mean'),\n    csat_pct=('note', lambda s: (s >= 4).mean() * 100),\n    sentiment_vader=('score_vader', 'mean'),\n    nombre_avis=('note', 'count')\n).round(2)\n\n# Tri par note moyenne décroissante\ndashboard = dashboard.sort_values('note_moyenne', ascending=False)\n\nprint(dashboard.to_markdown())\n\n# | restaurant            | note_moyenne | csat_pct | sentiment_vader | nombre_avis |\n# | Le Gourmet Parisien   |         4.00 |    66.7  |           0.45  |           6 |",
        validation: { pattern: "agg.*csat.*sentiment|agg.*note_moyenne.*nombre_avis", flags: "is" },
      },
    ],
  },
];
