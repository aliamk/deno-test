import { join } from "https://deno.land/std/path/mod.ts"
import { BufReader } from "https://deno.land/std/io/bufio.ts" // 
import { parse } from "https://deno.land/std/encoding/csv.ts"

// Type Assertion
interface Planet {
  [ key : string ] : string 
}
// each planet object is going to have a key that is a string so they can be indexed with anything that is a string; the second part is telling TS that value is also a string.  So both the key and value are strings

async function loadPlanetsData() {
  const path = join(".", "cumulative_2020.10.13_07.44.04.csv")

  const file = await Deno.open(path); // Accesses the path to the CSV file
  const bufReader = new BufReader(file) // Buffers the data
  const result = await parse(bufReader, { //converts csv style to tables/text
    // header: true,
    comment: "#",
  })

  Deno.close(file.rid)  // stops memory leaks

  const planets = (result as Array<Planet>).filter((planet) => {
    const planetaryRadius = Number(planet["koi_prad"])
    const stellarMass = Number(planet["koi_smass"])
    const stellarRadius = Number(planet["koi_srad"])

    return planet["koi_disposition"] === "CONFIRMED" 
      && planetaryRadius > 0.5 && planetaryRadius < 1.5 
      && stellarMass > 0.78 && stellarMass < 1.04 
      && stellarRadius > 0.99 && stellarRadius < 1.01
  })

  // console.log(result)
  return planets
}

const newEarths = await loadPlanetsData()
for (const planet of newEarths) {
  console.log(planet)
}
console.log(`${newEarths.length} habitable planets found!`)


/* import { join } from "https://deno.land/std/path/mod.ts"

async function readFile() {
  const path = join("path_test", "heeello.txt")

  const data = await Deno.readTextFile(path);

  console.log(data)
}

await readFile()  */