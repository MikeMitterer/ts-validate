/* tslint:disable:no-console */
import * as console from 'console';
import * as path from "path";

console.log(`Hello ${path.resolve(process.cwd())}!`);

function delay(milliseconds: number, count: number): Promise<number> {
    // @ts-ignore (TS warns about Promise)
    return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(count);
    }, milliseconds);
  });
}

// async function always returns a Promise
// @ts-ignore (TS warns about Promise)
async function dramaticWelcome(): Promise<void> {
  console.log("Hello");

  for (let i = 0; i < 5; i++) {
    // await is converting Promise<number> into number
    const count: number = await delay(500, i);
    console.log(count);
  }

  console.log("World!");
}

dramaticWelcome();
