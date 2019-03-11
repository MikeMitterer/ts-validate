describe("Function mit Return-Type", () => {
    test("Simple", () => {
        const gt = <T>(data: T) => data;
        expect(gt<number>(10)).toBe(10);
    });

    test("Mit return type", () => {
        let gt: <T>(data: T) => string;

        gt = <T>(data: T): string => {
            return `-${data}-`;
        };
        expect(gt(10)).toBe("-10-");
    });
});
