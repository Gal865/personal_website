import { readdir } from "fs/promises";
import path from "path";
import GalleryClient, { type Collection } from "./GalleryClient";

const galleryDefinitions = [
  { name: "Blue Gal", slug: "blue", titleColor: "#477888" },
  { name: "Quiet trails", slug: "brown", titleColor: "#956d45" },
  { name: "Gray feels quiet", slug: "gray", titleColor: "#6f7471" },
  { name: "Breathing green", slug: "green", titleColor: "#3c8359" },
];

const imageFile = /\.(avif|gif|jpe?g|png|webp)$/i;

async function getCollections(): Promise<Collection[]> {
  return Promise.all(galleryDefinitions.map(async (collection) => {
    const folder = path.join(process.cwd(), "public", "gallery", collection.slug);
    const photos = (await readdir(folder))
      .filter((file) => imageFile.test(file))
      .sort((first, second) => first.localeCompare(second, undefined, { numeric: true, sensitivity: "base" }));
    return { ...collection, photos };
  }));
}

export default async function GalleryPage() {
  return <GalleryClient collections={await getCollections()} />;
}
