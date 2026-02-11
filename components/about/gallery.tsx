import Image from "next/image"

const galleryImages = [
  {
    src: "/biswas_img/Bimg-1.jpeg",
    alt: "img",
  },
  {
    src: "/biswas_img/Bimg-2.jpeg",
    alt: "img",
  },
  {
    src: "/biswas_img/Bimg-3.jpeg",
    alt: "img",
  },
  {
    src: "/biswas_img/Bimg-4.jpeg",
    alt: "img",
  },
  {
    src: "/biswas_img/Bimg-5.jpeg",
    alt: "img",
  },
  {
    src: "/biswas_img/Bimg-6.jpeg",
    alt: "img",
  },
  {
    src: "/biswas_img/Bimg-7.jpeg",
    alt: "img",
  },
  {
    src: "/biswas_img/Bimg-8.jpeg",
    alt: "img",
  },
  {
    src: "/biswas_img/Bimg-9.jpeg",
    alt: "img",
  },
  {
    src: "/biswas_img/Bimg-10.jpeg",
    alt: "img",
  },
  {
    src: "/biswas_img/Bimg-11.jpeg",
    alt: "img",
  },
  {
    src: "/biswas_img/Bimg-12.jpeg",
    alt: "img",
  },
]

export function Gallery() {
  return (
    <section className="bg-white px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="animate-on-load animate-zoom-in mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-[#FF6E39] lg:text-4xl">
            Company Gallery
          </h2>
          <p className="text-gray-600">Glimpses of our work and team</p>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
            {galleryImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="animate-on-load animate-zoom-in-up group relative h-64 w-64 flex-shrink-0 overflow-hidden rounded-xl"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
