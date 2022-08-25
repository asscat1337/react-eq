import * as russiaLetters from '../json/russia_letters.json'
import * as numberSound from '../json/number_sound.json'

interface ISound{
  ticket:string,
  cabinet:string
}
type letters={
  [key:string]:any
}

const generateSound=async ({ticket,cabinet}:ISound)=>{
  const initialArray = ['/sound/client.wav']
  const [first,...last] = ticket.split('')

   const toNumber = last.join("")
   const letter = await generateLetter(first)
   const number = await generateNum(+toNumber)
   const cab = await generateNum(+cabinet)
   initialArray.push(letter,...number,'/sound/tocabinet.wav',...cab)
  return initialArray

}

const generateNum = async(num:number):Promise<string[]>=>{
  const checkNumber = num.toString().length
  const numberRemaind = num % 100
  const minusNumber = num - numberRemaind
  const numbers = JSON.stringify(numberSound)

  const state = checkNumber >= 3 ? [minusNumber.toString(),numberRemaind.toString()] : [num.toString()]


  const mapState = state.map((file:any)=>{
    const test = JSON.parse(numbers)[file]
   return test
  })
  return mapState
}

const generateLetter=async (letter:string):Promise<string>=>{
  const findLetter:letters = russiaLetters

  return findLetter[letter]
}


export {
  generateSound
}