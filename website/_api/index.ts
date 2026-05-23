/** Vercel API root — send visitors to the public site. */
export async function GET() {
  return Response.redirect("https://www.801familystudios.com/musician-roster", 302);
}
