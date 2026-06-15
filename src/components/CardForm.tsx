"use client";

import { useEffect, useState } from "react";
import TemplateSelector from "@/components/TemplateSelector";

interface Template {
  id: string;
  name: string;
  category: string;
  slug: string;
}

interface CardFormProps {
  initialData?: any;
  cardId?: string;
}

export default function CardForm({
  initialData,
  cardId,
}: CardFormProps) {
  const [templates, setTemplates] = useState<Template[]>([]);

  const [form, setForm] = useState({
    name: "",
    designation: "",
    company: "",
    profileImage: "",
    coverImage: "",
    galleryImages: [] as string[],

    qualification: "",
    specialization: "",
    clinicTiming: "",
    appointmentUrl: "",

    mobile: "",
    whatsapp: "",
    email: "",
    website: "",
    address: "",
    bio: "",
    aboutUs: "",
    directionUrl: "",

    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    twitter: "",
    telegram: "",

    upiId: "",
    paymentQrCode: "",

    services: [
      {
        title: "",
        description: "",
        price: "",
      },
    ],

    products: [
      {
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        stock: "In Stock",
      },
    ],

    templateId: "",

    primaryColor: "#2563eb",
    secondaryColor: "#ffffff",
    fontFamily: "Inter",
    buttonStyle: "rounded",
  });

  useEffect(() => {
    async function loadTemplates() {
      try {
        const res = await fetch("/api/templates");
        const data = await res.json();

        setTemplates(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadTemplates();
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const uploadImage = async (file: File): Promise<string> => {
  const uploadForm = new FormData();
  uploadForm.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: uploadForm,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const data = await res.json();
  return data.url;
};

  const selectedTemplate = templates.find(
    (t) => t.id === form.templateId
  );

  const isDoctorLayout =
    selectedTemplate?.slug?.includes("doctor") ||
    selectedTemplate?.category === "doctor";

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const url = cardId
        ? `/api/cards/${cardId}`
        : "/api/cards";

      const method = cardId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to save");
      }

      alert(
        cardId
          ? "Card Updated Successfully"
          : "Card Created Successfully"
      );
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#020617] text-white">
      <div className="w-full max-w-[1800px] mx-auto px-4 xl:px-8 py-6">

        <form
          id="cardForm"
          onSubmit={handleSubmit}
        >

          {/* HEADER */}

          <div
            className="
              mb-6
              rounded-[32px]
              border
              border-white/10
              bg-[#071132]
              p-8
              flex
              items-center
              justify-between
            "
          >
            <div>
              <h1 className="text-5xl font-bold">
                {cardId
                  ? "Edit Digital Card"
                  : "Create Digital Card"}
              </h1>

              <p className="text-gray-400 mt-3">
                Premium smart business card builder
              </p>
            </div>

            <button
              type="submit"
              className="
                px-10
                py-5
                rounded-3xl
                font-bold
                text-lg
                bg-gradient-to-r
                from-violet-600
                to-purple-600
              "
            >
              Save Changes
            </button>
          </div>

          {/* TOP NAVIGATION */}

          <div
            className="
              sticky
              top-0
              z-50
              mb-6
              rounded-[28px]
              border
              border-white/10
              bg-[#071132]/95
              backdrop-blur-xl
              p-4
              overflow-x-auto
            "
          >
            <div className="flex gap-3 min-w-max">

              {[
                ["Theme", "theme"],
                ["Template", "template"],
                ["Profile", "profile"],
                ["Doctor", "doctor"],
                ["Social", "social"],
                ["Services", "services"],
                ["Products", "products"],
                ["Gallery", "gallery"],
                ["Payment", "payment"],
              ].map(([label, id]) => (

                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    const section =
                      document.getElementById(id);

                    if (section) {
                      section.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                  className="
                    whitespace-nowrap
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#020617]
                    px-6
                    py-3
                    text-sm
                    hover:border-violet-500
                    hover:bg-[#0b173d]
                    transition
                  "
                >
                  {label}
                </button>

              ))}

            </div>
          </div>

          <div className="space-y-8">

            {/* THEME */}

            <div
              id="theme"
              className="
                rounded-[32px]
                border
                border-white/10
                bg-white/5
                p-8
              "
            >
              <h2 className="text-4xl font-bold mb-8">
                Theme Colors
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <input
                  type="color"
                  value={form.primaryColor}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      primaryColor: e.target.value,
                    })
                  }
                  className="w-full h-20 rounded-3xl"
                />

                <input
                  type="color"
                  value={form.secondaryColor}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      secondaryColor: e.target.value,
                    })
                  }
                  className="w-full h-20 rounded-3xl"
                />

              </div>
            </div>

            {/* TEMPLATE */}

            <div
              id="template"
              className="
                rounded-[32px]
                border
                border-white/10
                bg-white/5
                p-8
              "
            >
              <h2 className="text-4xl font-bold mb-6">
                Select Template
              </h2>

              <TemplateSelector
                templates={templates}
                selected={form.templateId}
                onSelect={(id: string) =>
                  setForm({
                    ...form,
                    templateId: id,
                  })
                }
              />
            </div>


{/* PROFILE */}

<div
  id="profile"
  className="
    rounded-[32px]
    border
    border-white/10
    bg-white/5
    p-8
  "
>
  <h2 className="text-4xl font-bold mb-8">
    Profile Information
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {[
      ["Full Name", "name"],
      ["Designation", "designation"],
      ["Company Name", "company"],
      ["Mobile", "mobile"],
      ["WhatsApp", "whatsapp"],
      ["Email", "email"],
      ["Website", "website"],
      ["Address", "address"],
      ["Direction URL", "directionUrl"],
    ].map(([label, key]) => (

      <input
        key={key}
        placeholder={label}
        value={(form as any)[key]}
        onChange={(e) =>
          setForm({
            ...form,
            [key]: e.target.value,
          })
        }
        className="
          h-16
          rounded-3xl
          bg-[#071132]
          border
          border-white/10
          px-5
        "
      />

    ))}

  </div>

  <textarea
    placeholder="About Us"
    value={form.aboutUs}
    onChange={(e) =>
      setForm({
        ...form,
        aboutUs: e.target.value,
      })
    }
    className="
      w-full
      mt-6
      min-h-[140px]
      rounded-3xl
      bg-[#071132]
      border
      border-white/10
      p-5
    "
  />

  <textarea
    placeholder="Professional Bio"
    value={form.bio}
    onChange={(e) =>
      setForm({
        ...form,
        bio: e.target.value,
      })
    }
    className="
      w-full
      mt-6
      min-h-[140px]
      rounded-3xl
      bg-[#071132]
      border
      border-white/10
      p-5
    "
  />

  {/* PROFILE IMAGE */}

  <div className="mt-8">
    <label className="block mb-3 font-semibold">
      Profile Image
    </label>

    <input
      type="file"
      accept="image/*"
      onChange={async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

    const uploadForm = new FormData();
uploadForm.append("file", file);

const res = await fetch("/api/upload", {
  method: "POST",
  body: uploadForm,
});

const data = await res.json();
const url = data.url;

        setForm({
          ...form,
          profileImage: url,
        });
      }}
      className="block"
    />

    {form.profileImage && (
      <img
        src={form.profileImage}
        alt=""
        className="
          mt-4
          w-40
          h-40
          object-cover
          rounded-3xl
        "
      />
    )}
  </div>

  {/* COVER IMAGE */}

  <div className="mt-8">
    <label className="block mb-3 font-semibold">
      Cover Image
    </label>

    <input
      type="file"
      accept="image/*"
      onChange={async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const url = await uploadImage(file);

        setForm({
          ...form,
          coverImage: url,
        });
      }}
      className="block"
    />

    {form.coverImage && (
      <img
        src={form.coverImage}
        alt=""
        className="
          mt-4
          w-full
          h-52
          object-cover
          rounded-3xl
        "
      />
    )}
  </div>
</div>

{/* DOCTOR */}

{isDoctorLayout && (

  <div
    id="doctor"
    className="
      rounded-[32px]
      border
      border-white/10
      bg-white/5
      p-8
    "
  >
    <h2 className="text-4xl font-bold mb-8">
      Doctor Information
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {[
        ["Qualification", "qualification"],
        ["Specialization", "specialization"],
        ["Clinic Timing", "clinicTiming"],
        ["Appointment URL", "appointmentUrl"],
      ].map(([label, key]) => (

        <input
          key={key}
          placeholder={label}
          value={(form as any)[key]}
          onChange={(e) =>
            setForm({
              ...form,
              [key]: e.target.value,
            })
          }
          className="
            h-16
            rounded-3xl
            bg-[#071132]
            border
            border-white/10
            px-5
          "
        />

      ))}

    </div>
  </div>

)}

{/* SOCIAL */}

<div
  id="social"
  className="
    rounded-[32px]
    border
    border-white/10
    bg-white/5
    p-8
  "
>
  <h2 className="text-4xl font-bold mb-8">
    Social Media
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {[
      ["Facebook", "facebook"],
      ["Instagram", "instagram"],
      ["LinkedIn", "linkedin"],
      ["YouTube", "youtube"],
      ["Twitter", "twitter"],
      ["Telegram", "telegram"],
    ].map(([label, key]) => (

      <input
        key={key}
        placeholder={label}
        value={(form as any)[key]}
        onChange={(e) =>
          setForm({
            ...form,
            [key]: e.target.value,
          })
        }
        className="
          h-16
          rounded-3xl
          bg-[#071132]
          border
          border-white/10
          px-5
        "
      />

    ))}

  </div>
</div>
         
 {/* SERVICES */}

<div
  id="services"
  className="
    rounded-[32px]
    border
    border-white/10
    bg-white/5
    p-8
  "
>

  <div className="flex items-center justify-between mb-8">

    <h2 className="text-4xl font-bold">
      Services
    </h2>

    <button
      type="button"
      onClick={() =>
        setForm({
          ...form,
          services: [
            ...form.services,
            {
              title: "",
              description: "",
              price: "",
            },
          ],
        })
      }
      className="
        px-6
        py-3
        rounded-2xl
        bg-violet-600
        hover:bg-violet-700
        transition
        font-semibold
      "
    >
      + Add Service
    </button>

  </div>

  <div className="space-y-5">

    {form.services.map((service, index) => (

      <div
        key={index}
        className="
          rounded-3xl
          bg-[#071132]
          border
          border-white/10
          p-6
        "
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <input
            placeholder="Service Title"
            value={service.title}
            onChange={(e) => {
              const updated = [...form.services];

              updated[index].title =
                e.target.value;

              setForm({
                ...form,
                services: updated,
              });
            }}
            className="
              h-16
              rounded-2xl
              bg-[#020617]
              border
              border-white/10
              px-5
            "
          />

          <input
            placeholder="Price"
            value={service.price}
            onChange={(e) => {
              const updated = [...form.services];

              updated[index].price =
                e.target.value;

              setForm({
                ...form,
                services: updated,
              });
            }}
            className="
              h-16
              rounded-2xl
              bg-[#020617]
              border
              border-white/10
              px-5
            "
          />

          <textarea
            placeholder="Description"
            value={service.description}
            onChange={(e) => {
              const updated = [...form.services];

              updated[index].description =
                e.target.value;

              setForm({
                ...form,
                services: updated,
              });
            }}
            className="
              md:col-span-2
              min-h-[120px]
              rounded-2xl
              bg-[#020617]
              border
              border-white/10
              p-5
            "
          />

        </div>

        <button
          type="button"
          onClick={() => {

            const updated =
              form.services.filter(
                (_, i) => i !== index
              );

            setForm({
              ...form,
              services: updated,
            });

          }}
          className="
            mt-5
            px-5
            py-3
            rounded-2xl
            bg-red-500
            hover:bg-red-600
            transition
            font-semibold
          "
        >
          Delete Service
        </button>

      </div>

    ))}

  </div>

</div>
      {/* PRODUCTS */}

<div
  id="products"
  className="
    rounded-[32px]
    border
    border-white/10
    bg-white/5
    p-8
  "
>

  <div className="flex items-center justify-between mb-8">

    <h2 className="text-4xl font-bold">
      Products
    </h2>

    <button
      type="button"
      onClick={() =>
        setForm({
          ...form,
          products: [
            ...form.products,
            {
              name: "",
              description: "",
              price: "",
              discountPrice: "",
              stock: "In Stock",
            },
          ],
        })
      }
      className="
        px-6
        py-3
        rounded-2xl
        bg-violet-600
        hover:bg-violet-700
        transition
        font-semibold
      "
    >
      + Add Product
    </button>

  </div>

  <div className="space-y-5">

    {form.products.map((product, index) => (

      <div
        key={index}
        className="
          rounded-3xl
          bg-[#071132]
          border
          border-white/10
          p-6
        "
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <input
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => {
              const updated = [...form.products];

              updated[index].name =
                e.target.value;

              setForm({
                ...form,
                products: updated,
              });
            }}
            className="
              h-16
              rounded-2xl
              bg-[#020617]
              border
              border-white/10
              px-5
            "
          />

          <input
            placeholder="Price"
            value={product.price}
            onChange={(e) => {
              const updated = [...form.products];

              updated[index].price =
                e.target.value;

              setForm({
                ...form,
                products: updated,
              });
            }}
            className="
              h-16
              rounded-2xl
              bg-[#020617]
              border
              border-white/10
              px-5
            "
          />

          <textarea
            placeholder="Description"
            value={product.description}
            onChange={(e) => {
              const updated = [...form.products];

              updated[index].description =
                e.target.value;

              setForm({
                ...form,
                products: updated,
              });
            }}
            className="
              md:col-span-2
              min-h-[120px]
              rounded-2xl
              bg-[#020617]
              border
              border-white/10
              p-5
            "
          />

        </div>

        <button
          type="button"
          onClick={() => {

            const updated =
              form.products.filter(
                (_, i) => i !== index
              );

            setForm({
              ...form,
              products: updated,
            });

          }}
          className="
            mt-5
            px-5
            py-3
            rounded-2xl
            bg-red-500
            hover:bg-red-600
            transition
            font-semibold
          "
        >
          Delete Product
        </button>

      </div>

    ))}

  </div>

</div>

      {/* GALLERY */} <div id="gallery" className=" rounded-[32px] border border-white/10 bg-white/5 p-8 " > 
      <div className="flex items-center justify-between mb-8"> 
        <h2 className="text-4xl font-bold"> Gallery </h2> 
        <label className=" px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 transition font-semibold cursor-pointer " > Upload Images 
          <input type="file" multiple accept="image/*" hidden onChange={async (e) => { const files = e.target.files; if (!files) return; const uploadedUrls: string[] = []; for (const file of Array.from(files)) { const uploadForm = new FormData(); uploadForm.append( "file", file ); const res = await fetch( "/api/upload", { method: "POST", body: uploadForm, } ); const data = await res.json(); uploadedUrls.push( data.url ); } setForm({ ...form, galleryImages: [ ...form.galleryImages, ...uploadedUrls, ], }); }} /> </label> </div> <div className="grid grid-cols-2 md:grid-cols-3 gap-5"> {form.galleryImages.map( (img, index) => ( <div key={index} className="relative" > <img src={img} alt="" className=" w-full h-44 object-cover rounded-3xl border border-white/10 " /> <button type="button" onClick={() => { const updated = form.galleryImages.filter( (_, i) => i !== index ); setForm({ ...form, galleryImages: updated, }); }} className=" absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 transition font-bold " > × </button> </div> ) )} </div> </div>

            {/* PAYMENT */}

            <div
              id="payment"
              className="
                rounded-[32px]
                border
                border-white/10
                bg-white/5
                p-8
              "
            >
              <h2 className="text-4xl font-bold mb-8">
                UPI ID (For Receiving Payment)
              </h2>

              <input
                placeholder="UPI ID"
                value={form.upiId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    upiId: e.target.value,
                  })
                }
                className="
                  w-full
                  h-16
                  rounded-3xl
                  bg-[#071132]
                  border
                  border-white/10
                  px-5
                "
              />

            </div>

          </div>

        </form>

      </div>
    </div>
  );
}