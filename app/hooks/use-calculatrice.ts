import { useState, useEffect } from "react"

export function useCalcul() {
    const [numbers, setNumbers] = useState<number[]>([]);
    const [operators, setOperators] = useState<string[]>([]);
    const [input, setInput] = useState("0");
    const [result, setResult] = useState(0);

    const handleNumberClick = (num: number) => {
        setInput(input === "0" ? String(num) : input + num);
    };

    const handleOperator = (op: string) => {
        // Ne pas ajouter d'opérateur si on en a déjà un sans nombre après
        if (input === "" || (operators.length > numbers.length)) {
            return;
        }

        const currentNum = Number(input);
        setNumbers([...numbers, currentNum]);
        setOperators([...operators, op]);
        setInput("");
    };



    const button1Click = () => handleOperator("+");
    const button2Click = () => handleOperator("-");
    const button3Click = () => handleOperator("/");
    const button4Click = () => handleOperator("x");

    const handleEquals = () => {
        if (input === "" || operators.length === 0) return;

        const currentNum = Number(input);
        const allNumbers = [...numbers, currentNum];
        let calc = allNumbers[0];

        for (let i = 0; i < operators.length; i++) {
            const op = operators[i];
            const nextNum = allNumbers[i + 1];

            if (op === "+") calc += nextNum;
            else if (op === "-") calc -= nextNum;
            else if (op === "x") calc *= nextNum;
            else if (op === "/") calc /= nextNum;
        }

        setResult(calc);
        setInput(String(calc));
        setNumbers([]);
        setOperators([]);
    };

    const clear = () => {
        setInput("0");
        setNumbers([]);
        setOperators([]);
        setResult(0);
    };
    return { input, result, button1Click, button2Click, button3Click, button4Click, handleNumberClick, handleEquals, clear };
}