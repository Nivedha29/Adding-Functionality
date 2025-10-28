import { prisma } from "@/lib/prisma";
import slugify from "slugify";

function makeBaseSlug(title) {
  return slugify(title, { lower: true, strict: true, trim: true });
}

export async function POST(req, res) {
  try {
    // if App Router: const { title, description, body, tags } = await req.json();
    // if Pages Router: const { title, description, body, tags } = req.body;

    const data = await req.json?.() ?? req.body;
    const { title, description, body, tags } = data;

    const slug = makeBaseSlug(title);
    const exists = await prisma.article.findUnique({ where: { slug } });

    if (exists) {
      return new Response(
        JSON.stringify({
          message:
            "An article with this title already exists. Please change the title.",
        }),
        { status: 409 }
      );
    }

    const article = await prisma.article.create({
      data: { title, description, body, slug, tags },
    });

    return new Response(JSON.stringify(article), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Failed to save article", detail: err.message }),
      { status: 500 }
    );
  }
}
