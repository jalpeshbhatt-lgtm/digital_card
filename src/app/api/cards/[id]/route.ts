import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    console.log("Updating Card:", {
      id,
      templateId: body.templateId,
    });

    const card = await prisma.card.update({
      where: {
        id,
      },
      data: {
  template: body.templateId
    ? {
        connect: {
          id: body.templateId,
        },
      }
    : undefined,
        name: body.name,
        profileImage: body.profileImage,
        designation: body.designation,
        company: body.company,
        galleryImages: body.galleryImages || [],
        qualification: body.qualification,
        specialization: body.specialization,
        clinicTiming: body.clinicTiming,
        appointmentUrl: body.appointmentUrl,
        showQrSection: body.showQrSection,
        services: body.services,
        products: body.products,
        showServices: body.showServices,
        showProducts: body.showProducts,
        primaryColor: body.primaryColor,
        secondaryColor: body.secondaryColor,
        fontFamily: body.fontFamily,
        buttonStyle: body.buttonStyle,

        mobile: body.phone,
        whatsapp: body.whatsapp,

        
        email: body.email,
        website: body.website,

        directionUrl: body.directionUrl,

        address: body.address,
        aboutUs: body.aboutUs,
        bio: body.bio,

        upiId: body.upiId,
        paymentQrCode: body.paymentQrCode,

        facebook: body.facebook,
        instagram: body.instagram,
        linkedin: body.linkedin,
        youtube: body.youtube,
        twitter: body.twitter,
        telegram: body.telegram,
      },
      include: {
        template: true,
              },
    });

    return NextResponse.json({
      success: true,
      card,
    });
  } catch (error) {
    console.error("UPDATE CARD ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to update card",
      },
      {
        status: 500,
      }
    );
  }
}
