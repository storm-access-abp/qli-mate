import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 
export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
 
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/", request.url));
	}
 
	return NextResponse.next();
}
 
export const config = {
	//Aplica o middleware em todas as rotas, exceto:
	matcher: [
	  '/((?!api|_next/static|_next/image|favicon.ico|public|sitemap.xml|login|register|about|dashboard|$).*)',
	],
  };
  