const http = require('http');
const url = require('url');
const port = 3000;

let todos = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 1,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
  },
  {
    "userId": 1,
    "id": 4,
    "title": "et porro tempora",
    "completed": true
  },
  {
    "userId": 1,
    "id": 5,
    "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    "completed": false
  },
  {
    "userId": 1,
    "id": 6,
    "title": "qui ullam ratione quibusdam voluptatem quia omnis",
    "completed": false
  },
  {
    "userId": 1,
    "id": 7,
    "title": "illo expedita consequatur quia in",
    "completed": false
  },
  {
    "userId": 1,
    "id": 8,
    "title": "quo adipisci enim quam ut ab",
    "completed": true
  },
  {
    "userId": 1,
    "id": 9,
    "title": "molestiae perspiciatis ipsa",
    "completed": false
  },
  {
    "userId": 1,
    "id": 10,
    "title": "illo est ratione doloremque quia maiores aut",
    "completed": true
  }
]

let count = 1;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const reqUrl = url.parse(req.url, true);
  const limit = reqUrl.query.limit || todos.length;
  console.log(`server hit count: ${count}. response limit: ${limit}. request: ${req.method}`);
  const StringDecoder = require('string_decoder').StringDecoder;

  if (req.method === 'OPTIONS') {
    console.log("options...");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", false);
    res.setHeader("Access-Control-Allow-Headers", "Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept")
    res.statusCode = 200;
    res.end();
  }
  
  if (reqUrl.pathname === '/todo') {    
    switch (req.method) {
      case "GET":
        console.log("getting...");
        res.end(JSON.stringify(todos.slice(0, limit)));
        break;
      case "POST":
        console.log("posting...");
        var whole = '';
        req.on('data', (chunk) => {
          whole += chunk.toString()
        })
        
        req.on('end', () => {
          whole = JSON.parse(whole);
          var title = whole.title;
          var completed = whole.completed;
          var todo = {
            "userId": 2,
            "id": todos.length + 1,
            title,
            completed
          };
          todos = [...todos, todo];
          res.end(JSON.stringify(todos));
        })
        break;
      case "DELETE":
        console.log("deleting...");
        var id = reqUrl.query.id;
        todos = todos.filter(todo => todo.id != id);
        res.end(JSON.stringify(todos));
        break;
    }
    count++;
  }
});

server.listen(port, () => console.log(`Server started on port ${port}...`));