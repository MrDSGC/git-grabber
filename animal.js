const fs = require('fs');

function filterAnimals( animals, letter) {
  return animals.split("/n").filter(animal => animal.startsWith(letter)).join('/n')
}
const letter = process.argv[2].toUpperCase()

fs.readFile('./animals.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const animals = filterAnimals(data, letter)
  console.log(animals);
  // fs.writeFile(`${letter}_animals.txt`, animals, err => {
  //   if(err) {
  //     console.log(err)
  //     return
  //   }
  //   console.log(`successfully created ${letter}_animals.txt`)
  // })
})

// function selectAnimals(animalString, animalLetter) {
//   return animalString
//     .split('\n')
//     .filter(animal => animal.startsWith(animalLetter))
//     .join('\n')
// }
//
// const animalLetter = process.argv[2].toUpperCase()
//
// fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   const animals = selectAnimals(data, animalLetter)
//
//   fs.writeFile(`${animalLetter}_animals.txt`, animals, err => {
//     if (err) {
//       console.log(err)
//       return
//     }
//     console.log(`successfully created ${animalLetter}_animals.txt`)
//   })
// })
