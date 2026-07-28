"use client";

import { useEffect, useState } from "react";

export type GalleryPhoto = {
  file: string;
  width: number;
  height: number;
};

export type Collection = {
  name: string;
  slug: string;
  titleColor: string;
  photos: GalleryPhoto[];
};

type SelectedPhoto = { src: string; alt: string };

export default function GalleryClient({ collections }: { collections: Collection[] }) {
  const [activeCollection, setActiveCollection] = useState<Collection | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhoto | null>(null);
  const overlayOpen = Boolean(activeCollection || selectedPhoto);

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

  return (
    <main className="gallery-page shell" aria-label="Gallery">
      <header className="gallery-intro">
        <p className="gallery-intro-quote"><span className="gallery-intro-quote-mark">&ldquo;</span>What you choose to notice says more than a portrait ever could<span className="gallery-intro-quote-mark">&rdquo;</span></p>
        <p className="gallery-intro-subheader">A little window into my memories.</p>
      </header>
      <div className="gallery-cards">
        {collections.map((collection, collectionIndex) => {
          const [featuredPhoto, ...previewPhotos] = collection.photos;
          return (
            <article className={`gallery-card gallery-card--${collection.slug}`} key={collection.slug}>
              <div className="gallery-card-media">
                <button type="button" className="gallery-card-feature" onClick={() => setSelectedPhoto(photoDetails(collection, featuredPhoto, 0))} aria-label={`Enlarge featured ${collection.name} photo`}>
                  <img src={`/gallery/${collection.slug}/${featuredPhoto.file}`} alt={`${collection.name} featured photo`} decoding="async" height={featuredPhoto.height} loading={collectionIndex === 0 ? "eager" : "lazy"} width={featuredPhoto.width} />
                </button>
                <div className="gallery-card-previews">
                  {previewPhotos.slice(0, 2).map((photo, index) => <button type="button" className="gallery-card-preview" key={photo.file} onClick={() => setSelectedPhoto(photoDetails(collection, photo, index + 1))} aria-label={`Enlarge ${collection.name} preview photo ${index + 1}`}><img src={`/gallery/${collection.slug}/${photo.file}`} alt={`${collection.name} preview photo ${index + 1}`} decoding="async" height={photo.height} loading="lazy" width={photo.width} /></button>)}
                </div>
              </div>
              <div className="gallery-card-footer">
                <div>
                  <button type="button" className="gallery-card-title-button" onClick={() => setActiveCollection(collection)} aria-label={`View ${collection.name} gallery`}><h2 style={{ color: collection.titleColor }}>{collection.name}</h2></button>
                  <p>{collection.photos.length} photos</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {activeCollection && <section className="gallery-browser" role="dialog" aria-modal="true" aria-labelledby="gallery-browser-title"><div className="gallery-browser-inner"><header className="gallery-browser-header"><div><p className="eyebrow">{activeCollection.photos.length} photos</p><h2 id="gallery-browser-title" style={{ color: activeCollection.titleColor }}>{activeCollection.name}</h2></div><button type="button" className="gallery-browser-back" onClick={() => setActiveCollection(null)}>Back to gallery</button></header><div className="gallery-browser-grid">{activeCollection.photos.map((photo, index) => <button type="button" className="gallery-browser-photo" key={photo.file} onClick={() => setSelectedPhoto(photoDetails(activeCollection, photo, index))} aria-label={`Enlarge ${activeCollection.name} photo ${index + 1}`}><img src={`/gallery/${activeCollection.slug}/${photo.file}`} alt={`${activeCollection.name} gallery photo ${index + 1}`} decoding="async" height={photo.height} loading="lazy" width={photo.width} /></button>)}</div></div></section>}
      {selectedPhoto && <section className="lightbox" role="dialog" aria-modal="true" aria-label={selectedPhoto.alt} onClick={() => setSelectedPhoto(null)}><button type="button" className="lightbox-close" aria-label="Close photo" onClick={() => setSelectedPhoto(null)}>&times;</button><img src={selectedPhoto.src} alt={selectedPhoto.alt} onClick={(event) => event.stopPropagation()} /></section>}
    </main>
  );
}

function photoDetails(collection: Collection, photo: GalleryPhoto, index: number): SelectedPhoto {
  return { src: `/gallery/${collection.slug}/${photo.file}`, alt: `${collection.name} gallery photo ${index + 1}` };
}
