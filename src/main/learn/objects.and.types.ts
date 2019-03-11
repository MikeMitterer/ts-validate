const name: string = "Mike";

export const userName = {
    age: 99,
    name,
};

/**
 * Type-Safe definition eines Objects-
 *
 * Das Objekt hat zwei parameter: name + age
 */
export const userData: { name: string, age: number } = {
      age: 99,
    name: "Gerda",
};

/**
 * Das komplexe Object hat eine Callback als zweiten parameter
 */
export const complexObject: { name: string, callback: (age: number) => string } = {
    name: "Mike",
    callback(age: number): string {
        return `Age: ${age}`;
    },
};

/**
 * Type-Aliases
 *
 * Hier steht auf der rechten Seite eigentlich kein value sondern eine Type-Definition
 */
interface ComplexObject { name: string; data: number[];}

export const anotherComplexObject: ComplexObject = {
  data: [4, 5, 6],
    name: "Mike",
};

// - Union Types -------------------------------------------------------------------------------------------------------

export const myRealAge: number | string = 99;

export function showMyRealAge(age: number | string): string {
    return typeof age === "number" ? `N: ${age}` : `S: ${age}`;
}

// - never Type --------------------------------------------------------------------------------------------------------

/**
 * Die Funktion endet nie - deshalb der return type: never
 */
export function neverEnds(): never {
    throw new Error("An error occurred!");
}

// - not nullable Types ------------------------------------------------------------------------------------------------

export function tryToReturnNull(paramShouldNotBeNull: string): string | null {
    return paramShouldNotBeNull === "Mike" ? paramShouldNotBeNull : null;
}
