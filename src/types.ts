export interface Pokemon {
  abilities?: AbilitiesEntity[] | null;
  base_experience: number;
  forms?:
    | AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies[]
    | null;
  game_indices?: GameIndicesEntity[] | null;
  height: number;
  held_items?: null[] | null;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves?: MovesEntity[] | null;
  name: string;
  order: number;
  past_types?: null[] | null;
  species: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
  sprites: Sprites;
  stats?: StatsEntity[] | null;
  types?: TypesEntity[] | null;
  weight: number;
}
export interface AbilitiesEntity {
  ability: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
  is_hidden: boolean;
  slot: number;
}
export interface AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies {
  name: string;
  url: string;
}
export interface GameIndicesEntity {
  game_index: number;
  version: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
}
export interface MovesEntity {
  move: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
  version_group_details?: VersionGroupDetailsEntity[] | null;
}
export interface VersionGroupDetailsEntity {
  level_learned_at: number;
  move_learn_method: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
  version_group: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
}
export interface Sprites {
  back_default: string;
  back_female?: null;
  back_shiny: string;
  back_shiny_female?: null;
  front_default: string;
  front_female?: null;
  front_shiny: string;
  front_shiny_female?: null;
  other: Other;
  versions: Versions;
}
export interface Other {
  dream_world: DreamWorldOrIcons;
  home: HomeOrOmegarubyalphasapphireOrXyOrUltrasunultramoon;
  officialartwork: OfficialartworkOrEmerald;
}
export interface DreamWorldOrIcons {
  front_default: string;
  front_female?: null;
}
export interface HomeOrOmegarubyalphasapphireOrXyOrUltrasunultramoon {
  front_default: string;
  front_female?: null;
  front_shiny: string;
  front_shiny_female?: null;
}
export interface OfficialartworkOrEmerald {
  front_default: string;
  front_shiny: string;
}
export interface Versions {
  generationi: Generationi;
  generationii: Generationii;
  generationiii: Generationiii;
  generationiv: Generationiv;
  generationv: Generationv;
  generationvi: Generationvi;
  generationvii: Generationvii;
  generationviii: Generationviii;
}
export interface Generationi {
  redblue: RedblueOrYellow;
  yellow: RedblueOrYellow;
}
export interface RedblueOrYellow {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}
export interface Generationii {
  crystal: Crystal;
  gold: GoldOrSilver;
  silver: GoldOrSilver;
}
export interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}
export interface GoldOrSilver {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}
export interface Generationiii {
  emerald: OfficialartworkOrEmerald;
  fireredleafgreen: FireredleafgreenOrRubysapphire;
  rubysapphire: FireredleafgreenOrRubysapphire;
}
export interface FireredleafgreenOrRubysapphire {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}
export interface Generationiv {
  diamondpearl: DiamondpearlOrHeartgoldsoulsilverOrPlatinumOrAnimated;
  heartgoldsoulsilver: DiamondpearlOrHeartgoldsoulsilverOrPlatinumOrAnimated;
  platinum: DiamondpearlOrHeartgoldsoulsilverOrPlatinumOrAnimated;
}
export interface DiamondpearlOrHeartgoldsoulsilverOrPlatinumOrAnimated {
  back_default: string;
  back_female?: null;
  back_shiny: string;
  back_shiny_female?: null;
  front_default: string;
  front_female?: null;
  front_shiny: string;
  front_shiny_female?: null;
}
export interface Generationv {
  blackwhite: Blackwhite;
}
export interface Blackwhite {
  animated: DiamondpearlOrHeartgoldsoulsilverOrPlatinumOrAnimated;
  back_default: string;
  back_female?: null;
  back_shiny: string;
  back_shiny_female?: null;
  front_default: string;
  front_female?: null;
  front_shiny: string;
  front_shiny_female?: null;
}
export interface Generationvi {
  omegarubyalphasapphire: HomeOrOmegarubyalphasapphireOrXyOrUltrasunultramoon;
  xy: HomeOrOmegarubyalphasapphireOrXyOrUltrasunultramoon;
}
export interface Generationvii {
  icons: DreamWorldOrIcons;
  ultrasunultramoon: HomeOrOmegarubyalphasapphireOrXyOrUltrasunultramoon;
}
export interface Generationviii {
  icons: DreamWorldOrIcons;
}
export interface StatsEntity {
  base_stat: number;
  effort: number;
  stat: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
}
export interface TypesEntity {
  slot: number;
  type: AbilityOrFormsEntityOrVersionOrMoveLearnMethodOrVersionGroupOrMoveOrStatOrTypeOrSpecies;
}
