import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const grade = searchParams.get("grade") || "";
    const subject = searchParams.get("subject") || "";

    const minPrice = Number(searchParams.get("minPrice") || 0);
    const maxPriceParam = searchParams.get("maxPrice");
    const minRating = Number(searchParams.get("minRating") || 0);

    const sort = searchParams.get("sort") || "created_desc";

    const page = Math.max(
      Number(searchParams.get("page") || 1),
      1
    );

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit") || 6), 1),
      20
    );

    const where = {
      AND: [
        search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                  },
                },
                {
                  subject: {
                    contains: search,
                  },
                },
              ],
            }
          : {},

        grade ? { grade } : {},

        subject ? { subject } : {},

        {
          price: {
            gte: minPrice,
            ...(maxPriceParam
              ? { lte: Number(maxPriceParam) }
              : {}),
          },
        },

        {
          teacherRating: {
            gte: minRating,
          },
        },
      ],
    };

    let orderBy = {};

    switch (sort) {
      case "price_asc":
        orderBy = { price: "asc" };
        break;

      case "price_desc":
        orderBy = { price: "desc" };
        break;

      case "rating_desc":
        orderBy = { teacherRating: "desc" };
        break;

      default:
        orderBy = { createdAt: "desc" };
    }

    const total = await prisma.course.count({
      where,
    });

    const courses = await prisma.course.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      courses,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Course API error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch courses",
      },
      {
        status: 500,
      }
    );
  }
}