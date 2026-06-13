interface Props {
  template: string;
  cardData: any;
}

export default function TemplateRenderer({
  template,
  cardData,
}: Props) {
  return (
    <div
      className="
        min-h-screen
        bg-white
        text-black
        p-10
      "
    >
      <div
        className="
          max-w-4xl
          mx-auto
          rounded-3xl
          border
          p-10
          shadow-xl
        "
      >
        {/* PROFILE */}

        <div className="text-center">

          {cardData.profileImage && (
            <img
              src={cardData.profileImage}
              alt={cardData.name}
              className="
                w-40
                h-40
                object-cover
                rounded-full
                mx-auto
                mb-6
              "
            />
          )}

          <h1 className="text-5xl font-bold">
            {cardData.name}
          </h1>

          <p className="text-2xl mt-3 text-gray-600">
            {cardData.designation}
          </p>

          <p className="text-xl mt-2">
            {cardData.company}
          </p>

        </div>

        {/* CONTACT */}

        <div className="mt-10 space-y-3">

          {cardData.mobile && (
            <p>
              📞 {cardData.mobile}
            </p>
          )}

          {cardData.email && (
            <p>
              ✉️ {cardData.email}
            </p>
          )}

          {cardData.website && (
            <p>
              🌐 {cardData.website}
            </p>
          )}

          {cardData.address && (
            <p>
              📍 {cardData.address}
            </p>
          )}

        </div>

        {/* ABOUT */}

        {cardData.aboutUs && (

          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-4">
              About Us
            </h2>

            <p className="text-gray-700 leading-8">
              {cardData.aboutUs}
            </p>

          </div>

        )}

        {/* SERVICES */}

        {cardData.services?.length > 0 && (

          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-6">
              Services
            </h2>

            <div className="grid gap-5">

              {cardData.services.map(
                (service: any, index: number) => (

                  <div
                    key={index}
                    className="
                      border
                      rounded-2xl
                      p-5
                    "
                  >
                    <h3 className="text-2xl font-semibold">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-gray-600">
                      {service.description}
                    </p>

                    <p className="mt-3 font-bold">
                      ₹ {service.price}
                    </p>
                  </div>

                )
              )}

            </div>

          </div>

        )}

        {/* PRODUCTS */}

        {cardData.products?.length > 0 && (

          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-6">
              Products
            </h2>

            <div className="grid gap-5">

              {cardData.products.map(
                (product: any, index: number) => (

                  <div
                    key={index}
                    className="
                      border
                      rounded-2xl
                      p-5
                    "
                  >
                    <h3 className="text-2xl font-semibold">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-gray-600">
                      {product.description}
                    </p>

                    <p className="mt-3 font-bold">
                      ₹ {product.price}
                    </p>
                  </div>

                )
              )}

            </div>

          </div>

        )}

        {/* GALLERY */}

        {cardData.galleryImages?.length > 0 && (

          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-6">
              Gallery
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

              {cardData.galleryImages.map(
                (img: string, index: number) => (

                  <img
                    key={index}
                    src={img}
                    alt=""
                    className="
                      w-full
                      h-52
                      object-cover
                      rounded-2xl
                    "
                  />

                )
              )}

            </div>

          </div>

        )}

      </div>
    </div>
  );
}