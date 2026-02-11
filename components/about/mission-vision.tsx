import { Target, Eye } from "lucide-react"

export function MissionVision() {
  return (
    <section className="bg-white px-4 py-16 lg:px-8">
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {/* Mission Card */}
        <div className="rounded-xl bg-white p-8 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-[#FF6E39]/20">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6E39]/10 transition-colors duration-300 hover:bg-[#FF6E39]/20">
              <Target className="h-6 w-6 text-[#FF6E39] transition-colors duration-300" />
            </div>
            <h3 className="text-2xl font-semibold text-[#6197C0] transition-colors duration-300 hover:text-[#FF6E39]">Our Mission</h3>
          </div>
          <p className="text-base leading-relaxed text-gray-600">
            To deliver exceptional event staffing solutions by providing highly
            skilled, professional, and reliable workforce that exceeds client
            expectations. We aim to make every event a memorable success through
            our dedicated service and commitment to excellence.
          </p>
        </div>

        {/* Vision Card */}
        <div className="rounded-xl bg-white p-8 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-[#6197C0]/20">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6197C0]/10 transition-colors duration-300 hover:bg-[#6197C0]/20">
              <Eye className="h-6 w-6 text-[#6197C0] transition-colors duration-300" />
            </div>
            <h3 className="text-2xl font-semibold text-[#FF6E39] transition-colors duration-300 hover:text-[#6197C0]">Our Vision</h3>
          </div>
          <p className="text-base leading-relaxed text-gray-600">
            To become the most trusted and preferred event management partner
            across India, setting industry standards for quality, reliability, and
            innovation. We envision a future where every event runs effortlessly
            with our professional support.
          </p>
        </div>
      </div>
    </section>
  )
}
