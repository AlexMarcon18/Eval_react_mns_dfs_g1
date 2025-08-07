# Exemples de Conférences - Format JSON

Voici 5 exemples de conférences au format JSON, prêts à être copiés-collés dans l'interface d'administration.

## Instructions

1. Créer un utilisateur via mongo express avec le type admin
2. Aller sur "Admin Conférences" → "Créer une conférence"
3. Copier-coller les JSON dans mongo express

---

## 🤖 Conférence 1 : Intelligence Artificielle

```json
{
  "title": "IA et Futur du Développement Web",
  "date": "2024-09-15T14:00",
  "description": "Découvrez comment l'intelligence artificielle révolutionne le développement web moderne et les outils de demain.",
  "img": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
  "content": "Cette conférence explore les dernières avancées en IA pour le développement web. Nous aborderons les outils d'assistance au code, la génération automatique d'interfaces, et l'optimisation des performances par IA. Les participants découvriront des cas d'usage concrets et les meilleures pratiques pour intégrer l'IA dans leurs projets web.",
  "duration": "4 heures",
  "osMap": {
    "addressl1": "15 Rue de la Innovation",
    "addressl2": "Centre de Conférences TechAI",
    "postalCode": "75001",
    "city": "Paris",
    "coordinates": ["2.3522", "48.8566"]
  },
  "speakers": [
    {
      "firstname": "Sophie",
      "lastname": "Martin"
    },
    {
      "firstname": "Alexandre",
      "lastname": "Dubois"
    }
  ],
  "stakeholders": [
    {
      "firstname": "Marie",
      "lastname": "Leroy",
      "job": "CTO chez OpenAI",
      "img": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      "firstname": "Thomas",
      "lastname": "Bernard",
      "job": "Lead AI Engineer",
      "img": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ],
  "design": {
    "mainColor": "#FF6B35",
    "secondColor": "#004E89"
  }
}
```

---

## 🎨 Conférence 2 : UX/UI Design

```json
{
  "title": "Design Systems et Composants Réutilisables",
  "date": "2024-10-22T09:30",
  "description": "Apprenez à créer des design systems cohérents et des bibliothèques de composants pour accélérer vos projets.",
  "img": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
  "content": "Workshop pratique sur la création de design systems modernes. Nous couvrirons la méthodologie Atomic Design, l'utilisation de Figma pour la documentation, et l'implémentation technique avec Storybook. Les participants repartiront avec un design system complet et fonctionnel.",
  "duration": "6 heures",
  "osMap": {
    "addressl1": "42 Avenue de la Créativité",
    "addressl2": "Espace Design Hub",
    "postalCode": "69001",
    "city": "Lyon",
    "coordinates": ["4.8357", "45.7640"]
  },
  "speakers": [
    {
      "firstname": "Emma",
      "lastname": "Wilson"
    },
    {
      "firstname": "Lucas",
      "lastname": "Garcia"
    }
  ],
  "stakeholders": [
    {
      "firstname": "Claire",
      "lastname": "Moreau",
      "job": "Head of Design chez Airbnb",
      "img": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      "firstname": "Pierre",
      "lastname": "Petit",
      "job": "Senior UX Designer",
      "img": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ],
  "design": {
    "mainColor": "#6C5CE7",
    "secondColor": "#FD79A8"
  }
}
```

---

## 🚀 Conférence 3 : DevOps et Cloud

```json
{
  "title": "Kubernetes et Microservices à Grande Échelle",
  "date": "2024-11-08T10:00",
  "description": "Maîtrisez l'orchestration de conteneurs et l'architecture microservices pour des applications robustes et scalables.",
  "img": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop",
  "content": "Formation intensive sur Kubernetes et les microservices. Programme : déploiement d'applications conteneurisées, gestion des services mesh, monitoring et observabilité, stratégies de mise à l'échelle automatique. Travaux pratiques sur clusters AWS et Azure.",
  "duration": "8 heures",
  "osMap": {
    "addressl1": "88 Rue du Cloud Computing",
    "addressl2": "Centre d'Excellence DevOps",
    "postalCode": "13001",
    "city": "Marseille",
    "coordinates": ["5.3698", "43.2965"]
  },
  "speakers": [
    {
      "firstname": "David",
      "lastname": "Rodriguez"
    },
    {
      "firstname": "Sarah",
      "lastname": "Johnson"
    }
  ],
  "stakeholders": [
    {
      "firstname": "Marc",
      "lastname": "Lefebvre",
      "job": "Cloud Architect chez Google",
      "img": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      "firstname": "Julie",
      "lastname": "Roux",
      "job": "DevOps Lead",
      "img": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
    }
  ],
  "design": {
    "mainColor": "#00B894",
    "secondColor": "#2D3436"
  }
}
```

