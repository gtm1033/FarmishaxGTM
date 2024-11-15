import Cors from 'cors';

// Initialize CORS with your specific configuration
export const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: '*', 
});

export function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

