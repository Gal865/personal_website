import { readFile, readdir } from "fs/promises";
import path from "path";
import GalleryClient, { type Collection, type GalleryPhoto } from "./GalleryClient";

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
    const files = (await readdir(folder))
      .filter((file) => imageFile.test(file))
      .sort((first, second) => first.localeCompare(second, undefined, { numeric: true, sensitivity: "base" }));
    const photos = await Promise.all(files.map(async (file) => ({
      file,
      ...await getImageDimensions(path.join(folder, file)),
    })));
    return { ...collection, photos };
  }));
}

async function getImageDimensions(file: string): Promise<Pick<GalleryPhoto, "width" | "height">> {
  const image = await readFile(file);
  for (let offset = 12; offset + 8 <= image.length;) {
    const chunk = image.toString("ascii", offset, offset + 4);
    const size = image.readUInt32LE(offset + 4);
    const data = offset + 8;

    if (chunk === "VP8X" && data + 10 <= image.length) {
      return { width: 1 + image.readUIntLE(data + 4, 3), height: 1 + image.readUIntLE(data + 7, 3) };
    }
    if (chunk === "VP8 " && data + 10 <= image.length) {
      return { width: image.readUInt16LE(data + 6) & 0x3fff, height: image.readUInt16LE(data + 8) & 0x3fff };
    }
    if (chunk === "VP8L" && data + 5 <= image.length) {
      const bits = image.readUInt32LE(data + 1);
      return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
    }
    offset = data + size + (size % 2);
  }

  return { width: 4, height: 5 };
}

export default async function GalleryPage() {
  return <GalleryClient collections={await getCollections()} />;
}
