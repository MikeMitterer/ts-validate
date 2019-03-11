/* tslint:disable:max-classes-per-file variable-name */
class DartSimulations1 {

    get name(): string { return this._name; }

    public static forName(name: string) {
        return new DartSimulations1(name);
    }
    private constructor(private _name: string) {}
}

class FactoryConstructor {

    public static forName(name: string) {
        return new FactoryConstructor(name);
    }
    private constructor(public readonly name: string) {}
}

describe("Simulation des factory-CTORs aus Dart", () => {
    test("Describe your test", () => {
        const ds = DartSimulations1.forName("Mike");
        expect(ds.name).toBe("Mike");
    });

    test("Mit readonly param", () => {
        const fc = FactoryConstructor.forName("Mike");
        expect(fc.name).toBe("Mike");
    });
});
