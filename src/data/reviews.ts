import type { ReviewRow } from "@/types";

/**
 * Fictitious restaurant reviews dataset used as the course's fil rouge.
 * Mirrors the shape of `avis_restaurants.csv` described in the syllabus.
 */
export const reviews: ReviewRow[] = [
  { id: 1,  restaurant: "Le Gourmet Parisien", note: 5, texte: "Repas exceptionnel, service impeccable et cadre magnifique. Je recommande vivement !", date_avis: "2024-01-15" },
  { id: 2,  restaurant: "Le Gourmet Parisien", note: 4, texte: "Très bon plat, <br> mais un peu long à l'attente.", date_avis: "2024-01-22" },
  { id: 3,  restaurant: "Le Gourmet Parisien", note: 2, texte: "Déçu par la qualité ce jour-là, viande trop cuite.", date_avis: "2024-02-03" },
  { id: 4,  restaurant: "Le Gourmet Parisien", note: 5, texte: "Le chef a su surprendre nos papilles. 10 sur 10 !", date_avis: "2024-02-18" },
  { id: 5,  restaurant: "Le Gourmet Parisien", note: 3, texte: "Correct sans plus, rapport qualité-prix moyen.", date_avis: "2024-03-05" },
  { id: 6,  restaurant: "Le Gourmet Parisien", note: 4, texte: "Belle carte des vins, sommelier au top.", date_avis: "2024-03-21" },
  { id: 7,  restaurant: "Bella Italia", note: 1, texte: "Pâtes complètement froides, serveur désagréable. À fuir !", date_avis: "2024-01-09" },
  { id: 8,  restaurant: "Bella Italia", note: 3, texte: "Pizza correcte mais bruit insupportable dans la salle.", date_avis: "2024-01-28" },
  { id: 9,  restaurant: "Bella Italia", note: 5, texte: "Le tiramisu est à tomber, dessert maison parfait.", date_avis: "2024-02-11" },
  { id: 10, restaurant: "Bella Italia", note: 2, texte: "Réservation non respectée, 40 min d'attente.", date_avis: "2024-02-25" },
  { id: 11, restaurant: "Bella Italia", note: 4, texte: "Pâtes fraîches, ambiance familiale chaleureuse.", date_avis: "2024-03-12" },
  { id: 12, restaurant: "Bella Italia", note: 5, texte: "Meilleur risotto de la ville, service ensoleillé.", date_avis: "2024-03-30" },
  { id: 13, restaurant: "Sushi Zen", note: 5, texte: "Sushi ultra-frais, présentation soignée, parfait.", date_avis: "2024-01-12" },
  { id: 14, restaurant: "Sushi Zen", note: 4, texte: "Bons makis, manque juste un peu de wasabi.", date_avis: "2024-01-26" },
  { id: 15, restaurant: "Sushi Zen", note: 3, texte: "Poisson correct mais portions vraiment minuscules.", date_avis: "2024-02-08" },
  { id: 16, restaurant: "Sushi Zen", note: 2, texte: "Livraison retardée, maki écrasé dans la boîte.", date_avis: "2024-02-20" },
  { id: 17, restaurant: "Sushi Zen", note: 5, texte: "Le menu dégustation vaut le détour, chef talentueux.", date_avis: "2024-03-15" },
  { id: 18, restaurant: "Sushi Zen", note: 4, texte: "Thé vert excellent, service discret et attentif.", date_avis: "2024-04-02" },
  { id: 19, restaurant: "Café du Marché", note: 4, texte: "Brunch copieux, produits frais du marché.", date_avis: "2024-01-19" },
  { id: 20, restaurant: "Café du Marché", note: 5, texte: "Ambiance conviviale, tartine avocat délicieuse !", date_avis: "2024-02-02" },
  { id: 21, restaurant: "Café du Marché", note: 1, texte: "Café froid, serveur absent, aucune excuse. Honteux.", date_avis: "2024-02-17" },
  { id: 22, restaurant: "Café du Marché", note: 3, texte: "Salade correcte mais pain rassis, dommage.", date_avis: "2024-03-08" },
  { id: 23, restaurant: "Café du Marché", note: 4, texte: "Bon rapport qualité-prix, terrasse agréable l'été.", date_avis: "2024-03-25" },
  { id: 24, restaurant: "Café du Marché", note: 5, texte: "Le meilleur flat white de la ville, barista pro.", date_avis: "2024-04-05" },
];

export const restaurantList = [
  "Le Gourmet Parisien",
  "Bella Italia",
  "Sushi Zen",
  "Café du Marché",
];
