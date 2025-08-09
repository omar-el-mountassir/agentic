# Glob Utility

Petit utilitaire interne pour la classification. Il ne vise **pas** à reproduire complètement `minimatch`.

## Tokens supportés

- `*` : correspond à n'importe quel segment (sans `/`). Ex: `docs/*.md` correspond à `docs/QUICKSTART.md` mais pas `docs/a/file.md`.
- `**` : correspond à n'importe quelle séquence (y compris `/`). Ex: `src/**/types.ts` fonctionnera après expansion future (actuellement logique simple `.*`).
- `**/` : préfixe récursif optionnel (zéro ou plusieurs répertoires) dans les positions internes.
- `prefix/**` (suffixe terminal) : cas spécial interne. Interprété comme `prefix` + tout descendant (répertoires ou fichiers). Exemple: `docs/**` couvre `docs/QUICKSTART.md`, `docs/a/b/file.txt`.

## Non supporté (pour l'instant)

- Classes de caractères `[a-z]`
- Alternances `{a,b}`
- Négation `!pattern`

## Règles internes

1. On échappe d'abord les méta‐caractères regex.
2. Transformation ordonnée :
   - Cas spécial `prefix/**` -> regex `^prefix(?:.*)?$`
   - `**/` -> `(?:.*/)?`
   - `**` -> `.*`
   - `*` -> `[^/]*`
3. Ancrage toujours `^...$` pour correspondance totale du chemin relatif (normalisé en `/`).

## Limites / Considérations

- Les chemins fournis doivent déjà être normalisés (slashes `/`).
- Pas d'optimisation de performance avancée (suffisant pour taille de repo actuelle).
- Si besoins futurs: envisager extraction vers un package et/ou adoption d'un moteur éprouvé.

## Tests

Voir `tests/classify-scan.test.ts` pour les cas couverts :

- Segments simples `*`
- Récursif terminal `prefix/**`
- Cas mixtes `**/*.ext`, `**/file.ext`, et combinaisons profondeur variable.

## Extension future suggérée

- Support de la négation `!pattern`
- Groupes `{a,b}`
- Cache de compilation regex
