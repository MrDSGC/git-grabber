const fs = require('fs');

function filterAnimals(animals, letter) {
  filtered = animals.split('\n').filter(animal => animal.startsWith("C"))
  return filtered.join('\n')
}

const letter = process.argv[2].toUpperCase()

fs.readFile('./animals.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const animals = filterAnimals(data, letter)
  console.log(animals);
  fs.writeFile(`${letter}_animals.txt`, animals, err => {
    if(err) {
      console.log(err)
      return
    }
    console.log(`successfully created ${letter}_animals.txt`)
  })
})
