import type { APIRoute } from 'astro';

export const POST: APIRoute = (context) => {
    context.cookies.delete('user')

    return context.redirect('/', 302)
}
