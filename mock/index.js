// /api/mock.js
export default function handler(req, res) {
  console.log('req:' + JSON.stringify(req))
  console.log('res:' + JSON.stringify(res))
  if (req.method === 'GET') {
    res.status(200).json({
      code: 200,
      data: 'Mock data from Vercel Serverless',
    })
  } else {
    console.log('get')
    res.status(405).end() // 只允许 GET 请求
  }
}
