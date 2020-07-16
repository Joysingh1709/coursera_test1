export class Question {
    QnId: string;
    Qn: string;
    image: string;
    options: [
        {option: string;},
        {option: string;},
        {option: string;},
        {option: string;}
    ];
    answer: number;
    correct: number;
}