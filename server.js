const http = require('http');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
} = require('./controllers/productController');

const server = http.createServer((req, res) => {
  // get all products
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res);
  }
  // get a single product
  else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method == 'GET') {
    const id = req.url.split('/')[3];
    getProduct(req, res, id);
  }
  // post a new product
  else if (req.url === '/api/products' && req.method === 'POST') {
    createProduct(req, res);
  }
  // update a product
  else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method == 'PUT') {
    const id = req.url.split('/')[3];
    updateProduct(req, res, id);
  }
  // delete a product
  else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method == 'DELETE'
  ) {
    const id = req.url.split('/')[3];
    removeProduct(req, res, id);
  }
  // else not a route
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  }
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
