import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      userId: string;
      email: string;
      role: string;
    };

    console.log("Gallery Images:", body.galleryImages);

    const card = await prisma.card.create({
      data: {
        userId: decoded.userId,

        templateId: body.templateId,
        address: body.address,

        name: body.name,
        profileImage: body.profileImage,
        designation: body.designation,
        company: body.company,
        qualification: body.qualification,
        specialization: body.specialization,
        clinicTiming: body.clinicTiming,
        appointmentUrl: body.appointmentUrl,
        showQrSection: body.showQrSection,
        services: body.services,
        products: body.products,
        showServices: body.showServices,
        showProducts: body.showProducts,
        mobile: body.mobile,
        whatsapp: body.whatsapp,

        directionUrl: body.directionUrl,
        email: body.email,
        website: body.website,
        aboutUs: body.aboutUs,
        bio: body.bio,
        upiId: body.upiId,
        paymentQrCode: body.paymentQrCode,
        primaryColor: body.primaryColor, 
        secondaryColor: body.secondaryColor,
        fontFamily: body.fontFamily,
        buttonStyle: body.buttonStyle,
        facebook: body.facebook,
        instagram: body.instagram,
        linkedin: body.linkedin,
        youtube: body.youtube,
        twitter: body.twitter,
        telegram: body.telegram,
       galleryImages: body.galleryImages || [],
        slug:
          body.name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-") +
          "-" +
          Date.now(),
      },
    });

    return NextResponse.json({
      success: true,
      card,
    });
  } catch (error) {
    console.error("CREATE CARD ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create card",
      },
      {
        status: 500,
      }
    );
  }
}