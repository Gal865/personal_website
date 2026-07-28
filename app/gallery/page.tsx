"use client";

import { useEffect, useState } from "react";

type Collection = {
  name: string;
  slug: string;
  photos: string[];
};

const collections: Collection[] = [
  {
    name: "Mostly Blue",
    slug: "blue",
    photos: [
      "GPTempDownload (1).webp", "GPTempDownload.webp", "IMG_2137.webp", "IMG_2196.webp", "IMG_2202.webp",
      "IMG_2210.webp", "IMG_2226.webp", "IMG_3949.webp", "IMG_3965.webp", "IMG_3991.webp",
      "IMG_6612.webp", "IMG_6626.webp", "IMG_6733.webp", "IMG_8703.webp", "IMG_9083.webp",
    ],
  },
  {
    name: "Mostly Brown",
    slug: "brown",
    photos: [
      "123.webp", "IMG_2153.webp", "IMG_2186.webp", "IMG_2233.webp", "IMG_2236.webp", "IMG_2248 (1).webp",
      "IMG_2248.webp", "IMG_2256.webp", "IMG_2262.webp", "IMG_2268.webp", "IMG_2296.webp", "IMG_2300.webp",
      "IMG_2319.webp", "IMG_2405.webp", "IMG_2452.webp", "IMG_2454.webp", "IMG_2455.webp", "IMG_9247.webp",
      "IMG_9265.webp", "IMG_9566.webp", "page_ar.webp", "re.webp", "Screenshot 2026-07-27 153341.webp",
    ],
  },
  {
    name: "Mostly Gray",
    slug: "gray",
    photos: [
      "IMG_1799.webp", "IMG_2099.webp", "IMG_2121.webp", "IMG_2123.webp", "IMG_2139.webp", "IMG_2141.webp",
      "IMG_2150.webp", "IMG_2168.webp", "IMG_2177.webp", "IMG_3202.webp", "IMG_3210.webp", "IMG_4685.webp",
      "IMG_6199.webp", "IMG_9200.webp",
    ],
  },
  {
    name: "Mostly Green",
    slug: "green",
    photos: [
      "IMG_0836.webp", "IMG_0847.webp", "IMG_1623.webp", "IMG_1640.webp", "IMG_1666.webp", "IMG_3977.webp",
      "IMG_4014.webp", "IMG_4015.webp", "IMG_6693.webp", "IMG_9979.webp",
    ],
  },
];

type SelectedPhoto = { src: string; alt: string };

const initialCardPhotos = Object.fromEntries(
  collections.map((collection) => [collection.slug, collection.photos.slice(0, 3)]),
) as Record<string, string[]>;

const getRandomCardPhotos = () => Object.fromEntries(
  collections.map((collection) => [
    collection.slug,
    collection.photos.slice().sort(() => Math.random() - 0.5).slice(0, 3),
  ]),
) as Record<string, string[]>;

export default function GalleryPage() {
  const [activeCollection, setActiveCollection] = useState<Collection | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhoto | null>(null);
  const [cardPhotos, setCardPhotos] = useState<Record<string, string[]>>(initialCardPhotos);
  const overlayOpen = Boolean(activeCollection || selectedPhoto);

  const photoDetails = (collection: Collection, photo: string, index: number): SelectedPhoto => ({
    src: `/gallery/${collection.slug}/${photo}`,
    alt: `${collection.name} gallery photo ${index + 1}`,
  });

  useEffect(() => {
    if (!overlayOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (selectedPhoto) setSelectedPhoto(null);
      else setActiveCollection(null);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("lightbox-open");

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("lightbox-open");
    };
  }, [activeCollection, overlayOpen, selectedPhoto]);

  useEffect(() => {
    setCardPhotos(getRandomCardPhotos());
  }, []);

  return (
    <main className="gallery-page shell" aria-label="Gallery">
      <header className="gallery-intro">
        <h1>Gallery</h1>
        <p>"What you choose to notice says more than a portrait ever could"</p>
      </header>

      <div className="gallery-cards">
        {collections.map((collection) => {
          const [featuredPhoto, ...previewPhotos] = cardPhotos[collection.slug];

          return (
            <article className={`gallery-card gallery-card--${collection.slug}`} key={collection.slug}>
              <div className="gallery-card-media">
                <button
                  type="button"
                  className="gallery-card-feature"
                  onClick={() => setSelectedPhoto(photoDetails(collection, featuredPhoto, 0))}
                  aria-label={`Enlarge featured ${collection.name} photo`}
                >
                  <img src={`/gallery/${collection.slug}/${featuredPhoto}`} alt={`${collection.name} featured photo`} />
                </button>
                <div className="gallery-card-previews">
                  {previewPhotos.slice(0, 2).map((photo, index) => (
                    <button
                      type="button"
                      className="gallery-card-preview"
                      key={photo}
                      onClick={() => setSelectedPhoto(photoDetails(collection, photo, index + 1))}
                      aria-label={`Enlarge ${collection.name} preview photo ${index + 1}`}
                    >
                      <img src={`/gallery/${collection.slug}/${photo}`} alt={`${collection.name} preview photo ${index + 1}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="gallery-card-footer">
                <div>
                  <h2>{collection.name}</h2>
                  <p>{collection.photos.length} photos</p>
                </div>
                <button type="button" className="gallery-card-link" onClick={() => setActiveCollection(collection)}>
                  View gallery <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {activeCollection && (
        <section className="gallery-browser" role="dialog" aria-modal="true" aria-labelledby="gallery-browser-title">
          <div className="gallery-browser-inner">
            <header className="gallery-browser-header">
              <div>
                <p className="eyebrow">{activeCollection.photos.length} photos</p>
                <h2 id="gallery-browser-title">{activeCollection.name}</h2>
              </div>
              <button type="button" className="gallery-browser-back" onClick={() => setActiveCollection(null)}>Back to gallery</button>
            </header>
            <div className="gallery-browser-grid">
              {activeCollection.photos.map((photo, index) => (
                <button
                  type="button"
                  className="gallery-browser-photo"
                  key={photo}
                  onClick={() => setSelectedPhoto(photoDetails(activeCollection, photo, index))}
                  aria-label={`Enlarge ${activeCollection.name} photo ${index + 1}`}
                >
                  <img
                    src={`/gallery/${activeCollection.slug}/${photo}`}
                    alt={`${activeCollection.name} gallery photo ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {selectedPhoto && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Enlarged gallery photo">
          <button type="button" className="gallery-lightbox-back" onClick={() => setSelectedPhoto(null)}>
            {activeCollection ? `Back to ${activeCollection.name}` : "Back to gallery"}
          </button>
          <button
            type="button"
            className="gallery-lightbox-backdrop"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close enlarged photo"
          />
          <img className="gallery-lightbox-image" src={selectedPhoto.src} alt={selectedPhoto.alt} />
          <p className="gallery-lightbox-hint">Press Esc to close</p>
        </div>
      )}
    </main>
  );
}