---

## 📱 Conférence 4 : Mobile Development

```json
{
  "title": "React Native vs Flutter : Comparatif 2024",
  "date": "2024-12-05T13:30",
  "description": "Analyse comparative approfondie des deux frameworks leaders pour le développement mobile cross-platform.",
  "img": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
  "content": "Comparaison technique détaillée entre React Native et Flutter. Critères évalués : performances, écosystème, courbe d'apprentissage, maintenance. Démonstrations pratiques avec la même application développée dans les deux frameworks. Session de Q&A avec retours d'expérience terrain.",
  "duration": "3 heures",
  "osMap": {
    "addressl1": "33 Boulevard Mobile First",
    "addressl2": "Tech Campus Innovation",
    "postalCode": "31000",
    "city": "Toulouse",
    "coordinates": ["1.4442", "43.6047"]
  },
  "speakers": [
    {
      "firstname": "Kevin",
      "lastname": "Lee"
    },
    {
      "firstname": "Anna",
      "lastname": "Silva"
    }
  ],
  "stakeholders": [
    {
      "firstname": "Nicolas",
      "lastname": "Blanc",
      "job": "Mobile Team Lead chez Spotify",
      "img": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
    },
    {
      "firstname": "Camille",
      "lastname": "Martin",
      "job": "Flutter GDE",
      "img": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ],
  "design": {
    "mainColor": "#0984E3",
    "secondColor": "#E84393"
  }
}
```

---

## 🔒 Conférence 5 : Cybersécurité

```json
{
  "title": "Sécurité des Applications Web : Bonnes Pratiques 2024",
  "date": "2025-01-18T11:00",
  "description": "Formation complète sur la sécurisation des applications web contre les cyberattaques modernes.",
  "img": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
  "content": "Atelier pratique sur la cybersécurité web. Au programme : OWASP Top 10 2024, authentification sécurisée, gestion des sessions, protection CSRF/XSS, audit de sécurité automatisé. Exercices de pentesting sur applications volontairement vulnérables. Remise de certificat de participation.",
  "duration": "5 heures",
  "osMap": {
    "addressl1": "7 Place de la Cybersécurité",
    "addressl2": "Cyber Defense Center",
    "postalCode": "59000",
    "city": "Lille",
    "coordinates": ["3.0573", "50.6292"]
  },
  "speakers": [
    {
      "firstname": "Antoine",
      "lastname": "Moreau"
    },
    {
      "firstname": "Léa",
      "lastname": "Dubois"
    }
  ],
  "stakeholders": [
    {
      "firstname": "François",
      "lastname": "Laurent",
      "job": "CISO chez BNP Paribas",
      "img": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
    },
    {
      "firstname": "Isabelle",
      "lastname": "Thomas",
      "job": "Security Researcher",
      "img": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face"
    }
  ],
  "design": {
    "mainColor": "#E17055",
    "secondColor": "#2D3436"
  }
}
```

---

## 📋 Notes pour les tests

- **Tous les champs obligatoires** (marqués `!` dans l'énoncé) sont présents
- **Format des coordonnées** : Array de strings comme attendu
- **Format des dates** : Compatible `datetime-local` HTML5
- **URLs d'images** : Toutes fonctionnelles et optimisées
- **Données réalistes** : Villes françaises avec vraies coordonnées GPS

### Tests recommandés :

1. Copier-coller un JSON dans le formulaire de création
2. Vérifier que tous les champs se remplissent correctement
3. Tester la modification d'une conférence existante
4. Supprimer et recréer des conférences
5. Valider la persistance des données après rechargement
