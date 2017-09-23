const fs = require('fs');
const http = require('http');
const qs = require('querystring')
const cache = {}

function filterAnimals(animals, letter) {
  filtered = animals.split('\n').filter(animal => animal.startsWith(letter))
  return filtered.join('\n')
}
//
// const letter = process.argv[2].toUpperCase()
//
// fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   const animals = filterAnimals(data, letter)
//   console.log(animals);
//   fs.writeFile(`${letter}_animals.txt`, animals, err => {
//     if(err) {
//       console.log(err)
//       return
//     }
//     console.log(`successfully created ${letter}_animals.txt`)
//   })
// })


// const server = http.createServer((req, res) => {
//     res.write('hello world');
//     res.end();
// })
//
// server.listen(8000, () => console.log("I'm listening on port 8000!"))


const animalServer = http.createServer((req, res) => {
  const query = req.url.split('?')[1]
  if (query !== undefined) {
    const animalLetter = qs.parse(query).letter.toUpperCase()

    if (cache[animalLetter] !== undefined) {
      res.end(cache[animalLetter])
    }
    console.log(cache);
    if (animalLetter !== undefined) {
      fs.readFile('./animals.txt', 'utf-8', (err, data) => {
        if (err) {
          console.log(err)
          res.end('IT WENT POORLY')
          return
        }
        const animals = filterAnimals(data, animalLetter)
        cache[animalLetter] = animals
        res.end(animals)
      })
    }
  } else {
    if (cache['animals'] !== undefined) {
      res.end(cache['animals'])
    }
    fs.readFile('./animals.txt', 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
        res.end('IT WENT POORLY')
        return
      }
      cache['animals'] = data
      res.end(data)
    })
  }
})

animalServer.listen(8000, () => console.log("I'm listening on port 8000"))
