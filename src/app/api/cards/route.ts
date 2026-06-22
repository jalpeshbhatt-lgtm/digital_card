import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import cloudinary from "@/lib/cloudinary";

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

    /**
     * ==========================
     * SUBSCRIPTION CHECK
     * ==========================
     */

    const subscription =
      await prisma.subscription.findUnique({
        where: {
          userId: decoded.userId,
        },
      });

    if (!subscription) {
      return NextResponse.json(
        {
          error:
            "No active subscription found.",
        },
        {
          status: 403,
        }
      );
    }

    if (
      subscription.expiryDate <
      new Date()
    ) {
      return NextResponse.json(
        {
          error:
            "Your subscription has expired.",
        },
        {
          status: 403,
        }
      );
    }

    const currentCards =
      await prisma.card.count({
        where: {
          userId: decoded.userId,
        },
      });

    const allowedCards =
      subscription.cardLimit +
      subscription.extraCards;

    if (
      currentCards >= allowedCards
    ) {
      return NextResponse.json(
        {
          error:
            "Card limit reached. Please upgrade your plan or purchase extra cards.",
        },
        {
          status: 403,
        }
      );
    }

    console.log(
      "Gallery Images:",
      body.galleryImages
    );

    const card = await prisma.card.create({
      data: {
        userId: decoded.userId,

        templateId: body.templateId,
        address: body.address,

        name: body.name,

        designation: body.designation,
        company: body.company,
        qualification: body.qualification,
        specialization:
          body.specialization,
        clinicTiming:
          body.clinicTiming,
        appointmentUrl:
          body.appointmentUrl,

        showQrSection:
  body.showQrSection ?? true,

        services: body.services,
        products: body.products,

        showServices:
  body.showServices ?? true,

       showProducts:
  body.showProducts ?? true,

        mobile: body.mobile,
        whatsapp: body.whatsapp,

        profileImage:
          body.profileImage || "",

        coverImage:
          body.coverImage || "",

        galleryImages:
  Array.isArray(body.galleryImages)
    ? body.galleryImages.filter(
        (img: string | null) =>
          img &&
          typeof img === "string" &&
          img.trim() !== ""
      )
    : [],

        directionUrl:
          body.directionUrl,

        email: body.email,
        website: body.website,

        aboutUs: body.aboutUs,
        bio: body.bio,

        upiId: body.upiId,

        paymentQrCode:
          body.paymentQrCode,

        primaryColor:
          body.primaryColor,

        secondaryColor:
          body.secondaryColor,

        fontFamily:
          body.fontFamily,

        buttonStyle:
          body.buttonStyle,

        facebook: body.facebook,
        instagram:
          body.instagram,
        linkedin: body.linkedin,
        youtube: body.youtube,
        twitter: body.twitter,
        telegram: body.telegram,

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
      remainingCards:
        allowedCards -
        (currentCards + 1),
    });
  } catch (error) {
    console.error(
      "CREATE CARD ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to create card",
      },
      {
        status: 500,
      }
    );
  }
}