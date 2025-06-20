// /api/mock.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    console.log('mock')
    res.status(200).json({ code: 200, data: "Mock from Vercel Serverless" });
  } else {
    console.log('mock')
    res.status(405).end(); // 仅允许 GET
  }
}