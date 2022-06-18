import {Env} from './types'


export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {


    try {
      const url = new URL(request.url)
      const pathname = url.pathname;
      const patharray = pathname.slice(1, pathname.endsWith('/') ? pathname.length -1 : undefined).split('/');
      const firstPath = patharray[0] || '';
      switch (firstPath) {
        case '':
          return new Response("hello world");
        default:
          return new Response("Not found", { status: 404 })
      }
    } catch (err) {
      return new Response((err as any).toString())
    }

  },
};
