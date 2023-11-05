// Answer Sheet - all answers should go here 

/* 
Except for A-1 and C, you will always write a function that returns values
*/


/* A-1
define and fill an object */
const activities = {
  "Monday"    : "Swimming",
  "Tuesday"   : "Book Club",
  "Wednesday" :"Gymnastics",
  "Thursday"  : "Babysitting",
  "Friday"    : "Debating Society"
};


/* A-2 */
function createNestedArrayFromObject(object) {
  return Object.entries(object)
}


/* B-1 */
const scrambleWords = (sentence) => {
  let punctuation = sentence.substr(-1)

  if (".!?".includes(punctuation)) {
    sentence = sentence.slice(0, -1)
  } else {
    punctuation = ""
  }
  
  const words = sentence.split(" ")

  const scrambled = words.map(word => {
    let letters = [...word] // same as word.split("")
    letters = letters.reverse()
    // Take what is now the last letter,...
    const first = letters.pop() // letters _could_ be []
    // ... place what is now the first letter at the end
    letters.push(letters.shift()) // letters _could_ be [undefined]
    // ... and insert the popped letter at the beginning
    letters.unshift(first)

    return letters.join("") // ["a", undefined].join("") is "a"

    // https://262.ecma-international.org/5.1/#sec-15.4.4.5
    // 15.4.4.5Array.prototype.join (separator)
    // 8. If element0 is undefined or null,
    //    let R be the empty String;
    //    otherwise, Let R be ToString(element0).
  })

  return scrambled.join(" ") + punctuation
};


/* B-2 */
function convertNestedArrayToObject([ keys, values ]) {

  const reducer = ( object, key, index ) => {
    object[key] = values[index]
    return object
  }

  return keys.reduce(reducer, {})
};


/* B-3 */
const makeGameGrid = ({ rows, columns }) => {
  const gameGrid = []
  
  for ( let row = 1; row <= rows; row += 1 ) {
    const newRow = []
    gameGrid.push(newRow)

    for ( let column = 1; column <= columns; column += 1 ) {
      newRow.push(`r${row}c${column}`)
    }
  }
  
  return gameGrid
};


/* B-4 */
const generateAverages = (data) => {
  const entries = Object.entries(data)

  let total = 0
  let count = 0

  const sum = array => array.reduce(
    (total, number) => total + number
  )

  const reducer = ( accumulator, [day, values] ) => {
    const subTotal = sum(values)
    const length = values.length
    accumulator[day] = subTotal / length

    // <<< Side effects
    total += subTotal
    count += length
    // Side effects >>>

    return accumulator
  }

  const output = entries.reduce(reducer, {})

  output["Overall"] = total / count

  return output
};


/* C
write a class */
class StaffMember{
  constructor(first_name, family_name, partner_name, number_of_children) {
    this.first_name = first_name
    this.family_name = family_name
    this.partner_name = partner_name
    this.number_of_children = number_of_children
  }

  presentValue() {
    const value = 25
                + (this.partner_name ? 7 : 0)
                + (this.number_of_children * 5)

    return value
  }

  getStatus() {
    let status = " "

    if (this.partner_name || this.number_of_children) {
      status = ` ${this.first_name} has `

      if (this.partner_name) {
        status += `a partner called ${this.partner_name}`
        if (this.number_of_children) {
          status += `, and `
        }
      }

      if (this.number_of_children === 1) {
        status += `1 child`
      } else if (this.number_of_children) {
        status += `${this.number_of_children} children`
      }
    
      status += ". "
    }

    return status 
  }

  getMessage() {
    const status = this.getStatus()
    const value = this.presentValue()

    const message = `Please buy a present for ${this.first_name} ${this.family_name}.${status}Pyramid Sales will reimburse your purchase up to a maximum value of €${value}.`

    return message
  }
};


/* D */
const validateName = (name) => {
  const words = name.split(" ")
  const wordCount = words.length
  if (wordCount < 2 || wordCount > 3) {
    return false
  }

  const allCharactersAreValid = (word) => {
    word = word.toLowerCase()
    for (let char of word) {
      if (!("abcdefghijklmnopqrstuvwxyz.".includes(char))) {
        return false
      }
    }

    return true
  }
 
  let isValid = words.every( word => {
    const length = word.length
    const initial = word[0]
    const rest = word.substring(1)

    if (initial === ".") {
      // Words cannot start with a dot
      return false
    } else if (length < 2) {
      // Initials must be followed by a dot
      return false
    } else if (initial !== initial.toUpperCase()) {      
      // Initial letters must be capitals
      return false
    } else if (rest !== rest.toLowerCase()) {
      // All other letters must be lowercase
      return false
    } else if (length > 2 && word.includes(".")) {
      // Non-initials must not contain a dot
      return false
    } else if (!allCharactersAreValid(word)) {
      // Word must contain only letters or dots
      return false
    }

    return true
  })

  if (!isValid) {
    return false
  }

  if (
       words[0][1] === "."      // first word is an initial
    && wordCount === 3          // there are three words
    && !words[1].includes(".")  // middle name is not an initial
  ) {
    // Middle name cannot be expanded if first is an initial
    return false
  }

  const lastName = words.pop()
  if (lastName.includes(".")) {
    // Last name cannot be an initial
    return false
  }

  return true
};


// Do not edit or answer below this line
// EDITING MODULE EXPORTS WILL RESULT IN AN AUTOMATIC FAIL
module.exports = {activities, createNestedArrayFromObject, scrambleWords, convertNestedArrayToObject, makeGameGrid, generateAverages, StaffMember, validateName};
