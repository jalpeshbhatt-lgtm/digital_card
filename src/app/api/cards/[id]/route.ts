import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/* =========================
   UPDATE CARD
========================= */

export async function PUT(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const updatedCard = await prisma.card.update({
      where: { id },
      data: {
        name: body.name,
        designation: body.designation,
        company: body.company,
        profileImage: body.profileImage,
        coverImage: body.coverImage,
        galleryImages: body.galleryImages,

        qualification: body.qualification,
        specialization: body.specialization,
        clinicTiming: body.clinicTiming,
        appointmentUrl: body.appointmentUrl,

        mobile: body.mobile,
        whatsapp: body.whatsapp,
        email: body.email,
        website: body.website,
        address: body.address,
        bio: body.bio,
        aboutUs: body.aboutUs,
        directionUrl: body.directionUrl,

        facebook: body.facebook,
        instagram: body.instagram,
        linkedin: body.linkedin,
        youtube: body.youtube,
        twitter: body.twitter,
        telegram: body.telegram,

        upiId: body.upiId,
        paymentQrCode: body.paymentQrCode,

        services: body.services,
        products: body.products,

        templateId: body.templateId,

        primaryColor: body.primaryColor,
        secondaryColor: body.secondaryColor,
        fontFamily: body.fontFamily,
        buttonStyle: body.buttonStyle,
      },
    });

    return NextResponse.json(updatedCard);
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE CARD
========================= */

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    await prisma.card.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Card deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}