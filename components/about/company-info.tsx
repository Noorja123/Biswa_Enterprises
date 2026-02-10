import Image from "next/image"

export function CompanyInfo() {
  return (
    <section className="bg-white px-4 py-8 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-6 text-2xl font-bold text-[#6197C0] lg:text-3xl">
          About The Company
        </h2>

        <div className="space-y-4 text-gray-600">
          <p>
            Biswas Enterprise is a leading event management and labour solutions
            provider based in Kolkata, India. With over 15 years of experience, we
            have established ourselves as a trusted name in the industry.
          </p>

          <p>
            We specialize in providing skilled and reliable workforce for various
            types of events including corporate functions, weddings, social
            gatherings, conferences, and exhibitions. Our team of experienced
            professionals ensures seamless execution of every event.
          </p>

          <p>
            Our commitment to quality, punctuality, and professionalism has earned
            us the trust of hundreds of satisfied clients across Eastern India. We
            take pride in our ability to scale our services according to the unique
            requirements of each event.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl">
          <Image
            src="/biswas_img/Bimg-13.jpeg"
            alt="Event management team at work"
            width={800}
            height={400}
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
