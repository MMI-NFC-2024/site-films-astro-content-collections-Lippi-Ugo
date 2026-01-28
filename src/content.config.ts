import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const personnes = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/data/personnes" }),
    schema: ({ image }) => z.object({
        nom: z.string(),
        dateNaissance: z.date(),
        nationalite: z.string(),
        image: image().optional(),
        professions: z.array(z.enum(["Acteur", "Réalisateur", "Scénariste", "Producteur"])).optional(),
        dateDeces: z.date().optional(),
    }),
});

const films = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/data/films" }),
    schema: ({ image }) => z.object({
        titre: z.string(),
        dateSortie: z.date(),
        image: image().optional(),
        genres: z.array(z.enum(["Action", "Romance", "Policier", "Comédie"])).optional(),
        pays_origine: z.string().optional(),
        durée: z.number().optional(),
        realisateur: reference("personnes").optional(),
        producteurs: z.array(reference("personnes")).optional(),
        roles: z.array(z.object({
            acteur: reference("personnes"),
            nom_role: z.string(),
        })).optional(),
    }),
});

export const collections = {
    personnes,
    films
};